package com.civilization.ui.server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DownloadServlet
 */
@WebServlet("/downloadgame")
public class DownloadServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String gameid = req.getParameter("id");
		String game = GreetingServiceImpl.getGame(Integer.parseInt(gameid));

		int BUFFER = 1024 * 100;
		resp.setContentType("application/json");
		resp.setHeader("Content-Disposition:", "attachment;filename=" + "\"game-" + gameid + ".json\"");
		ServletOutputStream outputStream = resp.getOutputStream();
		resp.setContentLength(game.getBytes().length);
		resp.setBufferSize(BUFFER);
		outputStream.print(game);
		outputStream.close();
	}
}
