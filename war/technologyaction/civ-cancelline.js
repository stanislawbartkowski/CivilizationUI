import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import {CivChooseData} from "../js/civ-choosedata.js"

class CivCancelLine extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
<style>

.opponent {
  border:  1px;
  padding-left: 2%;
  padding-right: 2%;
  border-style: ridge;
  font-size: 150%;
  background-color: #f7e7e0;
}

</style>

   <div class="opponent">{{commandtouse}} <civ-resources id="reso"></civ-resources></div>

`;
  }

  static get is() {
    return 'civ-cancelline';
  }

  static get properties() {
      return {
          commandtouse: {
             type: String,
             value: null
        },
      }
  }



  /** Display single line with command to cancel
  * data: Example {"civ":"China","command":"WRITINGACTION","param":"Spy"}
  */

  refresh(data) {
    this.commandtouse = C.commandtoname(data.command)
    const r = this.$.reso
    r.draw([{ "resource" : data.param, "num" : 1}])
  }

}

customElements.define(CivCancelLine.is, CivCancelLine);
