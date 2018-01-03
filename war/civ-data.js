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
      
       draw(data) {
//           if (!this._different(this.data,data)) return
    	   this.data = data
//    	   this.refresh(data)
       }
       
       draw1(data) {
//           if (!this._different(this.data1,data)) return
           this.data1 = data
//           this.refresh1(data)
       }
   }   
}
