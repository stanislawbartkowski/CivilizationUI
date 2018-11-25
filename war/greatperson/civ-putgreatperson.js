import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import {BuyStructure} from "../js/buystructure-behavior.js"

class CivPutGreatPersonOnMap extends BuyStructure(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

      .reserve {
         position: absolute;
         bottom : 10px;
      }
      .vertical {
      }

    </style>

    <paper-dialog id="dialog">

     <h2>{{localize('putgreatperson')}}</h2>

     <paper-dialog-scrollable>

        <civ-choosegreatperson id="list">

          <div style="margin-left:20px">
            <civ-choosesequareplace class="vertical" id="choose" buildbutton="{{localize('place')}}"></civ-choosesequareplace>
            <paper-button class="vertical reserve green" on-click="_onReserve">{{localize('reserve')}}</paper-button>
          <div>
        </civ-choosegreatperson>
    </paper-dialog-scrollable>
    </paper-dialog>
`;
  }

  static get is() {
    return 'civ-putgreatperson';
  }

  static get properties() {
    return {
      nameid: {
        type: String,
        value: "greatperson",
        readOnly: true
      }
    };
  }

}

window.customElements.define(CivPutGreatPersonOnMap.is, CivPutGreatPersonOnMap);
