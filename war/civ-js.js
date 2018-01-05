var C = (function() {

  function confirmaction(co) {
    const c = co.toLowerCase()
//    if (c == "endofphase") return true
//    if (c == "startmove") return true
//    if (c == "revealtile") return true
    return false
  };

  function verifysetfigures(co,iparam,pa) {

     var list = iparam.list

     for (var i=0; i<list.length; i++)
       if (C.eqp(iparam,list[i].param)) {
         pa.row = list[i].p.row
         pa.col = list[i].p.col
         pa.param = list[i].param
         return pa
         }

      return null
  };

  function checkarmy(iparam) {
     if (iparam.square.numberofArmies > 0 || iparam.square.numberofScouts > 0) return true
     return false
  };

  function findpointp(iparam,list) {
    for (var i=0; i<list.length; i++)
      if (C.eqp(iparam,list[i].p)) return i
    return -1
  }

  function findpoint(iparam,list) {
    for (var i=0; i<list.length; i++)
      if (C.eqp(iparam,list[i])) return i
    return -1
  }


  function verifystartmove(co,iparam,pa) {
    if (!checkarmy(iparam)) return null
    var list = iparam.list
    var i = findpointp(iparam,list)
    if (i != -1) {
       pa.param = list[i].f
       return pa
    }
    return null
  };

  function verifymove(co,iparam,pa) {
     var list = iparam.list.moves
     var i = findpoint(iparam,list)
     if (i != -1) return pa
     return null
  };

  function verifysetcity(co,iparam,pa) {
     var list = iparam.list
     var i = findpoint(iparam,list)
     if (i == -1) return null
     return pa
  };


  function verifyrevealtile(co,iparam,pa) {
    if (!checkarmy(iparam)) return null
    var list = iparam.list
    if (!C.eqp(iparam,list.p)) return null
    var r = list.tiles[0]
    pa.row = r.p.row
    pa.col = r.p.col
    pa.param = r.orientation
    return pa;
  }

  function verifypoints(pa) {
      const list = C.currentlistofpoints()
      const i = findpoint(pa,list)
      if (i == -1) return null
      return pa
  }

  function verifycommand(co,iparam) {
     var itemized = C.getitemizedcommand()
     pa = {}
     pa.row = iparam.row
     pa.col = iparam.col
     pa.param = iparam.param
     pa.square = iparam.square
     pa.itemized = itemized
     if (itemized == null || co == "endofphase") return pa
     iparam.list = itemized
     if (co == "setarmy" || co == "setscout" || co == "buyscout" || co == "buyarmy") return verifysetfigures(co,iparam,pa)
     if (co == "startmove") return verifystartmove(co,iparam,pa)
     if (co == "move") return verifymove(co,iparam,pa)
     if (co == "revealtile") return verifyrevealtile(co,iparam,pa)
     if (co == "setcapital" || co == "setcity") return verifysetcity(co,iparam,pa)
     if (co == "endofmove") return pa
     return verifypoints(pa)
  };

   function dialogalert(dialogid,message) {
		const dialogDemo = document.getElementById(dialogid);
		dialogDemo.openDialog = function(e) {
			this.$.dialog.open();
		};
		dialogDemo.message = message;
		dialogDemo.openDialog();
	  };

  function findbytag(tag) {
      var ee = window.findbytag(tag)
      return ee
    };

  // id="close-button"
  function showhideclosebuttuon(show) {
     C.showelem("close-button",show)
  };

  function _getxapp() {
       var e = document.getElementsByTagName("x-app")
       return e[0]
    };

  function _resumemultidialog(e) {
	const dialogDemo = document.getElementById("join-dialog")
	dialogDemo.openDialog = function() {
	    this.$.dialog.civname = e.civ[0]
	    this.$.dialog.header = C.localize("resumetwoplayersgame")
	    this.$.dialog.gameid = e.gameid
	    lines = []
	    const c = {}
	    c.civ = e.civ[1]
	    lines.push(c)
	    this.$.dialog.lines = lines
		this.$.dialog.openIt()
	}
	dialogDemo.openDialog()
  };

  function _twotilereveal(iparam) {
    if (iparam.list.tiles.length <= 1) return false;
    const dialog = document.getElementById("reveal2-dialog")
    dialog.$.dialog.openIt(iparam)
    return true;
  }

  function _multifigures(iparam) {
    const no = iparam.param.numberofArmies + iparam.param.numberofScouts
    if (no <= 1) return false
    const dialog = document.getElementById("multifigures-dialog")
    dialog.$.dialog.openIt(iparam)
    return true;
  }


  function _clearMap() {
     const o =  _getxapp()
     o.draw(null)          
  }

  function _spendtradecommand(pa) {
    const dialog = document.getElementById("spendtrade-dialog")
    dialog.$.dialog.openIt(pa)
  }

  function _sendproductioncommand(pa) {
     C.opendialogwithpar("sendproduction-dialog",pa)
  }

  function _sendproductionsetscout(pa) {
    const dialog = document.getElementById("sendproduction-dialog")
    dialog.$.dialog.setScout(pa)
  }

  function _attackconfirmation(pa) {
    C.opendialogwithpar("attackconf-dialog",pa)
  }

  function _undosendproductioncommand(question,pa) {
    C.confirmdialog(question,e => {
      const ite = pa.itemized
      for (var i=0; i< ite.length; i++)
         if (C.eqp(ite[i].city,pa)) {
           pa.param = ite[i].scout
           C.executeC("UNDOSENDPRODUCTION",pa)
         }
      })
  }

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return {

  getShadow(e) {
    var s = e.shadowRoot
    var i = 0;
    while (s == null && i < 5) {
      // wait 1 sec
      i = i + 1
      _sleep(10000)
      s = e.shadowRoot
    }
    return s
  },

  opendialogwithpar(id,pa) {
	 const dialog = document.getElementById(id)
	 dialog.$.dialog.openIt(pa)
  },

  showunits(units) {
     C.opendialogwithpar("showunits-dialog",units)
  },

  eqp(p1,p2) {
    return p1.row == p2.row && p1.col == p2.col
  },

  getcommanddecr(co) {
     var key = co
     switch(co) {
        case "setcapital" : { key = "capital"; break; }
        case "setarmy" : { key = "deployarmy"; break; }
        case "setscout" : { key = "deployscout"; break; }
        case "buyscout" : { key = "purchasescout"; break; }
        case "buyarmy" : { key = "purchasearmy"; break; }
        case "move" : { key = "continuemove"; break; }
     }
     return C.localize(key)
  },

  getphasedescr(phase) {
    return C.localize(phase.toLowerCase() + "label")
  },

  setlistofpoints(a) {
     C.getyouplay().setListOfPoints(a)
  },

  currentlistofpoints() {
    return C.getyouplay().listofpoints
  },

  getlistofpoints(co,itemize) {
     if (itemize == null) return null
     if (co == "startmove" || co == "buyinfantry" ||
         co == "buyartillery" || co == "buymounted" || co == "buyaircraft" || co == "spendtrade" || co == "undospendtrade" ||
         co == "harvestresource" || co == "sendproduction" || co == "undosendproduction") {
        var a = []
        for (var i=0; i<itemize.length; i++) a.push(itemize[i].p)
        return a
     }
     if (co == "setarmy" || co == "setscout" || co == "buyscout" || co == "buyarmy") {
        var a = []
        for (var i=0; i<itemize.length; i++) a.push(itemize[i].param)
        return a
     }
     if (co == "move")  return itemize.moves
     if (co == "setcity" || co == "setcapital") return itemize
     if (co == "revealtile") {
       var a = []
       a.push(itemize.p)
       return a
     }
     if (co == "explorehut") {
       var a = []
       for (var i=0; i<itemize.explore.length; i++) a.push(itemize.explore[i])
       return a
     }
     if (co == "attack") {
         var a = []
         for (var i=0; i<itemize.attack.length; i++) a.push(itemize.attack[i])
         return a
       }
     return null
  },

  getconfirmdialog : function() {
    const d = document.getElementById("dialog-question")
    d.$.dialog.title = C.localize('confirmdialogtitle')
    return d
  },

  joingamedialog : function(gameid,civ) {
	const dialogDemo = C.getconfirmdialog()
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	dialogDemo.confirm = e => C.joingame(gameid,civ)
	dialogDemo.dismiss = e => {}
	dialogDemo.message = C.localize("doyouwanttojoin","civ",civ)
	dialogDemo.openDialog()
  },
  
  startgamedialog : function(civ) {
    this.confirmdialog(C.localize("doyouwantstartnegamequestion","civ",civ),e => window.chooseciv(civ))
  },

  confirmdialog: function(message,fun) {
    const dialogDemo = this.getconfirmdialog()
    dialogDemo.openDialog = function(e) {
        this.$.dialog.open()
    }
    dialogDemo.confirm = fun
    dialogDemo.dismiss = e => {}
    dialogDemo.message = message
    dialogDemo.openDialog()
  },

  alertdialog: function(message) {
    const dialogalert = document.getElementById("dialog-alert")
    dialogalert.openDialog = function(e) {
        this.$.dialog.open()
    }
    dialogalert.confirm = e => {}
    dialogalert.message = message
    dialogalert.openDialog()
  },


  resumedialog : function(index) {
    const li = JSON.parse(C.getlistofgames())
    const e = li[index]
    if (e.civ.length > 1) {
      _resumemultidialog(e)
      return;
    }

    const civ = e.civ[0]
    const gameid = e.gameid
    this.confirmdialog(C.localize('doyouwanttoresumequestion','civ',civ),e => C.resumegame(gameid,civ))
  },

  leavedialog : function() {
    this.confirmdialog(C.localize('leavegamequestion'),e => C.leavegame())
  },

  closejoindialog : function() {
	 const dialogjoin = document.getElementById("join-dialog")
	 dialogjoin.$.dialog.closeIt()
  },

 joindialog : function(civ) {
	const dialogDemo = document.getElementById("join-dialog")
	dialogDemo.openDialog = function(e) {
	    this.$.dialog.civname = civ
	    this.$.dialog.gameid = -1
	    this.$.dialog.header = C.localize("creatingtwoplayergames")
	    this.$.dialog.lines = C.getlistofcivs()
		this.$.dialog.openIt()
	}
	dialogDemo.openDialog()
  },

  executeC : function(co,pa) {
    if (pa == null) {
      pa = {}
      pa.row = -1
      pa.col = -1
      pa.param = null      
    }
    if (typeof pa.param == 'string') window.executecommandS(co.toUpperCase(),pa.row,pa.col,pa.param)
    else
    if (typeof pa.param == "number") window.executecommandN(co.toUpperCase(),pa.row,pa.col,pa.param)
    else
    window.executecommand(co.toUpperCase(),pa.row,pa.col,pa.param)
  },
   
  executewithconffun : function(question,co,fun) {
    if (question == null) question = C.localize("executecommandquestion","command",co)
    if (!confirmaction(co)) fun()
    else this.confirmdialog(question,fun)
  },

  executewithconf : function(question,co,pa,mdial) {
    C.executewithconffun(question,co,e => {
         if (mdial != null) mdial.closeIt()
         C.executeC(co,pa)
       }              
     )
  },

  confexecutedialog : function (question,co,row,col,param) {
    var iparam = {}
    iparam.square = null
    if ((row != -1) && (col != -1)) iparam.square = C.getsquare(row,col)
    iparam.row = window.fixrow(row)
    iparam.col = window.fixcol(col)
    iparam.param = param
    var pa = verifycommand(co,iparam)
    if (pa == null) return
    if (co == "revealtile")
       if (_twotilereveal(iparam)) return
    if (co == "startmove")
       if (_multifigures(pa)) return
    if (co == "sendproduction" || co == "harvestresource") {
       _sendproductioncommand(pa)
       return
    }
    if (co == "undosendproduction") {
       _undosendproductioncommand(question,pa)
       return
    }
    if (co == "spendtrade") {
       _spendtradecommand(pa)
       return
    }
    if (co == "selectscout") {
      _sendproductionsetscout(pa)
      return
    }
    if (co == "attack") {
    	_attackconfirmation(pa)
    	return
    }
    
    this.executewithconf(question,co,pa)
  },

//  dialog-command-alert

   dialogexecutefailure : function(message) {
      dialogalert("dialog-command-failure",message)
   },

   showeleme :function (e,show) {
      if (show) C.removeattr(e,"hidden")
      else e["hidden"] = true
    },

    displayelem : function(e, display,inblock) {
      if (display) {
        if (inblock) e.style.display = 'inline-block'
        else e.style.display = 'block'
        }
      else e.style.display = 'none'
    },

    displayelemid(e,id,display,inblock) {
      this.displayelem(C._getbyid(e,id),display,inblock)
    },

    displaybadge : function(e,number) {
      if (number <= 1) C.showeleme(e,false)
      else {
        C.showeleme(e,true)
        var pa = e.offsetParent
        var no = 0
        if (pa == null) no = 500
        _sleep(no).then(
          () => {
            C.showeleme(e,true)
            e.updatePosition()
          }
        )

        e.label = number
      }
    },

   disableleme :function (e,disable) {
      if (disable) C.setattr(e,"disabled",true)
      else C.removeattr(e,"disabled")
    },

    showelem : function(id,show) {
      const x = _getxapp()
      const e = this.getShadow(x).getElementById(id)
      C.showeleme(e,show)
    },

    setattr : function (e,attr,value) {
       e.setAttribute(attr,value)
    } ,

    removeattr : function (e,attr) {
       e.removeAttribute(attr)
    },

    // what = 1 show civs (switch off the rest)
    //      = 2 show games (switch off the test)
    //      = 3 show joins
    //      = 0 switch off all
    showcivorgames : function(what) {
      C.seconddrawerClose(true)
      var gamese = findbytag("civ-games")
      var civse = findbytag("civ-content")
      var civjoin = findbytag("civ-join")
      if (what == 0 || what == 2 || what == 3) C.setattr(civse,"datas","")
      if (what == 0 || what == 1 || what == 3) C.setattr(gamese,"listofgames","")
      if (what == 0 || what == 1 || what == 2) C.setattr(civjoin,"listofjoins","")
      if (what == 0) showhideclosebuttuon(true)
      else showhideclosebuttuon(false)
    } ,

    getlistofcivs : function() {
      const civse = findbytag("civ-content")
      return civse.civs
    } ,

    getlistofgames : function() {
      const gamese = findbytag("civ-games")
      return gamese.listofgames
    } ,
    
    getgamestate : function() {
      const b = findbytag("civ-gamestate")
      return b
    },
    
    showresearch(p) {        
        C.opendialogwithpar("showtech-dialog",p.tech)
    },
    
    researchdialog(y) {
        const p = {}
        const b = C.getjsboard()
        p.tech = b.board.tech
        p.playertech = y.tech
        p.playerlevel = y.tradelevel
        C.opendialogwithpar("tech-dialog",p)       
    },

    localize : function(...args) {
      return _getxapp().localize(...args)
    },

    getlistofjoingames : function() {
       var civjoin = findbytag("civ-join")
       return civjoin.listofjoins
    },

    getcurrentcommand : function() {
        return this.getyouplay().currentcommand
      },
      
    iscurrentcommand : function(co) {
        return this.getcurrentcommand() == co
    },

    setcurrentcommand : function(co) {
       this.getyouplay().currentcommand = co
    },

    getitemizedcommand : function() {
         return this.getyouplay().itemizedcommand
      },

    issendproductionscout : function() {
      return C.getcurrentcommand() == "selectscout"
    },

    setyouplayparam : function(attr,value) {
       this.getyouplay()[attr] = value
    },

    getyouplay : function() {
      var y = _getxapp().$.youplay
      return y
    },

    getmarket : function() {
      var y = _getxapp().$.market
      return y
    },

    getyourdeck: function() {
      return C.getjsboard().board.you
    },

    getopponentplay : function() {
      var y = _getxapp().$.opponentplay
      return y
    },

    setjsboard : function(jsboard) {
       _getxapp().draw(jsboard)
    },

    getjsboard : function() {
       return _getxapp()["data"]
    },

    getsquare : function(row,col) {
        var res = window.getsquare(window.fixrow(row),window.fixcol(col))
        return res
    },

    log : function(s) {
       console.log(s);
    },

    readgames : function() {
      window.readgames();
    },

    readcivs : function() {
      window.readcivs();
    },

    readjoingames : function() {
      window.readjoingames();
    },

    isFireFox : function() {
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        return isFirefox
    },

    toS : function(o) {
      return JSON.stringify(o)
    },

    datetos : function(d) {
      return window.datetos(d)
    },

    resumegame : function(gameid,civ) {
      window.resumegame(gameid,civ)
    },

    unregistertoken : function() {
      window.unregistertoken()
    },

    registertwoplayersgame : function(civ1,civ2) {
      window.twoplayersgame(civ1,civ2)
    },

    resumetwoplayersgame : function(gameid,civ) {
       window.resumetwoplayersgame(gameid,civ)
    },

    leavegame : function() {
      window.stoprefresh()    
      _clearMap()
      window.leavegame()
    },

    joingame : function(gameid,civ) {
      window.joingame(gameid,civ)
    },

    highlightGame : function(a,highlight) {
      window.highlightMap(a,highlight)
    },

    highlightSquare : function(e,hightlight) {
       e.highlight(hightlight)
    },

    clearCommand : function() {
      const y = C.getyouplay()
      y.clearCommand()
    },

    emptyS : function(s) { return s == null || s == "" },

    constructP : function(row,col) {
      return {"row" : row, "col" : col }
    },

    color1 : function() { return "Aqua" },
    color2 : function() { return "Red" },

    colorback1 : function() { return "Aqua" },
    colorback2 : function() { return "Red" },

    civtonumb : function(civ) {
      return window.civtonumb(civ)
    },

    colorForCiv : function(civ) {
      if (C.civtonumb(civ) == 0) return this.color1()
      return this.color2()
    },

    backcolorForCiv : function(civ) {
      if (C.civtonumb(civ) == 0) return this.colorback1()
      return this.colorback2()
    },

    testcolorForCiv : function(civ) {
       var cMap = new Map()
       cMap.set('China',"Yellow")
       cMap.set('Rome','Green')
       cMap.set('Germany','Red')
       return cMap.get(civ)
    },

    findattribute : function(e,aname) {
      const al = e.attributes
      const p = al.getNamedItem(aname)
      if (p == null) return null
      return p.nodeValue
    },

    seconddrawerClose : function(close) {
      const x = _getxapp()
      const e = x.$.internalDrawer
      e.forceNarrow = close
      // TODO: probably not necessary, forceNarrow do the job
      const d = x.$.opponentplay
      C.showeleme(d,!close)
    },

    setShadowStyleAttribute : function(e,selval,attr,value) {
      selval = selval.toLowerCase()
//      const sha = e.shadowRoot
      const sha = this.getShadow(e)
      const st = sha.styleSheets
      const rule = st[0]
      const a = rule.cssRules
      for (var i = 0; i<a.length; i++) {
        const s = a[i]
        const sel = s.selectorText
        const inde = sel.search(selval)
        if (inde >= 0) {
           s.style[attr] = value
           return;
        }
      }
    },

    _getbyid : function(e,id) {
      if (e.$ != null) return e.$[id]
      return e.querySelector("#" + id)
    },

    getdomelem : function(e,id) {
      return e.$$("#"+id)
    },

    setCivUnits : function(e,i,units) {
       const u = units.units[i]
       const name = u.name.toLowerCase()
       const num = u.num
       const strength = u.militarystrength
       const param = {}
       param.name=name
       param.num = num
       param.level = strength
       const elem = C._getbyid(e,name)
       elem.draw(param)
       if (units.list != null && units.list.length > 0) elem.units = units
       else elem.units = null

    },
    
    unittypes() {
     return ["mounted","aircraft","infantry","artillery"]
    },

    findUnitLevel(units,name) {
      if (units == null) return null
      for (var i=0; i<4; i++)
        if (units[i].name == name) return units[i].militarystrength
      return null
    },


    setUnitsNumb : function(e,units) {
      for (var i=0; i<4; i++)
        C.setCivUnits(e,i,units)
    },

    setColorForCity : function(e,city,color) {
       C.setShadowStyleAttribute(e,city,"backgroundColor",color)
    },
    
   _dialogopen : function(dname,open,data) {
        const d = document.getElementById(dname).$.dialog
        if (!open) {
            if (d.opened()) d.closeIt()
        }
        else 
            if (!d.opened()) {
                d.openIt(data)
                _sleep(1000).then(
                        () => {
                            d.draw(data)
                        }
                      )
            } else d.draw(data)      
   },
    
   endofbattledialog : function(b) {
     const open = (b.board.battle != null) && b.board.battle.endofbattle
     this._dialogopen("battle-result",open,b)
   },
    
   battleDialog : function(b) {
     if (b == null) return
     const open = (b.board.battle != null)
     if (open) C.setcurrentcommand(null)
     this._dialogopen("battle-dialog",open,b)
     C.endofbattledialog(b)
   },
    
    getSideName(data) {
       if (data.isvillage) return C.localize('villagelabel')
       else return data.civ
    },
    
    _logautomatemove(command,pa) {
       var s = "Automated " + command
       if (pa != null) {
          if (pa.row != -1) s = s +  " row=" + pa.row + " col=" + pa.col
          if (pa.param != null) s = s + " " + pa.param
       }        
       const civ = C.getyourdeck().civ
       C.log(civ + " " + s)
    },
    
    executeEndOfPhase(automate) {
        const g = C.getjsboard().board.game
        const phase = g.phase
        const pa = {}
        pa.row = -1
        pa.col = -1
        pa.param = phase      
        if (automate) C._logautomatemove("endofphase",pa)
        C.executeC("endofphase",pa)
    },
    
    // automatecommand
    _checkEndOfMove(commands) {
       if (commands.length == 1 && commands[0].command.toLowerCase() == "endofmove") {
          C._logautomatemove(commands[0].command,null)             
          C.executeC(commands[0].command)
          return true
       }
       return false         
    },
            
    _checkEndOfPhase(commands) {
       if (commands.length == 1 && commands[0].command.toLowerCase() == "endofphase") {
          C.executeEndOfPhase(true)
          return true
       }
       return false         
    },
    
    automateCommand(commands) {
      if (C._checkEndOfMove(commands)) return
      C._checkEndOfPhase(commands)
      return
    },
    
    _checkrevealCommand(co) {
       const iparam = {}
       iparam.list = C.getitemizedcommand()
       if (_twotilereveal(iparam)) return
       const list = C.getitemizedcommand()
       const r = list.tiles[0]
       const pa = {}
       pa.row = r.p.row
       pa.col = r.p.col
       pa.param = r.orientation
       C._logautomatemove(co,pa)
       C.executeC(co,pa)        
    },
    
    _checkexplorehutCommand(co) {
       const list = C.getitemizedcommand()
       if (list.explore.length != 1) return
       const pa = {}
       pa.row = list.explore[0].row
       pa.col = list.explore[0].col
       C._logautomatemove(co,pa)
       C.executeC(co,pa)               
    },
    
    checkAutomateButton() {
       const command = C.getcurrentcommand()
       const itemized = C.getitemizedcommand()
       if (command == "revealtile") C._checkrevealCommand(command)
       if (command == "explorehut") C._checkexplorehutCommand(command)        
    }
    

  }  // return
 } // function

)();
