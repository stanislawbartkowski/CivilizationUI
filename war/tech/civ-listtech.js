import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivListTech extends CivData(PolymerElement) {
  static get template() {
    return html`
  <template id="map" is="dom-repeat" items="{{techs}}">
          <civ-tech data="{{item}}">
 </civ-tech></template>
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
      level: {
        type: Number
      }
    };
  } // parameter:
  // data.playertech
  // data.disa (can be null), list of technologies disabled


  refresh(data) {
    this.techs = [];
    if (data == null || data.playertech == null) return;
    const leve = this.level;
    const pa = data.playertech;

    for (var i = 0; i < pa.length; i++) {
      // make a copy
      if (pa[i].level != leve) continue;
      const c = {};
      c.tech = pa[i].tech;
      c.ni = pa[i].ni;
      c.level = pa[i].level;
      c.disa = false;
      c.coins = pa[i].coins;
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
