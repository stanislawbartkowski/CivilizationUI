import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivLevelTech extends CivData(PolymerElement) {
  static get template() {
    return html`
  <style>

 .level {
   vertical-align: top;
   display: inline-block;
   height: 60px;
   width: 60px;
   border-radius: 50%;
   background: #ddd;
   line-height: 64px;
   font-size: 30px;
   color: #555;
   text-align: center;
 }

 .ident2 {
   width : 55px;
   display: None;
 }

 .ident3 {
   width : 110px;
   display: None;
 }
 .ident4 {
   width : 165px;
   display: None;
 }

  </style>

  <p><civ-tlevel id="level4"></civ-tlevel><span id="ident4" class="ident4">&nbsp;</span><civ-listtech id="list4" level="4"></civ-listtech></p>
  <p><civ-tlevel id="level3"></civ-tlevel><span id="ident3" class="ident3">&nbsp;</span><civ-listtech id="list3" level="3"></civ-listtech></p>
  <p><civ-tlevel id="level2"></civ-tlevel><span id="ident2" class="ident2">&nbsp;</span><civ-listtech id="list2" level="2"></civ-listtech></p>
  <p><civ-tlevel id="level1"></civ-tlevel><civ-listtech id="list1" level="1"></civ-listtech></p>
`;
  }

  static get is() {
    return 'civ-leveltech';
  }

  static get properties() {
    return {
      ident: {
        type: Boolean,
        value: false
      }
    };
  } // parameter:
  // data.playertech
  // data.disa (can be null), list of technologies disabled


  refresh(pa) {
    for (var i = 1; i < 5; i++) {
      const li = this.$["list" + i];
      if (i > 1) C.displayelemid(this, "ident" + i, this.ident, true);
      if (this.fun != null) li.fun = d => this.fun(d);
      li.draw(pa);
      const le1 = this.$["level" + i];
      le1.draw(i);
    }
  }

}

window.customElements.define(CivLevelTech.is, CivLevelTech);