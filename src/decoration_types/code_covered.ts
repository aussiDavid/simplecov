import * as vscode from 'vscode';

export const codeCoveredDecorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#0F01',
  isWholeLine: true
});