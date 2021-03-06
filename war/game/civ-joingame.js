import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";

class CivJoinGame extends PolymerElement {
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
    <template id="civs" is="dom-repeat" items="{{lines()}}">
       <paper-button id="{{item}}" raised="" class="green" on-click="_handleClick">{{item}}</paper-button>
    </template>

      <span style="box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                   border-radius: 5px;
                   background-color: #fff;
                   color: #444;
                   padding:10px;"> {{content()}} </span>
`;
  }

  static get is() {
    return 'civ-joingame';
  }

  _handleClick(p) {
    var li = JSON.parse(C.getlistofjoingames());
    var e = li[this.index];
    C.joingamedialog(e.gameid, p.target.id);
  }

  lines() {
    var li = JSON.parse(C.getlistofjoingames());
    var e = li[this.index];
    return e.waiting;
  }

  content() {
    var li = JSON.parse(C.getlistofjoingames());
    var e = li[this.index];
    var s = C.localize("opponent"); //        if (e.players.length > 1) s += "s"

    s += " ";

    for (var i = 0; i < e.players.length; i++) s += e.players[i] + " ";

    s += C.localize("created") + C.datetos(e.createtime);
    return s;
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


customElements.define(CivJoinGame.is, CivJoinGame);
