import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivHelpText extends CivData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
<div id="div" title="">
   <iron-icon icon="editor:text-fields" style="height:20px"></iron-icon>
</div>
`;
  }

  constructor() {
    super();
    addListener(this, 'tap', () => this.handleClick());
  }

  static get is() {
    return 'civ-helptext';
  } // not implemented


  handleClick() {
    if (this.fun == null) return;
    const t = this.fun();
    C.log(t);
  }

  setHelpText(te) {
    C.settitle(this.$.div, te);
  }

}

customElements.define(CivHelpText.is, CivHelpText);
