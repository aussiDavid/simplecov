export type SimplecovCoverageResults = {
  [provider: string]: {
    coverage: {
      [path: string]: Coverage;
    };
  };
};

export type Coverage = {
  lines: Array<number | null>;
  branches?: {
    [branch: string]: {
      [then: string]: number; 
    }
  }
};
