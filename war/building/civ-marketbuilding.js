import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivMarketBuilding extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style" include="civ-paper-button-styles">

:host {
     display: inline-block;
     border: 1px solid;
     border-radius: 5px;
     padding : 2px;
  }

.num {
  background-color: #e0ece0;
  text-align: center;
}

</style>

</custom-style>

<div>
   <civ-buildinginfo id="bld"></civ-buildinginfo>
   <civ-buildinginfo id="bldev" style="display:none"></civ-buildinginfo>
   <div class="num">{{numb}}</div>
</div>
`;
  }

  static get is() {
    return 'civ-marketbuilding';
  }

  static get properties() {
    return {
      numb: {
        type: String
      }
    };
  }

  refresh(data) {
    const n = data.name;
    const num = data.num;
    if (num > 0) this.numb = C.localize('numberofbuildings', 'num', num)
      else this.numb = C.localize('soldout');
    const bld = this.$.bld;
    bld.draw(n);
    const blddev = this.$.bldev; // find developed building

    const bt = C.getlistofbuildings();

    for (var i = 0; i < bt.length; i++) if (bt[i].name == n && bt[i].upgrade != null) {
      blddev.draw(bt[i].upgrade);
      C.displayelem(blddev, true, true);
      return;
    }

    C.displayelem(blddev, false);
  }

}

customElements.define(CivMarketBuilding.is, CivMarketBuilding);
