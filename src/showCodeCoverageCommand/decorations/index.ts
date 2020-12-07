import * as vscode from 'vscode';

import { codeCoveredDecorationType } from '../decoration_types/codeCovered';
import { missedCodeDecorationType } from '../decoration_types/missedCode';
import missedCodeDecorations from './missedCode';
import codeCoveredDecorations from './codeCovered';
import * as resultset from '../codeCoverageResults';

type Callback = (
  editor: vscode.TextEditor,
  decorationType: vscode.TextEditorDecorationType,
  decorations: vscode.DecorationOptions[]
) => void;

export default (editors: vscode.TextEditor[], callback: Callback) => {
  const data = resultset.resultset();
  [
    {
      decorations: codeCoveredDecorations,
      decorationType: codeCoveredDecorationType,
    },
    {
      decorations: missedCodeDecorations,
      decorationType: missedCodeDecorationType,
    },
  ].forEach(({ decorations, decorationType }) => {
    decorations(
      data,
      editors,
      (
        editor: vscode.TextEditor,
        decorationOptions: vscode.DecorationOptions[]
      ) => callback(editor, decorationType, decorationOptions)
    );
  });
};
