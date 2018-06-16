import { AppLocalizeBehavior } from "../node_modules/@polymer/app-localize-behavior/app-localize-behavior.js";
import { mixinBehaviors }      from "../node_modules/@polymer/polymer/lib/legacy/class.js";

export const CivLocalize = function (superClass) {
  return class extends mixinBehaviors([AppLocalizeBehavior], superClass) {

    constructor() {
      super();
    }

    static get properties() {
      return {
        language: {
          value: 'en'
        }
      };
    }

    attached() {
      const locales = C.getBaseURL() + "/locales.json";

      this.loadResources(locales);
    }
}
}
