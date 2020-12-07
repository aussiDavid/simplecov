import * as vscode from 'vscode';

import { codeCoveredDecorationType } from '../decoration_types/code_covered';
import { missedCodeDecorationType } from '../decoration_types/missed_code';
import missedCodeDecorations from './missed_code';
import codeCoveredDecorations from './code_covered';
import * as resultset from '../lib/code_coverage_results';

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
