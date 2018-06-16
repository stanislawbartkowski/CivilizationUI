import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js"

class CivGreatPersonList extends CivDataList(PolymerElement) {
  static get template() {
    return html`
  <style>
       .horizontal {
         @apply(--layout-horizontal);
       }
  </style>

<div id="map" class="horizontal">
  <template is="dom-repeat" items="{{res}}">
    <civ-greatperson data="{{item}}"></civ-greatperson>
 </template>
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-greatpersonlist';
  }

  refresh(pa) {
    super.refreshmap(pa, "civ-greatperson");
  }

}

window.customElements.define(CivGreatPersonList.is, CivGreatPersonList);
