import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import { GestureEventListeners } from "../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";
import { CivData } from "../js/civ-data.js";

class CivBuldingInfo extends CivData(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
<custom-style>

<style is="custom-style">

:host {
    display: inline-block;
    width: 60px;
    vertical-align: top;
  }

.header {
  background-color : #f1e8e8
}

.name {
  font-size : 70%
}

.cost {
}

:host([disa]) {
  background-color : #afa7a7
}

</style>

</custom-style>

<div>
  <div class="header name">{{localize(b.name)}}</div>
  <div class="header cost">{{localize('cost')}}&nbsp;:&nbsp;{{b.cost}}</div>
  <civ-square id="sq"></civ-square>
</div>
`;
  }

  constructor() {
    super();
    addListener(this, 'tap', () => this.handleClick());
  }

  handleClick() {
    const na = this.b.name;
    if (this.fun != null) this.fun(na);
  }

  static get is() {
    return 'civ-buildinginfo';
  }

  static get properties() {
    return {
      b: {
        type: Object
      },
      click: {
        type: Object,
        value: null
      }
    };
  }

  refresh(data) {
    const s = {};
    s.terrain = "";
    s.building = data;
    this.b = C.findBuilding(data);
    const sq = this.$.sq;
    sq.draw(s);
  }

}

customElements.define(CivBuldingInfo.is, CivBuldingInfo);