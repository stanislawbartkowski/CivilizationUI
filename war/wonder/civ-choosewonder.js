import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js"

class CivChooseWonder extends CivDataList(PolymerElement) {
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
        <civ-dispwonders id="resources" style="display:none"></civ-dispwonders>

        <div id="empty" style="display:none">
          {{localize('nowonders')}}
        </div>

        <div class="horizontal">
          <civ-wonder id="choosed"></civ-wonder>
          <slot></slot>
        </div>
      </div>
`;
  }

  static get is() {
    return 'civ-choosewonder';
  } // data: list of wonders


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseWonder.is, CivChooseWonder);
