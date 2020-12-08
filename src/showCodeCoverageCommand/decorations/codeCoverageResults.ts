import { workspace } from 'vscode';
import * as fs from 'fs';

import { SimplecovCoverageResults } from '../../types';
import FileNotFoundError from '../../errors/fileNotFoundError';

export const path = `${workspace.rootPath}/coverage/.resultset.json`;

export default (): SimplecovCoverageResults => {
  if (!fs.existsSync(path)) { 
    throw new FileNotFoundError(path);
  }

  return JSON.parse(
    fs.readFileSync(path).toString()
  );
}
