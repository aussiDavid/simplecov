import { Range, TextEditor } from 'vscode';
import { EditorDecorations, SimplecovCoverageResults } from '../../../../types';
import codeCoverageSets from '../common';

export default (resultset: SimplecovCoverageResults,
  editors: TextEditor[]): EditorDecorations[] => codeCoverageSets(resultset, editors).map(({ editor, coverage }) => ({
    editor,
    decorations: coverage.lines
      .map((line: number | null, lineNumber: number) => ({ line, lineNumber }))
      .filter(({ line }) => line !== 0)
      .map(({ lineNumber }) => ({
        range: new Range(lineNumber, 0, lineNumber, 1),
        hoverMessage: 'This line has been covered while testing',
      }))
  }))
