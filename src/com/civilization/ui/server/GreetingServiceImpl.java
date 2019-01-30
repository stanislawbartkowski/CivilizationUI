package com.civilization.ui.server;

import java.util.ArrayList;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import com.civilization.ui.client.GreetingService;
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

	private void setRedis() {

		// Heroku
		if (System.getenv().containsKey(REDIS_URL)) {
			String val = System.getenv().get(REDIS_URL);
			if (!logged)
				System.out.println("Connecting to:" + val);
			RA.getConn().setConnection(val);
		} else {

			InitialContext context;
			try {
				context = new InitialContext();
				Context xmlNode = (Context) context.lookup("java:comp/env");
				Integer port = (Integer) xmlNode.lookup("redisport");
				String host = (String) xmlNode.lookup("redishost");
				if (!logged)
					System.out.println("Connecting to redis host:" + host + " port:" + port);
				RA.getConn().setConnection(host, port, 0);
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new RuntimeException(e);
			}
			logged = true;
		}

		II.setR(RA);

	}
	
	private String extractToken(String s) {
		return s.split(",")[0];
	}
	
	private String extractAutomatedToken(String s) {
		if (!automready) throw new RuntimeException("Cannot run automated player, not registered");
		String a[] = s.split(",");
		waitinglist.add(a[1]);
		return a[0];
		
	}

	@Override
	@GET
	@Path("civdata")
	@Produces("text/json")
	public String getCivData(@QueryParam("what") int what, @QueryParam("param") String param) {
		int w = -1;
		setRedis();
		System.out.println("getCivData " + what);
		switch (what) {
		case LISTOFRES:
			w = II.LISTOFRES();
			break;
		case REGISTEROWNER:
			return extractToken(II.getData(II.REGISTEROWNER(), param, null));
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
			return extractToken(II.getData(II.REGISTEROWNERTWOGAME(), param, null));
		case GETJOURNAL:
			w = II.GETJOURNAL();
			break;
		case TWOPLAYERSGAMEWITHAUTOM :
			return extractAutomatedToken(II.getData(II.REGISTEROWNERTWOGAME(), param, null));			
		}
		return II.getData(w, param, null);
	}

	@Override
	@POST
	@Path("commmand")
	@Produces("text/plain")
	public String executeCommand(@QueryParam("token") String token, @QueryParam("action") String action,
			@QueryParam("row") int row, @QueryParam("col") int col, @QueryParam("jsparam") String jsparam) {
		setRedis();
		System.out.println(action + " row: " + row + " col:" + col + " " + jsparam);
		String res = null;
		// static synchronize
		// all are blocked
		synchronized (GreetingServiceImpl.class) {
			res = II.executeCommand(token, action, row, col, jsparam);
		}
		System.out.println("res=" + res);
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
		System.out.println("Resume game: " + civ);
		String token = II.resumeGame(gameid, civ);
		return token;
	}

	@Override
	@GET
	@Path("allready")
	@Produces("text/plain")
	public boolean allPlayersReady(@QueryParam("token") String token) {
		return II.allPlayersReady(token);
	}

	@Override
	@POST
	@Path("joingame")
	@Produces("text/plain")
	public String joinGame(@QueryParam("gameid") int gameid, @QueryParam("civ") String civ) {
		System.out.println("Join game: " + civ + " " + gameid);
		return II.joinGame(gameid, civ);
	}
	
	@PUT
	@Path("registerautom")
	public void setRegisterAutom(@QueryParam("autom") boolean autom) {
		System.out.println("Register autom engine " + autom);
		this.automready = autom;
	}
	
	@GET
	@Path("getwaiting")
	@Produces("text/plain")
	public String getWaitingGame() {
		if (waitinglist.isEmpty()) return "";
		String gameid = waitinglist.get(0);
		waitinglist.remove(0);
		return gameid;
	}

		

}
