import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivBuyInCity extends CivDialog(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

 .elem {
   vertical-align: top;
   display : none
 }

    </style>

       <paper-dialog id="dialog">

       <h2>{{data.header}}</h2>

       <div>

          <div style="margin-left:20px;">
             <civ-selectsquare class="elem" id="city"></civ-selectsquare>
             <paper-button id="button" class="elem green" dialog-dismiss="" on-click="_onClick">{{data.buttonbuy}}</paper-button>
          </div>
        </div>


        <div class="buttons">
            <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
        </div>

      </paper-dialog>
`;
  }

  static get is() {
    return 'civ-buyincity';
  }

  _onClick() {
    const p = this.$.city.getPoint();
    C.executeC(C.getcurrentcommand(), {
      "row": p.row,
      "col": p.col
    });
  }

  setPoint(p) {
    C.displayelem(this.$.city, true, true);
    this.$.city.draw(p);
    C.displayelem(this.$.button, true, true);
  } // data
  // {
  //	header : title
  //  buttonbuy : button text
  // }


  refresh(data) {
    if (data == null) return;
    super.noCancelOnOutsideClick();
    const list = C.getitemizedcommand();
    const l = C.listofpointsp(list);
    C.setlistofpoints(l);
    C.displayelem(this.$.city, false);
    C.displayelem(this.$.button, false);
  }

}

window.customElements.define(CivBuyInCity.is, CivBuyInCity);
