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
            const locales = C.getBaseURL() + "/locales.json"
//            this.loadResources(this.resolveUrl('/CIvilizationUI/locales.json'));
            this.loadResources(locales)
	    }
        
   }   
}