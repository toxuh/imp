export interface Options {
  withPrisma: boolean;
  cwd: string;
  debug?: boolean;
}

export interface Step {
  name: string;
  run: (opts: Readonly<Options>) => Promise<void>;
}
