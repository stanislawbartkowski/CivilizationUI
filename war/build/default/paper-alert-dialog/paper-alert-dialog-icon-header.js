import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";

class PaperAlertDialogIconHeader extends PolymerElement {
  static get is() {
    return 'paper-alert-dialog-icon-header';
  }

  static get template() {
    return html`
        <style>
            :host {
                display: block;
                text-align: center;
                margin-bottom: 40px;
                @apply --paper-font-display1;
            }

            .icon {
                color: var(--paper-green-500);
                --iron-icon-width: 64px;
                --iron-icon-height: 64px;
            }
        </style>

        <iron-icon icon="[[icon]]" class="icon"></iron-icon>
        <div><slot></slot></div>
`;
  }

  static get properties() {
    return {
      /**
       * The name of the icon to use. The name should be of the form:
       * `iconset_name:icon_name`
       */
      icon: String
    };
  }

}

customElements.define(PaperAlertDialogIconHeader.is, PaperAlertDialogIconHeader);