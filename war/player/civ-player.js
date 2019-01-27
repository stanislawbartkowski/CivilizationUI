import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivPlayer extends CivData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
  <style is="custom-style" include="civ-paper-button-styles">

  .undobuttons {
    position: relative;
    margin: 0;
    @apply --layout-horizontal;
/*    @apply --layout-end-justified; */
  }

  .jebuttons {
    margin: 0;
    @apply --layout-horizontal;
  }

  .endofphase {
    position: absolute;
    right: 20px;
  }
  
  .journal {
  
  }

  .undo {
    width: 15px;
  }

  .civname {
    border-radius: 15px;
    width: 80%;
    height: 30px;
    text-align: center;
    font-size: 150%;
    padding-top: 5px;
    background-color : white;
    margin-left: 5px;
  }

  paper-icon-item {
     --paper-item-min-height : 0;
     --paper-item : {
       padding-top: 2px;
       padding-right: 8px;
       padding-bottom: 2px;
       padding-left: 8px;
       font-size : 95%;
       }
  }

  paper-item {
     --paper-item-min-height : 0;
     --paper-item : {
       padding-top: 2px;
       padding-right: 5px;
       padding-bottom: 2px;
       padding-left: 8px;
       }
  }

  .unitbox {
     margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     display: block;
     border-radius: 5px;
     width: 90%;
  }

  .resourcebox {
     margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     display: block;
     border-radius: 5px;
     width: 90%;
  }

  #startofturn  {
  }

  #trade  {
  }

  #citymanagement  {
  }

  #movement  {
  }

  #research  {
  }

  </style>

<paper-item class="civname" on-click="_onCiv">[[civname]]</paper-item>

<civ-playerstate id="playerstate"></civ-playerstate>

<span id="unitbox" class="unitbox">
  <civ-units id="infantry"></civ-units>
  <civ-units id="artillery"></civ-units>
  <civ-units id="mounted"></civ-units>
  <civ-units id="aircraft"></civ-units>
</span>

<civ-resources id="resourcespanel" class="resourcebox"> </civ-resources>

<!--
<paper-item>
  <div>[[currentcommand]]</div>
 </paper-item>
-->

<div class="jebuttons">
  <paper-button id="journal" class="green journal" on-click="_onJournal">{{localize('journal')}}</paper-button>
  <paper-button id="endofphase" class="green endofphase" on-click="_onClick">{{localize('endofphase')}}</paper-button>
</div>  

<span id="startofturn" class="actionbox">

    <paper-icon-item id="freearmy" on-click="_onClick">
      <iron-icon src="images/figures/army.svg" slot="item-icon"></iron-icon>
      <span>{{localize('getfreearmy')}}</span>
    </paper-icon-item>

    <paper-icon-item id="freescout" on-click="_onClick">
      <iron-icon src="images/figures/scout.svg" slot="item-icon"></iron-icon>
      <span>{{localize('getfreescout')}}</span>
    </paper-icon-item>

	<paper-icon-item id="setcapital" on-click="_onClick">
        <iron-icon src="images/cities/capital.svg" slot="item-icon"></iron-icon>
        <span>{{localize('capital')}}</span>
	</paper-icon-item>

	<paper-icon-item id="setcity" on-click="_onClick">
	   <iron-icon src="images/cities/city.svg" slot="item-icon"></iron-icon>
	   <span>{{localize('setcity')}}</span>
	</paper-icon-item>

	<paper-icon-item id="setarmy" on-click="_onClick">
	  <iron-icon src="images/figures/army.svg" slot="item-icon"></iron-icon>
	  <span>{{localize('deployarmy')}}</span>
    </paper-icon-item>

	<paper-icon-item id="setscout" on-click="_onClick">
	  <iron-icon src="images/figures/scout.svg" slot="item-icon"></iron-icon>
	  <span>{{localize('deployscout')}}</span>
   </paper-icon-item>

    <paper-icon-item id="greatpersonput" on-click="_onClick">
      <iron-icon src="images/icons/greatpersona.svg" slot="item-icon"></iron-icon>
      <span>{{localize('greatpersonplace')}}</span>
   </paper-icon-item>
</span>

<span id="trade" class="actionbox" style="display:none">
    <paper-icon-item id="usesilkfortrade9" on-click="_onClick">
      <iron-icon src="images/resource/silk.svg" slot="item-icon"></iron-icon>
      <span>{{localize('spendsilkfortrade')}}</span>
    </paper-icon-item>
</span>

<span id="citymanagement" class="actionbox" style="display:none">

    <paper-icon-item id="unitmenu" on-click="_onClick">
      <iron-icon icon="menu" slot="item-icon"></iron-icon>
      <span>{{localize('units')}}</span>
    </paper-icon-item>

	<paper-icon-item id="buyarmy" on-click="_onClick">
	  <iron-icon src="images/figures/army.svg" slot="item-icon"></iron-icon>
	  <span>{{localize('purchasearmy')}}</span>
	</paper-icon-item>

	<paper-icon-item id="buyscout" on-click="_onClick">
	  <iron-icon src="images/figures/scout.svg" slot="item-icon"></iron-icon>
	  <span>{{localize('purchasescout')}}</span>
    </paper-icon-item>

    <paper-icon-item id="harvestresource" on-click="_onClick">
      <iron-icon icon="icons:build" slot="item-icon"></iron-icon>
      <span>{{localize('harvestresource')}}</span>
    </paper-icon-item>

    <paper-icon-item id="devouttoculture" on-click="_onClick">
      <iron-icon src="images/tokens/culture.svg" slot="item-icon"></iron-icon>
      <span>{{localize('devouttoculture')}}</span>
    </paper-icon-item>


    <paper-icon-item id="buybuilding" on-click="_onClick">
      <iron-icon src="images/icons/buybuilding.svg" slot="item-icon"></iron-icon>
      <span>{{localize('buybuilding')}}</span>
    </paper-icon-item>

    <paper-icon-item id="freebuildingcityaction" on-click="_onClick">
      <iron-icon src="images/icons/buybuilding.svg" slot="item-icon"></iron-icon>
      <span>{{localize('freebuilding')}}</span>
    </paper-icon-item>

    <paper-icon-item id="buywonder" on-click="_onClick">
      <iron-icon src="images/icons/buywonder.svg" slot="item-icon"></iron-icon>
      <span>{{localize('buywonder')}}</span>
    </paper-icon-item>

    <paper-icon-item id="technologyaction" on-click="_onClick">
      <iron-icon src="images/cities/research.svg" slot="item-icon"></iron-icon>
      <span>{{localize('technologyaction')}}</span>
    </paper-icon-item>

    <paper-icon-item id="advanceculture" on-click="_onClick">
      <iron-icon src="images/tokens/culture.svg" slot="item-icon"></iron-icon>
      <span>{{localize('advanceculture')}}</span>
    </paper-icon-item>

    <paper-icon-item id="buycitywall" on-click="_onClick">
      <iron-icon src="images/tokens/culture.svg" slot="item-icon"></iron-icon>
      <span>{{localize('buycitywall')}}</span>
    </paper-icon-item>

    <div class="undobuttons">

      <paper-icon-item id="sendproduction" on-click="_onClick">
        <iron-icon src="images/tokens/production.svg" slot="item-icon"></iron-icon>
        {{localize('sendproduction')}}
      </paper-icon-item>

      <paper-icon-item class="undo" id="undosendproduction" on-click="_onClick" title="{{localize('undosendproduction')}}">
       <iron-icon icon="icons:undo" slot="item-icon"></iron-icon>
      </paper-icon-item>

    </div>

    <div class="undobuttons">

      <paper-icon-item id="spendtrade" on-click="_onClick">
        <iron-icon src="images/tokens/trade.svg" slot="item-icon"></iron-icon>
         {{localize('spendtrade')}}
      </paper-icon-item>

      <paper-icon-item class="undo" id="undospendtrade" on-click="_onClick" title="{{localize('undospendtrade')}}">
          <iron-icon icon="icons:undo" slot="item-icon"></iron-icon>
      </paper-icon-item>

    </div>

</span>


<span id="movement" class="actionbox" style="display:none">


	<paper-icon-item id="startmove" on-click="_onClick">
	<iron-icon icon="fingerprint" slot="item-icon"></iron-icon> <span>{{localize('startmove')}}</span>
	</paper-icon-item>

    <paper-icon-item id="sacrificefigurefortech" on-click="_onClick">
      <iron-icon src="images/figures/army.svg" slot="item-icon"></iron-icon> <span>{{localize('sacrificefigurefortech')}}</span>
    </paper-icon-item>

	<paper-icon-item id="move" on-click="_onClick"> <iron-icon icon="rowing" slot="item-icon"></iron-icon> <span>{{localize('continuemove')}}</span>
	</paper-icon-item>

	<paper-icon-item id="revealtile" on-click="_onClick">
	<iron-icon icon="lock-open" slot="item-icon"></iron-icon> <span>{{localize('revealtile')}}</span>
	</paper-icon-item>

    <paper-icon-item id="freenonupgradedbuilding" on-click="_onClick">
    <iron-icon src="images/icons/buybuilding.svg" slot="item-icon"></iron-icon> <span>{{localize('freenonupgradebuildinglabel')}}</span>
    </paper-icon-item>

	<paper-icon-item id="explorehut" on-click="_onClick">
      <iron-icon src="images/huts/hut.svg" slot="item-icon"></iron-icon>
      <span>{{localize('explorehut')}}</span>
    </paper-icon-item>


	<paper-icon-item id="endofmove" on-click="_onClick">
	   <iron-icon icon="pan-tool" slot="item-icon"></iron-icon>
	   <span>{{localize('endofmove')}}</span>
	 </paper-icon-item>

    <paper-icon-item id="attack" on-click="_onClick">
       <iron-icon src="images/icons/attack.svg" slot="item-icon"></iron-icon>
       <span>{{localize('attack')}}</span>
     </paper-icon-item>

</span>

<span id="researchmenu" class="actionbox" style="display:none">
    <paper-icon-item id="research" on-click="_onClick">
      <iron-icon src="images/cities/research.svg" slot="item-icon"></iron-icon>
       <span>{{localize('researchlabel')}}</span>
     </paper-icon-item>
</span>
`;
  }

  static get is() {
    return 'civ-player';
  }

  static get properties() {
    return {
      civname: {
        type: String,
        value: undefined
      },
      currentcommand: {
        type: String,
        value: undefined
      },
      itemizedcommand: {
        type: Object,
        value: undefined,
        observer: '_itemized'
      },
      figurecolor1: {
        type: String,
        value: function () {
          return C.color1();
        }
      },
      listofpoints: {
        type: Array,
        value: null
      },
      opponent: {
        type: Boolean
      },
      y: {
        type: Object
      },
      actionpanels: {
        type: Array,
        readOnly: true,
        value: ["startofturn", "trade", "citymanagement", "movement", "researchmenu"]
      },
      unitsmenu: {
        type: Array,
        readOnly: true,
        value: ["buymounted", "buyartillery", "buyinfantry", "buyaircraft"]
      },
      excludebuttons: {
        type: Object,
        readOnly: true,
        value: {
          "buybuilding": "freebuildingcityaction",
          "freebuildingcityaction": "buybuilding"
        }
      },
      displaybuttons: {
        type: Array,
        readOnly: true,
        value: ["buybuilding"]
      },
      hidebuttons : {
        type: Array,
        readOnly: true,
        value: ["sacrificefigurefortech","freenonupgradedbuilding","usesilkfortrade9","freearmy","freescout","setcapital","setarmy", "setscout"]
      },
      buttons: {
        type: Array,
        readOnly: true,
        value: ["endofphase", "buyarmy", "buyscout", "startmove", "move", "revealtile", "endofmove", "setcity", "spendtrade", "undospendtrade", "sendproduction", "undosendproduction", "harvestresource", "explorehut", "attack", "research", "buybuilding", "buywonder", "technologyaction", "devouttoculture", "advanceculture", "greatpersonput", "unitmenu", "buycitywall", "freebuildingcityaction","sacrificefigurefortech"]
      }
    }
   }

  _onCiv() {
    const c = this.civname;
    C.showcivinfo(c);
  }

  setListOfPoints(a) {
    C.highlightGame(this.listofpoints, false);
    C.highlightGame(a, true);
    this.listofpoints = a;
  }

  _itemized(newValue, oldValue) {
    const a = C.getlistofpoints(this.currentcommand, newValue);
    const itemi = newValue
    this.setListOfPoints(a);
    if (a != null) C.checkAutomateButton();
    const co = C.getcurrentcommand();

    if (C.rundialog(co, newValue)) return
    
    if (co == "research") {
      C.researchdialog(itemi,co)
      return;
    }
    
    if (co == "freewonder") {
      C.freewonder(this.y, newValue, co);
      return;
    }

    if (co == "buycitywall") {
      C.buycitywall(this.y);
      return;
    }

    if (co == "advanceculture") {
      C.advanceculture(this.y);
      return;
    }

    if (co == "buybuilding" || co == "freebuildingcityaction" || co == "freenonupgradedbuilding") {
      C.buybuilding(this.y, newValue, co);
      return;
    }

    if (co == "buywonder") {
      C.buywonder(this.y, newValue, co);
      return;
    }

    if (co == "greatpersonputnow" || co == "greatpersonput") {
      var resign = null;
      if (co == "greatpersonputnow") resign = "greatpersonputnowresign";
      C.greatpersononmap(this.y, newValue, co, resign);
      return;
    }
  }

  callitemize(id) {
    this.currentcommand = id;
    window.itemizecommand(id.toUpperCase());
  }

  _onClick(source) {
    if (this.opponent) return;
    const id = source.currentTarget.id;
    CC.actionclick(id)
    return
  }
  
  _onJournal() {
    C.showjournal(this.opponent,this.civname)
  }

  clear() {
    this.itemizedcommand = null;
    this.listofpoints = null;
    this.currentcommand = null;
  }

  clearCommand() {
    this.clear();
  }

  _youactive() {
    if (this.opponent) return false;
    const y = this.y;
    const g = this.data.board.game;
    return y.civ == g.active;
  }

  displaylistres() {
    const y = this.y;
    const listda = C.convertResourcesToList(y.resources, y.hutvillages);
    C.opendialogwithpar("showhv-dialog", listda);
  }

  _displayres() {
    const y = this.y;
    const respanel = this.$.resourcespanel;

    respanel.fun = e => this.displaylistres();

    respanel.draw(C.concatHV(y.resources, y.hutvillages));
  }

  refresh(b) {
    if (b == null) {
      this.clear();
      const respanel = this.$.resourcespanel;
      respanel.draw(null);
      return;
    }

    if (this.opponent) this.y = b.board.others[0];else this.y = b.board.you;
    const y = this.y;
    C.setColorForCity(this, "civname", C.backcolorForCiv(y.civ));
    this.civname = y.civ; // player status

    const yp = this.$.playerstate;
    yp.draw(y);
    const g = b.board.game;
    const pha = g.phase.toLowerCase();

    for (var i = 0; i < this.actionpanels.length; i++) {
      const id = this.actionpanels[i];
      const pa = this.shadowRoot.getElementById(id);
      if (id == pha || id == "researchmenu" && pha == "research") C.displayelem(pa, true)
        else C.displayelem(pa, false)
    }

    for (var i = 0; i < this.buttons.length; i++) {
      const id = this.buttons[i];
      const bu = this.shadowRoot.getElementById(id);
      C.disableleme(bu, true);
    }
    
    for (var i = 0; i < this.hidebuttons.length; i++) 
       C.showeleme(this.$[this.hidebuttons[i]],false)

    for (var i = 0; i < this.displaybuttons.length; i++) {
      const id = this.displaybuttons[i];
      const bu = this.shadowRoot.getElementById(id);
      C.showeleme(bu, true);

      if (this.excludebuttons[id] != null) {
        const bue = this.shadowRoot.getElementById(this.excludebuttons[id]);
        C.showeleme(bue, false);
      }
    }

    for (var i = 0; i < y.commands.length; i++) {
      const command = y.commands[i];
      var id = command.command.toLowerCase();

      if (id == "discardcard") {
        if (this._youactive()) C.discardcarddialog(y);
        return;
      }

      if (id == "greatpersonputnow" || id == "freewonder" || id == "getfreeresource") {
        if (this._youactive()) this.callitemize(id);
        continue;
      }

      if (id == "greatpersonputnowresign") continue;

      if (C.isBuyUnitCommand(id)) {
        C.disableleme(this.$.unitmenu, false);
        continue;
      }

      if (id == "killfigure") {
        if (this._youactive()) {
          C.executeKillFigure();
          C.alertdialog(C.localize("figureswillbekilled"));
        }

        return;
      }

      if (CC.getActionTechnology(id) != null) id = "technologyaction";
      const bu = this.$[id];
      C.disableleme(bu, false);
      C.showeleme(bu, true);

      if (this.excludebuttons[id] != null) {
        C.showeleme(bu, true);
        const bue = this.shadowRoot.getElementById(this.excludebuttons[id]);
        C.showeleme(bue, false);
      }

      if (this._youactive()) 
         if (!this.opponent && id == "move" && this.currentcommand != "revealtile" && this.currentcommand != "explorehut" && this.currentcommand != "attack") this.callitemize(id);
    }

    C.setUnitsNumb(this, y.units);

    for (var j = 0; j < C.unittypes().length; j++) this.$[C.unittypes()[j]].fun = p => C.showunits(y.units);

    this._displayres();

    if (this._youactive()) {
      var s = null;

      for (var i = 0; i < y.commands.length; i++) if (s == null) s = y.commands[i].command;else s = s + "," + y.commands[i].command;

      C.log("player:" + g.active + " " + g.phase + " " + s);
      C.automateCommand(y.commands);
    }
  }

}

window.customElements.define(CivPlayer.is, CivPlayer);
