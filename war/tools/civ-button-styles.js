const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');
$_documentContainer.innerHTML = `<dom-module id="civ-paper-button-styles">
  <template>
    <style>

 paper-icon-button[hidden] {
       display: none;
 }

  paper-button.pink {
    color: var(--paper-pink-a200);
    --paper-button-ink-color: var(--paper-pink-a200);
  }
  paper-button.pink:hover {
    background-color: var(--paper-pink-100);
  }

  paper-button.pink {
    color: var(--paper-pink-a200);
    --paper-button-ink-color: var(--paper-pink-a200);
  }

  paper-button.pink:hover {
    background-color: var(--paper-pink-100);
  }

  paper-button.indigo {
    background-color: var(--paper-indigo-500);
    color: white;
    --paper-button-raised-keyboard-focus: {
      background-color: var(--paper-pink-a200) !important;
      color: white !important;
    };
  }

  paper-button.indigo:hover {
    background-color: var(--paper-indigo-400);
  }

  paper-button.green {
    background-color: var(--paper-green-500);
    color: white;
  }

  paper-button.green[active] {
    background-color: var(--paper-red-500);
  }

  paper-button.disabled {
    color: white;
  }

  hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 0;
        padding: 0;
  }


  /* ---------- */
  .actionbox {
     margin-left: 5px;
     margin-top: 2px;
     border:1px ridge gray ;
     display: block;
     border-radius: 5px;
     width: 90%;
  }

  .notimplemented {
       position:absolute;
       bottom : 5px;
       right : 5px;
       height:15px;
     }

    /* --- buildings */

   .building {
       display: inline-block;
       border: 1px solid;
       border-radius: 5px;
       padding : 2px;
    }
    
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }

   </style>
  </template>
</dom-module>`;
document.head.appendChild($_documentContainer.content);