export default class CodeCoverageFileNotFoundError extends Error {
  constructor(filePath: string) {
      super(`${filePath} could not be found`);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = CodeCoverageFileNotFoundError.name;
  }
};
