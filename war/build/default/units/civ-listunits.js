import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivListUnits extends CivData(PolymerElement) {
  static get template() {
    return html`
   <span id="map">
     <template is="dom-repeat" items="{{units}}">
             <civ-units class="unit" data="{{item}}" draggable="{{draggable}}" num="{{index}}" you="{{you}}"></civ-units>
     </template>
    </span>

    <div id="empty" style="display:none">
       {{localize('nounits')}}
    </div>

    <span id="units" style="display:none">
      <civ-units class="unitelem" id="infantry"></civ-units>
      <civ-units class="unitelem" id="artillery"></civ-units>
      <civ-units class="unitelem" id="mounted"></civ-units>
      <civ-units class="unitelem" id="aircraft"></civ-units>
    </span>
`;
  }

  static get is() {
    return 'civ-listunits';
  }

  static get properties() {
    return {
      units: {
        type: Array
      },
      draggable: {
        type: Boolean
      },
      you: {
        type: Boolean
      }
    };
  }

  _findLevel(pa, name) {
    return C.findUnitLevel(pa.units, name);
  }

  _islist(pa) {
    return pa.list != null;
  }

  _showunits(show) {
    C.displayelemid(this, "units", show, true);
  }

  _drawlist(pa) {
    this._showunits(false);

    C.displayelemid(this, "empty", false);
    const l = pa.list;
    this.units = [];

    if (l.length == 0) {
      C.displayelemid(this, "empty", true);
      return;
    }

    for (var i = 0; i < l.length; i++) {
      const elem = {};
      elem.name = l[i].name;
      elem.strength = l[i].strength;
      elem.level = this._findLevel(pa, elem.name);
      elem.index = i;
      this.units.push(elem);
    }

    const fun = this.fun;
    if (fun != null) super.runmap(pa, "civ-units", elem => {
      elem.fun = p => fun(p);
    });
  }

  _drawunits(pa) {
    this._showunits(true);

    this.units = [];
    C.setUnitsNumb(this.$.units, pa);
    const fun = this.fun;

    for (var i = 0; i < pa.units.length; i++) {
      const n = pa.units[i].name.toLowerCase();
      const ee = this.$[n];
      if (pa.units[i].num >= 1) ee.fun = p => fun(p);else ee.fun = null;
    }
  } //  pa.list (of units)
  //  or
  //


  refresh(pa) {
    if (this._islist(pa)) this._drawlist(pa);else this._drawunits(pa);
  }

}

window.customElements.define(CivListUnits.is, CivListUnits);