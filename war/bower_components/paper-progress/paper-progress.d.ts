/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   paper-progress.html
 */

/// <reference path="../polymer/types/polymer.d.ts" />
/// <reference path="../iron-flex-layout/iron-flex-layout.d.ts" />
/// <reference path="../iron-range-behavior/iron-range-behavior.d.ts" />
/// <reference path="../paper-styles/color.d.ts" />

/**
 * Material design: [Progress & activity](https://www.google.com/design/spec/components/progress-activity.html)
 *
 * The progress bars are for situations where the percentage completed can be
 * determined. They give users a quick sense of how much longer an operation
 * will take.
 *
 * Example:
 *
 *     <paper-progress value="10"></paper-progress>
 *
 * There is also a secondary progress which is useful for displaying intermediate
 * progress, such as the buffer level during a streaming playback progress bar.
 *
 * Example:
 *
 *     <paper-progress value="10" secondary-progress="30"></paper-progress>
 *
 * ### Styling progress bar:
 *
 * To change the active progress bar color:
 *
 *     paper-progress {
 *        --paper-progress-active-color: #e91e63;
 *     }
 *
 * To change the secondary progress bar color:
 *
 *     paper-progress {
 *       --paper-progress-secondary-color: #f8bbd0;
 *     }
 *
 * To change the progress bar background color:
 *
 *     paper-progress {
 *       --paper-progress-container-color: #64ffda;
 *     }
 *
 * Add the class `transiting` to a paper-progress to animate the progress bar when
 * the value changed. You can also customize the transition:
 *
 *     paper-progress {
 *       --paper-progress-transition-duration: 0.08s;
 *       --paper-progress-transition-timing-function: ease;
 *       --paper-progress-transition-delay: 0s;
 *     }
 *
 * To change the duration of the indeterminate cycle:
 *
 *     paper-progress {
 *       --paper-progress-indeterminate-cycle-duration: 2s;
 *     }
 *
 * The following mixins are available for styling:
 *
 * Custom property                                  | Description                                 | Default
 * -------------------------------------------------|---------------------------------------------|--------------
 * `--paper-progress-container`                     | Mixin applied to container                  | `{}`
 * `--paper-progress-transition-duration`           | Duration of the transition                  | `0.08s`
 * `--paper-progress-transition-timing-function`    | The timing function for the transition      | `ease`
 * `--paper-progress-transition-delay`              | delay for the transition                    | `0s`
 * `--paper-progress-container-color`               | Color of the container                      | `--google-grey-300`
 * `--paper-progress-active-color`                  | The color of the active bar                 | `--google-green-500`
 * `--paper-progress-secondary-color`               | The color of the secondary bar              | `--google-green-100`
 * `--paper-progress-disabled-active-color`         | The color of the active bar if disabled     | `--google-grey-500`
 * `--paper-progress-disabled-secondary-color`      | The color of the secondary bar if disabled  | `--google-grey-300`
 * `--paper-progress-height`                        | The height of the progress bar              | `4px`
 * `--paper-progress-indeterminate-cycle-duration`  | Duration of an indeterminate cycle          | `2s`
 */
interface PaperProgressElement extends Polymer.Element, Polymer.IronRangeBehavior {

  /**
   * The number that represents the current secondary progress.
   */
  secondaryProgress: number|null|undefined;

  /**
   * The secondary ratio
   */
  readonly secondaryRatio: number|null|undefined;

  /**
   * Use an indeterminate progress indicator.
   */
  indeterminate: boolean|null|undefined;

  /**
   * True if the progress is disabled.
   */
  disabled: boolean|null|undefined;
  hostAttributes: object|null;
  _toggleIndeterminate(indeterminate: any): void;
  _transformProgress(progress: any, ratio: any): void;
  _mainRatioChanged(ratio: any): void;
  _progressChanged(secondaryProgress: any, value: any, min: any, max: any, indeterminate: any): void;
  _disabledChanged(disabled: any): void;
  _hideSecondaryProgress(secondaryRatio: any): any;
}

interface HTMLElementTagNameMap {
  "paper-progress": PaperProgressElement;
}
