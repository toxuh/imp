# @toxuh/create-imp

[![npm version](https://img.shields.io/npm/v/@toxuh/create-imp?logo=npm)](https://www.npmjs.com/package/@toxuh/create-imp)
[![npm downloads](https://img.shields.io/npm/dm/@toxuh/create-imp)](https://www.npmjs.com/package/@toxuh/create-imp)
[![node version](https://img.shields.io/node/v/@toxuh/create-imp)](https://www.npmjs.com/package/@toxuh/create-imp)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/toxuh/imp/blob/main/LICENSE)

Next.js starter CLI (Next 15 + Tailwind + shadcn + next-themes, optional Prisma).

## Install / Usage

Run directly via npx:

```
npx @toxuh/create-imp
```

Or use the wrapper:

```
npx @toxuh/imp
```

You will be prompted for Prisma integration. The generator will:

- scaffold a new Next.js app (app router, TS, Tailwind, ESLint)
- install dependencies
- add Prettier (+ Tailwind plugin) and write `.prettierrc`
- init shadcn and add `next-themes`
- replace app layout/page with a ThemeProvider setup
- (optional) init Prisma, set custom client output to `generated/client`

## Development

- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`

Node >= 18.18 is required.
