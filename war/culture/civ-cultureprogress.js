import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData} from "../js/civ-data.js";


class CivCultureProgress extends CivData(PolymerElement) {
  static get template() {
    return html`
  <style>
     :host {
       display: inline-block;
      }

       .vertical {
         @apply(--layout-vertical);
         width : 20px;
         background-color: #fbf1dc;
       }

       .topbottom {
         width : 20px;
         heigth : 26px;
         margin : 3px;
         padding : 1px;
       }

  </style>

<div id="map" class="vertical">
  <div id="top" class="topbottom" title="{{localize('cultureend')}}">{{localize('victoryle')}}</div>

  <template is="dom-repeat" items="{{res}}">
    <civ-cultureprogresselem data="{{item}}"></civ-cultureprogresselem>
  </template>

  <div id="start" class="topbottom">{{letter}}</div>
<div>

 </div></div>
`;
  }

  static get is() {
    return 'civ-cultureprogress';
  }

  static get properties() {
    return {
      res: {
        type: Array
      },
      letter: {
        type: String
      }
    };
  }

  funmap(c, data) {
    const da = {};
    da.civ = c.data.civ;
    da.num = c.data.num;
    da.active = da.num <= data.culture;
    c.draw(da);
  } // pa : Object
  //  civ :
  //  culture: culture counter (from 0)


  refresh(pa) {
    if (pa == null) return;
    this.letter = C.getCivShort(pa.civ);
    const col = C.colorForCiv(pa.civ);
    C.setStyleAttribute(this.$.start, "backgroundColor", col);
    C.setattr(this.$.start, "title", pa.civ);
    this.res = [];

    for (var i = C.getMaxCultureProgress(); i > 0; i--) {
      const a = {};
      a.civ = pa.civ;
      a.num = i;
      a.active = false;
      this.res.push(a);
    } // trigger enumarating repeating map elems


    this.elemmap = "civ-cultureprogresselem";
  }

}

window.customElements.define(CivCultureProgress.is, CivCultureProgress);
