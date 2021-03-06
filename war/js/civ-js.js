// not a module
// global set of functions and utilities
C = function () {
  function confirmaction(co) {
    const c = co.toLowerCase(); // if (c == "endofphase") return true
    // if (c == "startmove") return true
    // if (c == "revealtile") return true

    return false;
  } ;

  function verifysetfigures(co, iparam, pa) {
    var list = iparam.list;

    for (var i = 0; i < list.length; i++) if (C.eqp(iparam, list[i].param)) {
      pa.row = list[i].p.row;
      pa.col = list[i].p.col;
      pa.param = list[i].param;
      return pa;
    }

    return null;
  } ;

  function checkarmy(iparam) {
    if (iparam.square.numberofArmies > 0 || iparam.square.numberofScouts > 0) return true;
    return false;
  } ;

  function findpointp(iparam, list) {
    for (var i = 0; i < list.length; i++) if (C.eqp(iparam, list[i].p)) return i;

    return -1;
  }

  function findpoint(iparam, list) {
    for (var i = 0; i < list.length; i++) if (C.eqp(iparam, list[i])) return i;

    return -1;
  }

  function verifystartmove(co, iparam, pa) {
    if (!checkarmy(iparam)) return null;
    var list = iparam.list;
    var i = findpointp(iparam, list);

    if (i != -1) {
      pa.param = list[i].f;
      return pa;
    }

    return null;
  } ;

  function verifymove(co, iparam, pa) {
    var list = iparam.list.moves;
    var i = findpoint(iparam, list);
    if (i != -1) return pa;
    return null;
  };

  function verifysetcity(co, iparam, pa) {
    var list = iparam.list;
    var i = findpoint(iparam, list);
    if (i == -1) return null;
    return pa;
  };

  function verifyrevealtile(co, iparam, pa) {
    if (!checkarmy(iparam)) return null;
    var list = iparam.list;
    if (!C.eqp(iparam, list.p)) return null;
    var r = list.tiles[0];
    pa.row = r.p.row;
    pa.col = r.p.col;
    pa.param = r.orientation;
    return pa;
  }

  function verifypoints(pa) {
    const list = C.currentlistofpoints();
    const i = findpoint(pa, list);
    if (i == -1) return null;
    return pa;
  }

  function verifycommand(co, iparam) {
    var itemized = C.getitemizedcommand();
    pa = {};
    pa.row = iparam.row;
    pa.col = iparam.col;
    pa.param = iparam.param;
    pa.square = iparam.square;
    pa.itemized = itemized;
    if (itemized == null || co == "endofphase") return pa;
    iparam.list = itemized;
    if (co == "setarmy" || co == "setscout" || co == "buyscout" || co == "buyarmy") return verifysetfigures(co, iparam, pa);
    if (co == "startmove") return verifystartmove(co, iparam, pa);
    if (co == "move") return verifymove(co, iparam, pa);
    if (co == "revealtile") return verifyrevealtile(co, iparam, pa);
    if (co == "setcapital" || co == "setcity") return verifysetcity(co, iparam, pa);
    if (co == "endofmove") return pa;
    return verifypoints(pa);
  };

  function dialogalert(dialogid, message) {
    const dialogDemo = document.getElementById(dialogid);

    dialogDemo.openDialog = function (e) {
      this.$.dialog.open();
    };

    dialogDemo.message = message;
    dialogDemo.openDialog();
  };

  function findbytag(tag) {
    var ee = window.findbytag(tag);
    return ee;
  }; // id="close-button"

  function showhideclosebuttuon(show) {
    C.showelem("download-button", show);
    C.showelem("close-button", show);
  };

  function _getxapp() {
    var e = document.getElementsByTagName("x-app");
    return e[0];
  };

  function _resumemultidialog(e) {
    const dialogDemo = document.getElementById("join-dialog");

    dialogDemo.openDialog = function () {
      this.$.dialog.civname = e.civ[0];
      this.$.dialog.header = C.localize("resumetwoplayersgame");
      this.$.dialog.gameid = e.gameid;
      lines = [];
      const c = {};
      c.civ = e.civ[1];
      lines.push(c);
      this.$.dialog.lines = lines;
      this.$.dialog.openIt();
    };

    dialogDemo.openDialog();
  } ;

  function _twotilereveal(iparam) {
    if (iparam.list.tiles.length <= 1) return false;
    const dialog = document.getElementById("reveal2-dialog");
    dialog.$.dialog.openIt(iparam);
    return true;
  }

  function _multifigures(iparam) {
    const no = iparam.param.numberofArmies + iparam.param.numberofScouts;
    if (no <= 1) return false;
    const dialog = document.getElementById("multifigures-dialog");
    dialog.$.dialog.openIt(iparam);
    return true;
  }

  function _clearMap() {
    const o = _getxapp();

    o.draw(null);
  }

  function _spendtradecommand(pa) {
    const dialog = document.getElementById("spendtrade-dialog");
    dialog.$.dialog.openIt(pa);
  }

  function _sendproductioncommand(pa) {
    C.opendialogwithpar("sendproduction-dialog", pa);
  }

  function _sendproductionsetscout(pa) {
    const dialog = document.getElementById("sendproduction-dialog");
    dialog.$.dialog.setScout(pa);
  }

  function _senddevoutscout(pa) {
    const dialog = document.getElementById("civ-devoutcitytoculture");
    dialog.$.dialog.setScout(pa);
  }

  function _setcitytotechnology(pa) {
    const dialog = document.getElementById("civ-technologyaction");
    dialog.$.dialog.setCity(pa);
  }

  function _devoutcityforculture(pa) {
    C.opendialogwithpar("civ-devoutcitytoculture", pa);
  }

  function _setgreatpersonpoint(pa) {
    const dialog = document.getElementById("putgreatperson-dialog");
    dialog.$.dialog.setBuildingPoint(pa);
  }

   function _getdata(co) {
      return CC.getdata(co)
   }

  function _setpoint(co, pa) {
    const data = _getdata(co);

    if (data == null) return false;
    const dialog = document.getElementById(data.dialog);
    dialog.$.dialog.setPoint(pa);
    return true;
  }

  function _getheader(co) {
    const data = _getdata(co);

    if (data == null) return null;
    return data.header;
  }

  function _setpointincity(pa) {
    const dialog = document.getElementById("civ-buyincity");
    dialog.$.dialog.setPoint(pa);
  }

  function _attackconfirmation(pa) {
    C.opendialogwithpar("attackconf-dialog", pa);
  }

  function _undosendproductioncommand(question, pa) {
    C.confirmdialog(question, e => {
      const ite = pa.itemized;

      for (var i = 0; i < ite.length; i++) if (C.eqp(ite[i].p, pa)) {
        pa.param = ite[i].param;
        C.executeC("UNDOSENDPRODUCTION", pa);
      }
    });
  }

  return {
    sleep(ms = 500) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    rendermap(rownum,colnum) {
      const x = _getxapp();
      x.rendermap({"rownum" : rownum,"colnum" : colnum})
    },

    getShadow(e) {
      var s = e.shadowRoot;
      return s;
    },

    opendialogwithpar(id, pa, title = null, command = null) {
      const dialog = document.getElementById(id);
      dialog.$.dialog.setHeader(title);
      dialog.$.dialog.setCommand(command);
      dialog.$.dialog.openIt(pa);
    },

    setDialogFun(dname,fun) {
      const dialog = document.getElementById(dname);
      dialog.$.dialog.fun = fun
    },

    rundialog(co, pa) {
      if (pa == null) return true

      const data = _getdata(co);

      if (data == null) return false

      if (!data.runplayer) return false

      var header = null;
      if (data.header != null) header = C.localize(data.header);
      C.opendialogwithpar(data.dialog, pa, header, co);
      return true
    },

    showunits(units) {
      C.opendialogwithpar("showunits-dialog", units);
    },
    
    setTopLeft(e,top,left) {
      e.style.top = top + "px";
      e.style.left = left + "px";
    },
    
// ------- journal
    
    _getjournalid(opponent) {
      if (opponent) return "civ-journaldial1"
      else return "civ-journaldial"    
    },

    _refreshjournal(opponent,data) {
       const dialog = document.getElementById(this._getjournalid(opponent));
       dialog.$.dialog.refresh(data)                
    },

    showjournal(opponent,civname) {
       const dialog = document.getElementById(this._getjournalid(opponent))
       const d = dialog.$.dialog
       d.setCiv(civname)
       // it does not work !
       if (d.wasDragged()) {
//         d.$.dialog.resetFit()
         d.setLastDraggedPos()
       }
       else d.setTopLeft(!opponent,true,400,400)       
       if (civname == null) d.closeIt()
       else d.open()            
    },
    
    setjournal: function (j) {
      this._refreshjournal(false,j)
      this._refreshjournal(true,j)      
    },
          
// ---------    

    eqp(p1, p2) {
      return p1.row == p2.row && p1.col == p2.col;
    },

    getcommanddecr(co) {
      return CC.getcommanddecr(co)
    },

    getphasedescr(phase) {
      return C.localize(phase.toLowerCase() + "label");
    },

    setlistofpoints(a) {
      C.getyouplay().setListOfPoints(a);
    },

    currentlistofpoints() {
      return C.getyouplay().listofpoints;
    },

    listofpointsp(itemize) {
      var a = [];
      for (var i = 0; i < itemize.length; i++) a.push(itemize[i].p);
      return a;
    },

    getlistofpoints(co, itemize) {
      return CC.getlistofpoints(co, itemize)
    },

    getconfirmdialog: function () {
      const d = document.getElementById("dialog-question");
      d.$.dialog.title = C.localize('confirmdialogtitle');
      return d;
    },

    joingamedialog: function (gameid, civ) {
      const dialogDemo = C.getconfirmdialog();

      dialogDemo.openDialog = function (e) {
        this.$.dialog.open();
      };

      dialogDemo.confirm = e => C.joingame(gameid, civ);

      dialogDemo.dismiss = e => {};

      dialogDemo.message = C.localize("doyouwanttojoin", "civ", civ);
      dialogDemo.openDialog();
    },

    startgamedialog: function (civ) {
      this.confirmdialog(C.localize("doyouwantstartnegamequestion", "civ", civ), e => window.chooseciv(civ));
    },

    confirmdialog: function (message, fun) {
      const dialogDemo = this.getconfirmdialog();

      dialogDemo.openDialog = function (e) {
        this.$.dialog.open();
      };

      dialogDemo.confirm = fun;

      dialogDemo.dismiss = e => {};

      dialogDemo.message = message;
      dialogDemo.openDialog();
    },
    
    alertdialogopened() {
      const dialogalert = document.getElementById("dialog-alert");
      return dialogalert.$.dialog.opened
    },    

    alertdialogfun: function (message, fun) {
      const dialogalert = document.getElementById("dialog-alert");

      dialogalert.openDialog = function (e) {
        this.$.dialog.open();
      };

      dialogalert.confirm = fun;

      dialogalert.message = message;
      dialogalert.openDialog();
    },
    

    alertdialog: function (message) {
      this.alertdialogfun(message,e => {})
    },

    internalerroralert(message) {
      alert("Internal error " + message);
    },

    resumedialog: function (index) {
      const li = JSON.parse(C.getlistofgames());
      const e = li[index];

      if (e.civ.length > 1) {
        _resumemultidialog(e);

        return;
      }

      const civ = e.civ[0];
      const gameid = e.gameid;
      this.confirmdialog(C.localize('doyouwanttoresumequestion', 'civ', civ), e => C.resumegame(gameid, civ));
    },

    leavedialog: function () {
      this.confirmdialog(C.localize('leavegamequestion'), e => C.leavegame());
    },

    closejoindialog: function () {
      const dialogjoin = document.getElementById("join-dialog");
      dialogjoin.$.dialog.closeIt();
    },

    joindialog: function (civ) {
      const dialogDemo = document.getElementById("join-dialog");

      dialogDemo.openDialog = function (e) {
        this.$.dialog.civname = civ;
        this.$.dialog.gameid = -1;
        this.$.dialog.header = C.localize("creatingtwoplayergames");
        this.$.dialog.lines = C.getlistofcivs();
        this.$.dialog.openIt();
      };

      dialogDemo.openDialog();
    },

    getCivShort(civ) {
      return civ[0] + civ[1];
    },

    executeC: function (co, pa) {
      if (pa == null) {
        pa = {};
        pa.row = -1;
        pa.col = -1;
        pa.param = null;
      }

      if (pa.row == null) pa.row = -1;
      if (pa.col == null) pa.col = -1;
      var stype = typeof pa.param;
      if (pa.param != null && pa.param.constructor == Array) stype = "array";
      if (pa.param == null) window.executecommandNull(co.toUpperCase(), pa.row, pa.col);else if (stype == "string") window.executecommandS(co.toUpperCase(), pa.row, pa.col, pa.param);else if (stype == "number") window.executecommandN(co.toUpperCase(), pa.row, pa.col, pa.param);else if (stype == "object") window.executecommandO(co.toUpperCase(), pa.row, pa.col, pa.param);else window.executecommandA(co.toUpperCase(), pa.row, pa.col, pa.param);
    },

    executewithconffun: function (question, co, fun) {
      if (question == null) question = C.localize("executecommandquestion", "command", co);
      if (!confirmaction(co)) fun();else this.confirmdialog(question, fun);
    },

    executewithconf: function (question, co, pa, mdial) {
      C.executewithconffun(question, co, e => {
        if (mdial != null) mdial.closeIt();
        C.executeC(co, pa);
      });
    },

    confexecutedialog: function (question, co, row, col, param) {
      var iparam = {};
      iparam.square = null;
      if (row != -1 && col != -1) iparam.square = C.getsquare(row, col)
      iparam.row = window.fixrow(row)
      iparam.col = window.fixcol(col)
      iparam.param = param
      iparam.co = co
      var pa = verifycommand(co, iparam)
      if (pa == null) return
      if (_setpoint(co, iparam)) return true

      if (co == "buycitywall") {
        _setpointincity(iparam)
        return
      }

      if (co == "revealtile") if (_twotilereveal(iparam)) return
      if (co == "startmove") if (_multifigures(pa)) return

      if (CC.getActionTechnology(co) != null) {
        const da = CC.getActionTechnology(co)
        if (da.city) _setcitytotechnology(iparam)
        return
      }

      if (co == "devouttoculture") {
        _devoutcityforculture(iparam);
        return;
      }

      if (co == "sendproduction" || co == "harvestresource") {
        _sendproductioncommand(pa);
        return;
      }

      if (co == "undosendproduction") {
        _undosendproductioncommand(question, pa);
        return;
      }

      if (co == "spendtrade") {
        _spendtradecommand(pa);
        return;
      }

      if (co == "selectscout") {
        _sendproductionsetscout(pa);
        return;
      }

      if (co == "selectscoutdevout") {
        _senddevoutscout(pa);
        return;
      }

      if (co == "attack") {
        _attackconfirmation(pa);
        return;
      }

      this.executewithconf(question, co, pa);
    },
    // dialog-command-alert
    dialogexecutefailure: function (message) {
      dialogalert("dialog-command-failure", message);
    },

    showeleme: function (e, show) {
      if (show) C.removeattr(e, "hidden");
      else e["hidden"] = true;
    },

    displayelem: function (e, display, inblock) {
      if (display) {
        const stype = typeof inblock;

        if (stype == "string") {
          e.style.display = inblock;
          return;
        }

        if (inblock) e.style.display = 'inline-block';
           else e.style.display = 'block';

      } else e.style.display = 'none';
    },

    removedisplay(e) {
       e.style.display=null
    },

    displayelemid(e, id, display, inblock) {
      this.displayelem(C._getbyid(e, id), display, inblock);
    },

    displaybadge: function (e, number) {
      if (number <= 1) C.showeleme(e, false);
      else {
        C.showeleme(e, true);
        var pa = e.offsetParent;
        var no = 0;
        if (pa == null) no = 500;
        this.sleep(no).then(() => {
          C.showeleme(e, true);
          e.updatePosition();
        });
        e.label = number;
      }
    },

    disableleme: function (e, disable) {
      if (disable) C.setattr(e, "disabled", true);
      else C.removeattr(e, "disabled");
    },

    showelem: function (id, show) {
      const x = _getxapp();

      const e = this.getShadow(x).getElementById(id);
      C.showeleme(e, show);
    },

    setattr: function (e, attr, value) {
      e.setAttribute(attr, value);
    },

    settitle: function (e, title) {
      C.setattr(e, "title", title);
    },

    removeattr: function (e, attr) {
      e.removeAttribute(attr);
    },

    // what = 1 show civs (switch off the rest)
    //      = 2 show games (switch off the test)
    //      = 3 show joins
    //      = 0 switch off all, start the game
    showcivorgames: function (what) {
      C.seconddrawerClose(true)
      var gamese = findbytag("civ-games")
      var civse = findbytag("civ-content")
      var civjoin = findbytag("civ-join")
      if (what == 0 || what == 2 || what == 3) civse.draw(null)
      if (what == 0 || what == 1 || what == 3) C.setattr(gamese, "listofgames", "")
      if (what == 0 || what == 1 || what == 2) C.setattr(civjoin, "listofjoins", "")

      if (what == 1) civse.draw(this.getlistofcivs())
      if (what == 0) showhideclosebuttuon(true)
      else showhideclosebuttuon(false)
    },

    getlistofgames: function () {
      const gamese = findbytag("civ-games");
      return gamese.listofgames;
    },

    getgamestate: function () {
      const b = findbytag("civ-gamestate");
      return b;
    },

    showresearch(p) {
      C.opendialogwithpar("showtech-dialog", p.tech);
    },

    showwonders(p) {
      C.opendialogwithpar("showwonders-dialog", p.wonders, C.localize("yourwonders", "civ", p.civ));
    },

    discardcarddialog(p) {
      C.opendialogwithpar("discardcard-dialog", p);
    },

    showculturecards(p, title) {
      C.opendialogwithpar("showculturecards-dialog", p.cultureresource, title);
    },

    showsingletech(p) {
      C.opendialogwithpar("civ-showtech", p);
    },

    showcultureusedcards(p) {
      C.opendialogwithpar("showculturecards-dialog", p.board.cultureused, C.localize('cultureusedcards'));
    },

    showgreatpersons(p) {
      C.opendialogwithpar("showgreatpersons-dialog", p.cultureresource, C.localize("yourgreatpersons", "civ", p.civ));
    },

    // buy structure
    _buystructure(dname, y, itemize, id, resign) {
      if (itemize == null) return;
      C.opendialogwithpar(dname, itemize);
      const dialog = document.getElementById(dname).$.dialog;
      dialog.setParameters(id, resign);

      const header = _getheader(id);

      if (header != null) dialog.setHeader(C.localize(header));
    },

    greatpersononmap(y, itemize, id, resign) {
      this._buystructure("putgreatperson-dialog", y, itemize, id, resign);
    },

    buywonder(y, itemize, id, resign) {
      this._buystructure("buywonder-dialog", y, itemize, id);
    },

    freewonder(y, itemize, id, resign) {
      this._buystructure("buywonder-dialog", y, itemize, id);
    },

    buybuilding(y, itemize, id) {
      this._buystructure("buy-building", y, itemize, id);
    },

    nonupgradedbuilding(y, itemize, id) {
      this._buystructure("buybuilding", y, itemize, id);
    },

    showcivinfo(civ) {
      C.opendialogwithpar("showciv-info", civ);
    },

    cancelactiondialog(y) {
      C.opendialogwithpar("civ-cancelaction", y.suspended);
    },

    researchdialog(itemi,co) {
      const y = this.you()
      C.opendialogwithpar("tech-dialog", { "tech" : y.tech, "toresearch" : itemi},null,co );
      C.setDialogFun("tech-dialog",null)
    },

    sacrificefortech(itemi,co,fun) {
      const y = this.you()
      C.opendialogwithpar("civ-choosetechdialog", { "tech" : y.tech, "toresearch" : itemi, "nocancel" : true},null,co );
      C.setDialogFun("civ-choosetechdialog",fun)
    },

    advanceculture(y) {
      // TODO: verify later
      if (C.getitemizedcommand() == null) return;
      C.opendialogwithpar("civ-advanceculture", y);
    },

    // civ-buyincity
    buycitywall(y) {
      const data = {
        "header": C.localize("buycitywallheader"),
        "buttonbuy": C.localize("build")
      };
      C.opendialogwithpar("civ-buyincity", data);
    },

    localize: function (...args) {
      return _getxapp().localize(...args);
    },

    getlistofjoingames: function () {
      var civjoin = findbytag("civ-join");
      return civjoin.listofjoins;
    },

    getcurrentcommand: function () {
      return this.getyouplay().currentcommand;
    },

    iscurrentcommand: function (co) {
      return this.getcurrentcommand() == co;
    },

    setcurrentcommand: function (co) {
      this.getyouplay().currentcommand = co;
    },

    itemizecommand: function (co) {
      this.getyouplay().callitemize(co);
    },

    getitemizedcommand: function () {
      return this.getyouplay().itemizedcommand;
    },

    issendproductionscout: function () {
      return C.getcurrentcommand() == "selectscout";
    },

    setyouplayparam: function (attr, value) {
      this.getyouplay()[attr] = value;
    },

    getyouplay: function () {
      const y = _getxapp().$.youplay;
      return y;
    },

    you: function() {
      const y = _getxapp().$.youplay
      return y.y
    },

    getmarket: function () {
      const y = _getxapp().$.market;

      return y;
    },

    getyourdeck: function () {
      return C.getjsboard().board.you;
    },
        
    getopponentplay: function () {
      var y = _getxapp().$.opponentplay;

      return y;
    },

    setjsboard: function (jsboard) {
      _getxapp().draw(jsboard);
    },
    
    setresources: function (rese) {
      const x = _getxapp();

      x.resou = rese;
    },

    _getresources() {
      return _getxapp().resou;
    },

    getlistoftech() {
      return C._getresources().tech;
    },

    getlistofcivs() {
      return C._getresources().civ;
    },

    getlistofcards() {
      return C._getresources().cards;
    },

    getlistofbuildings() {
      return C._getresources().buildings;
    },

    getlistofwonders() {
      return C._getresources().wonders;
    },

    getculturetrack() {
      return C._getresources().culturetrack;
    },

    getjsboard: function () {
      return _getxapp()["data"];
    },

    getgreatpersons() {
      return C._getresources().greatperson;
    },

    getgreatpersontype() {
      return C._getresources().greatpersontype;
    },

    getjdict() {
      return C._getresources().journal
    },
    
    // get square adjusting coordinates
    // coordinates form current map layout
    // adjust to absolute
    getsquare: function (row, col) {
      if (row == null || col == null) return null;
      return window.getsquare(window.fixrow(row), window.fixcol(col));
    },

    // get square directly without adjusting coordinates
    wgetsquare: function (row, col) {
      if (row == null || col == null) return null;
      return window.getsquare(row, col);
    },

    log: function (s) {
      console.log(s);
    },

    readgames: function () {
      window.readgames();
    },

    readcivs: function () {
      window.readcivs();
    },

    readjoingames: function () {
      window.readjoingames();
    },

    isFireFox: function () {
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      return isFirefox;
    },

    toS: function (o) {
      return JSON.stringify(o);
    },

    datetos: function (d) {
      return window.datetos(d);
    },

    resumegame: function (gameid, civ) {
      window.resumegame(gameid, civ);
    },

    unregistertoken: function () {
      window.unregistertoken();
    },

    registertwoplayersgame: function (civ1, civ2) {
      window.twoplayersgame(civ1, civ2);
    },

    resumetwoplayersgame: function (gameid, civ) {
      window.resumetwoplayersgame(gameid, civ);
    },
    
    leavegame: function () {
      window.stoprefresh();

      _clearMap();

      window.leavegame();
    },
    
    downloadGame() {
        let a = document.createElement('a')
        let g = window.getgameid()
        a.href = "downloadgame?id=" + g
        a.download = "game-" + g + ".json"
        a.click()
    },
        
    signalnotready() {
      // check if opened already
      if (C.alertdialogopened()) return
      this.alertdialogfun(C.localize("youropponentleavethegame"),e => C.leavegame());      
    },
    
    joingame: function (gameid, civ) {
      window.joingame(gameid, civ);
    },

    highlightGame: function (a, highlight) {
      window.highlightMap(a, highlight);
    },

    highlightSquare: function (e, hightlight) {
      e.highlight(hightlight);
    },

    clearCommand: function () {
      const y = C.getyouplay();
      y.clearCommand();
    },

    emptyS: function (s) {
      return s == null || s == "";
    },

    constructP: function (row, col) {
      return {
        "row": row,
        "col": col
      };
    },

    color1: function () {
      return "Aqua";
    },

    color2: function () {
      return "Red";
    },

    colorback1: function () {
      return "Aqua";
    },

    colorback2: function () {
      return "Red";
    },

    civtonumb: function (civ) {
      return window.civtonumb(civ); // TODO: for test
      // return 0
    },

    colorForCiv: function (civ) {
      if (C.civtonumb(civ) == 0) return this.color1();
      return this.color2();
    },

    backcolorForCiv: function (civ) {
      if (C.civtonumb(civ) == 0) return this.colorback1();
      return this.colorback2();
    },

    testcolorForCiv: function (civ) {
      var cMap = new Map();
      cMap.set('China', "Yellow");
      cMap.set('Rome', 'Green');
      cMap.set('Germany', 'Red');
      return cMap.get(civ);
    },

    findattribute: function (e, aname) {
      const al = e.attributes;
      const p = al.getNamedItem(aname);
      if (p == null) return null;
      return p.nodeValue;
    },

    seconddrawerClose: function (close) {
      const x = _getxapp();

      const e = x.$.internalDrawer;
      e.forceNarrow = close; // TODO: probably not necessary, forceNarrow do the job

      const d = x.$.opponentplay;
      C.showeleme(d, !close);
    },

    setStyleAttribute(e, attr, value) {
      e.style[attr] = value;
    },

    setShadowStyleAttribute: function (e, selval, attr, value) {
      selval = selval.toLowerCase(); // const sha = e.shadowRoot

      const sha = this.getShadow(e);
      const st = sha.styleSheets;
      const rule = st[0];
      const a = rule.cssRules;

      for (var i = 0; i < a.length; i++) {
        const s = a[i];
        const sel = s.selectorText;
        const inde = sel.search(selval);

        if (inde >= 0) {
          s.style[attr] = value;
          return;
        }
      }
    },

    _getbyid: function (e, id) {
      if (e.$ != null) return e.$[id]
      return e.querySelector("#" + id)
    },
    getdomelem: function (e, id) {
      return e.$$("#" + id)
    },

    setCivUnits: function (e, i, units) {
      const u = units.units[i]
      const name = u.name.toLowerCase()
      const num = u.num
      const strength = u.militarystrength
      const param = {}
      param.name = name
      param.num = num
      param.level = strength

      const elem = C._getbyid(e, name)

      elem.draw(param);
      if (units.list != null && units.list.length > 0) elem.units = units
        else elem.units = null
    },

    unittypes() {
      return ["mounted", "aircraft", "infantry", "artillery"];
    },

    isBuyUnitCommand(co) {
      for (var i = 0; i < C.unittypes().length; i++) if ("buy" + C.unittypes()[i] == co) return true

      return false
    },

    findUnitLevel(units, name) {
      if (units == null) return null
      const u = CC.findName(units,name)
      if (u == null) return null
      return u.militarystrength
    },

    setUnitsNumb: function (e, units) {
      for (var i = 0; i < 4; i++) C.setCivUnits(e, i, units)
    },

    setColorForCity: function (e, city, color) {
      C.setShadowStyleAttribute(e, city, "backgroundColor", color);
    },

    _dialogopen: function (dname, open, data) {
      const d = document.getElementById(dname).$.dialog

      if (!open) {
        if (d.opened()) d.closeIt()
      }
      else
      if (!d.opened()) {
        d.openIt(data)
        this.sleep(1000).then(() => {
          d.draw(data)
        })
      }
      else d.draw(data)
    },

    endofbattledialog: function (b) {
      const open = b.board.battle != null && b.board.battle.endofbattle

      this._dialogopen("battle-result", open, b);
    },

    saveunitbattledialog: function (b) {
      const ba = b.board.battle;
      if (ba == null || !ba.endofbattle) return false;

      if (ba.attacker.saveunit && ba.attacker.you) {
        C.opendialogwithpar("battlesaveunit-dialog", ba.attacker);
        return true;
      }

      if (ba.defender.saveunit && ba.defender.you) {
        C.opendialogwithpar("battlesaveunit-dialog", ba.defender);
        return true;
      }

      return false;
    },

    battleDialog: function (b) {
      if (b == null) return;
      const open = b.board.battle != null;
      if (open) C.setcurrentcommand(null);

      this._dialogopen("battle-dialog", open, b);

      if (!C.saveunitbattledialog(b)) C.endofbattledialog(b);
    },

    isendofgame(b) {
      return b.board.endofgame != null
    },

    endofgameDialog(b) {
      if (b == null) return
      if (! this.isendofgame(b)) return
      C.rundialog("civ-endofgame",b)
    },

    getSideName(data) {
      if (data.isvillage) return C.localize('villagelabel');else return data.civ;
    },

    _logautomatemove(command, pa) {
      var s = "Automated " + command;

      if (pa != null) {
        if (pa.row != -1) s = s + " row=" + pa.row + " col=" + pa.col;
        if (pa.param != null) s = s + " " + pa.param;
      }

      const civ = C.getyourdeck().civ;
      C.log(civ + " " + s);
    },

    executeEndOfPhase(automate) {
      const g = C.getjsboard().board.game;
      const phase = g.phase;
      const pa = {};
      pa.row = -1;
      pa.col = -1;
      pa.param = phase;
      if (automate) C._logautomatemove("endofphase", pa);
      C.executeC("endofphase", pa);
    },

    // automatecommand
    _checkEndOfMove(commands) {
      if (commands.length == 1 && commands[0].command.toLowerCase() == "endofmove") {
        C._logautomatemove(commands[0].command, null);

        C.executeC(commands[0].command);
        return true;
      }

      return false;
    },

    executeKillFigure() {
      const command = "killfigure";

      C._logautomatemove(command, null);

      C.executeC(command);
    },

    _checkEndOfPhase(commands) {
      if (commands.length == 1 && commands[0].command.toLowerCase() == "endofphase") {
        C.executeEndOfPhase(true);
        return true;
      }

      return false;
    },

    automateCommand(commands) {
      if (C._checkEndOfMove(commands)) return;

      C._checkEndOfPhase(commands);

      return;
    },

    _checkrevealCommand(co) {
      const iparam = {};
      iparam.list = C.getitemizedcommand();
      if (_twotilereveal(iparam)) return;
      const list = C.getitemizedcommand();
      const r = list.tiles[0];
      const pa = {};
      pa.row = r.p.row;
      pa.col = r.p.col;
      pa.param = r.orientation;

      C._logautomatemove(co, pa);

      C.executeC(co, pa);
    },

    _checkexplorehutCommand(co) {
      const list = C.getitemizedcommand();
      if (list.explore.length != 1) return;
      const pa = {};
      pa.row = list.explore[0].row;
      pa.col = list.explore[0].col;

      C._logautomatemove(co, pa);

      C.executeC(co, pa);
    },

    checkAutomateButton() {
      const command = C.getcurrentcommand();
      const itemized = C.getitemizedcommand();
      if (command == "revealtile") C._checkrevealCommand(command);
      if (command == "explorehut") C._checkexplorehutCommand(command);
    },

    _findName(l, n, error) {
      const e = CC.findName(l,n)
      if (e != null) return e

      C.internalerroralert("Cannot find " + error + " definition " + n)
    },

    findGreatPersonType(tperson) {
      const ptype = C.getgreatpersontype();
      return C._findName(ptype, tperson,"on Great Person Type list");
    },

    findGreatPerson(person) {
      const greatp = C.getgreatpersons();

      const pe = this._findName(greatp, person, person + "on Great Person list");

      const ty = C.findGreatPersonType(pe.type);
      const res = {};
      res.person = pe;
      res.type = ty;
      return res;
    },

    findBuilding(b) {
      const bt = C.getlistofbuildings();
      return C._findName(bt, b, "building");
    },

    listofallbuildings() {
      const a = [];
      const bt = C.getlistofbuildings();

      for (var i = 0; i < bt.length; i++) a.push(bt[i].name.toLowerCase());

      return a;
    },

    advanceculturecost(cost) {
      if (cost.trade == 0) return C.localize('culturecostnotrade', 'culture', "" + cost.culture);
      return C.localize('culturecost', 'culture', cost.culture, "trade", cost.trade);
    },

    findWonder(w) {
      const wl = C.getlistofwonders()
      return C._findName(wl, w, "wonder")
    },

    findTech(t) {
      const te = C.getlistoftech()
      return C._findName(te, t, "technology")
    },

    getTechnologyName(n) {
      return C.localize(n)
    },
    
    getResourceName(n) {
      return C.localize(n.toLowerCase() + "label")
    },
    
    getUnitName(n) {
      return C.localize(n)
    },

    findCard(n) {
      const cards = C.getlistofcards();
      return C._findName(cards, n, "culture card");
    },

    onList(list, name) {
      for (var i = 0; i < list.length; i++) if (list[i] == name) return true;

      return false;
    },

    addToListU(list, name) {
      if (this.onList(list, name)) return;
      list.push(name);
    },

    createRes(res) {
      return [{
        "resource": res,
        "num": 1
      }];
    },

    convertResourcesToList(data, data1, resource) {
      const da = [];

      for (var j = 0; j < data1.list.length; j++) da.push(data1.list[j]);

      for (var i = 0; i < data.length; i++) if (data[i].num > 0 && data[i].resource != "Culture") {
        const h = {};
        h.resource = data[i].resource;
        da.push(h);
      } // filter resources


      if (resource == null) return da;
      const a = [];

      for (var i = 0; i < da.length; i++) if (da[i].resource == resource) a.push(da[i]);

      return a;
    },

    toTech(t) {
      const nt = {};
      nt.coins = 0;
      nt.initial = false;
      nt.level = t.level;
      nt.tech = t.name;
      return nt;
    },

    findCulturePoint(no) {
      const c = C.getculturetrack();
      var s = {};

      for (var i = 0; i < c.length; i++) {
        if (no <= c[i].last) {
          s.culture = c[i];
          s.greatperson = false;
          s.level = i;
          break;
        }
      }

      if (no <= 0 || s == null) {
        C.internalerroralert("Cannot find number on culture track" + no);
        return null;
      }

      for (var g = 0; g < s.culture.greatperson.length; g++) if (s.culture.greatperson[g] == no) {
        s.greatperson = true;
        break;
      }

      return s;
    },

    getMaxCultureProgress() {
      const c = C.getculturetrack();
      return c[c.length - 1].last;
    },

    copyTable(r) {
      const a = [];

      for (var i = 0; i < r.length; i++) a.push(r[i]);

      return a;
    },

    // HV
    _addhv(a, h, hv) {
      if (h[hv] == null) return;
      const r = {};
      r.resource = hv;
      r.num = h[hv];
      a.push(r);
    },

    concatHV(r, h) {
      const a = C.copyTable(r);

      this._addhv(a, h, "Hut");

      this._addhv(a, h, "Village");

      return a;
    },

    // list
    getIListOfNames(itemize, name) {
      const ii = itemize;
      const res = [];

      for (var i = 0; i < ii.length; i++) {
        const l = ii[i].list;

        for (var j = 0; j < l.length; j++) {
          const n = l[j][name];
          this.addToListU(res, n);
        }
      }

      return res;
    },

    getIListOfPointsForName(itemize, name, nc) {
      const ii = itemize;
      const res = [];

      for (var i = 0; i < ii.length; i++) {
        const l = ii[i].list;

        for (var j = 0; j < l.length; j++) {
          const n = l[j][name];
          if (n == nc) res.push(l[j].p);
        }
      }

      return res;
    },

    getIListOfReplace(itemize, name, nc, p) {
      const ii = itemize;

      for (var i = 0; i < ii.length; i++) {
        const l = ii[i].list;

        for (var j = 0; j < l.length; j++) {
          const n = l[j][name];
          if (n == nc && C.eqp(p, l[j].p)) return l[j].list;
        }
      }

      return [];
    },

    getIListCityP(itemize, name, nc, p) {
      const ii = itemize;

      for (var i = 0; i < ii.length; i++) {
        const l = ii[i].list;

        for (var j = 0; j < l.length; j++) {
          const n = l[j][name];
          if (n == nc && C.eqp(p, l[j].p)) return ii[i].p;
        }
      }

      const mess = "Cannot find city for this point " + nc + " " + p;
      C.internalerroralert(mess);
    },

    getBaseURL() {
      const base = location.pathname;
      const s = base.split("/"); // fix to work on Heroku

      if (s[1] == "") return ""; // no base URL

      return "/" + s[1];
    }

  }; // return
} // function
();
