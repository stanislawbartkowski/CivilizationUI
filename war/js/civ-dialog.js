Polymer.CivDialog = function(superClass) {

    return class extends Polymer.CivData(superClass) {

	    constructor() {
	      super();
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
       
       drawlistorempty(data) {
         const r = this.$.resources
         const e = this.$.empty
         if (data.length == 0) {
             C.displayelem(r,false)
             C.displayelem(e,true)
         } else {
           C.displayelem(e,false)
           C.displayelem(r,true,true)
           r.draw(data)
         }
       }       
   }   
}
