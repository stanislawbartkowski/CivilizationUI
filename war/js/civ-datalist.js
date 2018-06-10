Polymer.CivDataList = function(superClass) {

    return class extends Polymer.CivData(superClass) {

	    constructor() {
	      super();
	    }

      static get properties() {
          return {
              res : {
                  type: Array
              },
              choosed : {
                type : Object
              }
          }
      }

      getRes() {
     	 if (this.res == null) return []
     	 return this.res
      }

      getChoosed() {
        return this.choosed
      }

      setChoosed(choosed) {
        this.choosed = choosed
      }

      funmap(cc,pa) {
         const id = cc.id
         cc.fun = d => this.fun(d,id)
      }

      refreshmap(pa,id) {
        this.res = pa
        if (this.fun == null) return
        this.elemmap = id
      }

     // --------------------------
     // choose from list
     // --------------------------

      _clicked(p) {
        C.displayelem(this.$.choosed,true)
        this.$.choosed.draw(p)
        this.setChoosed(p)
        if (this.fun != null) this.fun(p)
      }

      refreshchooselist(data) {
         if (data == null) return
         this.refreshalways = true
         this.$.resources.fun = e => this._clicked(e)
         super.drawlistorempty(data)
         this.setChoosed(null)
         C.displayelem(this.$.choosed,false)
         if (data.length== 1)
          C.sleep().then(
             () => { this._clicked(data[0]) }
          )
      }

   }
}
