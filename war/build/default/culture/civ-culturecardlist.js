import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js";

class CivCultureCardList extends CivDataList(PolymerElement) {
  static get template() {
    return html`
  <style>
       .horizontal {
         @apply(--layout-horizontal);
       }
  </style>

<div id="map" class="horizontal">
  <template is="dom-repeat" items="{{res}}">
    <civ-culturecard data="{{item}}"></civ-culturecard>
 </template>
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-culturecardlist';
  }

  static get properties() {
    return {
      res: {
        type: Array
      }
    };
  }

  refresh(pa) {
    super.refreshmap(pa, "civ-culturecard");
  }

}

window.customElements.define(CivCultureCardList.is, CivCultureCardList);