import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js"

class CivChooseBuilding extends CivDataList(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

      .horizontal {
          @apply(--layout-horizontal);
          margin-top : 12px;
      }

      </style>


     <div>
        <slot name="title"></slot>
        <civ-listbuildbuy id="resources" style="display:none"></civ-listbuildbuy>

        <div id="empty" style="display:none">
          {{localize('nobuildings')}}
        </div>

        <div class="horizontal">
          <civ-buildinginfo class="building" id="choosed"></civ-buildinginfo>
          <slot></slot>
        </div>
      </div>
`;
  }

  static get is() {
    return 'civ-choosebuilding';
  } // data: list of buildings


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseBuilding.is, CivChooseBuilding);
