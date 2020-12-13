import { Range } from 'vscode';
import { Coverage } from '../../../../types';

export default (coverage: Coverage) =>
  coverage.lines
    .map((line: number | null, lineNumber: number) => ({ line, lineNumber }))
    .filter(({ line }) => line !== 0)
    .map(({ lineNumber }) => ({
      range: new Range(lineNumber, 0, lineNumber, 1),
      hoverMessage: 'This line has been covered while testing',
    }));
