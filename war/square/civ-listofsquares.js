import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivListOfSquares extends CivData(PolymerElement) {
  static get template() {
    return html`
<style>
    :host {
      display: inline-block;
    }
    </style>

   <div id="noscouts" style="display:none">{{localize('noscoutsforculture')}}</div>
   <div id="selectscouts" style="display:none">{{selectscouts}}</div>

   <template id="list" is="dom-repeat" items="{{list}}">
     <civ-square data="{{item}}"></civ-square>
   </template>
`;
  }

  static get is() {
    return 'civ-listofsquares';
  }

  static get properties() {
    return {
      list: {
        type: Array
      },
      selected: {
        type: Array
      },
      selectscouts: {
        type: String,
        value: null
      }
    };
  }

  _displayselect() {
    const sel = this.selected;
    const no = this.data.length - sel.length;
    if (no > 0) this.selectscouts = C.localize('selectscoutsonmap', 'num', '' + no);else this.selectscouts = C.localize('nomorescoutstoselect');
  }

  _rehreshlistofpoints() {
    const li = [];

    for (var i = 0; i < this.data.length; i++) {
      var j;

      for (j = 0; j < this.selected.length; j++) if (C.eqp(this.data[i], this.selected[j])) break;

      if (j >= this.selected.length) li.push(this.data[i]);
    }

    C.setlistofpoints(li);

    this._displayselect();
  }

  addSquare(s) {
    this.list.push(s.square);
    this.$.list.render();
    const p = {};
    p.row = s.row;
    p.col = s.col;
    this.selected.push(p);

    this._rehreshlistofpoints();

    if (this.fun != null) this.fun(s);
  }

  getSelected() {
    return this.selected;
  }

  refresh(pa) {
    C.displayelem(this.$.noscouts, pa.length == 0);
    C.displayelem(this.$.selectscouts, pa.length != 0);
  }

  setlist(pa) {
    this.list = [];
    this.selected = [];

    this._rehreshlistofpoints();
  }

}

window.customElements.define(CivListOfSquares.is, CivListOfSquares);
