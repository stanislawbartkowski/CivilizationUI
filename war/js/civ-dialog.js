import { CivData} from "../js/civ-data.js";
import { DialDraggable } from "../js/m-draggable.js";
import { CivNonDraggableDialog } from "../js/civ-nondraggabledialog.js";

export const  CivDialog = function (superClass) {
  return class extends CivData(DialDraggable(CivNonDraggableDialog(superClass))) {
    constructor() {
      super();
    }

  };
};
