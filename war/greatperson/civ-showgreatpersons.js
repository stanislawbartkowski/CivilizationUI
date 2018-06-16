import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivShowGreatPersons extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <paper-dialog id="dialog">

      <h2>{{header}}</h2>

       <div>
        <civ-greatpersonlist id="resources" style="display:none"></civ-greatpersonlist>
       </div>

        <div id="empty" style="display:none">
          {{localize('nogreatpersons')}}
        </div>


     </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showgreatpersons';
  }

  refresh(data) {
    const res = C.copyTable(data.personsused);

    for (var i = 0; i < data.personsno; i++) if (data.persons != null) res.push(data.persons[i]);else res.push("");

    super.drawlistorempty(res);
  }

}

window.customElements.define(CivShowGreatPersons.is, CivShowGreatPersons);
