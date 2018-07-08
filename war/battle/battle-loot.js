import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class BattleLoot extends CivDialog(PolymerElement) {
  static get template() {
    return html`
<style>
:host {
	 display: block;
	 margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     border-radius: 5px;
}
</style>


   <civ-resources id="resources">
   </civ-resources>
`;
  }

  static get is() {
    return 'battle-loot';
  }

  _toname(n) {
    for (var j = 0; j < this.data.length; j++) if (n == this.data[j].toLowerCase()) return this.data[j];

    return null;
  }

  /**
   * List of resources
   */
  clickres(id) {
    if (this.fun == null) return;

    // single resource here
    const n = this._toname(id[0].resource);

    this.fun(n);
  }

  refresh(data) {
    const r = this.$.resources;

    r.fun = e => this.clickres(e);

    const names = r.names;
    const rlist = [];

    for (var i = 0; i < data.length; i++) {
      const n = data[i].toLowerCase();
      const nu = data[i];

      if (C.onList(names, n)) {
        const e = {};
        e.resource = n;
        e.num = 1;
        rlist.push(e);
      }
    } // for


    r.draw(rlist);
  }

}

window.customElements.define(BattleLoot.is, BattleLoot);
