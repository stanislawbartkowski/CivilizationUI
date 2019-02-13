/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html } from "./node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "./node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "./js/civ-data.js";


class XApp extends CivData(PolymerElement) {
  static get template() {
    return html`
 <style is="custom-style" include="civ-paper-button-styles">
      
  paper-button {
    font-family: 'Roboto', 'Noto', sans-serif;
    font-weight: normal;
    font-size: 14px;
    -webkit-font-smoothing: antialiased; 
    margin : 10px;
  }
 
    app-header {
      background-color: #4285f4;
      color: #fff;
    }
    app-header paper-icon-button {
      --paper-icon-button-ink-color: #fff;
    }
    app-drawer-layout {
      --app-drawer-layout-content-transition: margin 0.2s;
    }
    app-drawer {
      --app-drawer-content-container: {
        background-color: #eee;
      }
    }  
     
    .drawer-content {
      margin-top: 80px;
      height: calc(100% - 80px);
      overflow: auto;
    }
    
    .map-show {
      padding-top: 5px;
      padding-left: 5px;
    }

    .market-show {
      padding-top: 5px;
      padding-left: 20px;
    }
       
    </style>

  <app-header-layout fullbleed="" fixed="">

    <app-header title="{{localize('appversion')}}" fixed="" slot="header">
      <app-toolbar>
            <div style="width:2.5%;">
            <a href="https://github.com/stanislawbartkowski/CivilizationUI" target="_blank" class="inherit">
              <paper-icon-button src="images/Octocat.png" title="polymer"></paper-icon-button>
            </a>
            </div>
            <div id="warning" style="font-size: 50%;">
              Chrome only !<p>
              Not Firefox !
            </p></div>
            <div main-title="">
               Civilization               
            </div>
            <div style="width:50%;">
              <civ-gamestate></civ-gamestate>
            </div>
            <div style="width:20%;"></div> 
            <paper-icon-button id="download-button" hidden="true" icon="file-download" on-click="_onDownload" title="{{localize('downloadgame')}}">
               </paper-icon-button>
            <paper-icon-button id="close-button" hidden="true" icon="close" on-click="_onClose" title="{{localize('leavegamebutton')}}">
               </paper-icon-button>
      </app-toolbar>
    </app-header>

    <app-drawer-layout id="drawerLayout">
    

      <app-drawer slot="drawer">
        <div class="drawer-content">
        
        <div id="gamemenu" hidden="">
          <civ-player id="youplay"></civ-player>
        </div>
          
        <div id="startmenu" hidden="">
           <div>
             <paper-button raised="" class="indigo" on-click="_onClickNew">{{localize('newgamebutton')}}</paper-button>
           </div>
           <div>
             <paper-button raised="" class="indigo" on-click="_onClickGames"><div>{{localize('resumegamebutton')}}</div></paper-button>
           </div>             
           <div>
             <paper-button raised="" class="indigo" on-click="_onClickJoinGame"><div>{{localize('joingamebutton')}}</div></paper-button>
           </div>             
        </div>
          
        </div>
        
        
      </app-drawer>
      
      <app-drawer-layout id="internalDrawer">
      
         <div content="">
           <civ-content></civ-content>    
           <civ-games></civ-games>
           <civ-join></civ-join>
         
           <div style="display: flex; float: left;">
             <div class="map-show">
               <civ-map id="map"></civ-map>      
             </div>
           
             <div class="market-show">
               <civ-market style="display:none" id="market"></civ-market>
             </div> 
           </div>
           
          </div> 
         
         <app-drawer slot="drawer" align="right">
             <div class="drawer-content">
               <civ-player id="opponentplay" opponent="true" hidden="true"></civ-player>       
            </div>         
         </app-drawer>
         
     
     </app-drawer-layout>         

    </app-drawer-layout>

  </app-header-layout>
`;
  }

  static get is() {
    return 'x-app';
  }

  static get properties() {
    return {
      resou: {
        type: Object
      },
      refreshalways: {
        type: Boolean,
        value: false
      }
    };
  }

  attached() {
    this.loadResources(this.resolveUrl('locales.json'));

    if (!C.isFireFox()) {
      const w = this.$.warning;
      C.displayelem(w, false);
    }
  }

  _onClickNew() {
    C.showcivorgames(1);
    C.readcivs();
  }

  _onClickGames() {
    C.showcivorgames(2);
    C.readgames();
  }

  _onClickJoinGame() {
    C.showcivorgames(3);
    C.readjoingames();
  }

  _onClose() {
    C.leavedialog();
  }
  
  _onDownload() {
    C.downloadGame()
  }
  
  rendermap(data) {
     const m = this.$.map
     m.draw(data)
  }

  refresh(jsboard) {
    const b = jsboard;
    C.getgamestate().draw(b);
    C.getmarket().draw(b);

    if (b == null) {
      C.displayelem(C.getmarket(), false);
      C.getyouplay().draw(null);
      C.seconddrawerClose(true);
      C.getopponentplay().draw(null);
      C.showjournal(true,null)
      C.showjournal(false,null)
    } else {
      C.displayelem(C.getmarket(), true);

      if (b.board.others.length > 1) {
        C.alertdialog(this.localize('multiplayermorethen2'));
        return;
      }

      C.getyouplay().draw(b);

      if (b.board.others.length == 1) {
        C.seconddrawerClose(false);
        C.getopponentplay().draw(b);
      }
      if (b.board.you.suspended != null) 
        C.cancelactiondialog(b.board.you)
    }

    C.battleDialog(b)
       
    C.endofgameDialog(b)
  }

}

window.customElements.define(XApp.is, XApp);
if (C.isFireFox()) alert("Not supported on Firefox. Use Chrome");