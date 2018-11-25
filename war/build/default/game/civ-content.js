import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivContent extends CivData(PolymerElement) {
  static get template() {
    return html`
   <template id="list" is="dom-repeat" items="{{civs}}">
        <civ-choose data="{{item}}"></civ-choose>
   </template>
`;
  }

  static get is() {
    return 'civ-content';
  }

  refresh(data) {
    if (data == null) this.civs = [];else this.civs = data;
  }

}

window.customElements.define(CivContent.is, CivContent);