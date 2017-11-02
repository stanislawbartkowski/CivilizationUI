Polymer.CivData = function(superClass) {

	  return class extends Polymer.CivLocalize(superClass) {

	    constructor() {
	      super();
	    }
	    
	    static get properties() {
	        return {
	          data: {
	        	type : Object  
              },
              datas: {
            	  type : String
              },
              data1: {
                type : Object  
              }
	        }
	    }	        
	    
	    static get observers() {
	        return [
	        'refreshs(datas)',
	        'refresh(data)',
            'refresh1(data1)'
	        ]
	      }
    
      refreshs(datas) {
	      this.data = JSON.parse(datas);
	   }
      
       draw(data) {
    	   this.data = data
       }
       
       draw1(data) {
           this.data1 = data
       }
   }   
}
