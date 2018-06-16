import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class Reveal2Dialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h3>{{localize('revealtwotiles')}}</h3>
      <p>

      </p><div>{{localize('choosetilequestion')}}</div>

      <div class="buttons">
        <paper-button id="up" on-click="_onReveal">
            <iron-icon icon="arrow-upward"></iron-icon>
           {{localize('tileup')}}
        </paper-button>

        <paper-button id="right" on-click="_onReveal">
           <iron-icon icon="arrow-forward"></iron-icon>
           {{localize('tileright')}}
        </paper-button>

        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'reveal2-dialog';
  }

  _onReveal(source) {
    const id = source.currentTarget.id;
    const li = this.data.list;
    var k = 0;

    for (var i = 0; i < li.tiles.length; i++) {
      const r = li.tiles[i];

      switch (r.orientation.toLowerCase()) {
        case "up":
          {
            if (id == "up") k = i;
            break;
          }

        case "down":
          {
            if (id == "up") k = i;
            break;
          }

        case "left":
          {
            if (id == "right") k = i;
            break;
          }

        case "right":
          {
            if (id == "right") k = i;
            break;
          }
      } // switch

    } // for


    const r = li.tiles[k];
    const pa = {};
    pa.row = r.p.row;
    pa.col = r.p.col;
    pa.param = r.orientation;
    C.executewithconf(null, "revealtile", pa, this);
  }

}

window.customElements.define(Reveal2Dialog.is, Reveal2Dialog);
