import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class ShowHV extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <paper-dialog id="dialog">

        <div>
          <civ-listres id="resources"></civ-listres>
        </div>
        <div id="empty" style="display:none">
          {{localize('noresources')}}
        </div>


     </paper-dialog>
`;
  }

  static get is() {
    return 'show-hvdialog';
  }

  refresh(data) {
    super.drawlistorempty(data);
  }

}

window.customElements.define(ShowHV.is, ShowHV);
