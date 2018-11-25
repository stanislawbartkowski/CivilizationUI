import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";
import { CivChooseData } from "../js/civ-choosedata.js";

class CivLootInfo extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
    <style>
    :host {
    	 display: inline-block;
    }
    .horizontal {
      @apply(--layout-horizontal);
    }
    .takeloot {
      padding-top: 5px;
      width : 10px;
      word-wrap: break-word;
    }
    .noloot {
      width : 13px;
      word-wrap: break-word;
      font-size: 200%;
    }
    </style>

       <div class="horizontal">
         <span class="takeloot">{{data.text}}</span>
         <span class="noloot">{{num}}</span>
       </div>
`;
  }

  static get is() {
    return 'civ-lootinfo';
  }

  static get properties() {
    return {
      num: {
        type: Number
      }
    };
  }

  redrawnum(num) {
    this.num = num;
  }
  /** Display loot info and current number
  *  data.text : text to display
  *  data.num : number of loot
  **/


  refresh(data) {
    this.num = data.num;
  }

}

window.customElements.define(CivLootInfo.is, CivLootInfo);