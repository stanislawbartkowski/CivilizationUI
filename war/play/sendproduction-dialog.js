import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class SendProductionDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog">
      <h3 id="sendproductiontitle" style="display:none">{{localize('youareabouttosendproduction')}}</h3>
      <h3 id="harvestresourcetitle" style="display:none">{{localize('youareabouttoharvestresource')}}</h3>
      <p>

      <civ-square id="square" row="-1" col="-1"></civ-square>

      </p><div>{{localize('specifythesuqretoharvest')}}</div>

      <p></p>
      <civ-selectsquare id="scout"></civ-selectsquare>

      <div class="buttons">

        <paper-button id="sendproductionbutton" style="display:none" on-click="_onSend">
            <iron-icon src="images/tokens/production.svg"></iron-icon>
           {{localize('sendproduction')}}
        </paper-button>

        <paper-button id="harvestresourcebutton" style="display:none" on-click="_onSend">
            <iron-icon icon="icons:build"></iron-icon>
           {{localize('harvestresource')}}
        </paper-button>

        <paper-button on-click="_onCancel" dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'sendproduction-dialog';
  }

  static get properties() {
    return {
      names: {
        type: Array,
        readOnly: true,
        value: ["harvestresource", "sendproduction"]
      },
      harvestresource: {
        type: Boolean
      }
    };
  }

  _setScoutPoints() {
    const pa = this.data;
    const itemize = pa.itemized;
    const a = [];

    for (var i = 0; i < itemize.length; i++) {
      const ci = itemize[i].p;
      const sco = itemize[i].param;
      if (C.eqp(ci, pa)) a.push(sco);
    }

    C.setlistofpoints(a);
  }

  _onSend() {
    const scout = this.$.scout.getPoint();

    if (scout == null) {
      C.alertdialog(C.localize('specifythesuqretoharvest') + " !");
      return;
    }

    var command = "SENDPRODUCTION";
    if (this.harvestresource) command = "HARVESTRESOURCE";
    C.executewithconffun(this.localize('areyousurequestion'), command, e => {
      this.closeIt();
      const pa = this.data;
      pa.param = C.constructP(scout.row, scout.col);
      C.executeC(command, pa);
    });
  }

  _clearLabels() {
    for (var i = 0; i < this.names.length; i++) {
      C.displayelemid(this, this.names[i] + "title", false);
      C.displayelemid(this, this.names[i] + "button", false);
    }
  }

  _clearSquare() {
    this._clearLabels();

    C.clearCommand();
    const sq = this.$.square;
    sq.draw(null);
    const sc = this.$.scout;
    sc.draw(null);
  }

  _onCancel() {
    this._clearSquare();
  }

  setScout(pa) {
    this.$.scout.draw(pa);
  }

  openIt(pa) {
    this.harvestresource = C.iscurrentcommand("harvestresource");

    this._clearLabels();

    C.displayelemid(this, C.getcurrentcommand() + "title", true);
    C.displayelemid(this, C.getcurrentcommand() + "button", true);
    const sq = this.$.square;
    C.setShadowStyleAttribute(sq, ":host", "float", null);
    const sc = this.$.scout;
    sq.draw(pa.square);
    sc.draw(null);
    this.scout = null;
    C.setcurrentcommand("selectscout");
    super.openIt(pa);
    super.noCancelOnOutsideClick();

    this._setScoutPoints();
  }

}

window.customElements.define(SendProductionDialog.is, SendProductionDialog);
