import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivGameState extends CivData(PolymerElement) {
  static get template() {
    return html`
    <style>
     :host {
        display: block;
      }

    </style>

        <span style="display: inline-block; width:40%;">[[activecivname]]</span>
        <span style="display: inline-block; width:20%">[[turnno]]</span>
        <span style="display: inline-block; width:30%;">[[phaselabel]]</span>
`;
  }

  static get is() {
    return 'civ-gamestate';
  }

  static get properties() {
    return {
      activecivname: {
        type: String,
        value: undefined
      },
      turnno: {
        type: String,
        value: undefined
      },
      phase: {
        type: String,
        value: undefined,
        observer: '_setphasename'
      },
      phaselabel: {
        type: String,
        value: undefined
      }
    };
  }

  _setphasename(newValue, oldValue) {
    if (C.emptyS(newValue)) {
      this.phaselabel = null;
      return;
    }

    this.phaselabel = C.getphasedescr(newValue);
  }

  phasename() {
    if (this.phase == null) return null;
    return C.getphasedescr(this.phase);
  }

  refresh(b) {
    if (b == null) {
      this.turnno = null;
      this.activecivname = null;
      this.phase = null;
      return;
    }

    const g = b.board.game
    this.turnno = this.localize('labelroundno', 'roundno', g.roundno + 1)
    if (C.isendofgame(b)) this.activecivname = b.board.endofgame.winner + " : " + C.localize(b.board.endofgame.wintype + "label")
    else this.activecivname = this.localize('nowplayinglabel', 'active', g.active)
    this.phase = g.phase
  }

}

window.customElements.define(CivGameState.is, CivGameState);
