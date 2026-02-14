# Nexora – Smart Healthcare Platform

A professional healthcare web app with AI symptom checking, telemedicine, medication management, health dashboard, and more. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **AI Symptom Checker** – Enter symptoms, get instant analysis and doctor/self-care suggestions
- **Medication Management** – Track meds, doses, adherence, refill reminders
- **Telemedicine Hub** – Video & chat with doctors; digital prescriptions
- **Personal Health Dashboard** – Vitals, progress charts, gamified health score & achievements
- **Device & Wearable Integration** – Sync devices; AI trend analysis and alerts
- **Secure Authentication** – Login/register with JWT-ready flow; MFA placeholder
- **Patient Engagement** – Health tips, forums, education (Community)
- **Doctor Dashboard** – Patient list, histories, alerts, vitals (glass panels, cyan glow)
- **AI Health Predictions** – Risk prediction with animated charts
- **Emergency Alert System** – Alerts for abnormal readings; test demo
- **Appointment Scheduling** – Book, reschedule, cancel; doctor queues
- **Virtual Health Records** – Store records; AI-assisted search
- **Community & Forums** – Patient support; doctor-moderated
- **AI Diet & Exercise** – Personalized plans and daily tips
- **Health Analytics & Reports** – Summaries and export

## UI/UX

- Glass/frosted panels, black background, cyan accents
- Smooth fade-in and hover animations (Framer Motion)
- Sticky navbar, responsive layout
- Single scrolling Home plus dedicated pages for each feature

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Security (no data leak)

- **Role-based access**: Patients cannot access the Doctor Dashboard; doctors can access all areas. Route guards enforce this.
- **Session**: Automatic logout after 15 minutes of inactivity. Sensitive storage is cleared on logout.
- **Credentials**: Passwords are never persisted; form state is cleared after login/register. Post-login redirect uses `replace` so the login page is not in history.
- **Display**: User-generated content (e.g. community posts) is sanitized before render to prevent XSS. Only minimal display data (e.g. first name) is shown in the UI.
- **Deployment**: Use HTTPS in production. Security headers are set via `vercel.json` (Vercel) and `public/_headers` (Netlify): `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

## Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- Tailwind CSS 4
- Framer Motion
- Lucide React (icons)
