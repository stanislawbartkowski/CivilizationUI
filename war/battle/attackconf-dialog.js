import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class AttackConfDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>


    <paper-dialog id="dialog" modal="">
      <h3>
        <span>{{localize('doyouwanttoattack')}} {{object}} ?</span>
        <span><civ-square id="square" row="-1" col="-1"></civ-square></span>
      </h3>

      <p></p>

      <div class="buttons">


        <paper-button on-click="_onAttack" dialog-dismiss>
            <iron-icon src="images/icons/attack.svg"></iron-icon>
           {{localize('attack')}}
        </paper-button>

        <paper-button dialog-dismiss>{{localize('cancellabel')}}</paper-button>
      </div>

    </paper-dialog>
`;
  }

  static get is() {
    return 'attackconf-dialog';
  }

  _onAttack() {
    C.executeC("ATTACK", this.data);
  }

  /** Confirmation dialog before launching the attack.
   * pa : square to be attacked
  */
  refresh(pa) {
	// what is attacked 
    if (pa.square.numberofArmies > 0) this.object = C.localize('civarmy', 'civ', pa.square.civ);
    else if (pa.square.numberofScouts > 0) this.object = C.localize('civscout', 'civ', pa.square.civ);
    else if (pa.square.city != null) this.object = C.localize('attacknormalcity', 'civ', pa.square.civ);
    else this.object = C.localize('villagelabel');
    
    this.$.square.draw(pa.square);
  }

}

window.customElements.define(AttackConfDialog.is, AttackConfDialog);
