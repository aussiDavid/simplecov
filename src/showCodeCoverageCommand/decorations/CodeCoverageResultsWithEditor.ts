import { TextDocument, TextEditor } from 'vscode';
import { Coverage } from '../../types';
import codeCoverageResults from './codeCoverageResults';

type EditorResults = {
  editor: TextEditor;
  coverage: Coverage;
};

export default class CodeCoverageResultsWithEditor {
  private editors: TextEditor[];

  constructor(editors: TextEditor[]) {
    this.editors = editors;
  }

  process(): EditorResults[] {
    return this.codeCoverageSetsForEditors().map(({ fileName, coverage }) => ({
      coverage,
      editor: this.editorFor(fileName),
    }));
  }

  private codeCoverageSetsForEditors() {
    return Object.values(codeCoverageResults())
      .map(({ coverage }) => Object.entries(coverage))
      .map(([[fileName, coverage]]) => ({ fileName, coverage }))
      .filter(({ fileName }) => this.fileNames().includes(fileName));
  }

  private editorFor(fileName: string) {
    return this.editors.find(
      (editor) => editor.document.fileName === fileName
    ) as TextEditor;
  }

  private fileNames() {
    return this.editors
      .map((textEditor: TextEditor) => textEditor.document)
      .map((document: TextDocument) => document.fileName);
  }
}
