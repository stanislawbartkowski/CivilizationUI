const JM = {


    _doaction(elem) {
      const aid = elem.param[0].toLowerCase()      
      var mess = CC.getcommanddecr(aid)
      switch (aid) {
        case "endofphase" : 
           mess = mess + " : " + C.getphasedescr(elem.phase)
           break
        case "greatperson" :
           // add great person name if accessible
           if (elem.jparam != null && elem.jparam.param != null) mess = mess + " : " + elem.jparam.param
           break        
        default: break;
      } 
      return mess
    },

    /**
     *  elem: message entry
     *  elem.id
     *  elem.param,
     *  elem.phase
     *  elem.tech
    **/
    journalMessage(elem) {
      const jdic = C.getjdict()
      const j = jdic[elem.id]
      var mess = ""
      if (j == null) {
        // prepare dirty message
        mess = id
        for (var i = 0; i < elem.param.length; i++)
           mess = mess + " " + elem.param[i]
        return mess
      }
      mess = j
      if (elem.id == "DOACTION") return this._doaction(elem)
      for (var i = 0; i < elem.param.length; i++)
        mess = mess.replace("%" + i + "%",elem.param[i])
      return mess
    }
}