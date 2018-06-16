import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

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


       <paper-button on-click="_onResearch">
           <iron-icon icon="fingerprint"></iron-icon>
          {{localize('youresearch')}}
       </paper-button>

       <paper-button on-click="_clear" dialog-dismiss="">{{localize('cancellabel')}}</paper-button>

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

  _onResearch() {
    if (this.tech == null) return;
    const p = {};
    p.row = -1;
    p.col = -1;
    p.param = this.tech.tech;
    C.executewithconf(null, "RESEARCH", p, this);

    this._clear();
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

  _preparetechnology(y) {
    const p = {};
    p.disa = [];
    p.playertech = [];
    const tt = y.tech;

    for (var i = 0; i < tt.length; i++) p.disa.push(tt[i].tech);

    const tech = C.getlistoftech();

    for (var i = 0; i < tech.length; i++) {
      const t = tech[i];
      const nt = C.toTech(t);
      p.playertech.push(nt);
      if (nt.level > y.tradelevel) p.disa.push(nt.tech);
    }

    const dtech = this.$.tech;

    dtech.fun = d => this.clickTech(d);

    dtech.draw(p);
  }

  _prepareplayer(y) {
    const p = {};
    p.playertech = y.tech;
    const dcurrenttech = this.$.currenttech;
    dcurrenttech.draw(p);
  }

  refresh(y) {
    this._clear();

    this._preparetechnology(y);

    this._prepareplayer(y);

    C.displayelemid(this, "choosemessage", true);
  }

}

window.customElements.define(CivTechDialog.is, CivTechDialog);
