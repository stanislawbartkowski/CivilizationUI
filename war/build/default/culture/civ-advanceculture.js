import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class AdvanceCultureDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: inline-block;
      }

    </style>


    <paper-dialog id="dialog" modal="">

      <h3>{{localize('youareabouttoadvanceculture')}}</h3>
      <h2>{{costinfo}}</h2>
      <p>


      </p><div class="buttons">

        <paper-button on-click="_onAdvance">
            <iron-icon src="images/tokens/culture.svg"></iron-icon>
           {{localize('advanceculture')}}
        </paper-button>

        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'civ-advanceculture';
  }

  static get properties() {
    return {
      costinfo: {
        type: String
      }
    };
  }

  _onAdvance() {
    C.executewithconffun(this.localize('areyousurequestion'), "ADVANCECULTURE", e => {
      this.closeIt();
      C.executeC("ADVANCECULTURE", null);
    });
  }

  openIt(y) {
    const itemized = C.getitemizedcommand();
    this.costinfo = C.advanceculturecost(itemized[0]);
    super.openIt(y);
  }

}

window.customElements.define(AdvanceCultureDialog.is, AdvanceCultureDialog);