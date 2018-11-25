import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class ShowUnitsDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <paper-dialog id="dialog">

     <div>
       <civ-listunits id="list"></civ-listunits>
     </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'showunits-dialog';
  }

  openIt(pa) {
    super.openIt(pa);
    this.$.list.draw(pa);
  }

}

window.customElements.define(ShowUnitsDialog.is, ShowUnitsDialog);