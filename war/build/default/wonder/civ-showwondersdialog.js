import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivWondersDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
   <paper-dialog id="dialog">

     <h2>{{header}}</h2>

     <div>
       <civ-dispwonders style="display:none" id="resources"></civ-dispwonders>
     </div>

     <div id="empty" style="display:none">
       {{localize('nowonders')}}
     </div>

   </paper-dialog>
`;
  }

  static get is() {
    return 'civ-showwondersdialog';
  }

  refresh(data) {
    super.drawlistorempty(data);
  }

}

window.customElements.define(CivWondersDialog.is, CivWondersDialog);