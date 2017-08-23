package com.civilization.ui.server;

import com.civilization.ui.client.GreetingService;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

/**
 * The server-side implementation of the RPC service.
 */
import civilization.I;

/**
 * The server-side implementation of the RPC service.
 */
@SuppressWarnings("serial")
public class GreetingServiceImpl extends RemoteServiceServlet implements GreetingService {


	@Override
	public String getCivData(int what, String param) {
		int w = -1;
		switch (what) {
		case LISTOFCIV:
			w = I.LISTOFCIV();
			break;
		case REGISTEROWNER:
			w = I.REGISTEROWNER();
			break;
		case GETBOARD:
			w = I.GETBOARDGAME();
			break;
		}
		return I.getData(w, param);
	}

	@Override
	public String executeCommand(String token, String action, int row, int col, String jsparam) {
		System.out.println(action + " row: " + row + " col:" + col + " " + jsparam);
		String res = I.executeCommand(token, action, row, col, jsparam);
		System.out.println("res=" + res);
		return res;
	}

	@Override
	public String itemizeCommand(String token, String command) {
		return I.itemizeCommand(token, command);
	}
}

