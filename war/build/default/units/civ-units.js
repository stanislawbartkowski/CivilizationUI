import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { deepTargetFind } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivChooseData } from "../js/civ-choosedata.js";

class CivUnits extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style">

:host {
  display: inline-block;
  /*box-sizing: border-box;*/
  /* margin: 1px solid; */
  border-radius: 5px;
  width: 77px;
  height: 70px;
  vertical-align: top;
  /* important, avoid spilling out numbers */
  line-height : 12px;
}

:host([infantry]) {
  background-color: #FFE4C4;
}

:host([mounted]) {
  background-color: #A9A9A9;
}

:host([artillery]) {
  background-color: #ADD8E6;
}

:host([aircraft]) {
  background-color: #98FB98;
}


paper-badge {
  --paper-badge : {
    margin-bottom:-15px;
  }
}

  .top {
      width: 100%;
      height: 25%;
      border-bottom: 1px inset;
  }

  .left {
      width: 20%;
      height: 75%;
      float:left;
  }
  .main {
      float: left;
      height: 80%;
      width: 80%
   }

   .unitfigure {
/*     display : none; */
     width:80%;
/*     float:left; */
   }

   .imagelevel {
     width:20%;
     top : 0px;
/*     float:right; */
     padding-top: 2px
   }

   .strenghtup {
     margin-top:-0.75em;
   }

   .unitstrength {
     font-size:70%;
/*     margin-top:-0.05em; */
     color: blue;
   }

</style>

</custom-style>

<div style="height:100%; width:100%" draggable="true" ondragstart="CivUnitsDraggable.ondragStart(event)">
  <div class="top">

      <span id="strengthvalue" style="width:10%; display=none; color:red">{{strengthvalue}}</span>
      <span id="unitname" style="width:60%; font-size:80%">{{unitname}}</span>

      <img id="imagelevel0" class="imagelevel" style="width:10px" src="images/units/unit-level0.svg"></img>
      <img id="imagelevel1" class="imagelevel" src="images/units/unit-level1.svg"></img>
      <img id="imagelevel2" class="imagelevel" src="images/units/unit-level2.svg"></img>
      <img id="imagelevel3" class="imagelevel" src="images/units/unit-star.svg"></img>
  </div>
  <div class="left" id="strength">
     <div id="level0" class="unitstrength"></div>
     <div id="level1" class="unitstrength"></div>
     <div id="level2" class="unitstrength"></div>
     <div id="level3" class="unitstrength"></div>
  </div>
  <div class="main">
     <img id="mounted" class="unitfigure" hidden fill="DarkSlateGray" src="images/units/unit-mounted.svg">
     <img id="artillery" class="unitfigure" hidden fill="DarkSlateGray" src="images/units/unit-artillery.svg">
     <img id="infantry" class="unitfigure" hidden fill="DarkSlateGray" src="images/units/unit-infantry.svg">
     <img id="aircraft" class="unitfigure" hidden fill="DarkSlateGray" src="images/units/unit-aircraft.svg">
     <paper-badge hidden="" id="mountednumber" for="mounted" label="X">
      </paper-badge>
     <paper-badge hidden="" id="infantrynumber" for="infantry" label="X">
     </paper-badge>
     <paper-badge hidden="" id="artillerynumber" for="artillery" label="X">
     </paper-badge>
     <paper-badge hidden="" id="aircraftnumber" for="aircraft" label="X">
     </paper-badge>
  </div>
</div>
`;
  }

  static get is() {
    return 'civ-units';
  }

  static get properties() {
    return {
      boxwidth: {
        type: Number,
        readOnly: true,
        value: 70
      },
      boxheight: {
        type: Number,
        readOnly: true,
        value: 70
      },
      strengthvalue: {
        type: Number
      },
      unitname: {
        type: String
      },
      unittypes: {
        type: Array,
        readOnly: true,
        value: ["mounted", "aircraft", "infantry", "artillery"]
      },
      units: {
        type: Object
      },
      draggable: {
        type: Boolean
      },
      num: {
        type: Number
      },
      you: {
        type: Boolean
      },
      hobject: {
        type: Object
      }
    };
  }

  isDraggable() {
    return this.draggable && this.num != null;
  }

  getTarget(e) {
    const u = deepTargetFind(e.detail.x, e.detail.y);
    if (u == null) return null;
    if (u.tagName.toUpperCase() != "CIV-FRONTUNIT") return null;
    if (u.you != this.you) return null;
    if (!u.isEmptySlot) return null;
    return u;
  }

  _displaysvg(n, display) {
    const u = this.$[n];
    C.showeleme(u, display);
  }

  _clearimages() {
    this.listofunits = null;

    for (var i = 0; i < this.unittypes.length; i++) this._displaysvg(this.unittypes[i], false);

    for (var i = 0; i < this.unittypes.length; i++) this._displaysvg(this.unittypes[i] + 'number', false);

    C.displayelem(this.$.strengthvalue, false);

    for (var i = 0; i <= 3; i++) this._displaysvg("imagelevel" + i, false);

    for (var i = 0; i < this.unittypes.length; i++) C.removeattr(this, this.unittypes[i]);
  }

  _unitName(n) {
    return C.localize(n);
  }
  /**
   * unit description
   * name : name of the unit
   * strength : Number, can be null
   * level : Number, can be null
   * num : number of units, 1 or > 1
   */


  refresh(data) {
    this._clearimages();

    if (data == null) return;
    const n = data.name.toLowerCase();
    this.setAttribute(n, 1);
    if (data.strength != null) for (var i = 0; i < data.strength.length; i++) this.$["level" + i].innerText = data.strength[i];else for (var i = 0; i < 4; i++) this.$["level" + i].innerHTML = "&nbsp;";
    this.unitname = this._unitName(n);

    if (data.level != null) {
      C.displayelem(this.$.strengthvalue, true, true);
      if (data.strength != null) this.strengthvalue = data.strength[data.level];

      this._displaysvg("imagelevel" + data.level, true);
    }

    if (data.num != null && data.num > 0) this._displaysvg(n, true);
    if (data.strength != null) this._displaysvg(n, true);
    if (data.num != null) C.displaybadge(this.$[n + 'number'], data.num);
  }

} // Register the x-custom element with the browser


customElements.define(CivUnits.is, CivUnits);