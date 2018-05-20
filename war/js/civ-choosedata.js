Polymer.CivChooseData = function(superClass) {

    return class extends Polymer.CivData(Polymer.GestureEventListeners(Polymer.Element)) {

	    constructor() {
	      super();
        Polymer.Gestures.addListener(this, 'tap', () => this.handleClick());
	    }

      handleClick() {
        if (this.fun == null) return
        this.fun(this.data)
      }

   }
}
