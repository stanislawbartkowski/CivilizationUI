import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivChooseData } from "../js/civ-choosedata.js";

class CivGreatPerson extends CivChooseData(PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        background-color: #fcfde9;
        border-radius: 10px;
        display: inline-block;
        position : relative;
        width : 260px;
        height: 165px;
        border: 1px solid;
      }
      :host([Empty]) {
        background-image: url("../images/icons/greatpersona.svg");
        background-repeat: no-repeat;
        background-size: 90% 90%;
      }
      .header {
         font-size : 85%
      }
      .name {
        display: inline-block;
        position:absolute;
        font-size : 95%;
        top : 2px;
        left: 2px;
        font-family: Arial, Helvetica, sans-serif;
      }
      .sq {
        display: inline-block;
        position:absolute;
        top : 22px;
        left: 2px;
      }
      .desc {
        display: inline-block;
        width:70%;
        position:absolute;
        top : 22px;
        left: 75px;
      }

      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
     }

     .not {
       position:absolute;
       bottom : 5px;
       right : 5px;
       height:15px;
     }


    </style>

    <div>
      <div class="header name">{{person.t}}&nbsp;&nbsp;{{person.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{person.type}}</div>
      <hr>
      <civ-square class="sq" id="sq"></civ-square>
      <div class="header desc">{{person.desc}}</div>

      <civ-implemented id="notimplemented" class="not"></civ-implemented>
    </div>
`;
  }

  static get is() {
    return 'civ-greatperson';
  }

  static get properties() {
    return {
      person: {
        type: Object
      },
      ptype: {
        type: Object
      }
    };
  }

  _clear() {
    C.removeattr(this, "Empty");
  } // data : great person name
  //        null : clear
  //        "" : empty


  refresh(data) {
    this._clear();

    if (data == null) return;

    if (data == "") {
      this.setAttribute("Empty", 1);
      return;
    }

    const g = C.findGreatPerson(data);
    this.person = g.person;
    this.ptype = g.type;
    const j = {};
    j.terrain = "";
    j.greatperson = data;
    this.$.sq.draw(j);
    const ni = this.$.notimplemented;
    ni.draw(this.person.ni);
  }

}

customElements.define(CivGreatPerson.is, CivGreatPerson);