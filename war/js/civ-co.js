const CO = {

   endofphase() {
      C.setcurrentcommand(null)
      const g = C.getjsboard().board.game
      const phase = g.phase
      const y = C.you() // do not ask if no more commands

      if (y.commands.length == 1) {
        C.executeEndOfPhase()
        return;
      }

      var actions = null;

      for (var i = 0; i < y.commands.length; i++) {
        const id = y.commands[i].command.toLowerCase();
        if (id == "endofphase") continue;

        var name = CC.getcommanddecr(id)

        if (actions == null) actions = name;
        else actions = actions + ", " + name;
      }

      const labelphase = C.getphasedescr(phase);
      C.confexecutedialog(C.localize("doyouwantendquestion", "phase", labelphase, "actions", actions), "endofphase", -1, -1, phase);
   },
  
   _buyunitdialog(data) {
      C.opendialogwithpar("civ-buyunitdialog", data);
   },
    
   buyunits(y) {
      const da = [];

      for (var j = 0; j < C.unittypes().length; j++) {
        const p = {
          "name": C.unittypes()[j],
          "num": 0
        };

        for (var i = 0; i < y.commands.length; i++) {
          const command = y.commands[i];
          var id = command.command.toLowerCase();
          if ("buy" + p.name == id) p.num = 1;
        }

        da.push(p);
      }

      // do not use this
      CO._buyunitdialog({
        "units": da
      });
   },
   
   endofmove() {
      C.setcurrentcommand(null)
      C.confexecutedialog(C.localize("doyouwantfinishmovequestion"), id, -1, -1, null);
   },
   
   technologyaction(y) {
      C.opendialogwithpar("civ-technologyaction", y);
    },
    
    executedirect(y,command) {
      C.executeC(command)
    }
  
}