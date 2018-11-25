import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { BuyStructure } from "../js/buystructure-behavior.js";

class BuyWonder extends BuyStructure(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

   .reserve {
         position: absolute;
         bottom : 10px;
    }


    </style>

       <paper-dialog id="dialog">

       <h2>{{localize('wonderstobuy')}}</h2>

       <div>

        <civ-choosewonder id="list">

        <div style="margin-left:20px;">
          <civ-choosesequareplace class="vertical" id="choose" buildbutton="{{localize('build')}}"></civ-choosesequareplace>
          <paper-button id="resign" class="reserve green" dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
        </div>

        </civ-choosewonder>

      </div>

      </paper-dialog>
`;
  }

  static get is() {
    return 'buy-wonder';
  }

  static get properties() {
    return {
      nameid: {
        type: String,
        value: "wonder",
        readOnly: true
      }
    };
  }

  setParameters(id, resign) {
    super.setParameters(id, resign);
    C.displayelem(this.$.resign, id != "freewonder", true);
  }

}

window.customElements.define(BuyWonder.is, BuyWonder);