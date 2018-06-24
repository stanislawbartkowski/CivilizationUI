# CivilizationUI

## Introduction

The purpose of this project is to develop the implementation of Civilization The Board Game https://www.fantasyflightgames.com/en/products/civilization/.

The project consists of two subprojects: CivilizationEngine back end https://github.com/stanislawbartkowski/CivilizationEngine and user interface front end.

At this stage, it is only the beginning. A few basic features are implemented and the user interface is purely functional and very rude.
Demo version is deployed to Heroku https://civilizationboardgame.herokuapp.com/. It is a free quota and please wait a moment until container/dyno is activated.

## History

## 2018/06/24 : new version deployed
https://hoteljavaopensource.blogspot.com/2018/06/civilization-board-game-next-version_24.html

Features implemented
* Some civilizations features implemented: America, China, Egypt, Germany, Rome and Russia
* Upgrade from Polymer 2 to Polymer 3

## 2018/06/02: new version deployed
https://hoteljavaopensource.blogspot.com/2018/06/civilization-board-game-next-version.html

Features implemented
* Culture Events Cards (actions not implemented yet)
* Great Persons (actions not implemented)

## 2018/05/03: new version deployed
https://hoteljavaopensource.blogspot.com/2018/05/civilization-board-game-next-version.html

Features implemented:
* Culture track
* Spend culture tokens to advance a culture level
* Devout city to arts
* MetalWorking
* Code Of Laws
* Currency
* Irrigation
* Navigation

## 2018/04/05: new version deployed
http://hoteljavaopensource.blogspot.de/2018/04/introduction-i-deployed-new-version-of.html

Fixed:
https://github.com/stanislawbartkowski/CivilizationUI/issues/8

New feaures
* Gain coin by using Pottery technology
* Economic progress

## 2018/03/21: new version deployed
https://hoteljavaopensource.blogspot.de/2018/03/civilization-board-game-next-version.html

New feature
* Wonder of The World

## 2018/02/25 : new version deployed
https://hoteljavaopensource.blogspot.com/2018/02/civilization-board-game-next-version.html

New features

* Buildings.

Fixes
* Resources are displayed sometimes wrongly: https://github.com/stanislawbartkowski/CivilizationUI/issues/7
* Technology tree improved.

## 2018/01/05 : new version deployed
* Greeting window more descriptive
* Building up technology tree

https://hoteljavaopensource.blogspot.com/2018/01/civilization-board-game-next-version.html

### 2017/12/29 : new version deployed
* "Start of turn" passed from one player to another : https://github.com/stanislawbartkowski/CivilizationUI/issues/15
* "Research" phase can be conducted in parallel :  https://github.com/stanislawbartkowski/CivilizationUI/issues/14
* Cannot build a capital on home tile of another player: https://github.com/stanislawbartkowski/CivilizationUI/issues/13
* "Start of turn" players can build cities in turn, not at the same time : https://github.com/stanislawbartkowski/CivilizationUI/issues/10
* Trade cannot exceed 27 treshold : https://github.com/stanislawbartkowski/CivilizationUI/issues/6
* "End of move" when speed level hit : https://github.com/stanislawbartkowski/CivilizationUI/issues/5
* Reveal the hidden tile without clicking the figure : https://github.com/stanislawbartkowski/CivilizationUI/issues/4
* Automatic "end of phase" when no more actions available : https://github.com/stanislawbartkowski/CivilizationUI/issues/3
* Two players game on Heroku is running more smoothly : https://github.com/stanislawbartkowski/CivilizationUI/issues/12

### 2017/12/27 : new version deployed

* Explore the hust
* Take over the village
* Fight between two players
* Improvements

https://hoteljavaopensource.blogspot.com/2017/12/next-version-of-civilization-board-game.html

### 2017/10/28: new version deployed

* spending trade to buy production
* player can buy units
* scout can send production to city

http://hoteljavaopensource.blogspot.com/2017/10/next-version-of-civilization-board-game.html

### 2017/09/27 : new version deployed
* new interface,  more user friendly
* two players game, opponent player desk visible

https://hoteljavaopensource.blogspot.com/2017/09/next-version-of-civilization-board-game_26.html

### 2017/09/23 : new version deployed
* Game progress saved in persistent storage
* Game resume
* Two players game
* Leave the game

https://hoteljavaopensource.blogspot.com/2017/09/introduction-i-deployed-next-version-of.html

### 2017/08/27 : first draft

## Game progress saved

The game progress is saved in persistent memory. This process is done in the background in transparent way. Game is stored in ![redis](https://redis.io/images/redis-white.png) key/value database. 

## Game resume

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-23%2010-16-02.png)

Just click the game you want to resume and you will be transported into the middle of the battle.

You can also resume two player game but you need an opponent to continue.

## Two players game

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-23%2010-20-16.png)

Two options are available:
* Training, just to click and beat the bush around
* Two players game, you need an opponent

Choose the civilization you want to play againt.

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-23%2010-25-10.png)

Wait for your contester.

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-23%2010-27-14.png)

## Joining the game

Choose the game you want to join

![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-23%2010-30-27.png)

And you, together with your opponent, are transported into the middle of the action.

## Leaving the game

Tap the close icon in the upper right corner of the board and you can call it a day.

Important: 
The game is stored constantly in the background. So even if you abruptly close the browser you can resume the game later being at the same stage. But by leaving the game legally, you remove the game from the list of active games. "Active game" status is closed automatically after 24 hours of inactivity.

## Interface description

 Game board
 
 ### One player training game
 
 ![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-26%2023-35-20.png)
 
 
 ### Two players game
 
 ![](https://github.com/stanislawbartkowski/CivilizationUI/blob/master/screenshots/Zrzut%20ekranu%20z%202017-09-26%2023-44-10.png)
 
 The left panel contains status information and user options available at this stage of the command. In order to play the command, the user has to click the option in the left panel (now "Capital" only ) and click the square where the capital is supposed to be built. After the command is executed, the play board is refreshed and next options are activated. After building the capital, there are "Set up Army", "Set up Scout" and "EnfOfPhase". When all options available at the given game stage are executed, the player has to click "EnfOfPhase" button to push the game to the next phase or activate the next player.
So far only the following actions are implemented:
* Build Capital (at the beginning only)
* Deploy Army (at the beginning only)
* Deploy Scout (at the beginning only)
* Buy Army (City Managementy)
* Buy Scout (City Management)
* Move figure (Movement)
* Reveal tile (Movement)
* Build City (StartOfTurn)

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


 

