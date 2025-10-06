import { spawn } from 'node:child_process';

export interface ExecResult {
  code: number;
}

export const exec = (cmd: string, args: string[], cwd: string): Promise<ExecResult> => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('close', (code) =>
      code === 0
        ? resolve({ code })
        : reject(new Error(`${cmd} ${args.join(' ')} failed with ${code}`)),
    );
  });
};
