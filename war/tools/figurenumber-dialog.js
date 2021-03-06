import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivLocalize} from "../js/civ-localize.js";

class FigureNumber extends CivLocalize(PolymerElement) {
  static get template() {
    return html`
    <style>
       :host {
        display: block;
      }

    </style>

     <div>{{text}}
        <iron-input bind-value="{{numb}}" auto-validate allowed-pattern="[0-9]" id="input1" >
            <input id="input" value="{{value::input}}" type="number" min="0" max="1" disabled="">
        </iron-input>
     </div>
`;
  }

  static get is() {
    return 'figurenumber-widget';
  }

  static get properties() {
    return {
      label: {
        text: Object,
        value: undefined
      },
      numb: {
        type: Number,
        notify: true,
        observer: 'numberChanged'
      }
    };
  }

  // place holder here, should be overwritten
  numberChanged(newValue, oldValue) {  }
  
  draw(label, numb, max) {
    this.text = label
    this.numb = numb;
    if (max == null) max = numb;
    this.$.input.max = max;
    if (numb == 0) C.disableleme(this.$.input, true);
    else C.disableleme(this.$.input, false);
  }

  getNumb() {
    if (this.numb == null) return 0;
    return Number(this.numb);
  }

}

window.customElements.define(FigureNumber.is, FigureNumber);
