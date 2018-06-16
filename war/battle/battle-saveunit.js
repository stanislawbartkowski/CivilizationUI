import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class BattleSaveUnitsDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
  <style is="custom-style" include="civ-paper-button-styles">

   </style>

    <paper-dialog id="dialog" modal="">

     <div>

       <h2>{{header}}</h2>

       <civ-chooseunits id="list">
          <div style="margin-left:20px;">
          <paper-button id="save" class="green" dialog-dismiss="" on-click="_onClick">{{localize('saveunit')}}</paper-button>
        </div>

       </civ-chooseunits>
     </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'battlesaveunit-dialog';
  }

  _onClick() {
    const u = this.$.list.getChoosed();
    C.executeC("saveunit", {
      "row": u.index,
      "col": -1
    });
  }

  fun(e) {
    C.displayelem(this.$.save, true);
  }

  refresh(pa) {
    this.header = C.localize("saveyourunit", "civ", pa.civ);
    const li = {
      "list": pa.killedunits
    };

    this.$.list.fun = e => this.fun(e);

    this.$.list.draw(li);
    C.displayelem(this.$.save, false);
  }

}

window.customElements.define(BattleSaveUnitsDialog.is, BattleSaveUnitsDialog);
