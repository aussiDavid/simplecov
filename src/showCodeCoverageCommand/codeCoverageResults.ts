import * as vscode from 'vscode';
import * as fs from 'fs';

import { SimplecovRSpecCoverageResults } from '../types';

export const path = `${vscode.workspace.rootPath}/coverage/.resultset.json`;

export function resultset(): SimplecovRSpecCoverageResults {
  const rawdata = fs.readFileSync(path);
  return JSON.parse(rawdata.toString());
}

export function fileNotFound(): boolean {
  return !fs.existsSync(path);
}
