# Bull Play Casino API Documentation

A React + Tailwind CSS documentation site inspired by the [Scorpio Play Casino API Doc](https://slotcity.gitbook.io/scorpio-play-casino-api-doc) GitBook layout.

## Features

- GitBook-style layout with sidebar navigation, search, and table of contents
- Structured content blocks (headings, code, tables, callouts, API endpoints)
- Full API reference pages for Main API and Seamless Wallet callbacks
- Responsive design with mobile sidebar
- Copy-to-clipboard code blocks

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── components/
│   ├── content/     # Content renderers (CodeBlock, ParamTable, etc.)
│   ├── layout/      # DocLayout, Sidebar, Header, TableOfContents
│   └── ui/          # Shared UI primitives
├── data/
│   ├── navigation.ts
│   └── pages/       # Documentation content as typed data
├── pages/           # Route-level page components
└── types/           # Shared TypeScript types
```

## Adding Documentation

1. Create page content in `src/data/pages/` using the `DocPage` type
2. Register the route in `src/data/pages/index.ts`
3. Add a navigation entry in `src/data/navigation.ts`

## Build

```bash
npm run build
npm run preview
```
