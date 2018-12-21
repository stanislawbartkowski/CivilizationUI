import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class JournalLineCiv extends CivData(PolymerElement) {
  static get template() {
    return html`
    <style>
    paper-item {
          --paper-item: {
            margin-top: 4px;
            min-height: 10px;
            border : 1px solid;
            border-radius: 5px;
            border-color: #e8e8f1;
            background-color: #f7f7f0;
          };
      }

      .no {
        font-size : 120%;
        border : 1px groove;
        border-radius: 5px;
        background-color: #f2f3b1;
      }

      .tech {
        border : 1px groove;
        border-radius: 5px;
        background-color: #e3fbf8;
      }

    </style>

      <paper-item>
         <div>
           <span class="no">{{data.no}}</span>
           <span class="tech" hidden$="[[!data.elem.tech]]">{{tech}}</span>
           <span>{{message}}</span>
         </div>
      </paper-item>

 `;
  }

  static get is() {
    return 'civ-journalline';
  }

  static get properties() {
    return {
      message: {
        type: String
      },
      tech: {
        type: String
      }
    };
  }



  //  [{"no":1,"elem":{"id":"YOUARERECEIVINGSTARTINGTECHNOLOGY","phase":"StartOfTurn","roundno":0,"civ":"China","param":[],"tech":null,"priv":false}}]
  /**
  *    no : Number
  *    elem :
  *       id : message identifier
  *       phase : game phase
  *       roundno : round number
  *       civ : civilization
  *       params : list of id
  *       tech : technology related to entry, can be null
  *       priv : True, if not visible for opponents
  * Example  {"no":1,"elem":{"id":"YOUARERECEIVINGSTARTINGTECHNOLOGY","phase":"StartOfTurn","roundno":0,"civ":"China","param":[],"tech":"Writing","priv":false}}
  **/
  refresh(data) {
    this.no = data.no
    if (data.elem.tech != null) this.tech = C.getTechnologyName(data.elem.tech)
    this.message = JM.journalMessage(data.elem)
  }
}

window.customElements.define(JournalLineCiv.is, JournalLineCiv);
