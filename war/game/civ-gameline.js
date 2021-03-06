import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";

class CivGameLine extends PolymerElement {
  static get template() {
    return html`
<style include="civ-paper-button-styles">
    /* local styles go here */

    :host {
      display: inline-block;
      text-transform: none;
    }
    paper-button {
      font-family: 'Roboto', 'Noto', sans-serif;
      font-weight: normal;
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
      text-transform: none;
  }

  </style>

    <!-- shadow DOM goes here -->
    <span>
      <paper-button raised="" class="green" on-click="handleClick">{{button()}}</paper-button>
      <span style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                   border-radius: 5px;
                   background-color: #fff;
                   color: #444;
                   padding:10px;"> {{content()}} </span>
    </span>
`;
  }

  static get is() {
    return 'civ-gameline';
  }

  handleClick() {
    C.resumedialog(this.index);
  }

  button() {
    var li = JSON.parse(C.getlistofgames());
    var e = li[this.index];
    var s = "";

    for (var i = 0; i < e.civ.length; i++) {
      s += e.civ[i] + " ";
    }

    return s;
  }

  content() {
    var li = JSON.parse(C.getlistofgames());
    var e = li[this.index];
    var createdS = C.datetos(e.createtime);
    var accessedS = C.datetos(e.accesstime);
    var phaseS = C.getphasedescr(e.phase)
    var no = e.round;
    var wininfo = ""
    if (e.endofgame != null) wininfo = C.localize('wininfo','civ',e.endofgame.winner,'victory',C.localize(e.endofgame.wintype + "label"))
    const q = C.localize('resumegameline', 'accesstime', accessedS, 'createtime', createdS, 'phase', phaseS, 'roundno', no + 1,'winner',wininfo);
    return q;
  } // Declare properties for the element's public API


  static get properties() {
    return {
      index: {
        type: Number,
        value: "not defined"
      }
    };
  }

} // Register the x-custom element with the browser


customElements.define(CivGameLine.is, CivGameLine);
