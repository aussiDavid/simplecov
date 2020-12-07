import { DecorationOptions, Range, TextDocument, TextEditor } from 'vscode';
import { Coverage, SimplecovRSpecCoverageResults } from '../../types';

const fileNames = (editors: TextEditor[]) =>
  editors
    .map((textEditor: TextEditor) => textEditor.document)
    .map((document: TextDocument) => document.fileName);

const setsUsedByEditors = (resultset: SimplecovRSpecCoverageResults, editors: TextEditor[]) =>
  Object.entries(resultset.RSpec.coverage)
    .filter(([file]) => fileNames(editors).includes(file))
    .map(([filename, coverage]) => ({ filename, coverage }));

const codeCoverageSets = (
  resultset: SimplecovRSpecCoverageResults,
  editors: TextEditor[],
  callback: (editor: TextEditor, coverage: Coverage) => void
): void => {
  setsUsedByEditors(resultset, editors).forEach(({ filename, coverage }) => {
    callback(
      editors.find(
        (editor) => editor.document.fileName === filename
      ) as TextEditor,
      coverage
    );
  });
};

export default (
  resultset: SimplecovRSpecCoverageResults,
  editors: TextEditor[],
  callback: (editor: TextEditor, decorations: DecorationOptions[]) => void
): void => {
  codeCoverageSets(resultset, editors, (editor, coverage) => {
    const decorations: DecorationOptions[] = [];

    coverage.lines.forEach((line: number | null, lineNumber: number) => {
      if (line !== 0) {
        decorations.push({
          range: new Range(lineNumber, 0, lineNumber, 1),
          hoverMessage: 'This line has been covered while testing',
        });
      }
    });

    callback(editor, decorations);
  });
};
