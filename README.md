# Contact Manager

Production-ready contact management web app built with Next.js App Router, TypeScript, Tailwind CSS, and Server Actions.

## Overview

Contact Manager allows users to register, log in, and manage their own contacts with a clean modern interface. The app uses cookie-based sessions and stores data in a local JSON file for lightweight development.

## Core Features

- Authentication (register, login, logout)
- Protected routes via session checks
- Contact CRUD (create, list, update, delete)
- Contact search by name/email (instant client-side filtering)
- Toast notifications for success and error states
- Responsive SaaS-style UI with Tailwind CSS

## Tech Stack

- Framework: Next.js `16.1.6` (App Router)
- UI: React `19.2.3`
- Language: TypeScript `5`
- Styling: Tailwind CSS `4`
- Data mutations: Next.js Server Actions
- Session/auth: Cookie-based session (`httpOnly`)
- Storage: Local JSON database at `src/app/_data/db.json`

## Project Structure

```text
src/app/
	(auth)/
		login/page.tsx
		register/page.tsx
	actions/
		auth.ts
		contact.ts
		login.ts
	_components/
		AppLogo.tsx
		Navbar.tsx
		ProfileDropdown.tsx
		LoginForm.tsx
		RegisterForm.tsx
		ContactList.tsx
		ToastProvider.tsx
		ToastHandler.tsx
	_lib/
		db.ts
		session.ts
	_types/
		user.ts
		contact.ts
	_data/
		db.json
	contact/
		page.tsx
		new/page.tsx
		edit/[id]/page.tsx
	layout.tsx
	page.tsx
```

## Routing

- `/` - Landing page
- `/login` - Login
- `/register` - Registration
- `/contact` - Contact list (protected)
- `/contact/new` - Create contact (protected)
- `/contact/edit/[id]` - Edit contact (protected)

## Authentication and Authorization

- `setSession()` stores a `session` cookie with user payload (`id`, `name`, `email`)
- `getSession()` reads and parses session cookie
- `deleteSession()` removes session cookie
- `requireSession()` protects server pages and actions by redirecting unauthenticated users to `/login`
- Contact ownership is enforced by matching `contact.userId === session.id`

## Data Layer

Database helpers in `src/app/_lib/db.ts`:

- `readDb()` - Reads/parses `db.json`
- `writeDb(db)` - Persists updated JSON data
- `nextId(items)` - Generates incremental numeric IDs

Data models:

- `users`: `{ id, name, email, password }`
- `contacts`: `{ id, name, email, phone?, userId }`

## Server Actions

Authentication actions in `src/app/actions/auth.ts`:

- `loginAction(formData)`
- `registerAction(formData)`
- `logoutAction()`
- `requireSession()`

Contact actions in `src/app/actions/contact.ts`:

- `createContactAction(formData)`
- `updateContactAction(formData)`
- `deleteContactAction(formData)`

Forms call actions directly using `<form action={serverAction}>`.

## Local Development

### Prerequisites

- Node.js 18+ (recommended Node.js 20 LTS)
- npm 9+

### Install

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Optional mock server (json-server)

```bash
npm run server
```

Runs on `http://localhost:3002` against `src/app/_data/db.json`.

## Production Run (Local)

```bash
npm run build
npm run start
```

## NPM Scripts

- `npm run dev` - Start Next.js in development mode
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run server` - Run json-server for local data mocking

## Deployment

### Vercel (recommended)

1. Push project to GitHub
2. Import repository into Vercel
3. Build command: `npm run build`
4. Output: `.next` (auto-detected)
5. Deploy

Note: Current storage uses a local JSON file, which is not durable for serverless production environments. Migrate to a managed database for production workloads.

## Security Notes

Current implementation is good for learning and demos but not fully production hardened:

- Passwords are stored in plain text (must hash with `bcrypt`/`argon2`)
- Local JSON storage has no transaction safety
- No rate limiting on auth endpoints
- No email verification / password reset flow

## Recommended Production Upgrades

- Use PostgreSQL + Prisma (or another managed DB)
- Hash passwords and add stronger auth policies
- Add rate limiting and audit logging
- Add robust validation (zod) for all form inputs
- Add test coverage (unit + integration + e2e)

## Troubleshooting

- Port already in use: run `npm run dev` and use the fallback port shown in terminal
- Session issues after code changes: clear browser cookies and log in again
- Build issues: remove `.next` and rebuild

```bash
rm -rf .next
npm run build
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force .next
npm run build
```

Live Demo:
https://contact-manager-theta-beryl.vercel.app/

## License

This project currently has no license file. Add a `LICENSE` file if you plan to distribute it publicly.
