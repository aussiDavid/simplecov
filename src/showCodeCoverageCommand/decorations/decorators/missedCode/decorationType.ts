import { window } from 'vscode';

export default window.createTextEditorDecorationType(
  {
    backgroundColor: '#F001',
    isWholeLine: true,
  }
);
