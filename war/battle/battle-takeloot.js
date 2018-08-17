import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class BattleTakeLoot extends CivData(PolymerElement) {
  static get template() {
    return html`
<style>
:host {
	 display: inline-block;
}
.horizontal {
  @apply(--layout-horizontal);
}

.text {
  font-size: 200%;
  padding-left: 40px;
  padding-top: 20px;
}

</style>

   <div class="horizontal">
     <civ-lootinfo id="takeloot"></civ-lootinfo>
     <civ-listoftools id="totake"></civ-listoftools>
   </div>
   <br/>
   <div class="horizontal">
     <civ-lootinfo id="loot"></civ-lootinfo>
     <civ-listoftools id="taken"></civ-listoftools>
     <div class="text" id="text">{{localize("takeloot")}}</div>
   </div>
`;
  }

  static get is() {
    return 'battle-takeloot';
  }

  static get properties() {
    return {
      used: {
        type: Array
      },
    }
  }

  _clear() {
    this.used = []
    this.$.taken.clear()
    this.$.loot.draw({"text" : C.localize("lootlabel"), "num": 0})
    C.displayelem(this.$.text,true,true)
    this._trigggerchange()
  }
  
  getRes() {
    return this.$.taken.getRes()
  }
  
  _trigggerchange() {
     if (this.fun == null) return
     this.fun(this.getRes())
  }

  _clicked(da,id) {
    if (C.onList(this.used,id)) {
       C.alertdialog(C.localize("loottakenalready"))
       return
    }
    var num = 0
    const li = this.$.taken.res
    if (li != null) for (var i=0; i<li.length; i++) num = num + li[i].loot
    if ((num + da.loot) > this.data.loot) {
      C.alertdialog(C.localize("toomuchloot","limit","" + this.data.loot))
      return
    }
    this.$.taken.addElem(da)
    // recalculate loot taken already
    this.$.loot.redrawnum(num + da.loot)
    // add to used list
    this.used.push(id)
    // remove text
    C.displayelem(this.$.text,false)
    this._trigggerchange()
  }

  /** Take winner loot
   *  loot : 1/2/3, number of loot to take
   *  list : list of loots to take
   */
  refresh(data) {
     this._clear()
     if (data == null) return
     this.$.totake.fun = (id,d) => this._clicked(id,d)
     this.$.totake.draw(data.list)
     this.$.loot.fun = () => this._clear()
     this.$.takeloot.draw({"text" : C.localize("takelabel"), "num" : data.loot})
  }

}

window.customElements.define(BattleTakeLoot.is, BattleTakeLoot);
