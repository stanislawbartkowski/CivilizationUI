import { Polymer } from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js";

Polymer({
  is: 'civ-join',
  properties: {
    listofjoins: {
      type: String,
      value: undefined
    }
  },
  observers: ['_render(listofjoins)'],
  ready: function () {
    this.style.display = 'block';
  },
  _render: function (listofjoins) {
    this.innerHTML = "";
    if (C.emptyS(listofjoins)) return;
    var a = JSON.parse(listofjoins);
    var html = '';

    for (var i = 0; i < a.length; i++) {
      html += "<p><civ-joingame index=\"" + i + "\"></civ-joingame></p>";
      this.innerHTML = html;
    }
  }
});
