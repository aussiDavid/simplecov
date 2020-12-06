'use strict';

import * as vscode from 'vscode';

import * as resultset from '../lib/code_coverage_results';
import * as Decorations from '../decorations/index';

export default function performCommand() { 
  if (resultset.fileNotFound()) {
    vscode.window.showErrorMessage(`${resultset.path} could not be found`);
    return;
  }

  Decorations.all(
    editors(), 
    (
      editor: vscode.TextEditor,
      decorationType: vscode.TextEditorDecorationType,
      decorations: vscode.DecorationOptions[]
    ) => editor.setDecorations(decorationType, decorations)
  );
}

function editors(): vscode.TextEditor[] { 
  return vscode.window.visibleTextEditors;
}
