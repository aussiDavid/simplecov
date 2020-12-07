export type Coverage = {
  lines: Array<number | null>;
  branches?: {
    [branch: string]: {
      [then: string]: number; 
    }
  }
};

export type SimplecovRSpecCoverageResults = {
  RSpec: {
    coverage: {
      [path: string]: Coverage;
    };
    timestamp: number;
  };
};
