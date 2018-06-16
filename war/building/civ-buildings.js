import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivBuldings extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style">

:host {
    display: inline-block;
  }

</style>

</custom-style>

<div>
   <civ-marketbuilding id="harbor"></civ-marketbuilding>
   <civ-marketbuilding id="shipyard"></civ-marketbuilding>
   <civ-marketbuilding id="temple"></civ-marketbuilding>
   <civ-marketbuilding id="library"></civ-marketbuilding>
   <civ-marketbuilding id="tradingpost"></civ-marketbuilding>
   <civ-marketbuilding id="barracks"></civ-marketbuilding>
   <civ-marketbuilding id="granary"></civ-marketbuilding>
   <civ-marketbuilding id="market"></civ-marketbuilding>
   <civ-marketbuilding id="workshop"></civ-marketbuilding>
</div>
`;
  }

  static get is() {
    return 'civ-buildings';
  }

  refresh(data) {
    const b = data;

    for (var ii = 0; ii < b.length; ii++) {
      const n = b[ii].name;
      const bi = this.$[n.toLowerCase()];
      bi.draw(b[ii]);
    }
  }

}

customElements.define(CivBuldings.is, CivBuldings);
