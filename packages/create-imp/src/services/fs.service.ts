import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

export const ensureDir = async (p: string): Promise<void> => {
  await fs.mkdir(p, { recursive: true }).catch(() => {});
};

export const writeIfChanged = async (file: string, content: string): Promise<void> => {
  const prev = existsSync(file) ? await fs.readFile(file, 'utf8') : '';
  if (prev !== content) await fs.writeFile(file, content, 'utf8');
};

export const removeAllInDir = async (dir: string): Promise<void> => {
  if (!existsSync(dir)) return;
  const items = await fs.readdir(dir);
  await Promise.all(
    items.map(async (name) => {
      const p = path.join(dir, name);
      await fs.rm(p, { recursive: true, force: true });
    }),
  );
};
