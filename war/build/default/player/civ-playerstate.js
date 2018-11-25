import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivPlayerState extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style" include="civ-paper-button-styles">

  .statusstyle {
  }

</style>

</custom-style>

<span class="statusstyle actionbox">

  <civ-stateelem id="state1"></civ-stateelem>
  <civ-stateelem id="state2"></civ-stateelem>
  <civ-stateelem id="state3"></civ-stateelem>
  <civ-stateelem id="state4"></civ-stateelem>
  <civ-stateelem id="state6"></civ-stateelem>
  <civ-stateelem id="state5"></civ-stateelem>
  <civ-stateelem id="state7"></civ-stateelem>

</span>
`;
  }

  static get is() {
    return 'civ-playerstate';
  }

  static get properties() {
    return {
      refreshalways: {
        type: Boolean,
        value: false
      }
    };
  }

  _disp(e, image1, text1, image2, text2, fun1, fun2) {
    const r = {};
    r.image1 = image1;
    r.text1 = text1;
    r.image2 = image2;
    r.text2 = text2;
    r.fun1 = fun1;
    r.fun2 = fun2;
    e.draw(r);
  }

  _createinfo(label, no) {
    return C.localize(label) + ": " + no;
  }

  refresh(y) {
    const numberoftrade = this._createinfo("tradelabel", y.trade);

    const citieslimit = this._createinfo("citiesleft", y.citylimit);

    const armieslimit = this._createinfo("armiesleft", y.armieslimit);

    const scoutslimit = this._createinfo("scoutsleft", y.scoutslimit);

    const handsize = this._createinfo("handsize", y.handsize);

    const economy = C.localize("economystatus", "coins", "" + y.coins);

    const combatbonus = this._createinfo("combatbonus", y.combatbonus);

    this.government = y.gover;

    this._disp(this.$.state1, "tokens/trade.svg", numberoftrade, "resource/coin.svg", economy);

    this._disp(this.$.state2, "figures/army.svg", armieslimit, "figures/scout.svg", scoutslimit);

    this._disp(this.$.state3, "icons/attack.svg", combatbonus, "icons/hand.svg", handsize);

    this._disp(this.$.state4, "cities/city.svg", citieslimit, "cities/gover.svg", y.gover);

    this._disp(this.$.state6, "icons/speed.svg", this._createinfo("travelspeed", y.travelspeed), "icons/stacklimit.svg", this._createinfo("stacklimit", y.stacklimit));

    this._disp(this.$.state5, "cities/research.svg", C.localize('researchlabel'), "icons/buywonder.svg", C.localize('wonders'), () => C.showresearch(this.data), () => C.showwonders(this.data));

    this._disp(this.$.state7, "icons/greatpersona.svg", C.localize('greatperson'), "icons/cards.svg", C.localize('culturecards'), () => C.showgreatpersons(this.data), () => C.showculturecards(this.data, C.localize('yourculturecards', 'civ', y.civ)));
  }

}

customElements.define(CivPlayerState.is, CivPlayerState);