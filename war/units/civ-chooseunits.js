import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js";

class CivChooseUnits extends CivDataList(PolymerElement) {
  static get template() {
    return html`
     <style>
      .horizontal {
          @apply(--layout-horizontal);
          margin-top: 10px;
      }
      </style>


     <div>
        <civ-listunits id="resources" style="display:none"></civ-listunits>

        <div id="empty" style="display:none">
          {{localize('nounits')}}
        </div>

        <div class="horizontal">
          <civ-units id="choosed"></civ-units>
          <slot></slot>
        </div>
       </div>
`;
  }

  static get is() {
    return 'civ-chooseunits';
  } // data: units


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseUnits.is, CivChooseUnits);
