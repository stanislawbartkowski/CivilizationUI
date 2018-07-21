import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivDispRes extends CivData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
<style>
     .vertical {
       @apply(--layout-vertical);
     }
     .empty {
       height : 54px;
     }
</style>

  <div class="vertical">
     <div id="hvx" class="empty" style="display:None"></div>
     <civ-resources id="hv" style="display:None"> </civ-resources>
     <civ-resources id="res"> </civ-resources>
  </div>
`;
  }

  constructor() {
    super();
    addListener(this, 'tap', () => this.handleClick());
  }

  static get is() {
    return 'civ-dispres';
  }

  handleClick() {
    if (this.fun == null) return;
    this.fun(this.data);
  }

  /**
   * hv : Hut or Village or findUnitLevel
   * resource : resources
   */


  refresh(data) {
    const hv = this.$.hv;
    const hvx = this.$.hvx;
    const res = this.$.res;

    if (data.hv != null) {
      hv.draw(C.createRes(data.hv));
      C.displayelem(hvx, false);
      C.displayelem(hv, true, true);
    } else {
      C.displayelem(hv, false);
      C.displayelem(hvx, true, true);
    }

    res.draw(C.createRes(data.resource));
  }

}

window.customElements.define(CivDispRes.is, CivDispRes);
