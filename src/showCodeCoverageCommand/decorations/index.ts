import { DecorationOptions, TextEditor, TextEditorDecorationType } from 'vscode';

import { codeCoveredDecorationType } from '../decoration_types/codeCovered';
import { missedCodeDecorationType } from '../decoration_types/missedCode';
import missedCodeDecorations from './missedCode';
import codeCoveredDecorations from './codeCovered';
import Resultset from './codeCoverageResults';

type Decoration = {
  editor: TextEditor,
  decorationType: TextEditorDecorationType,
  decorationOptions: DecorationOptions[]
}

const resultset = Resultset();
const decorationGroups = [
  {
    decorations: codeCoveredDecorations,
    decorationType: codeCoveredDecorationType,
  },
  {
    decorations: missedCodeDecorations,
    decorationType: missedCodeDecorationType,
  },
];

export default (editors: TextEditor[]):Decoration[] => {
  const list: Decoration[] = [];
  
  decorationGroups.flatMap(({ decorations, decorationType }) =>
    decorations(resultset, editors,
      (
        editor: TextEditor,
        decorationOptions: DecorationOptions[]
      ) => {
        list.push({ editor, decorationType, decorationOptions });
      }
    )
  );

  return list;
};
