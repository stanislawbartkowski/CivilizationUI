const JM = {

    _addmess(mess,key,num) {
      if (num == 0) return mess
      const m = C.localize(key,"num",""+num)
      if (mess == "") return m
      else return mess + " " + m
     },

    _numberoffigures(elem) {
      var mess = ""
      mess = this._addmess(mess,"numberofscouts",elem.jparam.param.numberofScouts)
      return this._addmess(mess,"numberofarmies",elem.jparam.param.numberofArmies)
    },
    
    _nprivatemessage(mess,elem) {
      if (elem.jparam != null && elem.jparam.param != null) return mess = mess + " : " + elem.jparam.param
      return mess
    },
    
    _unitdesc(mess,elem) {
      if (elem.jparam == null || elem.jparam.param == null) return mess
      if (mess != null) mess = mess + " : "
      var one = "X"
      var two = "X"
      var three = "X"
      var four = "X"
      if (elem.jparam.param != null && elem.jparam.param.strength != null) {
         one = ""+elem.jparam.param.strength[0]
         two = ""+elem.jparam.param.strength[1]
         three = ""+elem.jparam.param.strength[2]
         four = ""+elem.jparam.param.strength[3]
      }
      return mess + C.localize("unitdesc","type",elem.jparam.param.name,"one",one,"two",two,"three",three,"four",four)
    },

    _doaction(elem) {
      const aid = elem.param[0].toLowerCase()      
      var mess = CC.getcommanddecr(aid)
      switch (aid) {
        case "endofphase" : 
           mess = mess + " : " + C.getphasedescr(elem.phase)
           break
        case "greatperson" :
        case "culturecard" :
           mess = this._nprivatemessage(mess,elem)
           break       
        case "greatpersonput": 
           mess = C.localize("placegreatperson","greatperson",elem.jparam.param.greatperson)
           break
        case "spendtrade" :
          mess = mess + " : " + elem.jparam.param
          break  
        case "buybuilding" :
          mess = mess + " : " + elem.jparam.param.building                   
          break
        case "startmove" :
          mess = mess + " : " + this._numberoffigures(elem)
          break     
        case "revealtile" :
          mess = mess + " : " + C.localize("revealedtiledirection","dir",elem.jparam.param)
          break  
        case "increasetrade" :
          mess = C.localize("increasetradebynumb","num",""+elem.jparam.param)
          break                
        case "playunit" :
          mess = C.localize("playunitcol","col",""+elem.jparam.p.col)
          break
        case "takeunit" :
          mess = this._unitdesc(mess,elem)
          break                          
        default: 
          if (C.emptyS(mess)) mess = aid;
          break
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
        mess = elem.id
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