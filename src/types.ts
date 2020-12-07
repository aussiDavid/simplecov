export type Coverage = {
  lines: Array<number | null>;
  branches?: Array<number | null>;
};

export type RSpecResults = {
  RSpec: {
    coverage: {
      [key: string]: Coverage;
    };
  };
};
