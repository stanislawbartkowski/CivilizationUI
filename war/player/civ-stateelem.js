import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";

class CivStateElem extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style" include="civ-paper-button-styles">

  paper-icon-item {
     --paper-item-min-height : 0;
     --paper-item : {
/*       padding-top: 5px; */
       padding-right: 8px;
       padding-bottom: 1px;
       padding-left: 8px;
       font-size : 90%;
/*       height : 15px; */
       }
   }

   iron-icon {
     --iron-icon-width:20px;
     --iron-icon-height:20px;
   }

  .goverspan {
    position: relative;
    margin: 0;
    @apply --layout-horizontal;
  }


</style>

</custom-style>


<div class="goverspan">
  <paper-icon-item style="display:inline-block" on-click="_fun1">
    <iron-icon src="images/[[image1]]"></iron-icon>
    [[data.text1]]
  </paper-icon-item>

  <paper-icon-item style="display:inline-block" on-click="_fun2">
    <iron-icon src="images//[[image2]]"></iron-icon>
    [[data.text2]]
  </paper-icon-item>
</div>
`;
  }

  static get is() {
    return 'civ-stateelem';
  }

  _fun1() {
    if (this.data.fun1 != null) this.data.fun1();
  }

  _fun2() {
    if (this.data.fun2 != null) this.data.fun2();
  }

  static get properties() {
    return {
      image1: {
        type: String,
        value: "Octocat.png"
      },
      image2: {
        type: String,
        value: "Octocat.png"
      }
    };
  } // {
  // "image1" : "text1"
  // "image2" : "text2"
  // "fun1" : "fun2"
  // }


  refresh(y) {
    this.image1 = y.image1;
    this.image2 = y.image2;
  }

}

customElements.define(CivStateElem.is, CivStateElem);
