import { CivData} from "../js/civ-data.js";

export const CivNonDraggableDialog = function (superClass) {
  return class extends CivData(superClass) {
    constructor() {
      super()
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
