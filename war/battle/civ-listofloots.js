import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDrawList } from "../js/civ-drawlist.js";

class CivListOfLoots extends CivDrawList(PolymerElement) {
  static get template() {
    return html`
  <style>
       .horizontal {
         @apply(--layout-horizontal);
       }
  </style>

<div id="map" class="horizontal">
  <template id="list" is="dom-repeat" items="{{res}}">
    <loot-cost id="i{{index}}" data="{{item}}"></loot-cost>
 </template>
<div>

`;
  }

  static get is() {
    return 'civ-listoftools';
  }

   /** List of battle lots
    * [] : list
  **/
  refresh(pa) {
    super.drawlist(pa,"loot-cost")
  }

}

window.customElements.define(CivListOfLoots.is, CivListOfLoots);
