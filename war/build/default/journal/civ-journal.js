import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class JournalCiv extends CivData(PolymerElement) {
  static get template() {
    return html`
        <template id="map" is="dom-repeat" items="{{res}}">
                <civ-journalline data="{{item}}"></civ-journalline>
        </template>
    `;
  }

  refresh(data) {
    this.res = [];
    if (data == null) return;

    for (var i = data.length - 1; i >= 0; i--) this.res.push(data[i]);

    this.$.map.render();
  }

}

window.customElements.define("civ-journal", JournalCiv);