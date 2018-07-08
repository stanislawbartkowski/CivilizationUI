import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class SilkForTradeAction extends CivDialog(PolymerElement) {
  static get template() {
    return html`
  <style is="custom-style" include="civ-paper-button-styles">

    .tech {
       display:none;
       width: 115px;
       height: 60px;
    }
    .city {
       display:none;
    }
    .choosetext {
       display:none;
    }

    .dialog {
       top : 5%;
    }
  </style>

       <paper-dialog class="dialog" id="dialog" modal>

       <h2>
         [[header]]
       </h2>
       <h2>
         {{localize('youreceive9trade')}}
       </h2>
       <h2>
         {{opponentmessage}}
       </h2>
       
     <div>

        <civ-choosedispresource id="list">

        <div class="buttons">
         <paper-button id="spendbutton" on-click="_spendButton" class="green" style="display:none" dialog-dismiss>{{localize('spendresourcebutton')}}</paper-button>
         <paper-button dialog-dismiss class="green">{{localize('cancellabel')}}</paper-button>
       </div>
      
        </civ-choosedispresource>
       </div>
       
       </paper-dialog>
`;
  }

  static get is() {
    return 'civ-silkfortrade';
  }
  
  static get properties() {
	    return {
      	  opponentmessage: {
	        type: String,
	        value: null
	      },
	    }
  }
  
  _spendButton() {
	  const re = this.$.list.getChoosed()
      C.executeC(super.getCommand(), {
	        "param": { "civ" : this.data[0].civ, "resource" : re}
	  });
  }
  
  _clickresource(e) {
     C.displayelem(this.$.spendbutton, true, true);	  
  }

  /**
   * data: list of civ-resourses
   * [civ: civ, resources : []
   */
  
  refresh(data) {
	  this.opponentmessage = null
      C.displayelem(this.$.spendbutton, false);	  
	  this.$.list.fun = e => this._clickresource(e);
	  this.$.list.draw(data[0].resource)
	  if (data[0].civ != null)
		  this.opponentmessage = C.localize("youropponentreceive9trade")
  }

}

customElements.define(SilkForTradeAction.is, SilkForTradeAction);
