import path from 'node:path';
import { readFile } from 'node:fs/promises';

export const tpl = async (cwd: string, name: string): Promise<string> => {
  const p = path.join(cwd, 'templates', name);
  return readFile(p, 'utf8');
};
