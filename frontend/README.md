# MediLedger Frontend

Modern **React + TypeScript + Vite** dashboard for the MediLedger backend.

## Run locally

```bash
cd frontend
npm install
npm run dev
```

Optional environment variable:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Features

- Sign up / sign in against `/user` auth APIs
- JWT session stored in localStorage
- Upload medical records to `/records/upload`
- Download records by ID from `/records/:id`
