import { Polymer } from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js";

Polymer({
  is: 'civ-games',
  properties: {
    listofgames: {
      type: String,
      value: undefined
    }
  },
  observers: ['_render(listofgames)'],
  ready: function () {
    this.style.display = 'block';
  },
  _render: function (listofgames) {
    this.innerHTML = "";
    if (C.emptyS(listofgames)) return;
    var a = JSON.parse(listofgames);
    var html = '';

    for (var i = 0; i < a.length; i++) {
      html += "<p><civ-gameline index=\"" + i + "\"></civ-gameline></p>";
    }

    this.innerHTML = html;
  }
});
