import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivResources extends CivData(PolymerElement) {
  static get template() {
    return html`
   <custom-style>
      <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
    </custom-style>

    <style>
       :host {
        display: inline-block;
      }

      .resbox {
         padding: 5px;
         width:  30px;
         height: 30px;
         display:inline-block;

         border-radius: 50%;
         border : 1px solid;
         background-color: #e6e6ff;
         border-color : #3333ff;
         margin : 5px;

      }

    </style>



   <span id="spansilk" class="resbox" style="display:none" title="{{localize('silklabel')}}" on-click="click">
     <s-svg id="silk" src="images/resource/silk.svg"></s-svg>
     <paper-badge hidden="" id="silknumber" for="silk" label="X">
      </paper-badge>
    </span>

   <span id="spaniron" title="{{localize('ironlabel')}}" class="resbox" style="display:none" on-click="click">
     <s-svg id="iron" src="images/resource/iron.svg"></s-svg>
     <paper-badge hidden="" id="ironnumber" for="iron" label="X">
      </paper-badge>
    </span>

   <span id="spanwheat" class="resbox" title="{{localize('wheatlabel')}}" style="display:none" on-click="click">
     <s-svg id="wheat" src="images/resource/wheat.svg"></s-svg>
     <paper-badge hidden="" id="wheatnumber" for="wheat" label="X">
      </paper-badge>
    </span>

   <span id="spanincense" class="resbox" style="display:none" title="{{localize('incenselabel')}}" on-click="click">
     <s-svg id="incense" src="images/resource/incense.svg"></s-svg>
     <paper-badge hidden="" id="incensenumber" for="incense" label="X">
      </paper-badge>
    </span>

   <span id="spanhut" class="resbox" style="display:none" on-click="click" title="{{localize('hutlabel')}}">
     <s-svg id="hut" src="images/huts/hut.svg"></s-svg>
     <paper-badge hidden="" id="hutnumber" for="hut" label="X">
      </paper-badge>
    </span>

   <span id="spanvillage" class="resbox" style="display:none" on-click="click" title="{{localize('villagelabel')}}">
     <s-svg id="village" src="images/huts/village.svg"></s-svg>
     <paper-badge hidden="" id="villagenumber" for="village" label="X">
      </paper-badge>
    </span>

   <span id="spantrade" class="resbox" style="display:none" on-click="click" title="{{localize('tradelabel')}}">
     <s-svg id="trade" src="images/tokens/trade.svg"></s-svg>
     <paper-badge hidden="" id="tradenumber" for="trade" label="X">
      </paper-badge>
    </span>

   <span id="spanspy" class="resbox" style="display:none" on-click="click" title="{{localize('spylabel')}}">
     <s-svg id="spy" src="images/resource/spy.svg"></s-svg>
     <paper-badge hidden="" id="spynumber" for="spy" label="X">
      </paper-badge>
    </span>

   <span id="spanuranium" class="resbox" style="display:none" on-click="click" title="{{localize('uraniumlabel')}}">
     <s-svg id="uranium" src="images/resource/uranium.svg"></s-svg>
     <paper-badge hidden="" id="uraniumnumber" for="uranium" label="X">
      </paper-badge>
    </span>

   <span id="spanculture" class="resbox" style="display:none" on-click="click" title="{{localize('culturelabel')}}">
     <s-svg id="culture" src="images/tokens/culture.svg"></s-svg>
     <paper-badge hidden="" id="culturenumber" for="culture" label="X">
      </paper-badge>
    </span>

    <span id="spancoin" class="resbox" style="display:none" on-click="click" title="{{localize('coinlabel')}}">
      <s-svg id="coin" src="images/resource/coin.svg"></s-svg>
      <paper-badge hidden="" id="coinnumber" for="coin" label="X">
       </paper-badge>
     </span>

     <span id="spancard" class="resbox" style="display:none" on-click="click" title="{{localize('culturecards')}}">
       <img id="card" src="images/icons/cards.svg"></img>
       <paper-badge hidden="" id="cardnumber" for="card" label="X">
        </paper-badge>
      </span>

      <span id="spantech" class="resbox" style="display:none" on-click="click" title="{{localize('technologylabel')}}">
        <img id="tech" src="images/cities/research.svg"></img>
        <paper-badge hidden="" id="technumber" for="tech" label="X">
         </paper-badge>
       </span>

`;
  }

  static get is() {
    return 'civ-resources';
  }

  static get properties() {
    return {
      names: {
        readOnly: true,
        type: Array,
        value: ["silk", "iron", "wheat", "incense", "spy", "uranium", "culture", "hut", "village", "trade","coin","card","tech"]
      }
    };
  }

  _remove(n) {
    C.displayelemid(this, "span" + n, false);
    C.showeleme(this.$[n + "number"], false);
  }

  _clear() {
    for (var i = 0; i < this.names.length; i++) this._remove(this.names[i]);
  }

  click(e) {
    if (this.fun != null) {
      const id = e.srcElement.id;
      const r = this.data;

      for (var j = 0; j < r.length; j++) if (id == r[j].resource.toLowerCase()) {
        // array of single resource
        this.fun([r[j]]);
        return;
      }
    }
  }

  _display(n, num) {
    if (num == 0) this._remove(n);else {
      C.displayelemid(this, "span" + n, true, true);
      C.displaybadge(this.$[n + "number"], num);
    }
  }

  /**
  * r : array of resources
  *    [{ "resource" : name, "num" : number},....]
  */


  refresh(r) {
    if (r == null) {
      this._clear();

      return;
    }

    for (var i = 0; i < this.names.length; i++) {
      var num = 0;
      const n = this.names[i];

      for (var j = 0; j < r.length; j++) if (n == r[j].resource.toLowerCase()) num = num + r[j].num;

      this._display(n, num);
    }
  }

}

window.customElements.define(CivResources.is, CivResources);
