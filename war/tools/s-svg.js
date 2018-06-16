/**
@license
Copyright (c) 2016 The StartPolymer Project Authors. All rights reserved.
This code may only be used under the MIT License found at https://github.com/StartPolymer/license
The complete set of authors may be found at https://github.com/StartPolymer/authors
The complete set of contributors may be found at https://github.com/StartPolymer/contributors
*/
import { Polymer } from "../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js";
import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { dom } from "../node_modules/@polymer/polymer/lib/legacy/polymer.dom.js";
Polymer({
  _template: html`
<style>

:host {
  display: inline-block;
  width: 100%;
  height: 100%;
}

/*
path {
  @apply(--s-svg-path);
}
*/

</style>
`,
  is: 's-svg',
  properties: {
    fill: {
      type: String,
      value: null
    },
    src: {
      type: String,
      value: null
    }
  },
  observers: ['_srcChanged(src, isAttached)', 'changecolor(fill)'],

  /**
   * Get the image and displays it.
   */
  changecolor: function (fill) {
    if (fill == null || fill == "") return;
    this.style.fill = fill;
  },
  display: function (display) {
    C.displayelem(this, display, true);
    const s = C.getShadow(this);
    const svg = s.firstElementChild;
    C.displayelem(svg, display, true);
  },
  _srcChanged: function (src, isAttached) {
    // Get SVG file content.
    if (src && isAttached) {
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var responseText = xhr.responseText;
          if (this.fill != null && this.fill != "") responseText = responseText.replace(/fill=\"[\s\S]*?\"/ig, 'fill=\"' + this.fill + '\"');
          if (this.style != null && this.style.cssText != null && this.style.cssText != "") responseText = responseText.replace(/style=\"[\s\S]*?\"/i, 'style=\"' + this.style.cssText + '\"');
          var svg = new DOMParser().parseFromString(responseText, 'application/xml').documentElement; // Remove previous SVG.

          if (dom(this.root).firstChild) {
            dom(this.root).removeChild(dom(this.root).firstChild);
          } // Update the view.


          dom(this.root).appendChild(svg.cloneNode(true));
          this.fire('s-svg-load');
        }
      }.bind(this);

      xhr.open('GET', src, true);
      xhr.send();
    }
  }
});