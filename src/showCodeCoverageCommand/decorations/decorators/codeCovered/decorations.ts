import { Coverage } from '../../../../types';

export default (coverage: Coverage) =>
  coverage.lines
    .map((line: number | null, lineNumber: number) => ({ line, lineNumber }))
    .filter(({ line }) => line !== 0)
    .map(({ lineNumber }) => ({
      lineNumber,
      onHoverMessage: 'This line has been covered while testing',
    }));
