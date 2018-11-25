import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { Polymer } from "../node_modules/@polymer/polymer/polymer-legacy.js";
import { CivDataList } from "../js/civ-datalist.js";

class CivChooseCultureCards extends CivDataList(PolymerElement) {
  static get template() {
    return html`
     <style>
      .horizontal {
          @apply(--layout-horizontal);
      }
      </style>


     <div>
        <slot name="title"></slot>
        <civ-culturecardlist id="resources" style="display:none"></civ-culturecardlist>

        <div id="empty" style="display:none">
          {{localize('noculturecards')}}
        </div>

        <div class="horizontal">
          <civ-culturecard id="choosed"></civ-culturecard>
          <slot></slot>
      </div>
      </div>
`;
  }

  static get is() {
    return 'civ-chooseculturecards';
  } // data: cards


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseCultureCards.is, CivChooseCultureCards);