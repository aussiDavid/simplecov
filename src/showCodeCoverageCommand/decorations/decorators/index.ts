import codeCoveredDecorationType from './codeCovered/decorationType';
import codeCoveredDecorations from './codeCovered/decorations';
import missedCodeDecorationType from './missedCode/decorationType';
import missedCodeDecorations from './missedCode/decorations';

export default [
  {
    decorationType: codeCoveredDecorationType,
    decorations: codeCoveredDecorations,
  },
  {
    decorationType: missedCodeDecorationType,
    decorations: missedCodeDecorations,
  },
];
