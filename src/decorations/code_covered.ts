'user strict';

import * as vscode from 'vscode';

export default function codeCoveredDecorations(resultset: any, editors: vscode.TextEditor[], callback: (editor: any, decorations: any) => void): void {
  codeCoverageSets(resultset, editors, (editor, coverage) => {
    const decorations: vscode.DecorationOptions[] = [];

    coverage.lines.forEach((line: number, lineNumber: number) => {
      const range = new vscode.Range(lineNumber, 0, lineNumber, 1);

      if (line === 0) { return; }

      decorations.push({
        range: range,
        hoverMessage: 'This line has been covered while testing'
      });        
    });

    callback(editor, decorations);
  });
}

function codeCoverageSets(resultset: any, editors: vscode.TextEditor[], callback: (editor: any, coverage: any) => void): void { 
  const fileNames: string[] = editors.map ((textEditor: vscode.TextEditor) => textEditor.document)
                                     .map((document: vscode.TextDocument) => document.fileName);
  const filteredSets = Object.entries(resultset.RSpec.coverage)
                             .filter(([file, _]) => fileNames.includes(file));

  for (const [file, coverage] of filteredSets) {
    const editor = editors.find ((editor) => editor.document.fileName === file);
    callback(editor, coverage);
  }
}




