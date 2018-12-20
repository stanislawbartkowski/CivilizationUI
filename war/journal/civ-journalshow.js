import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivJournalDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style is="custom-style" include="civ-paper-button-styles">
    paper-dialog paper-dialog-scrollable {
      --paper-dialog-scrollable : {
        width: 360px;
        height: 340px;
      }
    }
    
    paper-dialog {
       position: fixed;       
     }
     
     paper-dialog h2 {
        cursor: move;
        z-index: 10;
        background-color: #2196F3;
        color: #fff;
      }
           
    </style>
-     <paper-dialog id="dialog" class="noselect" dynamic-align> 
     
        <h2>{{header}}</h2>
                        
        <paper-dialog-scrollable>
          <civ-journal id="j"></civ-journal>
        </paper-dialog-scrollable>

        <div class="buttons">
            <paper-button dialog-dismiss>{{localize('hidelabel')}}</paper-button>
        </div>

      </paper-dialog>
    `;
  }
  
    static get properties() {
    return {
      civid: {
        type: Number
      }
     }
   } 
     
  setCiv(civ) {
    this.$.j.setCiv(civ)
    this.setHeader(civ)
  }

  refresh(data) {
    const i = this.civid
//    this.setTopLeft(i == 0,true,400,400)
    if (data == null) return;
    const j = this.$.j
    this.noCancelOnOutsideClick()
    j.draw(data)
  }


}
customElements.define('civ-journaldial', CivJournalDialog);
