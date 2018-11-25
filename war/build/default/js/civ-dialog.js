import { CivData } from "./civ-data.js";
import { DialDraggable } from "./m-draggable.js";
import { CivNonDraggableDialog } from "./civ-nondraggabledialog.js";
export const CivDialog = function (superClass) {
  return class extends CivData(DialDraggable(CivNonDraggableDialog(superClass))) {
    constructor() {
      super();
    }

  };
};