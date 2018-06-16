import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivMap extends CivData(PolymerElement) {

  static get is() {
    return 'civ-map';
  }
  
  static get template() {
	    return html`
           <custom-style>
        <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
    
    <style is="custom-style" include="civ-paper-button-styles">
      .container, .layout {
        /* background-color: #ccc; */
        /* padding: 1px;*/
      }
      
      .container div, .layout div {
        background-color: white;
        /* margin: 1px; */
        border-width : 1px 1px 1px 1px;
        border-style: solid;
        border-color: #ccc;
      }
    </style>
   </custom-style>
    
   <template id="map" is="dom-repeat" items="{{rows}}">
      <div class="layout horizontal">
        <template is="dom-repeat" items="{{cols}}" index-as="colno">
          <div>
            <civ-square row="{{index}}" col="{{colno}}"></civ-square>
          </div>        
        </template>        
      </div>        
   </template>      
`;
  }


  static get properties() {
    return {
    	
       rows: {
         type: Array
       },
       cols: {
         type: Array
       }
    }
  }
     
  /**
    { rownum,colnum
  */
  refresh(data) {	  
    this.rows = [];
    this.cols = [];
    if (data == null || data.rownum == -1 || data.colnum == -1) return;

    for (var i = 0; i < data.rownum; i++) this.rows.push({});

    for (var i = 0; i < data.colnum; i++) this.cols.push({});
  }
}

window.customElements.define(CivMap.is, CivMap);
