import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class BattleDesc extends CivData(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left : 10px;
        border: 1px solid;
        padding : 5px;
        width: 500px;
      }
      .name {
        font-size: 150%;
      }
      .combat {
        font-size: 140%;
        padding-left : 10%;
      }
    </style>
    <div>
      <span class="name">{{name}}</span>
      <span class="combat">{{localize('combatbonus')}} : <span style="background-color:Beige">{{data.combatbonus}}</span></span>

      <span id="useiron" style="float: right; padding-right:10%; display:none">
        <paper-toggle-button on-checked-changed="change" id="iron">{{localize('useiron')}}
          <span id="points" style="display:none; background-color:#ffcccc">{{localize('increaseattack')}}</span>
        </paper-toggle-button>
      </span>
      <span id="ironused" style="float: right; padding-right:10%; display:none">
          <iron-icon src="images/resource/iron.svg"></iron-icon>
      </span>
    </div>
`;
  }

  static get is() {
    return 'battle-desc';
  }

  static get properties() {
    return {
      name: {
        type: String
      }
    };
  }

  isironon() {
    const iron = this.$.iron;
    return iron.checked;
  }

  enableinfo(enable) {
    C.displayelemid(this, "points", enable, true);
  }

  change() {
    const iron = this.$.iron;
    this.enableinfo(iron.checked);
  }

  refresh(data) {
    this.enableinfo(false);
    this.name = C.getSideName(data);
    const iron = this.$.iron;
    iron.checked = false;
    iron.disabled = !data.canuseiron || data.ironused != -1;
    C.displayelemid(this, "useiron", !iron.disabled, true);
    C.displayelemid(this, "ironused", data.ironused != -1, true);
  }

}

customElements.define(BattleDesc.is, BattleDesc);