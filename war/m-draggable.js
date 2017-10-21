Polymer.DialDraggable = function(superClass) {

	  return class extends Polymer.mixinBehaviors([Polymer.GestureEventListeners], superClass) {

	    constructor() {
	      super();
	    }

	    static get properties() {
	        return {
	          startx: {
	            type : Number
	          },
            starty: {
	            type : Number
	          },
            dragstarted: {
	            type : Boolean
	          }
	        }
	    }

      ready() {
        super.ready()
        this.$.dialog.setAttribute("draggable","true")
        Polymer.Gestures.addListener(this, 'track', e => this.handleTrack(e));
      }

      handleTrack(e) {
        switch(e.detail.state) {
          case 'start':
            this.startx = e.detail.x
            this.starty = e.detail.y
            this.dragstarted = true
            break;
          case 'track':
            break;
          case 'end':
            if (this.dragstarted == null || !this.dragstarted) return
            this.dragstarted = false
            const diffx = e.detail.x - this.startx
            const diffy = e.detail.y - this.starty
            const top = parseInt(this.$.dialog.style.top)
            const left = parseInt(this.$.dialog.style.left)
            this.$.dialog.style.top = (top + diffy) + "px"
            this.$.dialog.style.left = (left + diffx) +"px"
            break;
        }
      }

   }
}
