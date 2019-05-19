package com.civilization.ui.server;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

//import org.glassfish.jersey.media.multipart.FormDataParam;

import com.civilization.ui.client.GreetingService;
import com.google.common.base.Charsets;
import com.google.common.io.CharStreams;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

//import civilization.I.II;
//import civilization.RR;

import civilization.II.interfaces.IC;
import civilization.II.interfaces.RAccess;

/**
 * The server-side implementation of the RPC service.
 */

/**
 * The server-side implementation of the RPC service.
 */
@Path("/")
@SuppressWarnings("serial")
public class GreetingServiceImpl extends RemoteServiceServlet implements GreetingService {

	private final static String REDIS_URL = "REDIS_URL";
	private static boolean logged = false;

	private static final IC II = civilization.II.factory.Factory$.MODULE$.getI();
	private static final RAccess RA = civilization.II.factory.Factory$.MODULE$.getR();

	// if automation engine is ready
	private static boolean automready = false;

	// list if games waiting for automation
	private static List<String> waitinglist = new ArrayList<String>();
	
	private static Log L = LogFactory.getLog("com.civilization.ui.server");

	private void setRedis() {

		// Heroku
		if (System.getenv().containsKey(REDIS_URL)) {
			String val = System.getenv().get(REDIS_URL);
			if (!logged) L.info("Connecting to:" + val);
			RA.getConn().setConnection(val);
		} else {

			InitialContext context;
			try {
				context = new InitialContext();
				Context xmlNode = (Context) context.lookup("java:comp/env");
				Integer port = (Integer) xmlNode.lookup("redisport");
				String host = (String) xmlNode.lookup("redishost");
				if (!logged)
					L.info("Connecting to redis host:" + host + " port:" + port);
				RA.getConn().setConnection(host, port, 0);
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				L.fatal(e);
				throw new RuntimeException(e);
			}
			logged = true;
		}

		II.setR(RA);

	}

	private String extractAutomatedToken(String s) {
		if (!automready)
			throw new RuntimeException("Cannot run automated player, not registered");
		String a[] = s.split(",");
		// insert at the beginning
		waitinglist.add(a[1]);
		return a[0];
	}
	
	private String extractToken(String s) {
		String a[] = s.split(",");
		return a[0];		
	}

	private String toS(InputStream i) {
		String result;
		try {
			result = CharStreams.toString(new InputStreamReader(i, Charsets.UTF_8));
			return result;
		} catch (IOException e) {
			L.fatal(e);
			return null;
		}
	}

	@Override
	@GET
	@Path("civdata")
	@Produces("text/json")
	public String getCivData(@QueryParam("what") int what, @QueryParam("param") String param) {
		int w = -1;
		setRedis();
		L.info("getCivData " + what);
		switch (what) {
		case LISTOFRES:
			w = II.LISTOFRES();
			break;
		case REGISTEROWNER:
			w = II.REGISTEROWNER();
			break;
		case GETBOARD:
			w = II.GETBOARDGAME();
			break;
		case GETGAMES:
			w = II.LISTOFGAMES();
			break;
		case UNREGISTERTOKEN:
			w = II.UNREGISTERTOKEN();
			break;
		case WAITINGGAMES:
			w = II.LISTOFWAITINGGAMES();
			break;
		case TWOPLAYERSGAME:
			w = II.REGISTEROWNERTWOGAME();
			break;
		case GETJOURNAL:
			w = II.GETJOURNAL();
			break;
		case TWOPLAYERSGAMEWITHAUTOM:
			return extractAutomatedToken(II.getData(II.REGISTEROWNERTWOGAME(), param, null));
		case SINGLEGAMEWITHAUTOM:
			// return token and gameid
			w = II.REGISTEROWNER();
			break;
		}
		String res =  II.getData(w, param, null);
		return res;
	}

	@Override
	@POST
	@Path("command")
	@Produces("text/plain")
	public String executeCommand(@QueryParam("token") String token, @QueryParam("action") String action,
			@QueryParam("row") int row, @QueryParam("col") int col, @QueryParam("jsparam") String jsparam) {
		setRedis();
		L.info(action + " row: " + row + " col:" + col + " " + jsparam);
		String res = null;
		// static synchronize
		// all are blocked
		synchronized (GreetingServiceImpl.class) {
			res = II.executeCommand(token, action, row, col, jsparam);
		}
		L.info("res=" + res);
		return res;
	}

	@Override
	@GET
	@Path("itemize")
	@Produces("text/json")
	public String itemizeCommand(@QueryParam("token") String token, @QueryParam("command") String command) {
		setRedis();
		return II.itemizeCommand(token, command);
	}

	@Override
	public String resumeGame(int gameid, String civ) {
		setRedis();
		L.info("Resume game: " + civ);
		String token = II.resumeGame(gameid, civ);
		return token;
	}

	@Override
	@GET
	@Path("allready")
	@Produces("text/plain")
	public boolean allPlayersReady(@QueryParam("token") String token) {
		L.info(token + " wait for players ");
		return II.allPlayersReady(extractToken(token));
	}

	@Override
	@POST
	@Path("joingame")
	@Produces("text/plain")
	public String joinGame(@QueryParam("gameid") int gameid, @QueryParam("civ") String civ) {
		L.info("Join game: " + civ + " " + gameid);
		return II.joinGame(gameid, civ);
	}

	@PUT
	@Path("registerautom")
	public void setRegisterAutom(@QueryParam("autom") boolean autom) {
		setRedis();
		L.info("Register autom engine " + autom);
		this.automready = autom;
	}

	@GET
	@Path("getwaiting")
	@Produces("text/plain")
	public String getWaitingGame() {
		if (waitinglist.isEmpty())
			return "";
		String gameid = waitinglist.get(0);
		waitinglist.remove(0);
		return gameid;
	}

	public static String getGame(int gameid) {
		return II.downloadGame(gameid);
	}

	@DELETE
	@Path("delete")
	@Produces("text/plain")
	public void deleteGame(@QueryParam("gameid") int gameid) {
		L.info("Delete game " + gameid);
		II.deleteGame(gameid);
	}

	@POST
	@Path("deploygame")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("text/plain")
	public String loadsinglegame(@QueryParam("civ") String civs, InputStream playStream) {
		setRedis();
		String board = toS(playStream);
		String res = II.readPlayerGameS(board, civs);
		return res;
	}

}
