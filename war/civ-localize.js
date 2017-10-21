Polymer.CivLocalize = function(superClass) {

	  return class extends Polymer.mixinBehaviors([Polymer.AppLocalizeBehavior], superClass) {

	    constructor() {
	      super();
	    }
	    
	    static get properties() {
	        return {
	          language: {
	            value: 'en'
	          }
	        }
	    }	        
	    
        attached() {
            this.loadResources(this.resolveUrl('locales.json'));
	    }
        
   }   
}