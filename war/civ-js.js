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

      dialogalert("dialog-command-alert","Cannot " + co + " at this point. Try another point.")
      return null
  };

  function checkarmy(iparam) {
     if (iparam.square.numberofArmies > 0 || iparam.square.numberofScouts > 0) return true
     dialogalert("dialog-command-alert","Neither armies nor scouts here")
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
    dialogalert("dialog-command-alert","Cannot move these figures now. Try another point.")
    return null
  };

  function verifymove(co,iparam,pa) {
     var list = iparam.list.moves
     var i = findpoint(iparam,list)
     if (i != -1) return pa
     dialogalert("dialog-command-alert","Cannot move figures to this point. Try another point.")
     return null
  };

  function verifysetcity(co,iparam,pa) {
     var list = iparam.list
     var i = findpoint(iparam,list)
     if (i == -1) {
           dialogalert("dialog-command-alert","Cannot " + co + " at this point. Try another point.")
           return null
     }
     return pa
  };


  function verifyrevealtile(co,iparam,pa) {
    if (!checkarmy(iparam)) return null
    var list = iparam.list
    if (!eqp(iparam,list.p)) {
       dialogalert("dialog-command-alert","Cannot reveal tile using this figure. Try proper one.")
       return null
    }
    var r = list.tiles[0]
    pa.row = r.p.row
    pa.col = r.p.col
    pa.param = r.orientation
    return pa;
  }

  function verifycommand(co,iparam) {
     var itemized = C.getitemizedcommand()
//     console.log(itemized)
     pa = {}
     pa.row = iparam.row
     pa.col = iparam.col
     pa.param = iparam.param
     if (C.emptyS(itemized)) return pa
     iparam.list = JSON.parse(itemized)
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
  }

  return {

  getconfirmdialog : function() {
    return document.getElementById("dialog-demo")
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
	const dialogDemo = C.getconfirmdialog()
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	dialogDemo.confirm = e => window.chooseciv(civ);
	dialogDemo.dismiss = e => {}
	dialogDemo.message = "Do you want to start new game as " + civ + " ?"
	dialogDemo.openDialog()
  },

  resumedialog : function(index) {
    var li = JSON.parse(C.getlistofgames())
    var e = li[index]
    if (e.civ.length > 1) {
      _resumemultidialog(e)
      return;
    }

    var civ = e.civ[0]
    var gameid = e.gameid
	const dialogDemo = document.getElementById("dialog-demo")
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	dialogDemo.confirm = e => C.resumegame(gameid,civ)
	dialogDemo.dismiss = e => {}
	dialogDemo.message = "Do you want to resume this have as " + civ + " ?"
	dialogDemo.openDialog()
  },

  leavedialog : function() {
	const dialogDemo = document.getElementById("dialog-demo")
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	dialogDemo.confirm = e => C.leavegame()
	dialogDemo.dismiss = e => {}
	dialogDemo.message = "Do you want to leave the game ? You can resume the game later."
	dialogDemo.openDialog()
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

  confexecutedialog : function (question,co,row,col,param) {
    var iparam = {}
    iparam.square = null
    if ((row != -1) && (col != -1)) iparam.square = C.getsquare(row,col)
    iparam.row = window.fixrow(row)
    iparam.col = window.fixcol(col)
    iparam.param = param
    var pa = verifycommand(co,iparam)
    if (pa == null) return
	const dialogDemo = document.getElementById("dialog-demo")
	dialogDemo.openDialog = function(e) {
		this.$.dialog.open()
	}
	if (typeof pa.param == 'string') dialogDemo.confirm = e => window.executecommandS(co.toUpperCase(),pa.row,pa.col,pa.param)
	else dialogDemo.confirm = e => window.executecommand(co.toUpperCase(),pa.row,pa.col,pa.param)
	dialogDemo.dismiss = e => {}
	dialogDemo.message = question
	dialogDemo.openDialog()
  },

//  dialog-command-alert

   dialogexecutefailure : function(message) {
      dialogalert("dialog-command-failure",message)
   },

    getxapp : function() {
       var e = document.getElementsByTagName("x-app")
       return e[0]
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
      C.showeleme(e,true)
      e.label = number
    },

   disableleme :function (e,disable) {
      if (disable) C.setattr(e,"disabled",true)
      else C.removeattr(e,"disabled")
    },

    showelem : function(id,show) {
      var x = C.getxapp()
      var e = x.shadowRoot.getElementById(id)
      C.showeleme(e,show)
    } ,

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

    getlistofjoingames : function() {
       var civjoin = findbytag("civ-join")
       return civjoin.listofjoins
    },

    getcurrentcommand : function() {
        return this.getxapp().currentcommand
      },

    getitemizedcommand : function() {
         return this.getxapp().itemizedcommand
      },

    setxappparam : function(attr,value) {
       this.getxapp()[attr] = value
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
      window.leavegame()
    },

    joingame : function(gameid,civ) {
      window.joingame(gameid,civ)
    },

    emptyS : function(s) { return s == null || s == "" },
    
    color1 : function() { return "Green" },
    color2 : function() { return "Red" },
    
    civtonumb : function(civ) {
      return window.civtonumb(civ)
    },
    
    colorForCiv : function(civ) {
      if (C.civtonumb(civ) == 0) return this.color1()
      return this.color2()
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

    setColorForCity : function(e,civ,city) {
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
           s.style.backgroundColor = C.colorForCiv(civ)
           return;
        }
      }
    }

  }  // return
 } // function

)();
