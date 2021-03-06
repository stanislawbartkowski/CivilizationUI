import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivSquare extends CivData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
<style>

  :host {
    display: inline-block;
    border: 0px none;
    border-color: DarkGray;
    background-size: 100% 100%;
    position : relative;
  }

  :host([Glowing]) {
    display: inline-block;
    border : 1px solid red;
    position : relative;
    border-radius: 20px;
  }

  :host([Village]) {
    background-color: #ffccb3;
  }

  :host([Hut]) {
    background-color: #ccffcc;
  }

  :host([Capital]),:host([WalledCapital]) {
    background-image: url("./images/cities/capital.svg");
    background-repeat: no-repeat;
    background-color: ForestGreen;
    background-size: 60%;
    background-position: top;
  }

  :host([Normal]),:host([WalledNormal]) {
    background-image: url("./images/cities/city.svg");
    background-repeat: no-repeat;
    background-color: ForestGreen;
    background-size: 60%;
    background-position: top;
  }

  :host([Forest]) {
    background-image: url("./images/terrain/forest.svg");
/*    background-size: 60% 60%; */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: ForestGreen;
    background-position: center;
  }

  :host([Water]) {
    background-image: url("./images/terrain/water.svg");
    background-color: lightblue;
  }

  :host([Harbor]) {
    background-image: url("./images/buildings/harbor.svg");
    background-color: lightblue;
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Shipyard]) {
    background-image: url("./images/buildings/shipyard.svg");
    background-color: lightblue;
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([TradingPost]) {
    background-image: url("./images/buildings/tradingpost.svg");
    background-color: LightGoldenRodYellow;
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Market]) {
    background-image: url("./images/buildings/market.svg");
    background-color: #ccffcc;
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Bank]) {
    background-image: url("./images/buildings/bank.svg");
    background-color: #ccffcc;
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Barracks]) {
    background-image: url("./images/buildings/barracks.svg");
    background-color: #efdddd;
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Academy]) {
    background-image: url("./images/buildings/academy.svg");
    background-color: #efdddd;
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Temple]) {
    background-image: url("./images/buildings/temple.svg");
    background-color: #dfeaf1;
    background-size: 65% 65%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Cathedral]) {
    background-image: url("./images/buildings/cathedral.svg");
    background-color: #dfeaf1;
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Granary]) {
    background-image: url("./images/buildings/granary.svg");
    background-color: #68d44e;
    background-size: 75% 75%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Aqueduct]) {
    background-image: url("./images/buildings/aqueduct.svg");
    background-color: #68d44e;
    background-size: 80% 80%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Library]) {
    background-image: url("./images/buildings/library.svg");
    background-color: #b5eaec;
    background-size: 80% 80%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([University]) {
    background-image: url("./images/buildings/university.svg");
    background-color: #b5eaec;
    background-size: 85% 85%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Workshop]) {
    background-image: url("./images/buildings/workshop.svg");
    background-color: #d0c8c8;
    background-size: 85% 85%;
    background-repeat: no-repeat;
    background-position: center;
  }

  :host([Ironmine]) {
    background-image: url("./images/buildings/ironmine.svg");
    background-color: #d0c8c8;
    background-size: 85% 85%;
    background-repeat: no-repeat;
    background-position: center;

  }
  :host([Mountain]) {
    background-image: url("./images/terrain/mountain.svg");
    background-color: DarkOliveGreen;
  }

  :host([Grassland]) {
    background-image: url("./images/terrain/grassland.svg");
    background-color: DarkSeaGreen;
  }

  :host([Desert]) {
    background-image: url("./images/terrain/desert.svg");
    background-color: LightGoldenRodYellow;
  }

  :host([WonderAncient]) {
    background-repeat: no-repeat;
    background-position: top;
    background-size: 85% 85%;
    background-color: #ffffcc;
    background-image: url("./images/wonders/ancient.svg");
  }

  :host([WonderMedieval]) {
    background-repeat: no-repeat;
    background-position: top;
    background-size: 85% 85%;
    background-color: #ffffcc;
    background-image: url("./images/wonders/medieval.svg");
  }

  :host([WonderModern]) {
    background-repeat: no-repeat;
    background-position: top;
    background-size: 85% 85%;
    background-color: #ffffcc;
    background-image: url("./images/wonders/modern.svg");
  }

  :host([GreatPerson]) {
    background-repeat: no-repeat;
    background-position: top;
    background-size: 85% 85%;
    background-color: #ffffcc;
    background-image: url("./images/icons/greatpersona.svg");
  }

  .culturebadge {
    --paper-badge-width: 17px;
    --paper-badge-height: 17px;
  }

 </style>

   <div style="width : {{boxwidth}}px; height : {{boxheight}}px; ">
     <img id="trade1" hidden="" src="images/tokens/trade.svg" style="z-index:1; position:absolute; left:0; bottom:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="trade2" hidden="" src="images/tokens/trade.svg" style="z-index:1; position:absolute; left:0; bottom:{{tokenheight}}px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="prod1" hidden="" src="images/tokens/production.svg" style="z-index:1; position:absolute;  left:0; bottom:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="prod2" hidden="" src="images/tokens/production.svg" style="z-index:1; position:absolute;  left:0; bottom:{{tokenheight}}px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="prod3" hidden="" src="images/tokens/production.svg" style="z-index:1; position:absolute;  left:0; bottom:{{tokenheight2}}px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="prod4" hidden="" src="images/tokens/production.svg" style="z-index:1; position:absolute;  left:0; bottom:{{tokenheight3}}px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="culture1" hidden="" src="images/tokens/culture.svg" title="{{localize('culturelabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="culture2" hidden="" src="images/tokens/culture.svg" title="{{localize('culturelabel')}}" style="z-index:1; position:absolute; bottom:{{tokenheight}}px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="culture3" hidden="" src="images/tokens/culture.svg" title="{{localize('culturelabel')}}" style="z-index:1; position:absolute; bottom:0px; left:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="battle2" hidden="" src="images/icons/battle2.svg" title="{{localize('battlelabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{battlewidth}}px; height:{{battleheight}}px;">
     <img id="battle4" hidden="" src="images/icons/battle4.svg" title="{{localize('battlelabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{battlewidth}}px; height:{{battleheight}}px;">
     <img id="star" hidden="" src="images/icons/star.svg" title="{{localize('limitedlabel')}}" style="z-index:1; position:absolute; up:0px; right:0; width:{{battlewidth}}px; height:{{battleheight}}px;">
     <img id="iron" hidden="" src="images/resource/iron.svg" title="{{localize('ironlabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="wheat" hidden="" src="images/resource/wheat.svg" title="{{localize('wheatlabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="incense" hidden="" src="images/resource/incense.svg" title="{{localize('incenselabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="silk" hidden="" src="images/resource/silk.svg" title="{{localize('silklabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="coin" hidden="" src="images/resource/coin.svg" title="{{localize('coinlabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="culture" hidden="" src="images/tokens/culture.svg" title="{{localize('culturelabel')}}" style="z-index:1; position:absolute; bottom:0px; right:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="coinup" hidden="" src="images/resource/coin.svg" title="{{localize('coinlabel')}}" style="z-index:1; position:absolute; up:0px; left:0px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
     <img id="hut" hidden="" src="images/huts/hut.svg" title="{{localize('hutlabel')}}" style="z-index:0; position:absolute; left:{{hutleft}}px; bottom:{{hutbottom}}px; width:{{hutwidth}}px; height:{{hutheight}}px;">
     <img id="village" hidden="" src="images/huts/village.svg" title="{{localize('villagelabel')}}" style="z-index:0; position:absolute; left:{{hutleft}}px; bottom:{{hutbottom}}px; width:{{hutwidth}}px; height:{{hutheight}}px;">

     <span id="attcity" style="display:none">
       <img id="prodcity" src="images/tokens/production.svg" style="z-index:1; position:absolute; bottom:0px; left:0; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
       <paper-badge id="prodcitynumber" for="prodcity" label="0" title="{{localize('productionlabel')}}">
       </paper-badge>

       <img id="defencecity" src="images/cities/shield.svg" style="z-index:1; position:absolute; bottom:0px; right:13px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
       <paper-badge id="defencecitynumber" for="defencecity" label="0" title="{{localize('defencelabel')}}">
       </paper-badge>

       <img id="culturecity" src="images/tokens/culture.svg" style="z-index:1; position:absolute; left:0px; top:7px; width:{{tokenwidth}}px; height:{{tokenheight}}px;">
       <paper-badge id="culturecitynumber" for="culturecity" label="0" class="culturebadge" title="{{localize('culturelabel')}}">
       </paper-badge>

    </span>


     <span id="army1" style="z-index:2; position:absolute; display:none; width:50%; height:50%; top:{{armytop}}px; left:{{armyleft}}px">
       <s-svg fill="{{figurecolor1}}" src="images/figures/army.svg"></s-svg>
     </span>
     <paper-badge hidden="" id="army1number" for="army1" label="5">
     </paper-badge>

     <span id="scout1" style="z-index:2; position:absolute; display:none; width:50%; height:50%; top:{{scouttop}}px; right:{{scoutright}}px">
      <s-svg fill="{{figurecolor1}}" src="images/figures/scout.svg"></s-svg>
     </span>
     <paper-badge hidden="" id="scout1number" for="scout1" label="5">
      </paper-badge>

     <span id="army2" style="z-index:2; position:absolute; display:none; width:50%; height:50%; top:{{armytop}}px; left:{{armyleft}}px">
       <s-svg fill="{{figurecolor2}}" src="images/figures/army.svg"></s-svg>
     </span>
     <paper-badge hidden="" id="army2number" for="army2" label="5">
     </paper-badge>

     <span id="scout2" style="z-index:2; position:absolute; display:none; width:50%; height:50%; top:{{scouttop}}px; right:{{scoutright}}px">
      <s-svg fill="{{figurecolor2}}" src="images/figures/scout.svg"></s-svg>
     </span>
     <paper-badge hidden="" id="scout2number" for="scout2" label="5">
      </paper-badge>

    <span id="wonder" style="display:none; font-size:180%; left:10px; position:absolute; bottom:0px">
      {{wondercc}}
    </span>

    <span id="greatperson" style="display:none; line-height: 0.8; font-size:90%; left:20px; position:absolute; bottom: 0px">
      {{greatpersont}}
    </span>

   </div>
`;
  }

  constructor() {
    super();
    addListener(this, 'tap', () => this.handleClick());
  }

  static get is() {
    return 'civ-square';
  }

  _constructcommandquestion(command) {
    return this.localize("executecommandquestion", "command", C.getcommanddecr(command));
  }

  handleClick() {
    var res = C.getsquare(this.row, this.col);
    if (res == null) return;
    if (res.terrain == null) return;
    var co = C.getcurrentcommand();
    if (C.emptyS(co)) return;
    var i = C.getitemizedcommand();
    C.confexecutedialog(this._constructcommandquestion(co), co, this.row, this.col, null);
  } // Declare properties for the element's public API


  static get properties() {
    return {
      wondercc: {
        type: String,
        value: "WW"
      },
      greatpersont: {
        type: String,
        value: "TT"
      },
      boxwidth: {
        type: Number,
        readOnly: true,
        value: 60
      },
      boxheight: {
        type: Number,
        readOnly: true,
        value: 45
      },
      tokenwidth: {
        type: Number,
        readOnly: true,
        value: 16
      },
      tokenheight: {
        type: Number,
        readOnly: true,
        value: 12
      },
      hutwidth: {
        type: Number,
        readOnly: true,
        value: 45
      },
      hutheight: {
        type: Number,
        readOnly: true,
        value: 45
      },
      hutbottom: {
        type: Number,
        value: function () {
          return (this.boxheight - this.hutheight) / 2;
        }
      },
      hutleft: {
        type: Number,
        value: function () {
          return (this.boxwidth - this.hutwidth) / 2;
        }
      },
      tokenheight2: {
        type: Number,
        value: function () {
          return this.tokenheight * 2;
        }
      },
      tokenheight3: {
        type: Number,
        value: function () {
          return this.tokenheight * 3 - 3;
        }
      },
      armytop: {
        type: Number,
        readOnly: true,
        value: 9
      },
      armyleft: {
        type: Number,
        readOnly: true,
        value: 2
      },
      scouttop: {
        type: Number,
        readOnly: true,
        value: 7
      },
      scoutright: {
        type: Number,
        readOnly: true,
        value: 2
      },
      battlewidth: {
        type: Number,
        readOnly: true,
        value: 17
      },
      battleheight: {
        type: Number,
        readOnly: true,
        value: 17
      },
      figurecolor1: {
        type: String,
        value: function () {
          return C.color1();
        }
      },
      figurecolor2: {
        type: String,
        value: function () {
          return C.color2();
        }
      },
      terrains: {
        type: Array,
        readOnly: true,
        value: ["mountain", "water", "forest", "grassland", "desert", "capital", "normal", "hut", "village", "glowing", "wonderancient", "wondermedieval", "wondermodern", "greatperson"]
      }
    };
  }

  _removearmy() {
    C.displayelem(this.$.army1, false);
    C.showeleme(this.$.army1number, false);
    C.displayelem(this.$.army1, false);
    C.showeleme(this.$.army1number, false);
    C.displayelem(this.$.army2, false);
    C.showeleme(this.$.army2number, false);
    C.displayelem(this.$.army2, false);
    C.showeleme(this.$.army2number, false);
  }

  _removescout() {
    C.displayelem(this.$.scout1, false);
    C.showeleme(this.$.scout1number, false);
    C.displayelem(this.$.scout1, false);
    C.showeleme(this.$.scout1number, false);
    C.displayelem(this.$.scout2, false);
    C.showeleme(this.$.scout2number, false);
    C.displayelem(this.$.scout2, false);
    C.showeleme(this.$.scout2number, false);
  }

  _removeterrain() {
    for (var i = 0; i < this.terrains.length; i++) C.removeattr(this, this.terrains[i]);

    const b = C.listofallbuildings();

    for (var i = 0; i < b.length; i++) C.removeattr(this, b[i]);

    C.showeleme(this.$.trade1, false);
    C.showeleme(this.$.trade2, false);
    C.showeleme(this.$.culture1, false);
    C.showeleme(this.$.culture2, false);
    C.showeleme(this.$.culture3, false);
    C.showeleme(this.$.prod1, false);
    C.showeleme(this.$.prod2, false);
    C.showeleme(this.$.prod3, false);
    C.showeleme(this.$.prod4, false);
    C.showeleme(this.$.battle2, false);
    C.showeleme(this.$.battle4, false);
    C.showeleme(this.$.star, false);
    C.showeleme(this.$.coinup, false);
    C.showeleme(this.$.iron, false);
    C.showeleme(this.$.wheat, false);
    C.showeleme(this.$.incense, false);
    C.showeleme(this.$.silk, false);
    C.showeleme(this.$.coin, false);
    C.showeleme(this.$.hut, false);
    C.showeleme(this.$.village, false);
    C.displayelem(this.$.wonder, false);
    C.displayelem(this.$.greatperson, false);
    C.showeleme(this.$.culture, false);
    
    // remove city
    C.displayelem(this.$.attcity, false);
  }

  _clearsquare() {
    C.displayelem(this.$.attcity, false);

    this._removearmy();

    this._removescout();

    this._removeterrain();
  }

  highlight(hightlight) {
    if (hightlight) this.setAttribute("glowing", 1);else C.removeattr(this, "glowing");
  }

  _clearhv() {
    C.showeleme(this.$.village, false);
    C.showeleme(this.$.hut, false);
    C.removeattr(this, "hut");
    C.removeattr(this, "village");
  }

  _displaytokens(bd) {
    const production = bd.tokens.Production;
    const trade = bd.tokens.Trade;
    const culture = bd.tokens.Culture;
    const battle = bd.tokens.Battle;

    if (trade == 1) {
      C.showeleme(this.$.trade1, true);
      if (production >= 1) C.showeleme(this.$.prod2, true);
      if (production >= 2) C.showeleme(this.$.prod3, true);
    }

    if (trade == 2) {
      C.showeleme(this.$.trade1, true);
      C.showeleme(this.$.trade2, true);
      if (production >= 1) C.showeleme(this.$.prod3, true);
      if (production >= 2) C.showeleme(this.$.prod4, true);
    }

    if ((trade == null || trade == 0) && production > 0) {
      if (production >= 1) C.showeleme(this.$.prod1, true);
      if (production >= 2) C.showeleme(this.$.prod2, true);
      if (production >= 3) C.showeleme(this.$.prod3, true);
      if (production >= 4) C.showeleme(this.$.prod4, true);
    }

    if (culture >= 1) C.showeleme(this.$.culture1, true);
    if (culture >= 2) C.showeleme(this.$.culture2, true);
    if (culture >= 3) C.showeleme(this.$.culture3, true);
    if (battle == 2) C.showeleme(this.$.battle2, true);
    if (battle == 4) C.showeleme(this.$.battle4, true);
    if (bd.tokens.Coin >= 1) C.showeleme(this.$.coinup, true);
  }

  _displaybuilding(b) {
    const bd = C.findBuilding(b);
    this.setAttribute(b, 1);
    if (bd.star) C.showeleme(this.$.star, true);

    this._displaytokens(bd);
  }

  _displayterrain(j) {
    if (j.production >= 1) C.showeleme(this.$.prod1, true);
    this.setAttribute(j.terrain, 1);
    if (j.production >= 2) C.showeleme(this.$.prod2, true);
    if (j.trade >= 1) C.showeleme(this.$.trade1, true);
    if (j.resource == "Iron") C.showeleme(this.$.iron, true);
    if (j.resource == "Wheat") C.showeleme(this.$.wheat, true);
    if (j.resource == "Incense") C.showeleme(this.$.incense, true);
    if (j.resource == "Silk") C.showeleme(this.$.silk, true);
    if (j.resource == "Coin") C.showeleme(this.$.coin, true);
    if (j.resource == "Culture") C.showeleme(this.$.culture, true);
  }

  _displaywonder(wond) {
    const w = C.findWonder(wond);
    this.setAttribute("wonder" + w.age, 1);
    const wo = this.$.wonder;
    this.wondercc = w.t;
    C.displayelem(wo, true);
  }

  _displaygreatperson(person, gperson) {
    this.setAttribute("greatperson", 1);
    var ty;
    this.greatpersont = "";

    if (gperson) {
      const g = C.findGreatPerson(person);
      const pe = g.person;
      this.greatpersont = pe.t;
      ty = g.type;
    } else ty = C.findGreatPersonType(person);

    this._displaytokens(ty);

    C.displayelem(this.$.greatperson, true, true);
  }

  refresh(jsdata) {
    if (jsdata == null) {
      this._clearsquare();

      return;
    }

    const j = jsdata;

    this._removeterrain();

    if (j.city != null) {
      this._removearmy();

      this._removescout();

      C.displayelem(this.$.attcity, true);
      C.setColorForCity(this, j.city, C.colorForCiv(j.civ));
      this.setAttribute(j.city, 1);
      C.displaybadge(this.$.prodcitynumber, j.production);
      C.displaybadge(this.$.defencecitynumber, "+" + j.defence);
      C.displaybadge(this.$.culturecitynumber, j.culture);
      return;
    }

    if (j.terrain == null) return;

    if (j.hv != null) {
      this._removearmy();

      this._removescout();

      this.setAttribute(j.hv, 1);
      if (j.hv == "Hut") C.showeleme(this.$.hut, true);
      if (j.hv == "Village") C.showeleme(this.$.village, true);
      return;
    }

    this._clearhv(); // show terrain


    if (j.numberofArmies > 0) {
      if (C.civtonumb(j.civ) == 0) {
        C.displayelem(this.$.army1, true);
        C.displaybadge(this.$.army1number, j.numberofArmies);
      } else {
        C.displayelem(this.$.army2, true);
        C.displaybadge(this.$.army2number, j.numberofArmies);
      }
    } else this._removearmy();

    if (j.building != null) this._displaybuilding(j.building);else if (j.wonder != null) this._displaywonder(j.wonder);else if (j.greatperson != null) this._displaygreatperson(j.greatperson, true);else if (j.greatpersontype != null) this._displaygreatperson(j.greatpersontype, false);else this._displayterrain(j);

    if (j.numberofScouts > 0) {
      if (C.civtonumb(j.civ) == 0) {
        C.displayelem(this.$.scout1, true);
        if (j.numberofScouts > 1) C.displaybadge(this.$.scout1number, j.numberofScouts);
      } else {
        C.displayelem(this.$.scout2, true);
        if (j.numberofScouts > 1) C.displaybadge(this.$.scout2number, j.numberofScouts);
      }
    } else this._removescout();
  }

} // Register the x-custom element with the browser


customElements.define(CivSquare.is, CivSquare);
