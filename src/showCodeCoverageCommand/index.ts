import { window } from 'vscode';

import decorationsFor from './decorations';

const performCommand = () => {
  try {
    decorationsFor(window.visibleTextEditors)
      .forEach(({ editor, decorationType, decorationOptions }) => 
        editor.setDecorations(decorationType, decorationOptions)
      );
  }
  catch(e) {
    window.showErrorMessage(e.message);
  }
};

export default performCommand;
