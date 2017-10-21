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
              }
	        
	        }
	    }	        
	    
	    static get observers() {
	        return [
	        'refreshs(datas)',
	        'refresh(data)',
	        ]
	      }
    
      refreshs(datas) {
	      this.data = JSON.parse(datas);
	   }
      
       draw(data) {
    	   this.data = data
       }
   }   
}
