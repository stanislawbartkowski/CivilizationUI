import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivSacrificeFigureInCity extends CivDialog(PolymerElement) {
  static get template() {
    return html`
<style is="custom-style" include="civ-paper-button-styles">

 .elem {
   vertical-align: top;
   display : none
 }

    </style>

       <paper-dialog id="dialog">

       <h2>{{header}}</h2>

       <div>

          <div style="margin-left:20px;">
             <civ-selectsquare class="elem" id="figure"></civ-selectsquare>
             <civ-selectsquare class="elem" id="city"></civ-selectsquare>
             <paper-button id="button" class="elem green" dialog-dismiss="" on-click="_onClick">{{data.buttonbuy}}</paper-button> 
          </div>
        </div>

        <div class="buttons">
            <paper-button dialog-dismiss>{{localize('cancellabel')}}</paper-button>
        </div>

      </paper-dialog>
`;
  }

  static get is() {
    return 'civ-sacrificefigure';
  }
  
  _citypoints() {
    const a = []
    const data = this.$.figure.getPoint()
    for (var i=0; i<this.data.length; i++) 
       if (C.eqp(data,this.data[i].p)) a.push(this.data[i].city)
    C.setlistofpoints(a);      
  }
  
  _extracttechnologies() {
    const figure = this.$.figure.getPoint()
    const city = this.$.city.getPoint()
    for (var i=0; i<this.data.length; i++) 
       if (C.eqp(figure,this.data[i].p) && C.eqp(city,this.data[i].city)) return this.data[i].tech
    C.internalerroralert("Cannot find tech for figure and city")
  }
  
  _onResearch(tech) {
    const figure = this.$.figure.getPoint()
    C.executewithconf(null, this.getCommand().toUpperCase(), { "row" : figure.row, "col" : figure.col, "param" : tech}, this);    
  }

  setPoint(p) {
    const figure = this.$.figure
    if (figure.getPoint() == null) {
       C.displayelem(figure, true, true);
       figure.draw(p);
       this._clearcity()
       this._citypoints()
       return
     }
    const city = this.$.city       
    C.displayelem(city, true,true);
    city.draw(p)
    C.sacrificefortech(this._extracttechnologies(),"sacrificefigurefortech",t => this._onResearch(t))           
  } 
  

  _clearcity() {
    C.displayelem(this.$.city, false);
    this.$.city.draw(null);
//    C.displayelem(this.$.button, false);
  }

  refresh(data) {
    if (data == null) return;
    super.noCancelOnOutsideClick();
    const list = C.getitemizedcommand();
    const l = C.listofpointsp(list);
    C.setlistofpoints(l);
    C.displayelem(this.$.city, false);
    this.$.figure.draw(null);
    this._clearcity()
  }

}

window.customElements.define(CivSacrificeFigureInCity.is, CivSacrificeFigureInCity);
