import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";
export { CivTechDialog };

class CivTechDialog extends CivDialog(PolymerElement) {
  static get template() {
    return html`
  <style>
    .techbuttons {
      border-top : 1px solid #c1b8b8;
      position: relative;
      padding: 8px 8px 8px 24px;
      margin: 0;

      color: var(--paper-dialog-button-color, var(--primary-color));

      @apply --layout-horizontal;
    }
  </style>

   <paper-dialog id="dialog" modal="">

     <paper-dialog-scrollable>

        <civ-leveltech id="tech"></civ-leveltech>
        <civ-leveltech id="currenttech" ident="true"></civ-leveltech>

      </paper-dialog-scrollable>

        <span class="techbuttons">

        <span id="choosemessage" style="width:80px">
           {{localize('choosetechnology')}}
        </span>

        <span id="research" style="display:none">
          <civ-tlevel id="level"></civ-tlevel>
          <civ-tech id="techresearch"> </civ-tech>
        </span>

        <span style="width:20px">
          &nbsp;
        </span>


       <paper-button on-click="onResearch">
           <iron-icon icon="fingerprint"></iron-icon>
          {{localize('youresearch')}}
       </paper-button>

       <paper-button id="cancel" on-click="_clear" dialog-dismiss>{{localize('cancellabel')}}</paper-button>

     </span>

   </paper-dialog>
`;
  }

  static get is() {
    return 'civ-techdialog';
  }

  static get properties() {
    return {
      tech: {
        type: Object,
        value: null
      }
    };
  }

  _clear() {
    this.tech = null;
    C.displayelemid(this, "research", false);
  }

  onResearch() {
    if (this.tech == null) return;
    C.executewithconf(null, this.getCommand().toUpperCase(), {
      "row": -1,
      "col": -1,
      "param": this.tech.tech
    }, this);

    this._clear();

    if (this.fun != null) this.fun();
  }

  clickTech(d) {
    C.displayelemid(this, "choosemessage", false);
    C.displayelemid(this, "research", true, true);
    this.tech = d;
    const t = this.$.level;
    t.draw(d.level);
    const tr = this.$.techresearch;
    tr.draw(d);
  }

  _preparetechnology(data) {
    const p = {};
    p.disa = [];
    p.playertech = [];
    const tt = data.tech;
    const tech = C.getlistoftech();

    for (var i = 0; i < tech.length; i++) {
      const t = tech[i];
      const nt = C.toTech(t);
      p.playertech.push(nt);
      if (!C.onList(data.toresearch, nt.tech)) p.disa.push(nt.tech);
    }

    const dtech = this.$.tech;

    dtech.fun = d => this.clickTech(d);

    dtech.draw(p);
  }

  _prepareplayer(data) {
    const dcurrenttech = this.$.currenttech;
    dcurrenttech.draw({
      "playertech": data.tech
    });
  }
  /** Display list of tech to research
   * Parameter
   * data tech: list of player tech alredy researched { "tech" : techname, "coins" : coins, "level" : level }
   *    Example: {"tech":"Communism","initial":true,"level":1,"coins":0}
   * data toresearch : list of tech to research, enabled tech
   * data nocancel : true, switch off Cancel button
  */


  refresh(data) {
    if (data.nocancel) C.displayelem(this.$.cancel, false);else C.removedisplay(this.$.cancel);

    this._clear();

    this._preparetechnology(data);

    this._prepareplayer(data);

    C.displayelemid(this, "choosemessage", true);
  }

}

window.customElements.define(CivTechDialog.is, CivTechDialog);