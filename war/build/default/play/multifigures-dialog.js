import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class MultiFiguresDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h3>{{localize('youareaboutmovingtwofigures')}}</h3>
      <p>

      </p><div>{{localize('choosenumberoffigures')}}</div>

      <figurenumber-widget id="armynumb"></figurenumber-widget>
      <figurenumber-widget id="scoutnumb"></figurenumber-widget>

      <div class="buttons">

        <paper-button on-click="_onMove">
            <iron-icon icon="fingerprint"></iron-icon>
           {{localize('startmove')}}
        </paper-button>

        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'multifigures-dialog';
  }

  _verify(label, numb, max) {
    if (numb > max) {
      C.alertdialog(this.localize(label, 'max', '' + max));
      return true;
    }

    return false;
  }

  _onMove() {
    const armies = Number(this.$.armynumb.numb);
    const scouts = Number(this.$.scoutnumb.numb);

    if (armies == 0 && scouts == 0) {
      C.alertdialog(this.localize('nothingtomove'));
      return;
    }

    if (this._verify('numberofarmiesexceeds', armies, this.data.param.numberofArmies)) return;
    if (this._verify('"numberofscoutsexceeds"', scouts, this.data.param.numberofScouts)) return;
    const pa = this.data;
    pa.param.numberofArmies = armies;
    pa.param.numberofScouts = scouts;
    C.executewithconf(null, "STARTMOVE", pa, this);
  }

  openIt(pa) {
    super.openIt(pa);
    const e = this.$.armynumb;
    e.draw('numberofarmies', pa.param.numberofArmies);
    const e1 = this.$.scoutnumb;
    e1.draw('numberofscouts', pa.param.numberofScouts);
  }

}

window.customElements.define(MultiFiguresDialog.is, MultiFiguresDialog);