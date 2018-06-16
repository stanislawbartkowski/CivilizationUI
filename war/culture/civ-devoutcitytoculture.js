import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class DevoutCityToCulture extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: inline-block;
      }

      .numb {
        display: inline-block;
        padding-right: 5px;
        padding-left: 5px;
        font-size : 200%;
      }


    </style>


    <paper-dialog id="dialog">
      <h3>{{localize('youareabouttodevoutcitytoculture')}}</h3>
      <p>
      <civ-square id="city"></civ-square>
      <span style="display:inline-block; width:10px"></span>{{localize('cityculture')}} {{data.square.culture}}

      </p><div>
      <civ-listofsquares id="scouts"></civ-listofsquares>
      </div>

      <div class="buttons">

        <paper-button on-click="_onDevout">
            <iron-icon src="images/tokens/culture.svg"></iron-icon>
           <span class="numb">{{noofculture}}</span>
           {{localize('devouttoculture')}}
        </paper-button>

        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'civ-devoutcitytoculture';
  }

  static get properties() {
    return {
      noofculture: {
        type: Number
      }
    };
  }

  _extractscouts(pa) {
    for (var i = 0; i < pa.list.length; i++) if (C.eqp(pa.square, pa.list[i])) return pa.list[i].list;

    return null;
  }

  setScout(pa) {
    this.$.scouts.addSquare(pa);
  }

  _onDevout() {
    const command = "DEVOUTTOCULTURE";
    C.executewithconffun(this.localize('areyousurequestion'), command, e => {
      this.closeIt();
      const pa = {};
      pa.row = this.data.row;
      pa.col = this.data.col;
      pa.param = this.$.scouts.getSelected();
      C.executeC(command, pa);
    });
  }

  _displaynum(pa) {
    const selected = this.$.scouts.getSelected();
    this.noofculture = pa.square.culture + selected.length;
  }

  openIt(pa) {
    C.setcurrentcommand("selectscoutdevout");
    const y = C.getyourdeck();
    super.noCancelOnOutsideClick();
    this.$.city.draw(pa.square);

    const li = this._extractscouts(pa);

    this.$.scouts.draw(li);
    this.$.scouts.setlist(li);

    this.$.scouts.fun = s => this._displaynum(pa);

    this._displaynum(pa);

    super.openIt(pa);
  }

}

window.customElements.define(DevoutCityToCulture.is, DevoutCityToCulture);
