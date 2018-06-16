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

         <battle-loot id="battlelot">
         </battle-loot>

         <div id="winnerlootmessage">
          {{localize("takeloot")}}
         </div>

        <div class="buttons">
         <battle-loot class="chooseloot" id="chooselot">
         </battle-loot>
          <paper-button id="close" on-click="_onCancel">{{localize('endofbattle')}}</paper-button>
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
      },
      loot: {
        type: String,
        value: null
      }
    };
  }

  clickres(id) {
    this._messageloot(false);

    this.loot = id;
    const chooselot = this.$.chooselot;
    C.displayelem(chooselot, true);
    const rlist = [id];
    chooselot.draw(rlist);
  }

  _isloot() {
    const battle = this.data.board.battle;
    return battle.winnerloot != null && battle.winnerloot.length > 0;
  }

  _drawloot() {
    const battle = this.data.board.battle;
    const loot = this.$.battlelot;

    if (this._isloot()) {
      loot.fun = n => this.clickres(n);

      C.displayelem(loot, true);
      loot.draw(battle.winnerloot);
    }
  }

  _messageloot(display) {
    const m = this.$.winnerlootmessage;
    C.displayelem(m, display);
  }

  _removeloot() {
    this._messageloot(false);

    const loot = this.$.battlelot;
    const chooselot = this.$.chooselot;
    C.displayelem(loot, false);
    C.displayelem(chooselot, false);
    this.loot = null;
  }

  _onCancel() {
    if (this._isloot() && this.loot == null) {
      this._messageloot(true);

      return;
    }

    this.closeIt();
    const pa = {};
    pa.row = -1;
    pa.col = -1;
    pa.param = this.loot;
    C.executeC("ENDBATTLE", pa);
  }

  _disableclose(disable) {
    const c = this.$.close;
    C.disableleme(c, disable);
  }

  refresh(data) {
    this._removeloot();

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

    if (battle.bothsides || battle.attackerwinner && a.you || !battle.attackerwinner && d.you) {
      this._disableclose(false);

      this._drawloot();
    }
  }

}

window.customElements.define(BattleResult.is, BattleResult);