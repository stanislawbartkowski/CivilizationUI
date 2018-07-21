import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class BattleResult extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

      .name {
         font-size : 200%;
         text-align : center;
         padding-left : 20px;
      }

      .chooseloot {
         margin-left : 10px;
         margin-right : 100px;
      }

    </style>


    <paper-dialog id="dialog" modal="">

         <div>
         <s-svg src="images/icons/sun.svg" style="height:60px; width:60px;"></s-svg> <span class="name">{{winnername}}</span>
         </div>

         <div>
         <s-svg src="images/icons/killed.svg" style="height:60px; width:60px"></s-svg> <span class="name">{{losername}}</span>
         </div>
         <p>
         </p><div>
           {{youresult}}
         </div>

         <battle-takeloot id="battlelot">
         </battle-takeloot>

        <div class="buttons">
          <paper-button id="close" on-click="_endofbattle">{{localize('endofbattle')}}</paper-button>
       </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'battle-result';
  }

  static get properties() {
    return {
      winnername: {
        type: String
      },
      losername: {
        type: String
      },
      youresult: {
        type: String
      }
    };
  }

  clickres(id) {
    this._refreshclose()
  }

  _isloot() {
    const battle = this.data.board.battle;
    return battle.winnerloot != null && battle.winnerloot.list.length > 0;
  }
  
  _refreshclose() {
    const res = this.$.battlelot.getRes()
    if (res.length > 0 || !this._isloot()) this._disableclose(false);
    else this._disableclose(true);
  }

  _drawloot() {
    const battle = this.data.board.battle;
    const loot = this.$.battlelot;

    if (this._isloot()) {
      loot.fun = n => this.clickres(n);
      C.displayelem(loot, true);
      loot.draw(battle.winnerloot);
    }
    this._refreshclose()
  }

  _endofbattle() {
    this.closeIt();
    const res = this.$.battlelot.getRes()
    C.executeC("ENDBATTLE", { "param" : res });
  }

  _disableclose(disable) {
    const c = this.$.close;
    C.disableleme(c, disable);
  }

  refresh(data) {

    const battle = data.board.battle;
    const a = battle.attacker;
    const d = battle.defender;
    var lname = "";

    if (battle.attackerwinner) {
      this.winnername = C.getSideName(a);
      this.losername = C.getSideName(d);
      if (a.you) lname = "youwin";else lname = "youlose";
    } else {
      this.winnername = C.getSideName(d);
      this.losername = C.getSideName(a);
      if (d.you && !a.you) lname = "youwin";else lname = "youlose";
    }

    this.youresult = C.localize(lname);

    this._disableclose(true);
    C.displayelem(this.$.battlelot, false);

    if (battle.bothsides || battle.attackerwinner && a.you || !battle.attackerwinner && d.you) 
      this._drawloot(); 
  }

}

window.customElements.define(BattleResult.is, BattleResult);
