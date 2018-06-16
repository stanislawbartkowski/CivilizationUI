import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivNonDraggableDialog } from "../js/civ-nondraggabledialog.js";

class BattleDialog extends CivNonDraggableDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h1>{{localize('battle')}}</h1>
      <p>

      <civ-battleside id="sideopponent"></civ-battleside>
      </p><p>
      <civ-battleside id="sideyou"></civ-battleside>


  </p></paper-dialog>
`;
  }

  static get is() {
    return 'battle-dialog';
  }

  battlemove(e) {
    const from = e.startnum;
    const to = e.destnum;
    const pa = {};
    pa.row = from;
    pa.col = to;
    if (e.isironon) C.executeC("PLAYUNITIRON", pa);else C.executeC("PLAYUNIT", pa);
  }

  _ret(pa) {
    const par = {};
    par.you = this.$.sideyou;
    par.opp = this.$.sideopponent;
    const battle = pa.board.battle;
    par.a = battle.attacker;
    par.d = battle.defender;
    return par;
  }

  openIt(data) {
    const par = this._ret(data);

    if (par.a.you) {
      par.you.open(par.a, true);
      par.opp.open(par.d, false);
    } else {
      par.you.open(par.d, true);
      par.opp.open(par.a, false);
    }

    super.openIt(data);
    CivUnitsDraggable.registerCallBack(this.battlemove);
  }

  refresh(data) {
    const par = this._ret(data);

    if (par.a.you) {
      par.you.refresh(par.a);
      par.opp.refresh(par.d);
    } else {
      par.you.refresh(par.d);
      par.opp.refresh(par.a);
    }
  }

}

window.customElements.define(BattleDialog.is, BattleDialog);
