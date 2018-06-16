import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivBuyUnit extends CivDialog(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

 .elem {
   vertical-align: top;
   display : none
 }

    .reservex {
         position: absolute;
         bottom : 10px;
    }



    </style>

       <paper-dialog id="dialog">

       <h2>{{localize('buyunit')}}</h2>

       <div>

        <civ-chooseunits id="list">

          <div style="margin-left:20px;">
            <civ-selectsquare class="elem" id="city"></civ-selectsquare>
             <paper-button id="button" class="elem green" dialog-dismiss="" on-click="_onClick">{{buttontext}}</paper-button>
          </div>
         </civ-chooseunits>
        </div>


        <div class="buttons">
            <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
        </div>

      </paper-dialog>
`;
  }

  static get is() {
    return 'civ-buyunitdialog';
  }

  static get properties() {
    return {
      buttontext: {
        type: String
      },
      label: {
        type: String
      },
      refreshalways: {
        type: Boolean,
        readOnly: true,
        value: true
      }
    };
  }

  _onClick() {
    const p = this.$.city.getPoint();
    C.executeC(this.label, {
      "row": p.row,
      "col": p.col
    });
  }

  setPoint(p) {
    C.displayelem(this.$.city, true, true);
    this.$.city.draw(p);
    C.displayelem(this.$.button, true, true);
  }

  _choosedUnit(p) {
    this.label = "buy" + p.name;
    this.buttontext = C.localize(this.label);
    C.displayelem(this.$.city, false);
    C.displayelem(this.$.button, false);
    C.itemizecommand(this.label);
  }

  refresh(data) {
    super.noCancelOnOutsideClick();
    C.setlistofpoints(null);
    this.$.list.draw(data);
    C.displayelem(this.$.city, false);
    C.displayelem(this.$.button, false);

    this.$.list.fun = p => this._choosedUnit(p);
  }

}

window.customElements.define(CivBuyUnit.is, CivBuyUnit);
