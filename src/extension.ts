import * as vscode from 'vscode';

import ShowCodeCoverageCommand from './showCodeCoverageCommand';

export function activate(context: vscode.ExtensionContext) {
  console.log('"simplecov" is active');

  const disposable = vscode.commands.registerCommand(
    'simplecov.showCodeCoverage',
    ShowCodeCoverageCommand
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
