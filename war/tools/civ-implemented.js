import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivImplemented extends CivData(PolymerElement) {
  static get template() {
    return html`
<style>

 .not {
   height:15px;
   display:none
 }

</style>

  <img id="notimplemented" class="not" src="images/icons/thumbdown.svg" title="{{localize('notimplemented')}}">
  <img id="implemented" class="not" src="images/icons/thumbup.svg" title="{{localize('implemented')}}">
`;
  }

  static get is() {
    return 'civ-implemented';
  }

  draw(data) {
    const ni = this.$.notimplemented;
    const ii = this.$.implemented;
    C.displayelem(ni, false);
    C.displayelem(ii, false);
    if (data) C.displayelem(ni, true, true);else C.displayelem(ii, true, true);
  }

}

customElements.define(CivImplemented.is, CivImplemented);
