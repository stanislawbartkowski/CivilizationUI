import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";
import { CivChooseData } from "../js/civ-choosedata.js"

class BattleLootWithCost extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
<style>
:host {
  	 display: block;
	   margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     border-radius: 3px;
     width : 95px;
}
.loot {
  display : none;
  width : 35px;
}

.text {
  width : 95%;
  margin-left: 2.5%;
  display : none;
  background-color: #e6e2d9;
  font-size: 90%
  heigth : 40px;
}

</style>

   <div>
     <div>
      <civ-resources id="resources"></civ-resources>
      <img id="level1" src="images/culturetrack/one.svg" class="loot" title = "{{localize('loot1effect')}}"/>
      <img id="level2" src="images/culturetrack/two.svg" class="loot" title = "{{localize('loot2effect')}}"/>
     </div>
      <span id="param" class="text">{{text}}</span>
   </div>

`;
  }

  static get is() {
    return 'loot-cost';
  }

  static get properties() {
    return {
      text: {
        type: String
      }
   }
 }


  /** Return data to display
   * data
   * return : "resource" : resource name, "param" : the text
  */
  _toresourcename(data) {
    if (data.name == "tech") return { "resource" : "tech", "param" : data.tech}
    if (data.name == "resource") return { "resource" : data.resource}
    if (data.name == "coin" && data.coinsheet) return {"resource" : "Coin", "param" : C.localize("cardonsheet")}
    if (data.name == "hut") return { "resource" : "Hut"}
    if (data.name == "village") return { "resource" : "Village"}
    if (data.name == "culture") return { "resource" : "Culture"}
    if (data.name == "trade") return { "resource" : "trade"}
    if (data.name == "card") return { "resource" : "card", "param" : C.localize("cardlevel","level","" + data.level)}
    if (data.name == "coin") return { "resource" : "Coin", "param" : data.tech}
    C.internalerroralert(data.name + " unknown loot type")
  }

  /** Display the loot to steal`
   *   "name" : name of the loot : trade, hut, village, resource, culture, card, tech, coin
   *   "loot" : loot effect, 1 or 2
   *   "tech" : for tech loot the technlogy name, for coin loot, the technlogy where the coin is put
   *   "resource" : for resource loot, the resource name
   *   "level" : for card loot, the card level
   *   "coinsheet" : if loot name is cont, true, for the coin on the sheet
   * Example : {"name":"trade","loot":1,"tech":null,"resource":null,"level":null,"coinsheet":null},
   */
  refresh(data) {
    const pa = this._toresourcename(data)
    this.text = pa.param
    C.displayelem(this.$.level1,false)
    C.displayelem(this.$.level2,false)
    this.$.resources.draw(C.createRes(pa.resource))
    if (data.loot == 2)  C.displayelem(this.$.level2,true,true)
    else C.displayelem(this.$.level1,true,true)
    const t = this.$.param
    C.displayelem(t,false)
    if (!C.emptyS(pa.param)) C.displayelem(t,true,true)
  }

}

window.customElements.define(BattleLootWithCost.is, BattleLootWithCost);
