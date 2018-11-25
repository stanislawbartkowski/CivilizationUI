import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js";

class CivChooseResource extends CivDataList(PolymerElement) {
  static get template() {
    return html`
     <style>
      .horizontal {
          @apply(--layout-horizontal);
      }
      </style>


     <div>
        <civ-resources id="resources" style="display:none"></civ-resources>

        <div id="empty" style="display:none">
          {{localize('noresources')}}
        </div>

        <hr>

        <div class="horizontal">
          <civ-resources id="choosed"></civ-resources>
          <slot></slot>
      </div>
      </div>
`;
  }

  static get is() {
    return 'civ-chooseresource';
  } // data: list of resource


  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseResource.is, CivChooseResource);