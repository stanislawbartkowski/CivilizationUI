import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivTLevel extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style">

:host {
  vertical-align: top;
  display: inline-block;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: #ddd;
  line-height: 64px;
  font-size: 30px;
  color: #555;
  text-align: center;
  }


</style>

</custom-style>

<span>{{levels}}</span>
`;
  }

  static get is() {
    return 'civ-tlevel';
  }

  static get properties() {
    return {
      levels: {
        type: String
      }
    };
  }

  refresh(data) {
    var s = "I";
    if (data == 2) s = "II";
    if (data == 3) s = "III";
    if (data == 4) s = "IV";
    this.levels = s;
  }

}

customElements.define(CivTLevel.is, CivTLevel);