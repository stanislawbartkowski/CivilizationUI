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
   }
}
