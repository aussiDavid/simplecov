export default class FileNotFoundError extends Error {
  constructor(filePath: string) {
      super(`${filePath} could not be found`);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = FileNotFoundError.name;
  }
};
