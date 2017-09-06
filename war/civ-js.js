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
	  
  function setattr(e,attr,value) {
     e.setAttribute(attr,value)
  };
  
  function removeattr(e,attr) {
    e.removeAttribute(attr)
  };      	  

  function showeleme (e,show) {
      if (show) removeattr(e,"hidden")
      else e["hidden"] = true      
  };
  
  // TODO: remove ? 
  function showelembytag(tag,show) {
      var e = findbytag(tag)
      showeleme(e,show)      
    };
    
  function findbytag(tag) {
      var ee = window.findbytag(tag)
      return ee
    };
    
  // id="close-button"
  function showhideclosebuttuon(show) {
     C.showelem("close-button",show)
  }    

  return {
  
  startgamedialog : function(civ) {
	const dialogDemo = document.getElementById("dialog-demo")
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
    var gameid = e.gameid
    var civ = e.civ[0]
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
  
 joindialog : function(civ) {
	const dialogDemo = document.getElementById("join-dialog")
	dialogDemo.openDialog = function(e) {
	    this.$.dialog.civname = civ
	    var c = JSON.parse(C.getlistofcivs())
	    this.$.dialog.lines = c
		this.$.dialog.openIt()
	}
//	dialogDemo.confirm = e => C.leavegame()
//	dialogDemo.dismiss = e => {}
//	dialogDemo.message = "Do you want to leave the game ? You can resume the game later."
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
          
    showelem : function(id,show) {
      var x = this.getxapp()
      var e = x.shadowRoot.getElementById(id)
      showeleme(e,show)
    } ,


    // what = 1 show civs (switch off the rest)
    //      = 2 show games (switch off the test)
    //      = 3 show joins
    //      = 0 switch off all       
    showcivorgames : function(what) {
      var gamese = findbytag("civ-games")
      var civse = findbytag("civ-content")
      var civjoin = findbytag("civ-join")
      if (what == 0 || what == 2 || what == 3) setattr(civse,"listofciv","")
      if (what == 0 || what == 1 || what == 3) setattr(gamese,"listofgames","")
      if (what == 0 || what == 1 || what == 2) setattr(civjoin,"listofjoins","")
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
    
    leavegame : function() {
      window.leavegame()
    },
    	  
    emptyS : function(s) { return s == null || s == "" } 
  
  }  // return
 } // function
 
)();