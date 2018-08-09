import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivDialog } from "../js/civ-dialog.js";

class CivTechnologyAction extends CivDialog(PolymerElement) {
  static get template() {
    return html`
  <style>

    .tech {
       display:none;
       width: 115px;
       height: 60px;
    }
    .city {
       display:none;
    }
    .choosetext {
       display:none;
    }

    .dialog {
       top : 5%;
    }
  </style>

       <paper-dialog modeless="" class="dialog" id="dialog">

       <h2>{{localize('choosetechnologytouse')}}</h2>

       <paper-dialog-scrollable>

         <civ-leveltech id="leveltech"></civ-leveltech>

         <civ-tech class="tech" id="tech"></civ-tech>
         <civ-selectsquare id="city" class="city"></civ-selectsquare>

         <civ-listres id="resources"></civ-listres>
         <div id="choosetext" class="choosetext"><h3>{{choosetext}}</h3></div>

         <civ-listres id="resspend"></civ-listres>

       </paper-dialog-scrollable>

       <div class="buttons">
         <paper-button id="spendbutton" on-click="spendButton" style="display:none">{{spendbutton}}</paper-button>
         <paper-button dialog-dismiss="">{{localize('cancellabel')}}</paper-button>
       </div>

       </paper-dialog>
`;
  }

  static get is() {
    return 'civ-technologyaction';
  }

  static get properties() {
    return {
      tech: {
        type: Object,
        value: null
      },
      choosetext: {
        type: String,
        value: null
      },
      clicked: {
        type: Array
      },
      spendbutton : {
        type : String
      }
    };
  }

  _getresno() {
    if (this.tech.resourceany != null) return this.tech.resourceany;
    return 1;
  }

  spendButton() {
    const pa = {};
    // city not important if tech without city
    if (this._isCity()) {
      pa.row = this.$.city.getPoint().row;
      pa.col = this.$.city.getPoint().col;
      }
    else {
      pa.row = -1
      pa.col = -1
    }
    const spend = this.$.resspend;
    var param = spend.getRes(); // only one

    if (this.tech.resourceany == null) param = param[0];
    pa.param = param;
    const command = C.getcurrentcommand() // run command

    C.executewithconf(null, command, pa, this);
  }

  clickTech(d) {
    const te = this.$.tech;
    C.displayelem(te, true, true);
    te.draw(d);
    this._cleartech();
    this.tech = C.findTech(d.tech);
    const tech = C.getTechnologyAction(d.tech);
    // with city
    C.setcurrentcommand(tech.name)
    if (this._isCity()) C.itemizecommand(tech.name)
    else this._drawResources()
  }
  
  _isCity() {
    const da = C.getActionTechnology(C.getcurrentcommand())
    return da.city
  }

  _cleartech() {
    C.displayelem(this.$.city, false);
    C.displayelem(this.$.resources, false);
    C.displayelem(this.$.choosetext, false);

    this._clearclicked(false);
  }

  _clickRes(r, id) {
    // check tresholf
    if (this.clicked.length == this._getresno()) {
      C.alertdialog(C.localize("resourcetreshlodreached", "num", "" + this._getresno()));
      return;
    } // check if doubled


    var found = false;

    for (var i = 0; i < this.clicked.length; i++) if (this.clicked[i] == id) found = true;

    if (found) {
      C.alertdialog(C.localize("resourcepickedalready"));
      return;
    } // add to clicked list


    this.clicked.push(id);
    const spend = this.$.resspend;
    const re = spend.getRes();
    const listre = [];

    for (var i = 0; i < re.length; i++) listre.push(re[i]);

    listre.push(r);
    spend.draw(listre);
    if (this.clicked.length == this._getresno()) this._activateSpendButton(true)
  }

  _clearclicked(display) {
    this.clicked = [];
    const spend = this.$.resspend;
    C.displayelem(spend, display);
    spend.draw(null);
    this._activateSpendButton(false)
  }

  _clear() {
    C.setlistofpoints(null);
    C.displayelem(this.$.tech, false);
    this._cleartech();
  }

  setCity(city) {
    const cit = this.$.city
    cit.draw(city)
    C.displayelem(cit, true, true)
    this._drawResources()
  }
  
  _activateSpendButton(display) {
     if (display) {
       const da = C.getActionTechnology(C.getcurrentcommand())
       if (da.button == null) this.spendbutton = C.localize('spendresourcebutton')
       else this.spendbutton = C.localize(da.button)
     }
     C.displayelem(this.$.spendbutton, display)
  }
    
  _drawResources() {  
    if (this.tech.resource == null && this.tech.resourceany == null) {
      this._activateSpendButton(true)
      return
    }  
    const y = C.getyourdeck();
    const listda = C.convertResourcesToList(y.resources, y.hutvillages, this.tech.resource);
    const res = this.$.resources;

    res.fun = (res, id) => this._clickRes(res, id);

    res.draw(listda);
    C.displayelem(res, true);
    this.choosetext = C.localize("chooseresourcetospend", "num", "" + this._getresno());
    const text = this.$.choosetext;
    C.displayelem(text, true);

    this._clearclicked(true);
  }
  
  refresh(data) {
      
    this._clear();

    const ta = C.getTechActionTable();
    const techs = [];

    for (var i = 0; i < data.commands.length; i++) {
      const command = data.commands[i];
      const id = command.command.toLowerCase();
      const te = C.getActionTechnology(id);
      if (te == null) continue;
      const tech = C.findTech(te.tech);
      const nt = C.toTech(tech);
      techs.push(nt);
    }

    const tlevel = this.$.leveltech;

    tlevel.fun = d => this.clickTech(d);

    const p = {};
    p.playertech = techs;
    tlevel.draw(p);
    super.noCancelOnOutsideClick();
  }

}

customElements.define(CivTechnologyAction.is, CivTechnologyAction);
