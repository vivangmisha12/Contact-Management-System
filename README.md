# Contact Manager

A modern contact management app built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- User registration and login
- Cookie-based session authentication
- Contact CRUD (create, read, update, delete)
- Contact search (name/email)
- Responsive modern UI with Tailwind CSS
- Toast notifications for actions

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Server Actions
- Local JSON data store (`src/app/_data/db.json`)

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Project Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run server` - Start json-server on port 3002
