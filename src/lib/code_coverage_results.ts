'use strict';

import * as vscode from 'vscode';
import fs = require('fs');

export const path = `${vscode.workspace.rootPath}/coverage/.resultset.json`;

export function resultset(): any { 
  const rawdata = fs.readFileSync(path);
  return JSON.parse(rawdata.toString());
}

export function fileNotFound(): boolean {
  return !fs.existsSync(path);
}
