import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivChooseData } from "../js/civ-choosedata.js";

class CivWonder extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
    <style is="custom-style" include="civ-paper-button-styles">
      :host {
        background-color: #fbf1f4;
        border-radius: 10px;
        display: inline-block;
        position : relative;
        width : 210px;
        height: 120px;
        border: 1px solid;
      }
      .header {
/*         font-size : 85% */
          font-size : 0.9em;
          line-height : 1.2em;
      }
      .name {
        display: inline-block;
        position:absolute;
        font-size : 95%;
        top : 2px;
        left: 2px;
        font-family: Arial, Helvetica, sans-serif;
      }
      .sq {
        position:absolute;
        top : 48px;
        left: 2px;
      }
      .up {
        display: inline-block;
        position:absolute;
        top : 22px;
        left: 2px;
      }
      .desc {
        display: inline-block;
        width:135px;
        position:absolute;
        top : 22px;
        left: 75px;
      }

      .bonus {
        width:75px;
        display:block
      }


    </style>

    <div>
      <div class="header name">{{name}}&nbsp;&nbsp;{{localize('cost')}}&nbsp;:&nbsp;{{w.cost}}</div>
      <hr>
      <div class="up">
        <span class="header bonus">
        {{localize('bonus')}}&nbsp;:&nbsp;{{discount}}
        <br>
        {{tech}}
        </span>
        <civ-square class="sq" id="sq"></civ-square>
      </div>
      <div class="header desc">{{w.desc}}</div>

      <civ-implemented id="notimplemented" class="notimplemented"></civ-implemented>
    </div>
`;
  }

  static get is() {
    return 'civ-wonder';
  }

  static get properties() {
    return {
      w: {
        type: Object
      },
      name: {
        type: String
      }
    };
  }

  refresh(data) {
    this.w = C.findWonder(data);
    this.name = C.localize(this.w.name);
    const s = this.$.sq;
    const j = {};
    j.terrain = "";
    j.wonder = data;
    this.discount = "No";
    this.tech = null;

    if (this.w.discount != null) {
      this.discount = this.w.discount.cost;
      this.tech = C.localize(this.w.discount.tech);
    }

    const ni = this.$.notimplemented;
    ni.draw(this.w.ni); //          C.displayelem(ni,this.w.ni,true)

    s.draw(j);
  }

}

customElements.define(CivWonder.is, CivWonder);