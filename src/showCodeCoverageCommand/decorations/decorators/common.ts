import { TextDocument, TextEditor } from 'vscode';
import { Coverage, SimplecovCoverageResults } from '../../../types';

const fileNames = (editors: TextEditor[]) =>
  editors
    .map((textEditor: TextEditor) => textEditor.document)
    .map((document: TextDocument) => document.fileName);

const setsUsedByEditors = (
  resultset: SimplecovCoverageResults,
  editors: TextEditor[]
) =>
  Object.values(resultset)
    .map(({ coverage }) => Object.entries(coverage))
    .map(([[fileName, coverage]]) => ({ fileName, coverage }))
    .filter(({fileName}) => fileNames(editors).includes(fileName))

export type EditorResults = {
  editor: TextEditor;
  coverage: Coverage;
};

export default (
  resultset: SimplecovCoverageResults,
  editors: TextEditor[]
): EditorResults[] =>
  setsUsedByEditors(resultset, editors).map(({ fileName, coverage }) => ({
    editor: editors.find(
      (editor) => editor.document.fileName === fileName
    ) as TextEditor,
    coverage,
  }));
