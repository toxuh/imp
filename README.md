## IMP — Next.js starter CLI

Scaffold a modern Next.js app in seconds: Next 15 (App Router) + TypeScript + Tailwind + shadcn/ui + next-themes + Prettier. Optional Prisma setup.

### Quick start

- Easiest: run the wrapper

```bash
npx @toxuh/imp
```

- Or with Yarn Create

```bash
yarn create @toxuh/imp
```

- Or call the generator directly

```bash
npx @toxuh/create-imp
```

- Or with npm Create

```bash
npm create @toxuh/imp
```

The CLI is interactive. You'll be asked whether to include Prisma.

### Requirements

- Node >= 18.18

### What you get

- Next.js 15 project (App Router) with TypeScript
- Tailwind CSS + shadcn/ui
- next-themes with a ready-to-use ThemeProvider
- Cleaned default boilerplate (home page and layout adjusted)
- Prettier (with Tailwind CSS plugin)
- Optional Prisma wiring

### After scaffold

1. Run the CLI in an empty directory (it creates the app in the current folder)
2. When it finishes, start the dev server:

```bash
npm run dev
```

If you chose Prisma:

- Set DATABASE_URL in .env
- Generate client (usually already done):

```bash
npx prisma generate
```

- Create and run your migrations as needed

### Notes

- The tool uses npm to install dependencies.
- Internet connection is required for shadcn/ui initialization and dependency install.

### Troubleshooting

- If Prisma CLI is missing, run: `npm install -D prisma` then `npx prisma --help`.
- If shadcn fails intermittently, re-run the CLI in a clean directory.

### License

MIT
