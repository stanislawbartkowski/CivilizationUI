import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivMarket extends CivData(PolymerElement) {
  static get template() {
    return html`
 <style is="custom-style" include="iron-flex iron-flex-alignment"></style>

 <style is="custom-style" include="civ-paper-button-styles">


:host {
    text-transform: none;
  }

  .unitname {
    border-radius: 15px;
    width: 90%;
    height: 30px;
    text-align: center;
    font-size: 150%;
    padding-top: 5px;
    background-color : YellowGreen ;
    margin-left: 5px;
  }

  .unitbox {
     margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     border-radius: 5px;
     vertical-align: top;
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
   }

   .unitelem {
     margin : 4px;
   }

   .units {
      display: flex;
      float: left;
   }

   .resourcesbox {
     margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     border-radius: 5px;
     vertical-align: top;
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
     width : 110px;
   }

   .buildings {
     margin-top : 5px;
     width : 270px;
   }

   .wondersbox {
     vertical-align: top;
     margin-left: 5px;
     margin-top: 2px;
     display: flex;
     flex-direction: column;
     flex-wrap: wrap;
     width : 470px;
   }

   .culture {
     width : 20px;
   }

  </style>

<div style="display:flex; float : left">

  <div>
  <div class="units">
    <div id="units" class="unitbox">
      <div class="unitname">{{localize('units')}}</div>
      <civ-units class="unitelem" id="infantry"></civ-units>
      <civ-units class="unitelem" id="artillery"></civ-units>
      <civ-units class="unitelem" id="mounted"></civ-units>
      <civ-units class="unitelem" id="aircraft"></civ-units>
    </div>

    <div id="killed" class="unitbox">
      <div class="unitname">{{localize('killedunits')}}</div>
      <civ-units class="unitelem" id="infantry"></civ-units>
      <civ-units class="unitelem" id="artillery"></civ-units>
      <civ-units class="unitelem" id="mounted"></civ-units>
      <civ-units class="unitelem" id="aircraft"></civ-units>
    </div>

   </div>

    <civ-buildings class="buildings" id="bld"></civ-buildings>


   <div style="float:left">
    <div class="resourcesbox">
      <div class="unitname">{{localize('resources')}}</div>
      <civ-resources id="resources"> </civ-resources>
    </div>

    <div>
      <paper-button class="indigo" on-click="_showCultureCards">
       {{localize('culturecards')}}
      </paper-button>
    </div>
    </div>

    <div class="wondersbox">
      <div class="unitname">{{localize('wonders')}}</div>
      <civ-dispwonders id="wonders"></civ-dispwonders>
    </div>

  </div>

   <civ-cultureplayers id="culture" class="culture"></civ-cultureplayers>

  </div>
`;
  }

  static get is() {
    return 'civ-market';
  }

  static get properties() {
    return {
      refreshalways: {
        type: Boolean,
        value: false
      }
    };
  }

  _clearunits(e) {
    const na = C.unittypes();

    for (var i = 0; i < na.length; i++) {
      const u = na[i];

      const elem = C._getbyid(e, u);

      elem.draw(null);
    }
  }

  _showCultureCards() {
    C.showcultureusedcards(this.data);
  }

  _displayres() {
    const b = this.data;
    const listda = C.convertResourcesToList(b.board.resources, b.board.hutvillagesused);
    C.opendialogwithpar("showhv-dialog", listda);
  }

  _createcul(p) {
    const c = {};
    c.civ = p.civ;
    c.culture = p.cultureprogress;
    return c;
  }

  refresh(b) {
    const res = this.$.resources;

    if (b == null) {
      res.draw(null);

      this._clearunits(this.$.units);

      this._clearunits(this.$.killed);

      this.$.culture.draw(null);
      return;
    }

    const units = b.board.units;
    const killed = b.board.killedunits;
    C.setUnitsNumb(this.$.units, units);
    C.setUnitsNumb(this.$.killed, killed);
    const r = C.concatHV(b.board.resources, b.board.hutvillagesused);
    res.draw(r);

    res.fun = e => this._displayres();

    const bld = this.$.bld;
    bld.draw(b.board.buildings);
    const wo = this.$.wonders;
    wo.draw(b.board.wonders);
    const cul = this.$.culture;
    const plcul = [];
    plcul.push(this._createcul(b.board.you));
    if (b.board.others.length == 1) plcul.push(this._createcul(b.board.others[0]));
    cul.draw(plcul);
    const ekilled = this.$.killed;

    for (var j = 0; j < C.unittypes().length; j++) {
      const e = C._getbyid(ekilled, C.unittypes()[j]);

      e.fun = p => C.showunits(killed);
    }
  }

}

customElements.define(CivMarket.is, CivMarket);
