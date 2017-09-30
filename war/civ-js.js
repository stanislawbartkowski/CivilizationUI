var C = (function() {

  function eqp(p1,p2) {
    return p1.row == p2.row && p1.col == p2.col
  };

  function verifysetfigures(co,iparam,pa) {

     var list = iparam.list

     for (var i=0; i<list.length; i++)
       if (eqp(iparam,list[i].param)) {
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
      if (eqp(iparam,list[i].p)) return i
    return -1
  }

  function findpoint(iparam,list) {
    for (var i=0; i<list.length; i++)
      if (eqp(iparam,list[i])) return i
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
    if (!eqp(iparam,list.p)) return null
    var r = list.tiles[0]
    pa.row = r.p.row
    pa.col = r.p.col
    pa.param = r.orientation
    return pa;
  }

  function verifycommand(co,iparam) {
     var itemized = C.getitemizedcommand()
     pa = {}
     pa.row = iparam.row
     pa.col = iparam.col
     pa.param = iparam.param
     if (itemized == null) return pa
     iparam.list = itemized
     if (co == "setarmy" || co == "setscout" || co == "buyscout" || co == "buyarmy") return verifysetfigures(co,iparam,pa)
     if (co == "startmove") return verifystartmove(co,iparam,pa)
     if (co == "move") return verifymove(co,iparam,pa)
     if (co == "revealtile") return verifyrevealtile(co,iparam,pa)
     if (co == "setcapital" || co == "setcity") return verifysetcity(co,iparam,pa)
     return pa
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
	    this.$.dialog.header = "Resume two players game"
	    this.$.dialog.gameid = e.gameid
	    lines = []
	    lines.push(e.civ[1])
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
     const y = C.getyouplay()
     y.draw(null)
  }
  
  function _spendtradecommand(pa) {
    const dialog = document.getElementById("spendtrade-dialog")
    dialog.$.dialog.openIt(pa)     
  }

  return {
  
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
  
  getlistofpoints(co,itemize) {
     if (itemize == null) return null
     if (co == "startmove") {
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
     if (co == "setcity" || co == "setcapital" || co == "spendtrade" || co == "undospendtrade") return itemize
     if (co == "revealtile") {
       var a = []
       a.push(itemize.p)
       return a     
     }
     return null     
  },

  getconfirmdialog : function() {
    return document.getElementById("dialog-question")
  },

  joingamedialog : function(gameid,civ) {
	const dialogDemo = C.getconfirmdialog()
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	dialogDemo.confirm = e => C.joingame(gameid,civ)
	dialogDemo.dismiss = e => {}
	dialogDemo.message = "Do you want to join game as " + civ + " ?"
	dialogDemo.openDialog()
  },

  startgamedialog : function(civ) {
    this.confirmdialog(C.localize("doyouwantstartnegamequestion","civ",civ),e => window.chooseciv(civ))
  },
  
  confirmdialog: function(message,fun) {
    const dialogDemo = this.getconfirmdialog() 
    dialogDemo.$.dialog.title = C.localize('confirmdialogtitle')
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
	    this.$.dialog.header = "Creating two players game"
	    var c = JSON.parse(C.getlistofcivs())
	    this.$.dialog.lines = c
		this.$.dialog.openIt()
	}
	dialogDemo.openDialog()
  },
  
  executeC : function(co,pa) {
    if (typeof pa.param == 'string') window.executecommandS(co.toUpperCase(),pa.row,pa.col,pa.param)
    if (typeof pa.param == "number") window.executecommandN(co.toUpperCase(),pa.row,pa.col,pa.param)
    else window.executecommand(co.toUpperCase(),pa.row,pa.col,pa.param)  
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
    if (co == "spendtrade") {
       _spendtradecommand(pa)
       return
    } 
    const dialogDemo = C.getconfirmdialog()
	dialogDemo.openDialog = function(e) {
		   this.$.dialog.open()
    }
    dialogDemo.confirm = e => C.executeC(co,pa)
	dialogDemo.dismiss = e => {}
	dialogDemo.message = question
	dialogDemo.openDialog()
  },

//  dialog-command-alert

   dialogexecutefailure : function(message) {
      dialogalert("dialog-command-failure",message)
   },

   showeleme :function (e,show) {
      if (show) C.removeattr(e,"hidden")
      else e["hidden"] = true
    },

    displayelem : function(e, display) {
      if (display) e.style.display = 'block'
      else e.style.display = 'none'
    },

    displaybadge : function(e,number) {
      if (number <= 1) C.showeleme(e,false)
      else {      
        C.showeleme(e,true)
        e.updatePosition()
        e.label = number
      }
    },

   disableleme :function (e,disable) {
      if (disable) C.setattr(e,"disabled",true)
      else C.removeattr(e,"disabled")
    },

    showelem : function(id,show) {
      const x = _getxapp()
      const e = x.shadowRoot.getElementById(id)
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
      var gamese = findbytag("civ-games")
      var civse = findbytag("civ-content")
      var civjoin = findbytag("civ-join")
      if (what == 0 || what == 2 || what == 3) C.setattr(civse,"listofciv","")
      if (what == 0 || what == 1 || what == 3) C.setattr(gamese,"listofgames","")
      if (what == 0 || what == 1 || what == 2) C.setattr(civjoin,"listofjoins","")
      if (what == 0) showhideclosebuttuon(true)
      else showhideclosebuttuon(false)
    } ,

    getlistofcivs : function() {
      var civse = findbytag("civ-content")
      return civse.listofciv
    } ,

    getlistofgames : function() {
      var gamese = findbytag("civ-games")
      return gamese.listofgames
    } ,
    
    getgamestate : function() {
      const b = findbytag("civ-gamestate")
      return b
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

    getitemizedcommand : function() {
         return this.getyouplay().itemizedcommand
      },

    setyouplayparam : function(attr,value) {
       this.getyouplay()[attr] = value
    },
    
    getyouplay : function() {
      var y = _getxapp().$.youplay
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
       _getxapp()["jsboard"] = jsboard      
    },
    
    getjsboard : function() {
       return _getxapp()["jsboard"]
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
      const d = x.$.opponentplay
      C.showeleme(d,!close)
    },
    
    setColorForCity : function(e,city,color) {
      city = city.toLowerCase()
      var sha = e.shadowRoot
      var st = sha.styleSheets
      var rule = st[0]
      var a = rule.cssRules
      for (var i = 0; i<a.length; i++) {
        var s = a[i]
        var sel = s.selectorText
        var inde = sel.search(city)
        if (inde > 0) {
           s.style.backgroundColor = color
           return;
        }
      }
    }

  }  // return
 } // function

)();
