import { EditorDecorations, EditorResults } from '../../../../types';
import { codeCoveredDecorationType } from './decorationType';
import decorationsFor from './decorations';

export default {
  decorations: (results: EditorResults[]): EditorDecorations[] =>
    results.map(({ editor, coverage }) => ({
      editor,
      decorations: decorationsFor(coverage),
    })),
  decorationType: codeCoveredDecorationType,
};
