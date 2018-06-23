import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivShowTechDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`

   <paper-dialog id="dialog">

     <paper-dialog-scrollable>

        <civ-leveltech id="currenttech" ident="true"></civ-leveltech>

     </paper-dialog-scrollable>

   </paper-dialog>

`;
  }

  static get is() {
    return 'civ-showtechdialog';
  }

  /**
   * Displays list of tech as pyramid
   * data: list of players technology, including coins
   */
  refresh(data) {
    this.$.currenttech.draw( { "playertech" : data});
  }

}

window.customElements.define(CivShowTechDialog.is, CivShowTechDialog);
