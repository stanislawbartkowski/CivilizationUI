Polymer.CivDialog = function(superClass) {

    return class extends Polymer.CivLocalize(superClass) {

	    constructor() {
	      super();
	    }
	    
	    static get properties() {
	        return {
	          data: {
	        	type : Object  
              }
	        }
	    }	        
	        
       openIt(data) {
           this.data = data
           this.$.dialog.open()
       }   
  	  
     	noCancelOnOutsideClick() {
     	   this.$.dialog.noCancelOnOutsideClick = true
  	    }
       
       closeIt() {
           this.$.dialog.close();
       }       
   }   
}
