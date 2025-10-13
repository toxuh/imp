import type { Step } from '../types';
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { ensureDir, writeIfChanged } from '../services/fs.service';
import { tpl } from '../services/template.service';
import { fileURLToPath } from 'node:url';
import { exec } from '../services/shell.service';

export const stepPrisma: Step = {
  name: 'prisma init + custom output',
  run: async ({ cwd }) => {
    await exec('npm', ['install', '-D', 'prisma'], cwd);
    await exec('npm', ['install', '@prisma/client'], cwd);
    await exec('npx', ['prisma', 'init', '--datasource-provider', 'postgresql'], cwd);

    const envPath = path.join(cwd, '.env');
    const envSrc = await readFile(envPath, 'utf8').catch(() => '');
    const envNext = envSrc.match(/^DATABASE_URL=.*$/m)
      ? envSrc.replace(/^DATABASE_URL=.*$/m, 'DATABASE_URL=""')
      : (envSrc ? envSrc.trimEnd() + '\n' : '') + 'DATABASE_URL=""\n';
    await writeFile(envPath, envNext, 'utf8');

    const prismaDir = path.join(cwd, 'prisma');
    await ensureDir(prismaDir);
    const schemaPath = path.join(prismaDir, 'schema.prisma');
    const base = await readFile(schemaPath, 'utf8').catch(() => {
      return [
        'datasource db {',
        '  provider = "postgresql"',
        '  url      = env("DATABASE_URL")',
        '}',
        '',
        'generator client {',
        '  provider = "prisma-client-js"',
        '  output   = "../generated/client"',
        '}',
        '',
      ].join('\n');
    });
    const updated = base.match(/generator\s+client\s*\{/)
      ? base.replace(
          /generator\s+client\s*\{[^}]*\}/s,
          `generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
}`,
        )
      : `${base}\n\ngenerator client {\n  provider = "prisma-client-js"\n  output   = "../generated/client"\n}\n`;
    await writeFile(schemaPath, updated, 'utf8');

    // create prisma lib
    const libDir = path.join(cwd, 'lib');
    await ensureDir(libDir);
    const distDir = path.dirname(fileURLToPath(import.meta.url));
    const prismaSrc = await tpl(distDir, 'prisma.ts.tpl');
    await writeIfChanged(path.join(libDir, 'prisma.ts'), prismaSrc);

    // ensure /generated in .gitignore
    const gitignorePath = path.join(cwd, '.gitignore');
    const giPrev = await readFile(gitignorePath, 'utf8').catch(() => '');
    const lines = new Set(giPrev.split('\n').map((l) => l.trim()));
    lines.add('/generated');
    const giNext = Array.from(lines).filter(Boolean).join('\n') + '\n';
    await writeFile(gitignorePath, giNext, 'utf8');

    await exec('npx', ['prisma', 'generate'], cwd);
  },
};
