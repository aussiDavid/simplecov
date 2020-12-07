'user strict';

import { DecorationOptions, Range, TextDocument, TextEditor } from 'vscode';
import { Coverage, RSpecResults } from '../../types';

const codeCoverageSets = (
  resultset: RSpecResults,
  editors: TextEditor[],
  callback: (editor: TextEditor, coverage: Coverage) => void
): void => {
  const fileNames: string[] = editors
    .map((textEditor: TextEditor) => textEditor.document)
    .map((document: TextDocument) => document.fileName);
  const filteredSets = Object.entries(
    resultset.RSpec.coverage
  ).filter(([file]) => fileNames.includes(file));

  filteredSets.forEach(([file, coverage]) => {
    callback(
      editors.find((editor) => editor.document.fileName === file) as TextEditor,
      coverage
    );
  });
};

export default (
  resultset: RSpecResults,
  editors: TextEditor[],
  callback: (editor: TextEditor, decorations: DecorationOptions[]) => void
): void => {
  codeCoverageSets(resultset, editors, (editor, coverage) => {
    const decorations: DecorationOptions[] = [];

    coverage.lines.forEach((line: number | null, lineNumber: number) => {
      if (line === 0) {
        decorations.push({
          range: new Range(lineNumber, 0, lineNumber, 1),
          hoverMessage: 'This line has been was missed in testing',
        });
      }
    });

    callback(editor, decorations);
  });
};
