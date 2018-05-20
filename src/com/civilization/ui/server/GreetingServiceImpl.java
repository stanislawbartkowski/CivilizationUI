package com.civilization.ui.server;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

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
@SuppressWarnings("serial")
public class GreetingServiceImpl extends RemoteServiceServlet implements GreetingService {

	private final static String REDIS_URL = "REDIS_URL";
	private static boolean logged = false;
	
	private static final IC II = civilization.II.factory.Factory$.MODULE$.getI();
	private static final RAccess RA = civilization.II.factory.Factory$.MODULE$.getR();

	private void setRedis() {

		// Heroku
		if (System.getenv().containsKey(REDIS_URL)) {
			String val = System.getenv().get(REDIS_URL);
			if (!logged) System.out.println("Connecting to:" + val);
			RA.getConn().setConnection(val);
		} else {

			InitialContext context;
			try {
				context = new InitialContext();
				Context xmlNode = (Context) context.lookup("java:comp/env");
				Integer port = (Integer) xmlNode.lookup("redisport");
				String host = (String) xmlNode.lookup("redishost");
				if (!logged) System.out.println("Connecting to redis host:" + host + " port:" + port);
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

	@Override
	public String getCivData(int what, String param) {
		int w = -1;
		setRedis();
		System.out.println("getCivData " + what);
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
		}
		return II.getData(w, param, null);
	}

	@Override
	public String executeCommand(String token, String action, int row, int col, String jsparam) {
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
	public String itemizeCommand(String token, String command) {
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
	public boolean allPlayersReady(String token) {
		return II.allPlayersReady(token);
	}

	@Override
	public String joinGame(int gameid, String civ) {
		System.out.println("Join game: " + civ + " " + gameid);
		return II.joinGame(gameid, civ);
	}

}
