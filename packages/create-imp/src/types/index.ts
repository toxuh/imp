export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export interface Options {
  packageManager: PackageManager;
  withPrisma: boolean;
  withHttp: boolean;
  cwd: string;
  debug?: boolean;
}

export interface Step {
  name: string;
  run: (opts: Readonly<Options>) => Promise<void>;
}
