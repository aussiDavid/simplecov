import * as vscode from 'vscode';
import * as fs from 'fs';

import { RSpecResults } from '../types';

export const path = `${vscode.workspace.rootPath}/coverage/.resultset.json`;

export function resultset(): RSpecResults {
  const rawdata = fs.readFileSync(path);
  return JSON.parse(rawdata.toString());
}

export function fileNotFound(): boolean {
  return !fs.existsSync(path);
}
