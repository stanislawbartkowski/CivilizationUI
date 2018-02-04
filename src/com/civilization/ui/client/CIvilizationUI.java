/*
 * Copyright 2017 stanislawbartkowski@gmail.com  
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
 * See the License for the specific language governing permissions and 
 * limitations under the License.
 */
package com.civilization.ui.client;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Consumer;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.JavaScriptObject;
import com.google.gwt.core.client.JsArray;
import com.google.gwt.core.client.JsArrayString;
import com.google.gwt.dom.client.Element;
import com.google.gwt.dom.client.Node;
import com.google.gwt.dom.client.NodeList;
import com.google.gwt.i18n.client.DateTimeFormat;
import com.google.gwt.json.client.JSONArray;
import com.google.gwt.json.client.JSONObject;
import com.google.gwt.json.client.JSONParser;
import com.google.gwt.json.client.JSONValue;
import com.google.gwt.user.client.Timer;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.RootPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class CIvilizationUI implements EntryPoint {
	/**
	 * Create a remote service proxy to talk to the server-side Greeting service.
	 */
	private static GreetingServiceAsync greetingService = GWT.create(GreetingService.class);

	private static String civ;
	private static String civtoken;
	private static JSONObject board;
	private static List<String> civs = new ArrayList<String>();

	private final static String CIVMAP = "civ-map";
	private final static String GAMEMENU = "gamemenu";
	private final static String STARTMENU = "startmenu";
	private final static String JSDATA = "data";

	enum T {
		TRANINGGAME, STARTTWOPLAYERGAME, JOINTWOPLAYERGAME;

		boolean ismulti() {
			return this != TRANINGGAME;
		}

		boolean opposite() {
			return this == JOINTWOPLAYERGAME;
		}
	}

	private static T gamet = T.TRANINGGAME;

	public static String dateToS(int time) {
		Date d = new Date(time);
		return DateTimeFormat.getMediumDateTimeFormat().format(d);
	}

	/**
	 * Internal validation, if list of civilization is available Can happen if
	 * resource directory is not copied
	 * 
	 * @param civList
	 *            List of civilization retrieved from server
	 */
	private static void verifyListOfCiv(String civList) {
		JSONValue j = JSONParser.parseStrict(civList);
		JsArrayString a = (JsArrayString) j.isArray().getJavaScriptObject();
		if (a.length() == 0)
			Window.alert("Internal error, no civilizations available");
	}

	static class P {
		int row, col;

		P(int row, int col) {
			this.row = row;
			this.col = col;
		}

		boolean eq(int rrow, int rcol) {
			return fixrow(rrow) == row && fixcol(rcol) == col;
		}
	}

	private static boolean onList(List<P> plist, int rrow, int rcol) {
		return plist.stream().filter(p -> p.eq(rrow, rcol)).findFirst().isPresent();
	}

	public static void highlightMap(JavaScriptObject list, boolean highlight) {
		if (list == null)
			return;
		JsArray al = list.cast();
		List<P> plist = new ArrayList<P>();
		for (int i = 0; i < al.length(); i++) {
			JSONObject o = new JSONObject(al.get(i));
			int row = (int) o.get("row").isNumber().doubleValue();
			int col = (int) o.get("col").isNumber().doubleValue();
			plist.add(new P(row, col));
		}

		Element fe = findContent(CIVMAP);
		Node ss1 = (Node) fe.getPropertyObject("shadowRoot");
		walkforTag(ss1, "civ-square", e -> {
			int row = e.getPropertyInt("row");
			int col = e.getPropertyInt("col");
			if (onList(plist, row, col)) {
				JavaScriptObject o = e.cast();
				highlightSquare(o, highlight);
			}
		});
	}

	/**
	 * Refresh squares in the map
	 * 
	 * @return true: at least one square found, false: otherwise
	 */
	public static boolean refreshMap() {
		Notify n = new Notify();
		Element fe = findContent(CIVMAP);
		Node ss1 = (Node) fe.getPropertyObject("shadowRoot");
		walkforTag(ss1, "civ-square", e -> {
			int row = e.getPropertyInt("row");
			int col = e.getPropertyInt("col");
			JSONArray a = getMap();
			JSONObject o = a.get(fixrow(row)).isArray().get(fixcol(col)).isObject();
			e.setPropertyObject(JSDATA, o.getJavaScriptObject());
			n.ok = true;
		});
		return n.ok;
	}

	private static void clearMap() {
		Element fe = findContent(CIVMAP);
		Node ss1 = (Node) fe.getPropertyObject("shadowRoot");
		walkforTag(ss1, "civ-square", e -> e.setPropertyObject(JSDATA, null));
	}

	/**
	 * Extract map part from board retrieved from server
	 * 
	 * @return map as JsArray
	 */
	private static JSONArray getMap() {
		JSONObject oo = board.get("board").isObject();
		return oo.get("map").isArray();
	}

	// ==================================================
	// Discover by experience
	// It could take some time after map is rendered
	// ==================================================
	static class Notify {
		boolean ok = false;
	}

	public static Timer t = new Timer() {

		@Override
		public void run() {
			if (refreshMap()) {
				cancel();
				if (gamet.ismulti())
					// trefresh.scheduleRepeating(500);
					trefresh.scheduleRepeating(1000);
			}
		}

	};

	// ===========================================

	/** 
	 * Read Map again from server
	 */
	private static void rereadMap() {
		call(GreetingService.GETBOARD, civtoken, js -> {
			// change to JSON object
			if (js.equals("")) {
				consoleLog("reRead empty, do nothing");
				return;
			}
			consoleLog("rereadMap");
			JSONValue j = JSONParser.parseStrict(js);
			board = j.isObject();
			// refresh map
			refreshMap();
			// refresh buttons
			redrawheader();
		});
	}

	/**
	 * Discovered by experience, sometimes it does not work from GWT mode, reuse
	 * director JS code Set attribute in x-app tag
	 * 
	 * @param attr
	 *            attribute name
	 * @param value
	 *            attribute value
	 */
	public static native void setyouplayparam(String attr, JavaScriptObject value)/*-{
		$wnd.C.setyouplayparam(attr, value);
	}-*/;

	interface IMapDimension {
		int rows();

		int cols();
	}

	private static IMapDimension getDimensions() {
		JSONArray a = getMap();
		int arows = a.size();
		int acols = a.get(0).isArray().size();
		return new IMapDimension() {

			@Override
			public int rows() {
				return arows;
			}

			@Override
			public int cols() {
				return acols;
			}

		};

	}

	private static void addC(JSONValue o) {
		String civ = o.isObject().get("civ").isString().stringValue();
		civs.add(civ.toLowerCase());
	}

	private static void buildCivs() {
		civs.clear();
		JSONObject oo = board.get("board").isObject();
		addC(oo.get("you"));
		JSONArray other = (JSONArray) oo.get("others");
		for (int i = 0; i < other.size(); i++)
			addC(other.get(i));
	}

	/**
	 * Trigger map generation
	 */
	public static void startMap() {
		call(GreetingService.GETBOARD, civtoken, js -> {
			// hide civ-choose
			showcivorgames(0);
			// display map
			JSONValue j = JSONParser.parseStrict(js);
			board = j.isObject();
			buildCivs();
			// map dimension
			IMapDimension d = getDimensions();
			Element fe = findContent(CIVMAP);
			fe.removeAttribute("hidden");
			fe.setAttribute("rownumb", "" + d.rows());
			fe.setAttribute("colnumb", "" + d.cols());
			redrawheader();
			// there is a delay until map is available
			t.schedule(100);
			showelem(GAMEMENU, true);
		});
	}

	/**
	 * Trigger buttons refreshing, panel outside map
	 */
	private static void redrawheader() {
		setjsboard(board.getJavaScriptObject());
	}

	private static Timer trefresh = new Timer() {

		@Override
		public void run() {
			if (civtoken == null) {
				cancel();
				return;
			}
			rereadMap();
		}

	};

	private static void startGame(String token, T t) {
		civtoken = token;
		gamet = t;
		showelem(STARTMENU, false);
		startMap();
	}

	/**
	 * Wrapper for command to register the game
	 * 
	 * @param civs
	 *            Civilization
	 */
	public static void chooseCiv(String civs) {
		civ = civs;
		call(GreetingService.REGISTEROWNER, civs, token -> startGame(token, T.TRANINGGAME));
	}

	/**
	 * Adjust row attribute from screen element to row in the map
	 * 
	 * @param row
	 *            row attribute value
	 * @return row of the square in the map
	 */
	public static int fixrow(int row) {
		if (row == -1)
			return -1;
		if (gamet.opposite())
			return row;
		IMapDimension d = getDimensions();
		return d.rows() - 1 - row;
	}

	/**
	 * Adjust column attribute
	 * 
	 * @param col
	 *            col attribute
	 * @return adjusted
	 */
	public static int fixcol(int col) {
		if (col == -1)
			return -1;
		if (!gamet.opposite())
			return col;
		IMapDimension d = getDimensions();
		return d.cols() - 1 - col;
	}

	/**
	 * Get square data Important: position, row and column represents postion in the
	 * map, row attribute should be adjusted
	 * 
	 * @param row
	 *            row position in the map
	 * @param col
	 *            column position in the map
	 * @return map sqaure, JSON object
	 */
	public static JavaScriptObject getSquare(int row, int col) {
		JSONArray a = getMap();
		JSONObject o = a.get(row).isArray().get(col).isObject();
		return o.getJavaScriptObject();
	}

	/**
	 * Current civilization
	 * 
	 * @return cilization
	 */
	public static String getCiv() {
		return civ;
	}

	/**
	 * Convert JSON object to string, recognized the string
	 * 
	 * @param param
	 *            JSON object
	 * @return string
	 */

	private static String jsParamtoS(Object param) {
		if (param == null)
			return null;
		if (param instanceof String)
			return "\"" + (String) param + "\"";
		if (param instanceof Double)
			return ((Double) param).toString();
		JSONObject o = new JSONObject((JavaScriptObject) param);
		return o.isObject().toString();
	}

	/**
	 * Wrapper around command execution, reflects command format
	 * 
	 * @param s
	 *            command
	 * @param row
	 *            row values
	 * @param col
	 *            column value
	 * @param param
	 *            parameter as JSON object
	 */
	public static void executeCommand(String s, int row, int col, JavaScriptObject param) {
		String pa = jsParamtoS(param);
		execute(s, row, col, pa);
	}

	public static void executeCommandS(String s, int row, int col, String param) {
		String pa = jsParamtoS(param);
		execute(s, row, col, pa);
	}

	public static void executeCommandN(String s, int row, int col, Double param) {
		String pa = jsParamtoS(param);
		execute(s, row, col, pa);
	}

	public static native void consoleLog(String message) /*-{
		$wnd.C.log("UI:" + message);
	}-*/;

	public static native void commandfailure(String message)/*-{
		$wnd.C.dialogexecutefailure(message);
	}-*/;

	public static native void log(String message)/*-{
		$wnd.C.log(message);
	}-*/;

	public static native void showelem(String id, boolean show)/*-{
		$wnd.C.showelem(id, show);
	}-*/;

	public static native void showcivorgames(int what)/*-{
		$wnd.C.showcivorgames(what);
	}-*/;

	public static native void closejoindialog()/*-{
		$wnd.C.closejoindialog();
	}-*/;

	public static native void setjsboard(JavaScriptObject board) /*-{
		$wnd.C.setjsboard(board);
	}-*/;

	public static native void setresources(JavaScriptObject rese) /*-{
		$wnd.C.setresources(rese);

	}-*/;

	public static native void highlightSquare(JavaScriptObject o, boolean highlight) /*-{
		$wnd.C.highlightSquare(o, highlight);
	}-*/;

	public static native void cleanCommand() /*-{
		$wnd.C.clearCommand();
	}-*/;

	/**
	 * Wrapper for server itemize command, Sets itemizedcommand attribute in x-app
	 * 
	 * @param command
	 *            to itemized
	 */
	public static void itemizecommand(String command) {
		greetingService.itemizeCommand(civtoken, command, new AsyncBack() {

			@Override
			public void onSuccess(String result) {
				if (result == null)
					setyouplayparam("itemizedcommand", null);
				else {
					JSONValue js = JSONParser.parseLenient(result);
					if (js.isArray() != null)
						setyouplayparam("itemizedcommand", js.isArray().getJavaScriptObject());
					else
						setyouplayparam("itemizedcommand", js.isObject().getJavaScriptObject());
				}
			}
		});

	}

	private static Element getxApp() {
		Element e = RootPanel.getBodyElement();
		NodeList<Element> n = e.getElementsByTagName("x-app");
		Element ee = n.getItem(0);
		// shadow DOM
		Object ss = ee.getPropertyObject("shadowRoot");
		return (Element) ss;
	}

	public static void resumeGame(int gameid, String cov) {
		greetingService.resumeGame(gameid, cov, new AsyncBack() {
			@Override
			public void onSuccess(String result) {
				startGame(result, T.TRANINGGAME);
			}
		});
	}

	public static class TWaitShadow extends Timer {

		@Override
		public void run() {
			if (getxApp() != null) {
				showelem(STARTMENU, true);
				showelem(GAMEMENU, false);
				setjsboard(null);
				Element fe = findContent(CIVMAP);
				fe.setAttribute("hidden", "true");
				showcivorgames(1);
				this.cancel();
			}
		}
	}

	private static void greetingMenu() {
		trefresh.cancel();
		civtoken = null;
		call(GreetingService.LISTOFRES, null, s -> setListOfCiv(s));
		new TWaitShadow().scheduleRepeating(1000);
	}

	public static void stopRefresh() {
		consoleLog("stop Refresh");
		trefresh.cancel();
	}

	public static void leaveGame() {
		trefresh.cancel();
		clearMap();
		call(GreetingService.UNREGISTERTOKEN, civtoken, p -> greetingMenu());
	}

	public static void unregisterToken() {
		call(GreetingService.UNREGISTERTOKEN, civtoken, p -> {
			civtoken = null;
			if (twait != null) {
				twait.cancel();
				twait = null;
			}
		});
	}

	private static TWait twait = null;

	public static class TWait extends Timer {

		private final String token;

		TWait(String token) {
			this.token = token;
		}

		@Override
		public void run() {
			greetingService.allPlayersReady(token, new AsyncBackBoolean() {

				@Override
				public void onSuccess(Boolean result) {
					if (result) {
						closejoindialog();
						startGame(token, T.STARTTWOPLAYERGAME);
						cancel();
					}
				}
			});
		}

	};

	public static void registerTwoPlayersGame(String civ1, String civ2) {
		call(GreetingService.TWOPLAYERSGAME, civ1 + "," + civ2, s -> {
			// every half a second
			twait = new TWait(s);
			twait.scheduleRepeating(500);
		});
	}

	public static void resumeTwoPlayersGame(int gameid, String civ) {
		greetingService.resumeGame(gameid, civ, new AsyncBack() {
			@Override
			public void onSuccess(String s) {
				// 2017/12/22
				// set it now to allow unregister in case of cancel
				// civtoken is set again by TWait when other player joins
				civtoken = s;
				twait = new TWait(s);
				twait.scheduleRepeating(500);
			}
		});
	}

	public static void joinGame(int gameid, String civ) {
		greetingService.joinGame(gameid, civ, new AsyncBack() {
			@Override
			public void onSuccess(String s) {
				startGame(s, T.JOINTWOPLAYERGAME);
			}
		});
	}

	public static int civToNumb(String civ) {
		for (int i = 0; i < civs.size(); i++) {
			String s = civs.get(i);
			if (s.equalsIgnoreCase(civ))
				if (gamet.opposite())
					return civs.size() - i - 1;
				else
					return i;
		}
		return -1;
	}

	/**
	 * Called at the beginning. Defines all GWT functions available from JS code
	 */
	public native void expose()/*-{

		$wnd.getciv = function(param) {
			return @com.civilization.ui.client.CIvilizationUI::getCiv(*)(param);
		}
		$wnd.chooseciv = function(param) {
			@com.civilization.ui.client.CIvilizationUI::chooseCiv(*)(param);
		}
		$wnd.getsquare = function(param1, param2) {
			return @com.civilization.ui.client.CIvilizationUI::getSquare(*)(param1,param2);
		}
		$wnd.executecommand = function(param1, param2, param3, param4) {
			@com.civilization.ui.client.CIvilizationUI::executeCommand(*)(param1,param2,param3,param4);
		}
		$wnd.executecommandS = function(param1, param2, param3, param4) {
			@com.civilization.ui.client.CIvilizationUI::executeCommandS(*)(param1,param2,param3,param4);
		}
		$wnd.executecommandN = function(param1, param2, param3, param4) {
			@com.civilization.ui.client.CIvilizationUI::executeCommandN(*)(param1,param2,param3,param4);
		}
		$wnd.itemizecommand = function(param1) {
			@com.civilization.ui.client.CIvilizationUI::itemizecommand(*)(param1);
		}
		$wnd.fixrow = function(param1) {
			return @com.civilization.ui.client.CIvilizationUI::fixrow(*)(param1)
		}
		$wnd.fixcol = function(param1) {
			return @com.civilization.ui.client.CIvilizationUI::fixcol(*)(param1)
		}
		$wnd.readgames = function() {
			return @com.civilization.ui.client.CIvilizationUI::readGames(*)()
		}
		$wnd.readcivs = function() {
			return @com.civilization.ui.client.CIvilizationUI::readCivs(*)()
		}
		$wnd.findbytag = function(param) {
			return @com.civilization.ui.client.CIvilizationUI::findContent(*)(param)
		}
		$wnd.datetos = function(param) {
			return @com.civilization.ui.client.CIvilizationUI::dateToS(*)(param)
		}
		$wnd.resumegame = function(param1, param2) {
			@com.civilization.ui.client.CIvilizationUI::resumeGame(*)(param1,param2)
		}
		$wnd.resumetwoplayersgame = function(param1, param2) {
			@com.civilization.ui.client.CIvilizationUI::resumeTwoPlayersGame(*)(param1,param2)
		}
		$wnd.leavegame = function() {
			@com.civilization.ui.client.CIvilizationUI::leaveGame(*)()
		}
		$wnd.stoprefresh = function() {
			@com.civilization.ui.client.CIvilizationUI::stopRefresh(*)()
		}
		$wnd.readjoingames = function() {
			@com.civilization.ui.client.CIvilizationUI::readJoinGames(*)()
		}
		$wnd.unregistertoken = function() {
			@com.civilization.ui.client.CIvilizationUI::unregisterToken(*)()
		}
		$wnd.twoplayersgame = function(civ1, civ2) {
			@com.civilization.ui.client.CIvilizationUI::registerTwoPlayersGame(*)(civ1,civ2)
		}
		$wnd.joingame = function(gameid, civ) {
			@com.civilization.ui.client.CIvilizationUI::joinGame(*)(gameid,civ)
		}
		$wnd.civtonumb = function(civ) {
			return @com.civilization.ui.client.CIvilizationUI::civToNumb(*)(civ)
		}

		$wnd.highlightMap = function(a, highlight) {
			return @com.civilization.ui.client.CIvilizationUI::highlightMap(*)(a,highlight)
		}

	}-*/;

	/**
	 * Look for Element by tagName
	 * 
	 * @param n
	 *            Node to start
	 * @param tagName
	 *            tag name to search for
	 * @return ELement found
	 */
	static Element findelem(Node n, String tagName) {
		if (n.getNodeType() == Node.ELEMENT_NODE) {
			Element e = (Element) n;
			String tName = e.getTagName();
			if (tName.equals(tagName.toUpperCase()))
				return e;
		}
		for (int i = 0; i < n.getChildCount(); i++) {
			Element ee = findelem(n.getChild(i), tagName);
			if (ee != null)
				return ee;
		}
		return null;
	}

	public void onModuleLoad() {
		expose();
		greetingMenu();
	}

	public static void readGames() {
		call(GreetingService.GETGAMES, null, s -> setListOfGames(s));
	}

	public static void readJoinGames() {
		call(GreetingService.WAITINGGAMES, null, s -> setListOfJoinGames(s));
	}

	public static void readCivs() {
		call(GreetingService.LISTOFRES, null, s -> setListOfCiv(s));

	}

	/**
	 * Find element in x-app by tag name
	 * 
	 * @param tagName
	 * @return Element found
	 */
	public static Element findContent(String tagName) {
		Node ss = getxApp();
		Element fe = findelem((Node) ss, tagName);
		return fe;
	}

	private static Element findcivContent() {
		return findContent("civ-content");
	}

	// ---------------------------------
	// walk through DOM elements
	// ---------------------------------
	private static void walkforTag(Node n, String tagname, Consumer<Element> proc) {
		if (n.getNodeType() == Node.ELEMENT_NODE) {
			Element e = (Element) n;
			String tName = e.getTagName();
			if (tName.equals(tagname.toUpperCase()))
				proc.accept(e);
		}
		for (int i = 0; i < n.getChildCount(); i++)
			walkforTag(n.getChild(i), tagname, proc);
	}

	private static void walkTag(String tagname, Consumer<Element> proc) {
		Node ss1 = getxApp();
		walkforTag(ss1, tagname, proc);
	}

	// ----------------------------------------

	/**
	 * Set listofciv attribute
	 * 
	 * @param listofciv
	 *            List of civ value
	 */
	private static void setListOfCiv(String listofciv) {
		Element fe = findcivContent();
		JSONValue j = JSONParser.parseStrict(listofciv);
		setresources(j.isObject().getJavaScriptObject());
		fe.setAttribute("datas", listofciv);
	}

	private static void setListOfGames(String listofgames) {
		Element fe = findContent("civ-games");
		fe.setAttribute("listofgames", listofgames);
	}

	private static void setListOfJoinGames(String listofjoins) {
		Element fe = findContent("civ-join");
		fe.setAttribute("listofjoins", listofjoins);
	}

	// common failure handling
	abstract static class AsyncBack implements AsyncCallback<String> {

		@Override
		public void onFailure(Throwable caught) {
			commandfailure(caught.toString() + " Check server logs");
		}
	}

	abstract static class AsyncBackBoolean implements AsyncCallback<Boolean> {

		@Override
		public void onFailure(Throwable caught) {
			commandfailure(caught.toString() + " Check server logs");
		}
	}

	// getCivData wrapper
	public static void call(int what, String param, Consumer<String> goforward) {
		greetingService.getCivData(what, param, new AsyncBack() {

			@Override
			public void onSuccess(String result) {
				goforward.accept(result);
			}
		});
	}

	public static void execute(String action, int row, int col, String param) {
		greetingService.executeCommand(civtoken, action, row, col, param, new AsyncBack() {

			@Override
			public void onSuccess(String result) {
				if (result != null) {
					commandfailure(result);
					return;
				}
				rereadMap();
				cleanCommand();
			}
		});
	}

}
