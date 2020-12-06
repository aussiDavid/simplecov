'use strict';

import * as vscode from 'vscode';

import { codeCoveredDecorationType } from '../decoration_types/code_covered';
import { missedCodeDecorationType } from '../decoration_types/missed_code';
import MissedCodeDecorations from '../decorations/missed_code';
import CodeCoveredDecorations from '../decorations/code_covered';
import * as resultset from '../lib/code_coverage_results';

export function all(editors: vscode.TextEditor[], callback: any) {
  const groups = [
    {
      decorations: CodeCoveredDecorations,
      decorationType: codeCoveredDecorationType
    },
    {
      decorations: MissedCodeDecorations,
      decorationType: missedCodeDecorationType
    }
  ];

  const data = resultset.resultset();

  groups.forEach(({decorations, decorationType}) => {
    decorations(
      data,
      editors,
      (
        editor: vscode.TextEditor,
        decorations: vscode.DecorationOptions[]
      ) => callback(editor, decorationType, decorations)
    );
  });
}
