# CivilizationUI



# Import Eclipse project from GutHub

## Prerequsities

* Tested with Eclipse Oxygen
* GWT Eclipse Plugin 3.0.0
* GWT 2.8.1

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
 
 ## Deploy to heroku
 
 heroku war:deploy target/civilization.war -a {application name}

# Synchronize with CivilizationEngine

Every release of CivilizationUI comes with the latest version of CivilizationEngine. But it is possible to synchronize with the Engine manually if necessary:
* Go to [https://github.com/stanislawbartkowski/CivilizationEngine] and prepare target .jar using instruction provided
* Copy {CivilizationEngine home}/out/artifacts/CivilizationEngine/CivilizationEngine.jar war/WEB-INF/lib/CivilizationEngine.jar 
* Copy {CivlizationEngine home}/src/main/resources/* war/WEB-INF/classes
* Important: Copy directories: map messages and objects, do not copy resources directory itself.


 

