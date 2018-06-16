import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivCulturePoint extends CivData(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style">

:host {
    display: inline-block;
  }

.culture {
  display : none;
  width : 25px;
  @apply --culture-css;
}

</style>

  <img id="level1" src="images/culturetrack/one.svg" title="{{titlestring}}" class="culture">
  <img id="level2" src="images/culturetrack/two.svg" title="{{titlestring}}" class="culture">
  <img id="level3" src="images/culturetrack/three.svg" title="{{titlestring}}" class="culture">
  <img id="greatperson" src="images/icons/greatperson.svg" title="{{titlestring}}" class="culture">
`;
  }

  static get is() {
    return 'civ-culturepoint';
  }

  static get properties() {
    return {
      culturep: {
        type: Object
      },
      names: {
        type: Array,
        readOnly: true,
        value: ["level1", "level2", "level3", "greatperson"]
      },
      titlestring: {
        type: String
      }
    };
  }

  refresh(c) {
    this.culturep = c;
    this.titlestring = C.advanceculturecost(c.culture.cost);
    if (c.greatperson) this.titlestring = C.localize("greatperson") + ", " + this.titlestring;

    for (var i = 0; i < this.names.length; i++) C.displayelemid(this, this.names[i], false);

    if (!c.greatperson) C.displayelemid(this, this.names[c.level], true, true);else C.displayelemid(this, this.names[this.names.length - 1], true, true);
  }

}

customElements.define(CivCulturePoint.is, CivCulturePoint);
