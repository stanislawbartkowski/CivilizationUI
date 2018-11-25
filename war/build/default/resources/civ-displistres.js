import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivListRes extends CivData(PolymerElement) {
  static get template() {
    return html`
  <style>
       .horizontal {
         @apply(--layout-horizontal);
       }
  </style>

<div id="map" class="horizontal">
  <template is="dom-repeat" items="{{res}}">
    <civ-dispres id="i{{index}}" data="{{item}}"></civ-dispres>
 </template>
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-listres';
  }

  static get properties() {
    return {
      res: {
        type: Array
      }
    };
  }

  getRes() {
    if (this.res == null) return [];
    return this.res;
  }

  funmap(cc, pa) {
    const id = cc.id;

    cc.fun = d => this.fun(d, id);
  }

  refresh(pa) {
    this.res = pa;
    this.elemmap = null;
    if (this.fun == null) return;
    this.elemmap = "civ-dispres";
  }

}

window.customElements.define(CivListRes.is, CivListRes);