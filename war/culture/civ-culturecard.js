import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import {CivChooseData} from "../js/civ-choosedata.js"


class CivCultureCard extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
    <style>

      :host {
        background-color: #e1f1d8;
        border-radius: 10px;
        display: inline-block;
        position : relative;
        width : 145px;
        height: 220px;
        border: 1px solid;
      }
      .header {
         font-size : 85%
      }

      :host([Empty]) {
        background-image: url("../images/icons/cards.svg");
        background-repeat: no-repeat;
        background-size: 95% 95%;
      }

      .name {
        display: inline-block;
        position:absolute;
        font-size : 95%;
        top : 2px;
        left: 2px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .culture {
        position:absolute;
        top:2px;
        right: 5px;
      }

      .desc {
        display: inline-block;
        width:95%;
        position:absolute;
        top : 22px;
        left: 5px;
      }

      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
     }

     .not {
       bottom : 5px;
       position:absolute;
       right : 5px;
       height:15px;
     }

     civ-culturepoint {
       --culture-css : { width : 20px; }
     }
   }

    </style>

    <div>
      <div class="header name">{{card.name}} </div>
      <civ-culturepoint class="culture" id="cpoint"></civ-culturepoint>
      <hr>
      <div class="header desc">{{card.desc}}</div>

      <civ-implemented id="notimplemented" class="not"></civ-implemented>
    </div>
`;
  }

  static get is() {
    return 'civ-culturecard';
  }

  static get properties() {
    return {
      card: {
        type: Object
      }
    };
  }

  _clear() {
    C.removeattr(this, "Empty");
  } // data : culture card name
  //        "" (empty string)
  //        null


  refresh(data) {
    this._clear();

    if (data == null) return;

    if (data == "") {
      this.setAttribute("Empty", 1);
      return;
    }

    this.card = C.findCard(data);
    const ni = this.$.notimplemented;
    ni.draw(this.card.ni);
    const c = {};
    c.greatperson = false;
    c.level = this.card.level - 1;
    const cu = C.getculturetrack();
    c.culture = {};
    c.culture.cost = cu[c.level].cost;
    this.$.cpoint.draw(c);
  }

}

customElements.define(CivCultureCard.is, CivCultureCard);
