import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivCulturePlayers extends CivData(PolymerElement) {
  static get template() {
    return html`
  <style>
     :host {
       display: flex;
      }
     .track {
       margin-right: 5px;
     }

  </style>

<div id="main">
  <civ-culturetrack id="track" class="track"></civ-culturetrack>
  <civ-cultureprogress id="player1" class="track"></civ-cultureprogress>
  <civ-cultureprogress id="player2" style="display:none"></civ-cultureprogress>
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-cultureplayers';
  } // pa :
  // [{"civ" : civ, "culture" : culture}]


  refresh(pa) {
    if (pa == null) {
      C.displayelem(this.$.main, false);
      C.displayelem(this.$.player1, false);
      C.displayelem(this.$.player2, false);
      return;
    }

    C.displayelem(this.$.main, true, "flex");
    this.$.track.draw({});
    C.displayelem(this.$.player1, true, true);
    this.$.player1.draw(pa[0]);

    if (pa.length > 1) {
      C.displayelem(this.$.player2, true, true);
      this.$.player2.draw(pa[1]);
    }
  }

}

window.customElements.define(CivCulturePlayers.is, CivCulturePlayers);