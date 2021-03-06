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

import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.user.client.rpc.RemoteServiceRelativePath;

/**
 * The client-side stub for the RPC service.
 */
@RemoteServiceRelativePath("greet")
public interface GreetingService extends RemoteService {

	int LISTOFRES = 0;
	int REGISTEROWNER = 1;
	int GETBOARD = 2;
	int GETGAMES = 3;
	int UNREGISTERTOKEN = 4;
	int WAITINGGAMES = 5;
	int TWOPLAYERSGAME = 6;
	int GETJOURNAL = 7;
	int TWOPLAYERSGAMEWITHAUTOM = 8;
	int SINGLEGAMEWITHAUTOM = 9;

	String getCivData(int what, String param);

	String executeCommand(String token, String action, int row, int col, String jsparam);

	String itemizeCommand(String token, String command);

	String resumeGame(int gameid, String civ);

	boolean allPlayersReady(String token);

	String joinGame(int gameid, String civ);

}