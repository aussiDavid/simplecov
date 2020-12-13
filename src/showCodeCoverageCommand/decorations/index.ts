import {
  DecorationOptions,
  TextDocument,
  TextEditor,
  TextEditorDecorationType,
} from 'vscode';

import Resultset from './codeCoverageResults';
import Decorators from './decorators';
import { EditorResults } from '../../types';

type Decoration = {
  editor: TextEditor;
  decorationType: TextEditorDecorationType;
  decorationOptions: DecorationOptions[];
};

const resultset = Resultset();

const fileNames = (editors: TextEditor[]) =>
  editors
    .map((textEditor: TextEditor) => textEditor.document)
    .map((document: TextDocument) => document.fileName);

const resultsSetsForEditors = (editors: TextEditor[]) =>
  Object.values(resultset)
    .map(({ coverage }) => Object.entries(coverage))
    .map(([[fileName, coverage]]) => ({ fileName, coverage }))
    .filter(({ fileName }) => fileNames(editors).includes(fileName));

const codeCoverageSets = (editors: TextEditor[]): EditorResults[] =>
  resultsSetsForEditors(editors).map(({ fileName, coverage }) => ({
    editor: editors.find(
      (editor) => editor.document.fileName === fileName
    ) as TextEditor,
    coverage,
  }));

export default (editors: TextEditor[]): Decoration[] =>
  Decorators.flatMap(({ decorations, decorationType }) =>
    decorations(codeCoverageSets(editors)).map(
      ({ editor, decorations: decorationOptions }) => ({
        editor,
        decorationType,
        decorationOptions,
      })
    )
  );
