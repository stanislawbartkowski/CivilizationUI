import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivShowTechDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
   <paper-dialog id="dialog" modal="">

     <paper-dialog-scrollable>

        <civ-leveltech id="currenttech" ident="true"></civ-leveltech>

      </paper-dialog-scrollable>

     <div class="buttons">
       <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
     </div>

   </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showtechdialog';
  } // parameter: playertech


  refresh(data) {
    const pa = {};
    pa.playertech = data;
    const dcurrenttech = this.$.currenttech;
    this.$.currenttech.draw(pa);
  }

}

window.customElements.define(CivShowTechDialog.is, CivShowTechDialog);
