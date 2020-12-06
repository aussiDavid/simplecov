import * as vscode from 'vscode';

import ShowCodeCoverageCommand from './commands/show_code_coverage';

export function activate(context: vscode.ExtensionContext) {
	console.log('"simplecov" is active');

	let disposable = vscode.commands.registerCommand('simplecov.showCodeCoverage', ShowCodeCoverageCommand);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
