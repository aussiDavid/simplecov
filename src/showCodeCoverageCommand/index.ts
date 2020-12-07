import {
  TextEditor,
  window,
  TextEditorDecorationType,
  DecorationOptions,
} from 'vscode';

import decorations from './decorations';

const editors = (): TextEditor[] => window.visibleTextEditors;

const performCommand = () => {
  try {
    decorations(
      editors(),
      (
        editor: TextEditor,
        decorationType: TextEditorDecorationType,
        decorationOptions: DecorationOptions[]
      ) => editor.setDecorations(decorationType, decorationOptions)
    );
  
  }
  catch(e) {
    window.showErrorMessage(e.message);
  }
};

export default performCommand;
