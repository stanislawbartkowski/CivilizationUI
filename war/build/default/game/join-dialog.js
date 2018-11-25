import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class JoinDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
   <style is="custom-style" include="civ-paper-button-styles">

     :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h3>{{header}}</h3>
      <p>
      </p><p>
        <span style="
         box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
         padding:12px;
         margin: 0px,24px;
         border-radius: 5px; background-color: #fff; color: #252525;">
        You are playing {{civname}}
        </span>
      </p>

      <p>{{localize('chooseopponentlabel')}}</p>
      <p></p><p>

      </p><p>
      <template id="civs" is="dom-repeat" items="{{lines}}">

       <paper-button id="{{item.civ}}" raised="" class="green" on-click="_onClickCiv">{{item.civ}}</paper-button>

      </template>
      </p>

       <span id="waiting" hidden="">
         <span style="padding-right:10px; ">{{localize('waitingforopponentlabel')}}</span> <paper-spinner active=""></paper-spinner>
       </span>

      <div class="buttons">
        <paper-button on-click="_onCancel">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'join-dialog';
  }

  static get properties() {
    return {
      civname: {
        type: String,
        value: undefined
      },
      header: {
        type: String,
        value: undefined
      },
      gameid: {
        type: Number,
        value: undefined
      },
      lines: {
        type: Array,
        value: []
      },
      // true : if waiting for opponent
      showwaiting: {
        type: Boolean,
        value: false
      }
    };
  }

  ready() {
    super.ready();
  }

  _disablecivs(disable) {
    var d = this.$.dialog;

    for (var i = 0; i < this.lines.length; i++) {
      var ge = d.querySelector("#" + this.lines[i].civ);
      if (ge != null) C.disableleme(ge, disable);
    }
  }

  _showwaiting(show) {
    this.showwaiting = show;
    var e = this.$.waiting;
    C.showeleme(e, show);
  }

  _onCancel() {
    // unregister if activated
    if (this.showwaiting) C.unregistertoken();
    C.closejoindialog();
  }

  openIt() {
    this._showwaiting(false);

    this._disablecivs(false);

    super.openIt();
  }

  _onClickCiv(p) {
    const civo = p.target.id;

    if (civo == this.civname) {
      C.alertdialog(C.localize("choosedifferent"));
      return;
    }

    const message = this.localize('doyouwanttostartquestion', 'civname', this.civname, 'civopposite', civo);
    C.confirmdialog(message, e => {
      this._disablecivs(true);

      this._showwaiting(true);

      if (this.gameid > 0) C.resumetwoplayersgame(this.gameid, this.civname);else C.registertwoplayersgame(this.civname, civo);
    });
  }

}

window.customElements.define(JoinDialog.is, JoinDialog);