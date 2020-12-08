import { TextDocument, TextEditor } from 'vscode';
import { Coverage, SimplecovRSpecCoverageResults } from '../../../types';

const fileNames = (editors: TextEditor[]) =>
  editors
    .map((textEditor: TextEditor) => textEditor.document)
    .map((document: TextDocument) => document.fileName);

const setsUsedByEditors = (
  resultset: SimplecovRSpecCoverageResults,
  editors: TextEditor[]
) =>
  Object.entries(resultset.RSpec.coverage)
    .filter(([file]) => fileNames(editors).includes(file))
    .map(([filename, coverage]) => ({ filename, coverage }));
  
export type EditorResults = {
  editor: TextEditor,
  coverage: Coverage
};

export default (
  resultset: SimplecovRSpecCoverageResults,
  editors: TextEditor[]
): EditorResults[] =>
  setsUsedByEditors(resultset, editors).map(({ filename, coverage }) => ({
    editor: editors.find(
      (editor) => editor.document.fileName === filename
    ) as TextEditor,
    coverage,
  }));
