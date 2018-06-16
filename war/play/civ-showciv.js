import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class ShowCivInfo extends CivDialog(PolymerElement) {
  static get template() {
    return html`
   <paper-dialog id="dialog">
       <civ-choose id="civ" info="true"></civ-choose>
   </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showcivinfo';
  }

  refresh(data) {
    const ci = C.getlistofcivs();
    var cc = null;

    for (var i = 0; i < ci.length; i++) if (ci[i].civ == data) cc = ci[i];

    if (cc != null) {
      const c = this.$.civ;
      c.draw(cc);
    }
  }

}

window.customElements.define(ShowCivInfo.is, ShowCivInfo);
