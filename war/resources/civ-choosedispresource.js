import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDataList } from "../js/civ-datalist.js"

class CivChooseDispResource extends CivDataList(PolymerElement) {
  static get template() {
    return html`
     <style>
      .horizontal {
          @apply(--layout-horizontal);
      }
      </style>


     <div>
        <civ-listres id="resources" style="display:none"></civ-listres>

        <div id="empty" style="display:none">
          {{localize('noresources')}}
        </div>

        <hr>

        <div class="horizontal">
          <civ-dispres id="choosed"></civ-dispres>
          <slot></slot>
      </div>
      </div>
`;
  }

  static get is() {
    return 'civ-choosedispresource';
  } 

  /**
   * list of dispresource: hv and resource
  */ 
  refresh(data) {
    super.refreshchooselist(data);
  }

}

window.customElements.define(CivChooseDispResource.is, CivChooseDispResource);
