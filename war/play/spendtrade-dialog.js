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
      <div>{{localize('reduceratio')}}[[reduceratio]]</div>
      <div>{{localize('productionspendincrease')}}[[increasepoints]]</div>


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
      reduceratio: {
        type: Number
      },
      maxproduction: {
        type: Number
      },
      increasepoints: {
        type: Number
      },
      exchangeratio: {
        type: Number
      }
    };
  }

 
  _okNumb(prod) {
    const v = Math.floor(prod / this.increasepoints) * this.increasepoints
    return v == prod
  } 

  _onSpend() {
    const prod = this.$.numbproduction.getNumb();

    if (prod < 1 || prod > this.maxproduction) {
      C.alertdialog(this.localize('productionfromtradeshouldbe', "max", this.maxproduction));
      return;
    }
    
    if (!this._okNumb(prod)) {
      C.alertdialog(this.localize('productionincreaseshouldbemultiplication', "prodfortrade", this.increasepoints));
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
    if (!this._okNumb(newValue)) return 
    const y = C.getyourdeck(); 

    this.tradetospend = Math.floor((this.maxproduction - newValue) * this.exchangeratio);
    if (this.tradetospend < 0) this.tradetospend = "?";
  }

  refresh(pa) {
    const y = C.getyourdeck();
    this.reduceratio = y.tradeforprod;
    this.increasepoints = y.prodfortrade;
    this.exchangeratio = y.tradeforprod / y.prodfortrade; 

    this.maxproduction = Math.floor(y.trade / this.exchangeratio);

    const e = this.$.numbproduction;
    e.numberChanged = (newValue, oldValue) => this._numberChanged(newValue, oldValue);

//    this._numberChanged(y.prodfortrade, 0);

    e.draw('amountofproduction', y.prodfortrade, this.maxproduction);
  }

}

window.customElements.define(SpendTradeDialog.is, SpendTradeDialog);
