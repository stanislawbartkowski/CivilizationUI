import { CivTechDialog } from "./civ-techdialog.js";

class CivChooseTechDialog extends CivTechDialog {
  static get is() {
    return 'civ-choosetechdialog';
  }

  onResearch() {
    if (this.tech == null) return;
    const toresearch = this.tech.tech;

    this._clear();

    super.closeIt();
    if (this.fun != null) this.fun(toresearch);
  }

}

window.customElements.define(CivChooseTechDialog.is, CivChooseTechDialog);