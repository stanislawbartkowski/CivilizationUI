import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivSelectSquare extends CivData(PolymerElement) {
  static get template() {
    return html`
      <civ-square id="square" row="-1" col="-1"></civ-square>
`;
  }

  static get is() {
    return 'civ-selectsquare';
  }

  getPoint() {
    return this.data;
  }

  refresh(data) {
    if (data == null) this.$.square.draw(null);else this.$.square.draw(data.square);
  }

}

window.customElements.define(CivSelectSquare.is, CivSelectSquare);