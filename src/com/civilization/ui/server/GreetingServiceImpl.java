package com.civilization.ui.server;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.civilization.ui.client.GreetingService;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

/**
 * The server-side implementation of the RPC service.
 */
import civilization.II;
import civilization.RR;

/**
 * The server-side implementation of the RPC service.
 */
@SuppressWarnings("serial")
public class GreetingServiceImpl extends RemoteServiceServlet implements GreetingService {

	private final static String REDIS_URL = "REDIS_URL";

	private void setRedis() {

		// Heroku
		if (System.getenv().containsKey(REDIS_URL)) {
			String val = System.getenv().get(REDIS_URL);
			RR.setConnection(val);
		} else {

			InitialContext context;
			try {
				context = new InitialContext();
				Context xmlNode = (Context) context.lookup("java:comp/env");
				Integer port = (Integer) xmlNode.lookup("redisport");
				String host = (String) xmlNode.lookup("redishost");
				RR.setConnection(host, port,0);
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		II.setR(RR.RA());

	}

	@Override
	public String getCivData(int what, String param) {
		int w = -1;
		setRedis();
		switch (what) {
		case LISTOFCIV:
			w = II.LISTOFCIV();
			break;
		case REGISTEROWNER:
			w = II.REGISTEROWNER();
			break;
		case GETBOARD:
			w = II.GETBOARDGAME();
			break;
		}
		return II.getData(w, param);
	}

	@Override
	public String executeCommand(String token, String action, int row, int col, String jsparam) {
		setRedis();
		System.out.println(action + " row: " + row + " col:" + col + " " + jsparam);
		String res = II.executeCommand(token, action, row, col, jsparam);
		System.out.println("res=" + res);
		return res;
	}

	@Override
	public String itemizeCommand(String token, String command) {
		setRedis();
		return II.itemizeCommand(token, command);
	}
}
