Polymer.CivDataList = function(superClass) {

    return class extends Polymer.CivData(superClass) {

	    constructor() {
	      super();
	    }

      getRes() {
     	 if (this.res == null) return []
     	 return this.res
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

   }
}
