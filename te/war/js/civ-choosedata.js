Polymer.CivChooseData = function(superClass) {

	return class extends Polymer.CivData(Polymer.GestureEventListeners(Polymer.Element)) {

		static get properties() {
			return {
				disa : {
					type : Boolean
				}
			}
		}

		constructor() {
			super();
			Polymer.Gestures.addListener(this, 'tap', () => this.handleClick());
		}

		setDisa(disa) {
			this.disa = disa
		}

		handleClick() {
			if (this.disa) return
			if (this.fun == null) return
			this.fun(this.data)
		}

	}
}
