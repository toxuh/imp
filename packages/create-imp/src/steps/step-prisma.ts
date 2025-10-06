import type { Step } from '../types';
import { exec } from '../services/shell.service';
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

export const stepPrisma: Step = {
  name: 'prisma init + custom output',
  run: async ({ cwd }) => {
    await exec('npm', ['install', '-D', 'prisma'], cwd);
    await exec('npm', ['install', '@prisma/client'], cwd);
    await exec('npx', ['prisma', 'init', '--datasource-provider', 'postgresql'], cwd);

    const envPath = path.join(cwd, '.env');
    const envSrc = await readFile(envPath, 'utf8');
    await writeFile(envPath, envSrc.replace(/^DATABASE_URL=.*$/m, 'DATABASE_URL=""'));

    const schemaPath = path.join(cwd, 'prisma', 'schema.prisma');
    const schema = await readFile(schemaPath, 'utf8');
    const updated = schema.match(/generator\s+client\s*\{/)
      ? schema.replace(
          /generator\s+client\s*\{[^}]*\}/s,
          `generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
}`,
        )
      : `${schema}\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "../generated/client"\n}\n`;
    await writeFile(schemaPath, updated, 'utf8');

    await exec('npx', ['prisma', 'generate'], cwd);
  },
};
