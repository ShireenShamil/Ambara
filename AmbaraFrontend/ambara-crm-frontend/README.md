# Ambara CRM Frontend (minimal scaffold)

This folder is a minimal scaffold for the Ambara CRM frontend. It provides a clean starting point with a single admin seeded and customer registration.

How to run

1. cd into the folder

```powershell
cd ambara-crm-frontend
npm install
npm run dev
```

Notes
- The API is a localStorage-based mock in `src/api/crmApi.js`.
- Authentication uses a simple `crm_session` object in localStorage.
- All pages are placeholders meant to be extended.
