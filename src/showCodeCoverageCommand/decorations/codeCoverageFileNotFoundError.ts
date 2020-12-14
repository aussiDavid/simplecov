export default class CodeCoverageFileNotFoundError extends Error {
  constructor(filePaths: string[]) {
      super(`Code coverage file could not be found. The following locations where checked: ${filePaths.join(', ')} `);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = CodeCoverageFileNotFoundError.name;
  }
};
