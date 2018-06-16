import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import {GestureEventListeners} from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { CivData} from "../js/civ-data.js";

export const CivChooseData = function (superClass) {
  return class extends CivData(GestureEventListeners(superClass)) {
    static get properties() {
      return {
        disa: {
          type: Boolean
        }
      };
    }

    constructor() {
      super();
      addListener(this, 'tap', () => this.handleClick());
    }

    setDisa(disa) {
      this.disa = disa;
    }

    handleClick() {
      if (this.disa) return;
      if (this.fun == null) return;
      this.fun(this.data);
    }

  };
};
