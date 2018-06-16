import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivTakeResource extends CivDialog(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

      .button {
          margin-top: 5px;
          margin-left:20px;
      }

    </style>

    <paper-dialog id="dialog" modal="">

     <h2>{{localize('chooseresourceforfree')}}</h2>

     <div>

        <civ-chooseresource id="list">

        <div class="button">
          <paper-button id="take" class="green" dialog-dismiss="" on-click="_click">{{localize('takebutton')}}</paper-button>
        <div>



      </div>




  </div></civ-chooseresource></div></paper-dialog>
`;
  }

  static get is() {
    return 'civ-takeresourcedialog';
  }

  _click() {
    const res = this.$.list.getChoosed()[0];
    C.executeC(super.getCommand(), {
      "param": res.resource
    });
  }

  _take(e) {
    C.displayelem(this.$.take, true, true);
  }

  refresh(data) {
    const res = [];
    C.displayelem(this.$.take, false);

    for (var i = 0; i < data.length; i++) res.push({
      "resource": data[i],
      "num": 1
    });

    this.$.list.fun = e => this._take(e);

    this.$.list.draw(res);
  }

}

window.customElements.define(CivTakeResource.is, CivTakeResource);
