import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivCancelAction extends CivDialog(PolymerElement) {
  static get template() {
    return html`
  <style is="custom-style" include="civ-paper-button-styles">

    .dialog {
       top : 5%;
    }

    .opponent {
      border:  1px;
      margin-left: 5%;
      margin-right: 5%;
      border-style: dotted;
      border-radius: 5px;
    }

    .up {
      margin-top: 40px;
    }

  </style>

       <paper-dialog class="dialog" id="dialog" modal>

       <h2>
         {{localize('canceldialog-title')}}
       </h2>

       <div class="opponent">
        {{localize('opponentcivilization')}} {{data.command.civ}}<br/>
        {{localize('commandtocancel')}} {{commandtocancel}}<br/>
        {{commandtext}} <civ-buildinginfo id="building" style="display:none"></civ-buildinginfo>
        <civ-square id="square" row="-1" col="-1"></civ-square>
       </div>

       <h3>{{localize('usecommandtocancel')}}</h3>
       <div id="map" class="list">
         <template is="dom-repeat" items="{{res}}">
           <civ-cancelline data="{{item}}"></civ-cancelline>
        </template>
       <div>

       <div class="buttons up">
        <paper-button dialog-dismiss on-click="_letgoaction" class="green">{{localize('letitgolabel')}}</paper-button>
      </div>


       </paper-dialog>
`;
  }

  static get is() {
    return 'civ-cancelaction';
  }

  static get properties() {
      return {
       commandtocancel: {
          type: String,
          value: null
        },
        commandtext: {
          type: String,
          value: null
        }
      }
  }


  /**
   * data: cancel action
   * example: {"command":{"command":"BUYMOUNTED","civ":"America","p":{"row":2,"col":2},"param":null,"status":"Su"},\
              "list":[{"civ":"China","command":"WRITINGACTION","param":"Spy"}]}
   */

   clicked(pa) {
     C.executeC(pa.command,{ "param" : pa.patram })
     super.closeIt()
   }

   funmap(cc, pa) {
     cc.fun = d => this.clicked(d)
   }
   
   _letgoaction() {
     C.executeC("LETSUSPENDEDGO")
   }
   
   _drawsquare(data) {
     const p = data.command.p
     // TODO: strange wgetsquare or getsquare
     const square = C.wgetsquare(p.row, p.col)
     this.$.square.draw(square)     
   }
   
   _drawbuilding(data) {
      const b = data.command.param.building
      C.displayelem(this.$.building,true,true)
      this.$.building.draw(b)     
   }

  refresh(data) {
    this.commandtext = null
    this.commandtocancel = C.commandtoname(data.command.command)
    C.displayelem(this.$.building,false)
    if (data.command.param != null && data.command.param.building != null) {
      this.commandtext = C.localize(data.command.param.building)
      this._drawbuilding(data)
    }  
    this._drawsquare(data)
    this.res = data.list
    this.elemmap = "civ-cancelline"
  }

}

customElements.define(CivCancelAction.is, CivCancelAction);
