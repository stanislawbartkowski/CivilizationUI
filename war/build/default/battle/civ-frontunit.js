import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivFrontUnit extends CivData(PolymerElement) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style">

:host {
  display: inline-block;
  /*box-sizing: border-box;*/
  border : 1px solid;
  border-radius: 5px;
  width: 77px;
  height: 90px;
  vertical-align: top;
}

:host([highlight]) {
  background-color : #ffffb3
}


</style>

</custom-style>

<div ondrop="CivUnitsDraggable.ondragDrop(event)" ondragleave="CivUnitsDraggable.switchoffallfront(event)" ondragenter="CivUnitsDraggable.ondragEnter(event)" ondragexit="CivUnitsDraggable.switchoffallfront(event)" ondragover="event.preventDefault()" style="height:100%; width:100%">

   <div id="blank" style="display:none; min-height: 80px;">
     &nbsp;
   </div>
   <div id="front" style="display:none">
       <div style="background-color:AliceBlue">
           <span style="color:red">{{data.attachstrength}}</span>
           <span id="wound" style="display:none; padding-left:6px; padding-right:6px; border-radius:40%; background-color:crimson; margin-left:10%">
              {{data.wounds}}
           </span>
           <span style="float: right; color:green">
             <s-svg src="images/cities/shield.svg" fill="green" style="height:12px; width:12px"></s-svg>
             {{data.defendstrength}}
           </span>
         </div>
       <civ-units id="unit"><civ-units>
  </civ-units></civ-units></div>
</div>
`;
  }

  static get is() {
    return 'civ-frontunit';
  } // Declare properties for the element's public API


  static get properties() {
    return {
      num: {
        type: Number
      },
      you: {
        type: Boolean
      },
      turn: {
        type: Boolean
      }
    };
  }

  handleUp(e) {
    var a = e;
  }

  isEmptySlot() {
    return this.data == null;
  }

  highlight(high) {
    if (high) this.highlight = 1;
  }

  refresh(data) {
    if (data == null) {
      C.displayelemid(this, "front", false);
      C.displayelemid(this, "wound", false);
      C.displayelemid(this, "blank", true);
      return;
    }

    C.displayelemid(this, "front", true);
    C.displayelemid(this, "blank", false);
    C.displayelemid(this, "wound", data.wounds != 0, true);
    const u = this.$.unit;
    u.draw(data.unit);
  }

} // Register the x-custom element with the browser


customElements.define(CivFrontUnit.is, CivFrontUnit);