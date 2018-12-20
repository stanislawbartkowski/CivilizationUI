import { mixinBehaviors } from "../node_modules/@polymer/polymer/lib/legacy/class.js";
import { addListener } from "../node_modules/@polymer/polymer/lib/utils/gestures.js";
import {GestureEventListeners} from '../node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';

export const  DialDraggable = function (superClass) {
  return class extends mixinBehaviors([GestureEventListeners], superClass) {
    constructor() {
      super();
    }

    static get properties() {
      return {
        startx: {
          type: Number
        },
        starty: {
          type: Number
        },
        dragstarted: {
          type: Boolean
        },
        finaltop: {
          type : Number	
        },
        finalleft: {
          type : Number
        }        
      };
    }

    ready() {
      super.ready(); //        this.$.dialog.setAttribute("draggable","true")

      addListener(this, 'track', e => this.handleTrack(e));
    }
    
    wasDragged() {
    	return this.finaltop != null && this.finalleft != null
    }
    
    setLastDraggedPos() {
        this.$.dialog.resetFit()
        C.setTopLeft(this.$.dialog,this.finaltop,this.finalleft)
    }

    handleTrack(e) {
      switch (e.detail.state) {
        case 'start':
          this.startx = e.detail.x;
          this.starty = e.detail.y;
          this.dragstarted = true;
          break;

        case 'track':
          break;

        case 'end':
          if (this.dragstarted == null || !this.dragstarted) return;
          this.dragstarted = false;
          const diffx = e.detail.x - this.startx;
          const diffy = e.detail.y - this.starty;
          this.finaltop = parseInt(this.$.dialog.style.top) + diffy;
          this.finalleft = parseInt(this.$.dialog.style.left) +diffx;
          this.setLastDraggedPos()
          break;
      }
    }

  };
};
