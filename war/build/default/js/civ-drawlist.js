import { CivData } from "./civ-data.js";
/**
 * Behavior: dislay list, template
 * map : div enclosing
 * id : template
 */

export const CivDrawList = function (superClass) {
  return class extends CivData(superClass) {
    constructor() {
      super();
    }
    /**
     * Get the current list
    */


    getRes() {
      if (this.res == null) return [];
      return this.res;
    }

    funmap(cc, pa) {
      const id = cc.id;

      cc.fun = d => this.fun(d, id);
    }
    /**
     * Add element to the end of list and refresh display
     *   data : element to add
    */


    addElem(data) {
      if (this.res == null) this.res = [];
      this.res.push(data);
      this.$.list.render();
    }
    /**
     * Reset the list
    */


    clear() {
      this.res = null;
      this.$.list.render();
    }
    /** draw list
     * pa : list to draw
     * elemmap : tag for elemlist
    */


    drawlist(pa, elemmap) {
      this.res = pa;
      this.elemmap = null;
      if (this.fun == null) return;
      this.elemmap = elemmap;
    }

  };
};