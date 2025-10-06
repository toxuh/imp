import path from 'node:path';
import { readFile } from 'node:fs/promises';

export const tpl = async (cwd: string, name: string): Promise<string> => {
  const primary = path.join(cwd, 'templates', name);
  try {
    return await readFile(primary, 'utf8');
  } catch (e: any) {
    if (e?.code !== 'ENOENT') throw e;
  }
  const fallback = path.join(cwd, '..', 'templates', name);
  return readFile(fallback, 'utf8');
};
