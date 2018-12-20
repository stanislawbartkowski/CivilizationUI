import { CivData} from "../js/civ-data.js";

export const CivNonDraggableDialog = function (superClass) {
  return class extends CivData(superClass) {
    constructor() {
      super()
    }
    
    open() {
      this.$.dialog.open()
    }
    
    setTopLeft(alignleft,alignbottom,height,width) {
      const bott = window.innerHeight
      const righ = window.innerWidth
      var top = 5;
      if (alignbottom) top = bott-height-5 
      var left = 5;
      if (! alignleft) left = righ - width      
      C.setTopLeft(this.$.dialog,top,left)              
    }    

    openIt(data) {
//      this.data = data
      this.$.dialog.open()
      this.draw(data)
    }

    noCancelOnOutsideClick() {
      this.$.dialog.noCancelOnOutsideClick = true
      this.$.noCancelOnEscKey = true
    }

    closeIt() {
      this.$.dialog.close()
    }

    opened() {
      return this.$.dialog.opened
    }
    
    setModal(modal) {
      this.$.dialog.modal = modal
    }

  };
};
