import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js";

class CivChooseGreatPerson extends CivDataList(PolymerElement) {
  static get template() {
    return html`
     <style>
      .horizontal {
          @apply(--layout-horizontal);
      }
      </style>


     <div>
        <slot name="title"></slot>
        <civ-greatpersonlist id="resources" style="display:none"></civ-greatpersonlist>

        <div id="empty" style="display:none">
          {{localize('nogreatpersons')}}
        </div>

        <div class="horizontal">
          <civ-greatperson id="choosed"></civ-greatperson>
          <slot></slot>
      </div>
      </div>
`;
  }

  static get is() {
    return 'civ-choosegreatperson';
  } // data: greatpersonlist


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseGreatPerson.is, CivChooseGreatPerson);