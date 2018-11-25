const CC = {
  data: {
    "buyinfantry": {
      "dialog": "civ-buyunitdialog"
    },
    "buymounted": {
      "dialog": "civ-buyunitdialog"
    },
    "buyartillery": {
      "dialog": "civ-buyunitdialog"
    },
    "buyaircraft": {
      "dialog": "civ-buyunitdialog"
    },
    "freewonder": {
      "dialog": "buywonder-dialog"
    },
    "buywonder": {
      "dialog": "buywonder-dialog"
    },
    "buybuilding": {
      "dialog": "buy-building",
      "header": "buildingstobuy"
    },
    "freenonupgradedbuilding": {
      "dialog": "buy-building",
      "header": "nonupgradedbuildings"
    },
    "freebuildingcityaction": {
      "dialog": "buy-building",
      "header": "unlockedbuildings"
    },
    "greatpersonputnow": {
      "dialog": "putgreatperson-dialog"
    },
    "greatpersonput": {
      "dialog": "putgreatperson-dialog"
    },
    "getfreeresource": {
      "dialog": "civ-takeresourcedialog",
      "header": "chooseresourceforfree",
      "runplayer": true
    },
    "sacrificefigurefortech": {
      "dialog": "civ-sacrificefigure",
      "header": "sacrificefigureheader",
      "runplayer": true
    },
    "usesilkfortrade9": {
      "dialog": "civ-silkfortrade",
      "header": "spendsilkfortrade",
      "runplayer": true
    },
    "civ-endofgame": {
      "dialog": "civ-endofgame",
      "header": "civ-endofgame",
      "runplayer": true
    }
  },

  getdata(co) {
    return this.data[co];
  },

  getlistofpoints(co, itemize) {
    if (itemize == null) return null;

    if (co == "startmove" || co == "buyinfantry" || co == "buyartillery" || co == "buymounted" || co == "buyaircraft" || co == "spendtrade" || co == "undospendtrade" || co == "harvestresource" || co == "sendproduction" || co == "undosendproduction") {
      var a = [];

      for (var i = 0; i < itemize.length; i++) a.push(itemize[i].p);

      return a;
    }

    if (co == "devouttoculture") {
      const a = [];

      for (var i = 0; i < itemize.length; i++) a.push(itemize[i].p);

      return a;
    }

    if (co == "setarmy" || co == "setscout" || co == "buyscout" || co == "buyarmy") {
      var a = [];

      for (var i = 0; i < itemize.length; i++) a.push(itemize[i].param);

      return a;
    }

    if (co == "move") return itemize.moves;
    if (co == "setcity" || co == "setcapital" || CC.getActionTechnology(co) != null) return itemize;

    if (co == "revealtile") {
      var a = [];
      a.push(itemize.p);
      return a;
    }

    if (co == "explorehut") {
      var a = [];

      for (var i = 0; i < itemize.explore.length; i++) a.push(itemize.explore[i]);

      return a;
    }

    if (co == "attack") {
      var a = [];

      for (var i = 0; i < itemize.attack.length; i++) a.push(itemize.attack[i]);

      return a;
    }

    return null;
  },

  getcommanddecr(co) {
    var key = co.toLowerCase();

    switch (key) {
      case "setcapital":
        {
          key = "capital";
          break;
        }

      case "setarmy":
        {
          key = "deployarmy";
          break;
        }

      case "setscout":
        {
          key = "deployscout";
          break;
        }

      case "buyscout":
        {
          key = "purchasescout";
          break;
        }

      case "buyarmy":
        {
          key = "purchasearmy";
          break;
        }

      case "move":
        {
          key = "continuemove";
          break;
        }
    }

    return C.localize(key);
  },

  tab: [{
    "name": "potteryaction",
    "tech": "Pottery"
  }, {
    "name": "currencyaction",
    "tech": "Currency"
  }, {
    "name": "philosophyaction",
    "tech": "Philosophy"
  }, {
    "name": "constructionaction",
    "tech": "Construction",
    "city": true
  }, {
    "name": "metalcastingaction",
    "tech": "MetalCasting"
  }, {
    "name": "bankingaction",
    "tech": "Banking",
    "city": true
  }, {
    "name": "chivalryaction",
    "tech": "Chivalry"
  }, {
    "name": "democracyaction",
    "tech": "Democracy",
    "button": "spend6trade"
  }, {
    "name": "printingpressaction",
    "tech": "PrintingPress",
    "button": "spend5culture"
  }],

  findName(t, name) {
    const nn = name.toLowerCase();

    for (var i = 0; i < t.length; i++) if (t[i].name.toLowerCase() == nn) return t[i];

    return null;
  },

  getActionTechnology(action) {
    const tab = this.tab;
    return CC.findName(tab, action);
  },

  getTechnologyAction(tech) {
    const tab = this.tab;

    for (var i = 0; i < tab.length; i++) if (tab[i].tech == tech) return tab[i];

    return null;
  },

  actionclick(id) {
    if (C.issendproductionscout()) {
      C.alertdialog(C.localize('specifythesuqretoharvest') + " !");
      return;
    }

    const y = C.you();
    const a = this.action[id];
    if (a != null && a.noitemize) a.action(y, id);else C.itemizecommand(id);
  },

  action: {
    "unitmenu": {
      "action": CO.buyunits,
      "noitemize": true
    },
    "endofphase": {
      "action": CO.endofphase,
      "noitemize": true
    },
    "endofmove": {
      "action": CO.endofmove,
      "noitemize": true
    },
    "technologyaction": {
      "action": CO.technologyaction,
      "noitemize": true
    },
    "freearmy": {
      "action": CO.executedirect,
      "noitemize": true
    },
    "freescout": {
      "action": CO.executedirect,
      "noitemize": true
    }
  }
};