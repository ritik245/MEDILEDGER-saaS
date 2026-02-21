# MediLedger Frontend (Production-ready scaffold)

A scalable React 18 + TypeScript frontend for blockchain healthcare records.

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Axios + JWT interceptor
- React Query
- Zustand
- Framer Motion

## Routes
- `/login`, `/signup`
- `/dashboard`, `/dashboard/patient`, `/dashboard/doctor`, `/dashboard/admin`
- `/records`, `/upload`, `/permissions`, `/profile`

## Architecture
```
src/
  components/
  layouts/
  pages/
  services/
  hooks/
  store/
  types/
  utils/
  routes/
```

## Run
```bash
cd frontend
npm install
npm run dev
```

API base URL defaults to `http://localhost:5000` and can be overridden with `VITE_API_BASE_URL` in `.env`.


## Troubleshooting: "same file" / pull issues on Windows
If `git pull` fails with messages about `App.tsx` and `app.tsx` being the same file, it's due to **case-insensitive filesystems** (common on Windows/macOS defaults).

This repo now uses only `src/App.tsx` (single canonical file), but old local git metadata can still cache the prior lowercase alias.

Run:
```bash
git rm --cached frontend/src/app.tsx 2>nul || true
git fetch --all
git reset --hard origin/main
```

If needed, re-clone after deleting the old local copy.
