import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js"

class CivDispWonders extends CivDataList(PolymerElement) {
  static get template() {
    return html`
<style>
    :host {
      display: inline-block;
/*      width: 20px; */
    }
    </style>

<div id="map">
   <template is="dom-repeat" items="{{res}}">
     <civ-wonder data="{{item}}"></civ-wonder>
   </template>
</div>
`;
  }

  static get is() {
    return 'civ-dispwonders';
  }

  refresh(pa) {
    super.refreshmap(pa, "civ-wonder");
  }

}

window.customElements.define(CivDispWonders.is, CivDispWonders);
