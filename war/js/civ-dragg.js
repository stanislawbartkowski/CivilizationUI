// not a module
// global value, used in battle for grabbing and dropping units
const CivUnitsDraggable = {
  startu: null,
  callback: null,
  isironon: null,

  registerCallBack(c) {
    this.callback = c;
  },

  ondragStart: function (e) {
    const u = this.lookforel(e, "CIV-UNITS");
    const b = this.lookforel(e, "CIV-BATTLESIDE");
    this.startu = null;
    this.isironon = b.isironon();
    if (u == null) return;
    if (u != null && u.you != null) this.startu = u;
    e.dataTransfer.effectAllowed = 'move';
  },
  // drag
  findf: function (ev) {
    const u = this.lookforel(ev, "CIV-FRONTUNIT");
    if (u != null && u.you != null && u.data == null) return u;
    return null;
  },
  ondragEnter: function (ev) {
    if (this.startu == null) return;
    const u = this.findf(ev);
    ev.preventDefault();

    if (u != null) {
      if (!u.turn) return;
      u.setAttribute("highlight", 1);
    }
  },
  eqb: function (y) {
    if (y == null) return false;
    if (this.startu == null || this.startu.you == null) return false;
    return this.startu.you == y;
  },
  ondragDrop: function (ev) {
    ev.preventDefault();
    this.switchoffallfront(event);
    if (this.startu == null) return;
    const u = this.findf(ev);
    if (!u.turn) return;

    if (this.eqb(u.you)) {
      const c = {};
      c.startnum = this.startu.num;
      c.destnum = u.num;
      c.you = u.you;
      c.isironon = this.isironon;
      if (this.callback != null) this.callback(c);
    }

    this.startu = null;
  },
  lookforel: function (e, tagname) {
    if (e == null) {
      C.log("lookforel " + tagname + " e undefined");
      return null;
    }

    const pa = e.path;

    for (var i = 0; i < pa.length; i++) {
      const u = pa[i];
      const t = u.tagName;
      if (t != null && t.toUpperCase() == tagname.toUpperCase()) return u;
    } //for


    return null;
  },
  switchoffallfront: function (e) {
    const ba = this.lookforel(e, "civ-battleside");
    if (ba == null) return;
    ba.switchoff();
  }
};
