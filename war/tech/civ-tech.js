import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import {CivChooseData} from "../js/civ-choosedata.js"

class CivTech extends CivChooseData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style" include="civ-paper-button-styles">

:host {
    display: inline-block;
    border : 1px solid;
    border-radius: 5px;
    width: 115px;
    height: 60px;
    vertical-align: top;
    padding : 5px;
    position: relative;
  }

:host([disa]) {
  background-color : #afa7a7
}

.name {
  display:inline-block;
  width:80%;
/*  height:25%; */
}

.gover {
  background-color: #ecd6ba;
  padding : 2px;
  font-size: 80%;
}

.goverempty {
  height : 50%;
}

.units {
  background-color: #e2a799;
  padding : 2px;
  font-size: 80%;
}

.structure {
  background-color: #dfeaf1;
  position:absolute;
  bottom : 0px;
  height : 25%;
  width: 93%;
}

.text {
  position:absolute;
  bottom : 0px;
  right: 2px;
  font-size : 0.9em;
  line-height : 1.2em;
}

.not {
  height:15px;
  vertical-align: top;
}

.coins {
  position:absolute;
  bottom : 2px;
  right : 35px;
  height:15px;
}

.imagelevel {
  width:15px;
}

</style>

</custom-style>

<div style="height:26%">
   <div class="name">{{name}}</div>
   <civ-implemented id="notimplemented" class="not"></civ-implemented>
</div>

   <hr>

   <div style="height:50%">
     <div class="gover" id="gover">{{gover}}</div>
     <div class="goverempty" id="goverempty"></div>
     <div class="units" id="units">{{units}}</div>
   </div>

   <div class="structure" id="building">{{building}}</div>

   <img id="coins" hidden="" class="coins" src="images/resource/coin.svg" title="{{localize('coinlabel')}}">
   <paper-badge hidden="" id="coinsnumber" for="coins" label="99">
   </paper-badge>

   <civ-helptext id="helptext" class="text"></civ-helptext>
`;
  }

  static get is() {
    return 'civ-tech';
  }

  static get properties() {
    return {
      name: {
        type: String
      },
      level: {
        type: Number
      },
      tech: {
        type: Object
      },
      gover: {
        type: String
      },
      units: {
        type: String
      }
    };
  }

  _name() {
    return this.tech.name;
  }

  _gover() {
    return this.tech.gover;
  }

  _building() {
    return this.tech.building;
  }

  _ni() {
    return this.tech.ni;
  }

  _units() {
    return this.tech.units;
  }

  _level() {
    return this.tech.n.level;
  }

  _setuptech() {
    this.tech = C.findTech(this.data.tech);
  }

  _disa() {
    if (this.data.disa) C.setattr(this, "disa", 1);else C.removeattr(this, "disa");
  }

  _coins() {
    const coins = this.$.coins;
    const coinsnumber = this.$.coinsnumber;

    if (this.data.coins == null || this.data.coins == 0) {
      C.showeleme(coins, false);
      C.showeleme(coinsnumber, false);
      return;
    }

    C.showeleme(coins, true);
    C.displaybadge(coinsnumber, this.data.coins);
  }

  _setupunits() {
    //      "unitslevel" : "{units}  Level: {level}",
    const u = this._units();

    if (u.name != null) this.units = C.localize("unitslevel", "units", u.name, "level", u.level);else this.units = C.localize("unitsall", "level", u.level);
  }

  /** Display single technlogoy
   * data  tech : technology name
   * data  disa : disabled or null
   * data  coins : number of coins, can be null
   * data  level : player level (including initial tech)
   *   Example: {"tech":"Communism","level":1,"coins":0,"disa" : true}
  */

  refresh(data) {
    super.setDisa(data.disa);

    this._setuptech();

    const h = this.$.helptext;
    h.setHelpText(this.tech.desc);
    this.name = C.localize(this._name());
    if (this.name == null || this.name == "") this.name = "*" + this._name();
    const ni = this.$.notimplemented;
    ni.draw(this._ni());
    C.displayelemid(this, "gover", false);
    C.displayelemid(this, "goverempty", false);
    C.displayelemid(this, "building", false);
    C.displayelemid(this, "units", false);
    this.gover = this._gover();
    this.building = C.localize(this._building());
    if (this.gover != null) C.displayelemid(this, "gover", true);else C.displayelemid(this, "goverempty", true);
    if (this.building != null) C.displayelemid(this, "building", true);

    if (this._units() != null) {
      this._setupunits();

      C.displayelemid(this, "units", true);
    }

    this._disa();

    this._coins();
  }

}

customElements.define(CivTech.is, CivTech);
