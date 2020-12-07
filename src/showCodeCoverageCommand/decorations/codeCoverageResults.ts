import * as vscode from 'vscode';
import * as fs from 'fs';

import { SimplecovRSpecCoverageResults } from '../../types';
import FileNotFoundError from '../../errors/fileNotFoundError';

export const path = `${vscode.workspace.rootPath}/coverage/.resultset.json`;

export default (): SimplecovRSpecCoverageResults => {
  if (!fs.existsSync(path)) { 
    throw new FileNotFoundError(path);
  }

  return JSON.parse(
    fs.readFileSync(path).toString()
  );
}
