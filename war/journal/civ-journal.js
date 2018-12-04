import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class JournalCiv extends CivData(PolymerElement) {
  static get template() {
    return html`
        <template id="map" is="dom-repeat" items="{{res}}">
                <civ-journalline data="{{item}}"></civ-journalline>
        </template>
    `;
  }
  
  static get properties() {
    return {
      len: {
        type: Number,
        value: 0
      },
      civ : {
        type : String
      }
    } 
  }
  
  
  _checkrenew(data) {
    if (this.civ == null) return false
    return this.len != data.length   
  }
  
  _drawj() {
    const data = this.data
    this.len = data.length
    this.res = []
    for (var i = data.length-1; i>=0; i--)
      if (this.civ == data[i].elem.civ) this.res.push(data[i])
    this.$.map.render()    
  }
  
  setCiv(civ) {
    const pciv = this.civ
    this.civ = civ
    if (pciv == null) this._drawj()
  }

  refresh(data) {
    if (data == null) {
      this.len = 0
      this.civ = null
      return
    }
    if (!this._checkrenew(data)) return
    this._drawj()    
  }
}

window.customElements.define("civ-journal", JournalCiv);
