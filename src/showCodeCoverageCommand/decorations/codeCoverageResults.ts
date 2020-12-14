import { workspace } from 'vscode';
import * as fs from 'fs';

import { SimplecovCoverageResults } from '../../types';
import CodeCoverageFileNotFoundError from './codeCoverageFileNotFoundError';

export const path = `${workspace.rootPath}/coverage/.resultset.json`;

export default (): SimplecovCoverageResults => {
  if (!fs.existsSync(path)) { 
    throw new CodeCoverageFileNotFoundError(path);
  }

  return JSON.parse(
    fs.readFileSync(path).toString()
  );
}
