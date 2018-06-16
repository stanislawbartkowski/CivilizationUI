import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivDiscardCardDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <paper-dialog id="dialog" modal="">

     <paper-dialog-scrollable>

       <civ-chooseculturecards id="choose">
           <div slot="title">
              <h3>{{handsize}}</h3>
              <h1>{{localize('choosecardtodiscard')}}</h1>
           </div>

           <div class="buttons">
             <paper-button id="discard" on-click="_discard">
                 <iron-icon src="images/icons/cards.svg"></iron-icon>
                {{localize('discardcard')}}
             </paper-button>
           </div>

        </civ-chooseculturecards>

      </paper-dialog-scrollable>


     </paper-dialog>
`;
  }

  static get is() {
    return 'civ-discardcarddialog';
  }

  static get properties() {
    return {
      handsize: {
        type: String
      }
    };
  }

  _clicked(p) {
    C.displayelem(this.$.discard, true);
  }

  _discard() {
    const card = this.$.choose.getChoosed();
    this.closeIt();
    const pa = {};
    pa.row = -1;
    pa.col = -1;
    pa.param = card;
    C.executeC("DISCARDCARD", pa);
  }

  refresh(data) {
    const cards = data.cultureresource.cards;
    const handsize = data.handsize;

    this.$.choose.fun = p => this._clicked(p);

    C.displayelem(this.$.discard, false);
    this.handsize = C.localize("handsizemore", "handsize", "" + handsize);
    this.$.choose.draw(cards);
  }

}

window.customElements.define(CivDiscardCardDialog.is, CivDiscardCardDialog);
