Polymer.CivDialog = function(superClass) {

    return class extends Polymer.CivData(Polymer.DialDraggable(Polymer.CivNonDraggableDialog(superClass))) {

	    constructor() {
	      super();
	    }
    }

}
