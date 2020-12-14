import { workspace } from 'vscode';
import * as fs from 'fs';
import { merge } from 'lodash';

import { SimplecovCoverageResults } from '../../types';
import CodeCoverageFileNotFoundError from './codeCoverageFileNotFoundError';

const filePath = `coverage/.resultset.json`;

const paths = () =>
  (workspace.workspaceFolders || []).map(
    (folder) => `${folder.uri.path}/${filePath}`
  );

const availableFiles = () => paths().filter((path) => fs.existsSync(path));

export default (): SimplecovCoverageResults => {
  if (!availableFiles().length) {
    throw new CodeCoverageFileNotFoundError(paths());
  }

  return availableFiles()
    .map(path => fs.readFileSync(path).toString())
    .map(fileContents => JSON.parse(fileContents))
    .reduce(merge);
};
