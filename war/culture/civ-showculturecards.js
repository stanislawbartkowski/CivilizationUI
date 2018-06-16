import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivShowCultureCards extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <paper-dialog id="dialog">

        <h2>{{header}}</h2>

        <div>
           <civ-culturecardlist id="resources" style="display:none"></civ-culturecardlist>
        </div>

        <div id="empty" style="display:none">
          {{localize('noculturecards')}}
        </div>


     </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showculturecards';
  }

  refresh(data) {
    const aa = this.header;
    if (data.cards != null) super.drawlistorempty(data.cards);else {
      const elist = [];

      for (var i = 0; i < data.cardsno; i++) elist.push("");

      super.drawlistorempty(elist);
    }
  }

}

window.customElements.define(CivShowCultureCards.is, CivShowCultureCards);
