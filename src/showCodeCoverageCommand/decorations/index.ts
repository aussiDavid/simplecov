import {
  DecorationOptions,
  TextEditor,
  TextEditorDecorationType,
} from 'vscode';

import Resultset from './codeCoverageResults';
import Decorators from './decorators'

type Decoration = {
  editor: TextEditor;
  decorationType: TextEditorDecorationType;
  decorationOptions: DecorationOptions[];
};

const resultset = Resultset();

export default (editors: TextEditor[]): Decoration[] =>
  Decorators.flatMap(({ decorations, decorationType }) =>
    decorations(resultset, editors).map(
      ({ editor, decorations: decorationOptions }) => ({
        editor,
        decorationType,
        decorationOptions,
      })
    )
  );
