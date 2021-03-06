import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivBattleSide extends CivData(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style">

:host {
  display: inline-block;
}

</style>


<div>
   <div id="opponent" style="display:none">
     <battle-desc id="oppo_desc"></battle-desc>
     <br>
     <s-svg src="images/icons/killed.svg" style="height:60px; width:60px"></s-svg>
     <civ-listunits id="oppo_killed"></civ-listunits>
     <p>
<!--      <s-svg src="images/icons/waiting.svg" style="height:60px; width:60px"></s-svg> -->
     <img src="images/icons/waiting.svg" style="height:60px; width:60px">
     <civ-listunits id="oppo_waiting" draggable="true" you="{{you}}"></civ-listunits>
     </p><p>
   </p></div>

   <s-svg id="attack" src="images/icons/attack.svg" style="height:60px; width:60px"></s-svg>
   <template is="dom-repeat" items="{{front}}">
      <civ-frontunit id="front_{{index}}" data="{{item}}" num="{{index}}" you="{{you}}" turn="{{turn}}"></civ-frontunit>
   </template>

   <div id="you" style="display:none">
     <p>
<!--     <s-svg src="images/icons/waiting.svg" style="height:60px; width:60px"></s-svg> -->
     <img src="images/icons/waiting.svg" style="height:60px; width:60px">
     <civ-listunits id="you_waiting" draggable="true" you="{{you}}"></civ-listunits>
     </p><p>
      <s-svg src="images/icons/killed.svg" style="height:60px; width:60px"></s-svg>
      <civ-listunits id="you_killed"></civ-listunits>
      <br>
      <battle-desc id="you_desc"></battle-desc>
   </p></div>

</div>
`;
  }

  static get is() {
    return 'civ-battleside';
  } // Declare properties for the element's public API


  static get properties() {
    return {
      you: {
        type: Boolean
      },
      front: {
        type: Array
      },
      turn: {
        type: Boolean
      }
    };
  }

  _getelems() {
    const d = {};

    if (this.you) {
      d.w = this.$.you_waiting;
      d.k = this.$.you_killed;
      d.de = this.$.you_desc;
    } else {
      d.w = this.$.oppo_waiting;
      d.k = this.$.oppo_killed;
      d.de = this.$.oppo_desc;
    }

    return d;
  }

  _displayd() {
    C.displayelemid(this, "you", false);
    C.displayelemid(this, "opponent", false);
    if (this.you) C.displayelemid(this, "you", true);else C.displayelemid(this, "opponent", true);
  }

  switchoff() {
    for (var i = 0; i < this.front.length; i++) {
      const n = "front_" + i;
      const un = C.getdomelem(this, n);
      un.removeAttribute("highlight");
    }
  }

  isironon() {
    const p = this._getelems();

    return p.de.isironon();
  }

  _draw(data) {
    this.turn = data.turn;
    const atta = this.$.attack;
    if (data.turn) atta.changecolor("red");else atta.changecolor("black");
    this.front = [];

    for (var i = 0; i < data.front.length; i++) {
      var f = data.front[i];
      if (f != null) f.unit.level = C.findUnitLevel(data.waiting.units, f.unit.name);
      this.front.push(f);
    }

    this._displayd();

    const d = this._getelems();

    const ki = {};
    ki.list = data.killedunits;
    d.k.draw(ki);
    d.w.draw(data.waiting);
    d.de.draw(data);
  }

  open(data, you) {
    this.you = you;

    this._draw(data);
  }

  refresh(data) {
    this._draw(data);
  }

} // Register the x-custom element with the browser


customElements.define(CivBattleSide.is, CivBattleSide);
