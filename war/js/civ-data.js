import { CivLocalize} from "../js/civ-localize.js";

export const CivData = function (superClass) {
  return class extends CivLocalize(superClass) {
    constructor() {
      super();
    }

    static get properties() {
      return {
        data: {
          type: Object,
          observer: 'drawset'
        },
        fun: {
          type: Object
        },
        refreshalways: {
          type: Boolean,
          value: true
        },
        header: {
          type: String,
          value: null
        },
        command: {
          type: String
        },
        res: {
          type: Array
        },
        wasdrawset : {
        	type :Boolean
        }
      };
    }

    _different(thisdata, data) {
      if (this.refreshalways) return true;
      if (thisdata == null && data == null) return false;
      if (thisdata == null) return true;
      if (data == null) return true;
      var differences = DeepDiff.diff(thisdata, data);
      return differences != null;
    }

    drawset(newdata, olddata) {
      this.wasdrawset = true
      if (this.refresh == null) return;
      if (!this._different(newdata, olddata)) return;
      this.refresh(newdata);
    }

    setHeader(title) {
      this.header = title;
    }

    setCommand(command) {
      this.command = command;
    }

    getCommand() {
      return this.command;
    } // only if you do not need this


    runmap(data, elemmap, funmap) {
      C.sleep().then(() => {
        const s = this.$.map;

        for (var i = 0; i < s.childNodes.length; i++) {
          const cc = s.childNodes[i];

          if (cc.nodeName == elemmap.toUpperCase()) {
            funmap(cc, data);
          }
        } // for

      });
    } // the copy of the previus one, use this


    _drawmap(data) {
      if (this.funmap == null || this.elemmap == null) return;
      C.sleep().then(() => {
        const s = this.$.map;

        for (var i = 0; i < s.childNodes.length; i++) {
          const cc = s.childNodes[i];

          if (cc.nodeName == this.elemmap.toUpperCase()) {
            this.funmap(cc, data);
          }
        } // for

      });
    }

    draw(data) {
      this.wasdrawset = false
      this.data = data
      if (!this.wasdrawset) this.drawset(data,data)

      this._drawmap(data);

      if (this.afterdraw != null) C.sleep().then(() => {
        this.afterdraw(data);
      });
    }

    drawlistorempty(data) {
      const r = this.$.resources;
      const e = this.$.empty;

      if (data.length == 0) {
        C.displayelem(r, false);
        C.displayelem(e, true);
      } else {
        C.displayelem(e, false);
        C.displayelem(r, true, true);
        r.draw(data);
      }
    }

  };
};
