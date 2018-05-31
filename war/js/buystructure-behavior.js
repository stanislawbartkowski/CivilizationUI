Polymer.BuyStructure = function(superClass) {

    return class extends Polymer.CivDialog(Polymer.DialDraggable(superClass)) {

        constructor() {
          super();
        }

      static get properties() {
          return {
              refreshalways: {
                  type : Boolean,
                  readOnly : true,
                  value : true
              },
              reservecommand : {
                  type : String,
                  value : null
              }
            }
         }

      setParameters(buildcommand,reservecommand) {
          this.reservecommand = reservecommand
          this.$.choose.setBuildCommand(buildcommand,this.nameid)
      }
      
      _clickedgreat(g) {
          const res = C.getIListOfPointsForName(this.data,this.nameid,g)
          C.setlistofpoints(res)          
          this.$.choose.draw(null)
      }
      
      _onReserve() {
          if (this.reservecommand != null)
              C.executewithconf(null,this.reservecommand.toUpperCase())

          super.closeIt()
      }
            
      _clear() {
          this.$.choose.draw(null)
          C.setlistofpoints(null)
      }
      
      setBuildingPoint(p) {
         this.$.choose.draw(this.data)
         this.$.choose.setPoint(p,this.$.list.getChoosed())
      }
      
      refresh(data) {
         super.noCancelOnOutsideClick()
         this._clear()
         const names = C.getIListOfNames(data,this.nameid)
         const l = this.$.list
         l.fun = g => this._clickedgreat(g)
         const c = this.$.choose
         c.fun = p => super.closeIt()
         l.draw(names)
      }   
      
   } 
}
