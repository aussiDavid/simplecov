import {
  DecorationOptions,
  Range,
  TextEditor,
  TextEditorDecorationType,
} from 'vscode';

import Decorators from './decorators';
import CodeCoverageResultsWithEditor from './codeCoverageResultsWithEditor';

type Decoration = {
  editor: TextEditor;
  decorationType: TextEditorDecorationType;
  decorationOptions: DecorationOptions[];
};

const decorators = (editors: TextEditor[]) =>
  Decorators.flatMap((decorator) =>
    new CodeCoverageResultsWithEditor(editors).process().map((codeCoverageSet) => ({
      ...decorator,
      ...codeCoverageSet,
    }))
  );

export default (editors: TextEditor[]): Decoration[] =>
  decorators(editors).map(
    ({ editor, decorationType, decorations, coverage }) => ({
      editor,
      decorationType,
      decorationOptions: decorations(coverage).map(
        ({ lineNumber, onHoverMessage }) => ({
          range: new Range(lineNumber, 0, lineNumber, 1),
          hoverMessage: onHoverMessage,
        })
      ),
    })
  );
