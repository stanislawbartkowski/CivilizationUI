import { html } from "../node_modules/@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "../node_modules/@polymer/polymer/polymer-element.js";

class PaperAlertDialog extends PolymerElement {
  static get template() {
    return html`
    <paper-dialog id="dialog" opened="{{opened}}" modal>
      <h2 hidden$="[[!title]]">[[title]]</h2>
      <p><slot></slot></p>
      <div class="buttons">
        <paper-button dismiss hidden$="[[!dismissButton]]" on-tap="_tapDismiss">[[dismissButton]]</paper-button>
        <paper-button confirm autofocus on-tap="_tapConfirm">[[confirmButton]]</paper-button>
      </div>
    </paper-dialog>
`;
  }

  static get is() {
    return 'paper-alert-dialog';
  }
  /**
   * Fired when the user clicks on the confirm button
   *
   * @event confirm
   */

  /**
   * Fired when the user clicks on the dismiss button
   *
   * @event dismiss
   */


  static get properties() {
    return {
      /**
       * Title of the alert dialog
       */
      // XXX: This one conflicts with the HTML5 attribute of the same name, confusing polylint
      title: {
        type: String,
        value: null
      },

      /**
       * Text of the confirm button
       */
      confirmButton: {
        type: String,
        value: 'Confirm'
      },

      /**
       * Text of the dismiss button. The button is not shown if the
       * property is empty.
       */
      dismissButton: String,

      /**
       * True if the dialog is currently opened
       */
      opened: {
        true: Boolean,
        notify: true
      }
    };
  }

  // Public methods

  /**
  * Opens the alert dialog
  */
  open() {
    this.$.dialog.open();
  }
  /**
  * Closes the alert dialog
  */


  close() {
    this.$.dialog.close();
  }
  /**
   * Closes the alert dialog
   */
  // Private methods


  _tapDismiss() {
    this.close();
    this.$.dialog.fire('dismiss');
  }

  _tapConfirm() {
    this.close();
    this.$.dialog.fire('confirm');
  }

}

;
customElements.define(PaperAlertDialog.is, PaperAlertDialog);