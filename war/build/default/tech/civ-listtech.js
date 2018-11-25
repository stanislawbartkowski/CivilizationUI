import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivListTech extends CivData(PolymerElement) {
  static get template() {
    return html`
  <template id="map" is="dom-repeat" items="{{techs}}">
          <civ-tech data="{{item}}"></civ-tech>
  </template>
`;
  }

  static get is() {
    return 'civ-listtech';
  }

  static get properties() {
    return {
      techs: {
        type: Array
      },

      /**
       * Techonlogy level tyo be displayed
      */
      level: {
        type: Number
      }
    };
  }
  /**
   * List of technologies at particular level
   * Attribut level: Numbet - level of techonlogy to display
   * Parameter
   *  data playetech : list of technologies to display,  { tech : technology name, coins : number of coins or null, level : level }
   *
   * data disa : List of names of technologies to be disabled, could be null
  */


  refresh(data) {
    this.techs = [];
    if (data == null || data.playertech == null) return;
    const leve = this.level;
    const pa = data.playertech;

    for (var i = 0; i < pa.length; i++) {
      const p = pa[i];
      if (p.level != leve) continue;
      const c = {
        "tech": p.tech,
        "disa": false,
        "coins": p.coins,
        "level": p.level
      };
      if (data.disa != null) c.disa = C.onList(data.disa, c.tech);
      this.techs.push(c);
    }
  }

  afterdraw(data) {
    if (this.fun == null) return;
    const s = C.getShadow(this);

    for (var i = 0; i < s.childNodes.length; i++) {
      const cc = s.childNodes[i];

      if (cc.nodeName == "CIV-TECH") {
        cc.fun = d => this.fun(d);
      }
    } // for

  }

}

window.customElements.define(CivListTech.is, CivListTech);