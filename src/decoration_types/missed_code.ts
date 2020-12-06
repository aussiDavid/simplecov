import * as vscode from 'vscode';

export const missedCodeDecorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: '#F001',
  isWholeLine: true
});