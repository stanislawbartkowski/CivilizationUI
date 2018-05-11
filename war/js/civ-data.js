Polymer.CivData = function(superClass) {

	  return class extends Polymer.CivLocalize(superClass) {

	    constructor() {
	      super();
	    }

	    static get properties() {
	        return {
	          data: {
	        	type : Object,
                observer: 'drawset'
              },
              datas: {
            	  type : String
              },
              data1: {
                type : Object,
                observer: 'draw1set'
              },
              fun : {
                type : Object
              }
	        }
	    }

	    static get observers() {
	        return [
	        'refreshs(datas)'
	        ]
	      }

      refreshs(datas) {
          if (datas == "") this.data = null
	      else this.data = JSON.parse(datas);
	   }

	   _different(thisdata,data) {
	      if (thisdata == null && data == null) return false
	      if (thisdata == null) return true
	      if (data == null) return true
	      var differences = DeepDiff.diff(thisdata, data);
	      return (differences != null)
	   }

	   drawset(newdata,olddata) {
	       if (this.refresh == null) return
           if (!this._different(newdata,olddata)) return
           this.refresh(newdata)
	   }

       draw1set(newdata,olddata) {
           if (!this._different(newdata,olddata)) return
           this.refresh1(newdata)
       }

	 _drawmap(data) {
		if (this.funmap == null || this.elemmap == null) return
		C.sleep(500).then(
		 () => {
			const s = this.$.map
		    for (var i=0; i < s.childNodes.length; i++) {
			  const cc = s.childNodes[i]
			  if (cc.nodeName == this.elemmap.toUpperCase()) {
				 this.funmap(cc,data)
		      }
            } // for
		 }
		)
     }

     draw(data) {
    	   this.data = data
	       this._drawmap(data)
    	   if (this.afterdraw != null)
             C.sleep(500).then(
                () => {
                   this.afterdraw(data)
                   }
             )
       }

       draw1(data) {
			   this.data1 = data
       }
   }
}