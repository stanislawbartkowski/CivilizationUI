import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class SpendTradeDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: inline-block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h2>{{localize('youareabouttospendtrade')}}</h2>
      <p>

      </p><div>{{localize('specifyamountofproduction')}}</div>

      <div>{{localize('tradetospend')}}{{tradetospend}}</div>
      <div>{{localize('reduceratio')}}[[tradeforprod]]</div>


      <figurenumber-widget id="numbproduction"></figurenumber-widget>

      <div class="buttons">

        <paper-button on-click="_onSpend">
            <iron-icon src="images/tokens/trade.svg"></iron-icon>
           {{localize('spendtrade')}}
        </paper-button>

        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'spendtrade-dialog';
  }

  static get properties() {
    return {
      tradetospend: {
        type: Number
      },
      maxproduction: {
        type: Number
      },
      tradeforprod: {
        type: Number
      }
    };
  }


  _onSpend() {
    const prod = this.$.numbproduction.getNumb();

    if (prod < 1 || prod > this.maxproduction) {
      C.alertdialog(this.localize('productionfromtradeshouldbe', "max", this.maxproduction));
      return;
    }
    
    C.executewithconffun(this.localize('areyousurequestion'), "SPENDTRADE", e => {
      this.closeIt();
      const pa = this.data;
      pa.param = prod;
      C.executeC("SPENDTRADE", pa);
    });
  }

  _numberChanged(newValue, oldValue) {
    this.tradetospend = Math.floor((this.maxproduction - newValue) * this.tradeforprod);
    if (this.tradetospend < 0) this.tradetospend = "?";
  }

  refresh(pa) {
    const y = C.getyourdeck()
    this.tradeforprod = y.tradeforprod

    this.maxproduction = Math.floor(y.trade / this.tradeforprod)

    const e = this.$.numbproduction
    e.numberChanged = (newValue, oldValue) => this._numberChanged(newValue, oldValue)

    e.draw(C.localize('amountofproduction'), 1, this.maxproduction)
  }

}

window.customElements.define(SpendTradeDialog.is, SpendTradeDialog);
