import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivCultureProgressElem extends CivData(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style">

:host {
    display: inline-block;
    width : 20px;
    height : 24px;
    border-radius: 5px;
    margin : 1px;
    padding : 1px;
  }

:host([yes]) {
  color : white;
  background-color: white;
}

:host([no]) {
  color : black;
  background-color: #eaeaea;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

<div>
   <span class="text">{{num}}</span>
</div>
`;
  }

  static get is() {
    return 'civ-cultureprogresselem';
  }

  static get properties() {
    return {
      num: {
        type: Number
      }
    };
  } //data :
  // {
  //   num :
  //   civ :
  //   active : true/false
  // }


  refresh(data) {
    if (data == null) return;
    this.num = data.num;
    this.removeAttribute('yes');
    this.removeAttribute('no');

    if (data.active) {
      this.setAttribute('yes', 1);
      const col = C.colorForCiv(data.civ);
      C.setShadowStyleAttribute(this, "yes", "backgroundColor", col);
    } else this.setAttribute('no', 1);
  }

}

customElements.define(CivCultureProgressElem.is, CivCultureProgressElem);