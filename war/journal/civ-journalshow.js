import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivJournalDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
    paper-dialog paper-dialog-scrollable {
      --paper-dialog-scrollable : {
        width: 360px;
        height: 340px;
      }
    }
    </style>
     <paper-dialog id="dialog">
     
        <h2>{{header}}</h2>
        
        <paper-dialog-scrollable>
          <civ-journal id="j"></civ-journal>
        </paper-dialog-scrollable>

        <div class="buttons">
            <paper-button dialog-dismiss>{{localize('hidelabel')}}</paper-button>
        </div>

      </paper-dialog>
    `;
  }

  refresh(data) {
    if (data == null) return;
    const j = this.$.j
    this.noCancelOnOutsideClick()
    j.draw(data)
  }


}
customElements.define('civ-journaldial', CivJournalDialog);
