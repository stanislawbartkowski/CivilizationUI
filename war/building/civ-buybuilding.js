import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import {BuyStructure} from "../js/buystructure-behavior.js"

class BuyBuilding extends BuyStructure(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

   .reserve {
         position: absolute;
         bottom : 10px;
    }


    </style>

       <paper-dialog id="dialog">

       <h2>{{header}}</h2>

       <div>

        <civ-choosebuilding id="list">

        <div style="margin-left:20px;">
          <civ-choosesequareplace class="vertical" id="choose" buildbutton="{{localize('build')}}"></civ-choosesequareplace>
          <paper-button class="reserve green" dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
        </div>

        </civ-choosebuilding>

      </div>

      </paper-dialog>
`;
  }

  static get is() {
    return 'buy-building';
  }

  static get properties() {
    return {
      nameid: {
        type: String,
        value: "building",
        readOnly: true
      }
    };
  }

}

window.customElements.define(BuyBuilding.is, BuyBuilding);
