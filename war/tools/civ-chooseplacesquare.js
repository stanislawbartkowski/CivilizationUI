import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivChooseSquarePlace extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style" include="civ-paper-button-styles">

:host {
    display: inline-block;
  }

 .elem {
   vertical-align: top;
   display : none
 }

</style>
</custom-style>


<div id="place">
    <civ-selectsquare id="square"></civ-selectsquare>

    <paper-button id="build" class="green elem" on-click="_onClick">{{buildbutton}}</paper-button>
    <paper-button id="replace" style="margin-left:30px" class="indigo elem" on-click="_onClick">{{localize('replace')}}</paper-button>
    <civ-square id="b" class="elem"></civ-square>
    <civ-square id="r" class="elem"></civ-square>
   </div>
`;
  }

  static get is() {
    return 'civ-choosesequareplace';
  }

  static get properties() {
    return {
      nameid: {
        type: String
      },
      buildbutton: {
        type: String
      },
      refreshalways: {
        type: Boolean,
        readOnly: true,
        value: true
      },
      name: {
        type: String
      },
      buildcommand: {
        type: String
      }
    };
  }

  _draws(r, p) {
    // absolute coordinates
    const s = C.wgetsquare(p.row, p.col);
    C.displayelem(r, true, true);
    r.draw(s);
  }

  _onClick() {
    const p = this.$.square.getPoint();
    const name = this.name;
    const city = C.getIListCityP(this.data, this.nameid, name, p);
    const pa = {};
    pa.row = city.row;
    pa.col = city.col;
    const param = {};
    param.p = {
      "row": p.row,
      "col": p.col
    };
    param[this.nameid] = name;
    pa.param = param;
    C.executewithconf(null, this.buildcommand.toUpperCase(), pa);
    if (this.fun != null) this.fun();
  }

  _clean() {
    C.displayelem(this.$.square, false);
    this.$.square.draw(null);
    const l = ["build", "replace", "b", "r"];

    for (var i = 0; i < l.length; i++) C.displayelemid(this, l[i], false);
  }

  setBuildCommand(command, nameid) {
    this.buildcommand = command;
    this.nameid = nameid;
  }

  setPoint(p, name) {
    this._clean();

    this.name = name;
    C.displayelem(this.$.square, true, true);
    this.$.square.draw(p);
    const res = C.getIListOfReplace(this.data, this.nameid, name, p);

    if (res.length == 0) {
      C.displayelem(this.$.build, true, true);
      return;
    }

    C.displayelem(this.$.replace, true, true);

    this._draws(this.$.b, res[0]);

    if (res.length > 1) this._draws(this.$.r, res[1]);
  }

  refresh(data) {
    this._clean();

    if (data == null) {
      C.displayelem(this.$.place, false);
      return;
    }

    C.displayelem(this.$.place, true, true);
  }

}

customElements.define(CivChooseSquarePlace.is, CivChooseSquarePlace);
