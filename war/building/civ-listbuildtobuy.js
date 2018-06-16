import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivListBuildToBuy extends CivData(PolymerElement) {
  static get template() {
    return html`
  <custom-style>

<style is="custom-style" include="civ-paper-button-styles">


  </style>

  </custom-style>


 <civ-buildinginfo class="building" id="granary"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="aqueduct"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="tradingpost"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="harbor"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="shipyard"></civ-buildinginfo>

 <civ-buildinginfo class="building" id="market"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="bank"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="barracks"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="academy"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="temple"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="cathedral"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="library"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="university"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="workshop"></civ-buildinginfo>
 <civ-buildinginfo class="building" id="ironmine"></civ-buildinginfo>
`;
  }

  static get is() {
    return 'civ-listbuildbuy';
  }

  static get properties() {
    return {
      builds: {
        type: Array
      }
    };
  }

  refresh(pa) {
    const b = C.listofallbuildings();

    for (var i = 0; i < b.length; i++) C.displayelemid(this, b[i], false);

    for (var i = 0; i < pa.length; i++) {
      const bi = pa[i].toLowerCase();
      const p = this.$[bi];
      if (this.fun != null) p.fun = e => this.fun(e);
      C.displayelem(p, true, true);
      p.draw(bi);
    }
  }

}

window.customElements.define(CivListBuildToBuy.is, CivListBuildToBuy);
