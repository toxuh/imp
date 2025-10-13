import path from 'node:path';
import fs from 'node:fs/promises';

import { exec } from './shell.service';
import type { PackageManager } from '../types';

export const removeOtherLockfiles = async (
  pm: PackageManager,
  cwd: string,
): Promise<void> => {
  const locks = {
    npm: 'package-lock.json',
    yarn: 'yarn.lock',
    pnpm: 'pnpm-lock.yaml',
    bun: 'bun.lockb',
  } as const;

  const toRemove = Object.entries(locks)
    .filter(([k]) => k !== pm)
    .map(([, file]) => path.join(cwd, file));

  await Promise.all(toRemove.map((p) => fs.rm(p, { force: true })));
};

export const install = async (pm: PackageManager, cwd: string) => {
  switch (pm) {
    case 'npm':
      return exec('npm', ['install'], cwd);
    case 'yarn':
      return exec('yarn', ['install'], cwd);
    case 'pnpm':
      return exec('pnpm', ['install'], cwd);
    case 'bun':
      return exec('bun', ['install'], cwd);
  }
};

export const add = async (
  pm: PackageManager,
  deps: string[],
  opts: { dev?: boolean } = {},
  cwd: string,
) => {
  const dev = Boolean(opts.dev);
  switch (pm) {
    case 'npm':
      return exec('npm', ['install', ...(dev ? ['-D'] : []), ...deps], cwd);
    case 'yarn':
      return exec('yarn', ['add', ...(dev ? ['-D'] : []), ...deps], cwd);
    case 'pnpm':
      return exec('pnpm', ['add', ...(dev ? ['-D'] : []), ...deps], cwd);
    case 'bun':
      return exec('bun', ['add', ...(dev ? ['-d'] : []), ...deps], cwd);
  }
};

export const dlx = async (
  pm: PackageManager,
  pkg: string,
  args: string[],
  cwd: string,
) => {
  switch (pm) {
    case 'npm':
      return exec('npx', [pkg, ...args], cwd);
    case 'yarn':
      return exec('yarn', ['dlx', pkg, ...args], cwd);
    case 'pnpm':
      return exec('pnpm', ['dlx', pkg, ...args], cwd);
    case 'bun':
      return exec('bunx', [pkg, ...args], cwd);
  }
};

