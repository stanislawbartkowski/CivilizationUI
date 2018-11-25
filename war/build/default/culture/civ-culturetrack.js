import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivCultureTrack extends CivData(PolymerElement) {
  static get template() {
    return html`
  <style>

     .vertical {
         @apply(--layout-vertical);
         width : 25px;
         background-color: #fbf1dc;
     }
     .culture {
       width : 25px;
     }

  </style>

<div id="map" class="vertical">
  <img src="images/culturetrack/finish.svg" class="culture" title="{{localize('cultureend')}}">
  <template is="dom-repeat" items="{{res}}">
    <civ-culturepoint data="{{item}}"></civ-culturepoint>
 </template>
 <img src="images/culturetrack/start.svg" class="culture" title="{{localize('culturestart')}}">
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-culturetrack';
  }

  static get properties() {
    return {
      res: {
        type: Array
      }
    };
  } // pa = {} empty


  refresh(pa) {
    this.res = [];

    for (var i = C.getMaxCultureProgress(); i > 0; i--) {
      const c = C.findCulturePoint(i);
      this.res.push(c);
    }
  }

}

window.customElements.define(CivCultureTrack.is, CivCultureTrack);