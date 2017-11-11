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
	    
	    static get observers() {
	        return [
	        'refresh(data)'
	        ]
	      }

	        
       openIt(data) {
           this.data = data
           this.$.dialog.open()
       }   
  	  
     	noCancelOnOutsideClick() {
     	   this.$.dialog.noCancelOnOutsideClick = true
  	    }
       
       closeIt() {
           this.$.dialog.close()
       }    
       
       opened() {
    	   return this.$.dialog.opened
       }
       
       refresh(data) {}
       
       refreshdata(data) {
    	   this.data = data
       }
   }   
}
