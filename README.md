# CivilizationUI

## Introduction

The purpose of this project is to develop the implementation of Civilization The Board Game [https://www.fantasyflightgames.com/en/products/civilization/].

The project consists of two subprojects: CivilizationEngine back end [https://github.com/stanislawbartkowski/CivilizationEngine] and user interface front end.

At this stage, it is only the beginning. A few basic features are implemented and the user interface is purely functional and very rude.
Demo version is deployed to Heroku [https://civilizationboardgame.herokuapp.com/]. It is a free quota and please wait a moment until container/dyno is activated.

## Interface description

Only single player training game is implemented. The first screen allows to choose civilization you want to play and the second is the game itself.

Civilization selection.
 ![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-08-26%2011-25-09.png)
 
 Game board
 ![](https://github.com/stanislawbartkowski/CivilizationEngine/blob/master/screenshots/Zrzut%20ekranu%20z%202017-08-26%2011-28-05.png)
 The left panel contains status information and user options available at this stage of the command. In order to play the command, the user has to click the option in the left panel (now "Capital" only ) and click the square where the capital is supposed to be built. After the command is executed, the play board is refreshed and next options are activated. After building the capital, there are "Set up Army", "Set up Scout" and "EnfOfPhase". When all options available at the given game stage are executed, the player has to click "EnfOfPhase" button to push the game to the next phase or activate the next player.
So far only the following actions are implemented:
* Set Capital (at the beginning only)
* Set up Army (at the beginning only)
* Set up Scout (at the beginning only)
* Buy Army (City Managementy)
* Buy Scout (City Management)
* Move figure (Movement)
* Reveal tile (Movement)
* Set up City (StartOfTurn)

## Figure movement

* StartMove: click the square where the figure is standing. Starting from this moment no more actions are possible until figure movement is completed. Next step is to move the figure or reveal the tile if possible.
* ContinueMove : click the next square where you want to move the figure
* RevealTile: if the figure is standing close to hidden tile, touch the figure again and adjacent tile is revealed
* ContinueMove/EndOfMove: you can move the figure to the next square or complete the move. If player speed limit is exhausted (speed limit is 2 and figure has moved 2 squares already), only EnfOfMove option is active
* When figure movement is completed, other options are activated again. You can touch next figure or click EndOfPhase.

## Action validation

The program controls if actions are conducted according to game rules. For instance, you cannot set up figure on the water. Just now an alert dialog pops up and the action is blocked. In the future version, more user-friendly actions will be implemented. For instance: after triggering the figure movement, squares, where figure can be positioned, will be highlighted.

# Import Eclipse project from GutHub

## Prerequsities

* Tested with Eclipse Oxygen
* GWT Eclipse Plugin 3.0.0
* GWT 2.8.1

## User interface implementation
User interface is implemented with the help of Polymer [https://www.polymer-project.org/]. All necessary components are downloaded together with the project in war/bower_components/ directory. war/bower.json file importing all required dependencies is available as well.
GWT [http://www.gwtproject.org/] is used as intermediary between the interface and back end Civilization Engine. The usage of GWT is very limited and may be it will be removed in the future.

## Import

Eclipse -> File -> Import -> Git -> Projects from Git

* URI: https://github.com/stanislawbartkowski/CivilizationUI
* Host: github
* Repository path: /stanislawbartkowski/CivilizationUI

Choose : Import existing Eclipse Project

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-08-24%2021-32-50.png)

Important:
Immediately after the import lack of gwt-servlet.jar is reported. Just go to Markers -> Error and Right Click + Quick Fix.

# Create war from command line

## Create
 * git clone https://github.com/stanislawbartkowski/CivilizationUI.git
 * cd CivilizationUI
 * optional: synchronize with Civilization Engine (look below)
 * ant
 * ls target/civilization.war
 
## Deploy to Tomcat 
War file can be deployed to Tomcat container. It does not require any additional dependency nor configuration.

## Run on Heroku web-runner

 java -jar webapp-runner.jar target/civilization.war
 
 ## Deploy to Heroku
 
 heroku war:deploy target/civilization.war -a {application name}

# Synchronize with CivilizationEngine

Every release of CivilizationUI comes with the latest version of CivilizationEngine. But it is possible to synchronize with the Engine manually if necessary:
* Go to [https://github.com/stanislawbartkowski/CivilizationEngine] and prepare target .jar using instruction provided
* Copy {CivilizationEngine home}/out/artifacts/CivilizationEngine/CivilizationEngine.jar war/WEB-INF/lib/CivilizationEngine.jar 
* Copy {CivlizationEngine home}/src/main/resources/* war/WEB-INF/classes
* Important: Copy directories: map messages and objects, do not copy resources directory itself.


 

