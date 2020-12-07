import {
  TextEditor,
  window,
  TextEditorDecorationType,
  DecorationOptions,
} from 'vscode';

import { fileNotFound, path } from './lib/code_coverage_results';
import decorations from './decorations';

const editors = (): TextEditor[] => window.visibleTextEditors;

const performCommand = () => {
  if (fileNotFound()) {
    window.showErrorMessage(`${path} could not be found`);
    return;
  }

  decorations(
    editors(),
    (
      editor: TextEditor,
      decorationType: TextEditorDecorationType,
      decorationOptions: DecorationOptions[]
    ) => editor.setDecorations(decorationType, decorationOptions)
  );
};

export default performCommand;
