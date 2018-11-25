import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivShowTech extends CivDialog(PolymerElement) {
  static get template() {
    return html`
   <paper-dialog id="dialog">

      <div>
        <civ-tlevel id="level"></civ-tlevel>
        <civ-tech id="tech"></civ-tech>
      </div>

   </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showtech';
  } // parameter: playertec


  refresh(data) {
    const tech = C.findTech(data);
    this.$.tech.draw({
      "tech": data
    });
    const level = this.$.level;
    level.draw(tech.level);
  }

}

window.customElements.define(CivShowTech.is, CivShowTech);