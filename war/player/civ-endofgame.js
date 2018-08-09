import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivEndOfGame extends CivDialog(PolymerElement) {

  static get template() {
    return html`
<style>
   .horizontal {
         @apply(--layout-horizontal);
    }
    .winner {
      font-size : 150%;
    }

    .victory {
      font-size : 120%;
    }

</style>
    <paper-dialog id="dialog" modal="">

     <h2>{{header}}</h2>

     <div class="horizontal">
     
       <img src="images/icons/winner.svg" style="width:150px"></img>
       
       <div>
         <span class="winner"> {{data.board.endofgame.winner}} </span>
         <P/>
         <span class="victory">{{victory}}</span>
       </div>
       
     </div>
    
    <div class="buttons">
        <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
    </div>
    
    
    </paper-dialog>
`;
  }
  
  static get properties() {
    return {
      victoryname: {
        type: String
      }
    };
  }


  static get is() {
    return 'civ-endofgame';
  }

  refresh(b) {
     this.victory = C.localize(b.board.endofgame.wintype + "label")
  }

}

window.customElements.define(CivEndOfGame.is, CivEndOfGame);
