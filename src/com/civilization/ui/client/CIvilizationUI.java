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

import java.util.Date;
import java.util.function.Consumer;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.JavaScriptObject;
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

	private final static String CIVMAP = "civ-map";
	private final static String GAMEMENU = "gamemenu";
	private final static String STARTMENU = "startmenu";

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
			String s = o.toString();
			e.setAttribute("jsdata", s);
			n.ok = true;
		});
		return n.ok;
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
			if (refreshMap())
				cancel();
		}

	};

	// ===========================================

	/**
	 * Read Map again from server
	 */
	public static void rereadMap() {
		call(GreetingService.GETBOARD, civtoken, js -> {
			// change to JSON object
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
	public static native void setxappattribute(String attr, String value)/*-{
		$wnd.C.setxappparam(attr, value);
	}-*/;
	
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
			// map dimension
			JSONArray a = getMap();
			int rows = a.size();
			int cols = a.get(0).isArray().size();
			Element fe = findContent(CIVMAP);
			fe.removeAttribute("hidden");
			fe.setAttribute("rownumb", "" + rows);
			fe.setAttribute("colnumb", "" + cols);
			redrawheader();
			// there is a delay until map is available
			t.schedule(100);
			showelem(GAMEMENU, true);
		});
	}

	/**
	 * Clean current command attribute
	 */
	private static void cleanCommand() {
		setxappattribute("currentcommand", "");
	}

	/**
	 * Trigger buttons refreshin, panel outside map
	 */
	private static void redrawheader() {
		setxappattribute("jsboard", board.toString());

	}

	private static void startGame(String token) {
		civtoken = token;
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
		call(GreetingService.REGISTEROWNER, civs, token -> startGame(token));
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
		JSONArray a = getMap();
		return a.size() - 1 - row;
	}

	/**
	 * Adjust column attribute
	 * 
	 * @param col
	 *            col attribute
	 * @return adjusted
	 */
	public static int fixcol(int col) {
		return col;
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
	 * @return stirng
	 */
	private static String jsParamtoS(Object param) {
		if (param == null)
			return null;
		if (param instanceof String)
			return "\"" + (String) param + "\"";
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
				setxappattribute("itemizedcommand", result);
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
				startGame(result);
			}
		});
	}

	private static void greetingMenu() {
		civtoken = null;
		call(GreetingService.LISTOFCIV, null, s -> setListOfCiv(s));
		showelem(STARTMENU, true);
		showelem(GAMEMENU, false);
		setxappattribute("jsboard", "");
		Element fe = findContent(CIVMAP);
		fe.setAttribute("hidden","true");
		showcivorgames(1);
   }

	public static void leaveGame() {
		call(GreetingService.UNREGISTERTOKEN, civtoken, p -> greetingMenu());
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
		$wnd.leavegame = function() {
			@com.civilization.ui.client.CIvilizationUI::leaveGame(*)()
		}
		$wnd.readjoingames = function() {
			@com.civilization.ui.client.CIvilizationUI::readJoinGames(*)()
		}
		// readJoinGames()

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
		call(GreetingService.LISTOFCIV, null, s -> setListOfCiv(s));

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
		fe.setAttribute("listofciv", listofciv);
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
