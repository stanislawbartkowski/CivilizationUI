import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivChoose extends CivData(PolymerElement) {
  static get template() {
    return html`
    
 <style is="custom-style" include="civ-paper-button-styles">

      /* local styles go here */
    :host {
      display: inline-block;
      text-transform: none;
      width: 350px;
    }
    
    .buttons {
       display:inline-block;
              
    }

    paper-button {
      text-transform: none;
    }

   iron-icon {
     --iron-icon-width:20px;
     --iron-icon-height:20px;
   }


.desc {
  background-color: #f3f3f7;
}

.not {
       margin-left : 2px;
       height:15px;
}
  </style>



    <!-- shadow DOM goes here -->
    <div style="
         box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
         padding: 16px;
         margin: 24px;
         border-radius: 5px; background-color: #fff; color: #757575;">

      <span style="vertical-align: top; display: inline-block; height: 64px; width: 64px; border-radius: 50%; background: #ddd; line-height: 64px; font-size: 30px; color: #555; text-align: center;">
         {{letter}}
       </span>

      <div style="display:inline-block">
        <span style="padding-left:10px;">{{data.civ}}</span>
        <p>
        <iron-icon src="images/cities/research.svg" slot="item-icon" on-click="showtech"></iron-icon>
            <span style="padding-left:10px;">{{data.tech}}</span>
        </p>
        <p>
          <iron-icon src="images/cities/gover.svg" slot="item-icon"></iron-icon> 
             <span style="padding-left:10px;">{{data.gover}}</span>
        </p>
      </div>
      
      <div id="buttons" class="buttons">
         <paper-button on-click="twoplayersClick">{{localize('twoplayersgamelabel')}}</paper-button>
         <paper-button on-click="handleClick">{{localize('traininggamelabel')}}</paper-button> 
      </div>

      <div class="desc">
        {{data.desc}}
        <civ-implemented id="notimplemented" class="not"></civ-implemented>
      </div>

    </div>
`;
  }

  static get is() {
    return 'civ-choose';
  }

  static get properties() {
    return {
      letter: {
        type: String
      },
      info: {
        type: Boolean
      }
    };
  }

  civname() {
    if (this.data == null) return "";
    return this.data.civ;
  }

  handleClick() {
    C.startgamedialog(this.civname());
  }

  showtech() {
    C.showsingletech(this.data.tech);
  }

  twoplayersClick() {
    C.joindialog(this.civname());
  }

  refresh(data) {
    this.letter = C.getCivShort(this.civname());
    const b = this.$.buttons;
    C.displayelem(b, !this.info, true);
    const ni = this.$.notimplemented;
    ni.draw(this.data.ni);
  }

} // Register the x-custom element with the browser


customElements.define(CivChoose.is, CivChoose);