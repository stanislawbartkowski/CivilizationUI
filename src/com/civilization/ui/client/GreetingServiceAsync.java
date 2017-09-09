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

import com.google.gwt.user.client.rpc.AsyncCallback;

/**
 * The async counterpart of <code>GreetingService</code>.
 */
public interface GreetingServiceAsync {
	
	void getCivData(int what, String param, AsyncCallback<String> callback);		

	void executeCommand(String token, String action, int row, int col, String jsparam, AsyncCallback<String> callback);

	void itemizeCommand(String token, String command, AsyncCallback<String> callback);

	void resumeGame(int gameid, String civ,AsyncCallback<String> callback);

	void allPlayersReady(String token, AsyncCallback<Boolean> callback);

	void joinGame(int gameid, String civ, AsyncCallback<String> callback);
	
}
