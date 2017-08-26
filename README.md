# CivilizationUI

## Introduction

The purpose of this project is to develop the implementation of Civilization The Board Game [https://www.fantasyflightgames.com/en/products/civilization/].
The project consists of two subprojects: CivilizationEngine back end [https://github.com/stanislawbartkowski/CivilizationEngine] and user interface front end.
At this stage, it is only the beginning. A few basic features are implemented and user interface is pure functional and very rude.
Demo version is deployed to Heroku [https://civilizationboardgame.herokuapp.com/]. It is a free quota and please wait a moment until container/dyno is activated.

## Interface description

Only single player training game is implemented. First screen allows to choose civilization you want to play and the second is the game itself.

Civilization selection.
 ![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-08-26%2011-25-09.png)
 
 Game board
 ![](https://github.com/stanislawbartkowski/CivilizationEngine/blob/master/screenshots/Zrzut%20ekranu%20z%202017-08-26%2011-28-05.png)
 The left panel contains status information and user options available at this stage of the command. In order to play the command, the user has to click the option in the left panel (now "Capital" only ) and click the square where the capital is supposed to be build. After command is executed, the play board is refreshed and next options are activated. After bulding the capital, there are "Set up Army", "Set up Scout" and "EnfOfPhase". When all options available at the given game stage are executed, the player has to click "EnfOfPhase" button to push game to the next phase or activate the next player.
So far only the following actions are implemented:
* Set Capital (at the beginning only)
* Set up Army (at the beginning only)
* Set up Scout (at the beginning only)
* Buy Army (City Managementy)
* Buy Scout (City Management)
* Move figure (Movement)
* Reveal tile (Movement)
* Set up City (StartOfTurn)



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


 

