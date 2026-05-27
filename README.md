# 🚴 Vélo Fitness – Class Booking & Payment Platform

**Live Demo:** [https://velofitness.netlify.app/]

Vélo Fitness is a full-stack gym platform where users can browse fitness classes, book spots, and pay securely. It features JWT authentication with access/refresh tokens, email confirmations, and Stripe payment processing.

![Screenshot](./screenshots/home.png)
![Booking flow](./screenshots/booking.png)

---

## ✨ Features

- 🔐 **Secure authentication** – Access + refresh tokens (HTTP-only cookies)
- 💳 **Stripe payments** – Frontend UI + backend webhook confirmation
- 📅 **Class booking** – Real-time availability, user booking history
- 📧 **Email notifications** – Payment confirmation, booking reminders
- 🗄️ **Persistent storage** – PostgreSQL with Prisma ORM
- 🎨 **Modern UI** – Tailwind CSS, fully responsive
- 🔒 **Type safe** – Full TypeScript across frontend and backend
- 📐 **RESTful API** – Backend follows REST principles

---

## 🛠️ Tech Stack

| -------------- | -----------------------------------------------------------------|
| Layer | Technology |
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express, REST API |
| Database | PostgreSQL, Prisma ORM |
| Authentication | JWT (access + refresh tokens, HTTP-only cookies) |
| Payments | Stripe (checkout + webhooks) |
| Email | Nodemailer / Resend (SMTP) |
| Deployment | Netlify (frontend), Render / Railway (backend) & Aiven (database)|

---

### Deployment Features

- **Render:** Auto-deploys from GitHub, environment variables, health checks
- **Netlify:** CDN, automatic HTTPS, continuous deployment
- **Aiven:** Managed PostgreSQL, automatic backups, SSL encryption

## 📁 Repository Structure

This project is split across **two separate GitHub repositories**:

| Repository                                                                     | Purpose          | Tech                                 |
| ------------------------------------------------------------------------------ | ---------------- | ------------------------------------ |
| [velo-fitness-frontend](https://github.com/yourusername/velo-fitness-frontend) | React frontend   | React, TypeScript, Tailwind          |
| [velo-fitness-backend](https://github.com/yourusername/velo-fitness-backend)   | REST API backend | Node.js, Express, Prisma, PostgreSQL |

### Backend API Structure (RESTful)

| Method | Endpoint                    | Description                             |
| ------ | --------------------------- | --------------------------------------- |
| POST   | `/v1/checkout`              | tripe webhook (payment confirmation)    |
| POST   | `/v1/auth/login`            | Login (returns refresh token as cookie) |
| POST   | `/v1/auth/logout`           | Logout (clears cookie)                  |
| POST   | `/v1/auth/refresh`          | Refresh access token                    |
| PATCH  | `/v1/membership`            | Membership change                       |
| POST   | `/v1/membership/cancel`     | Membership cancellation                 |
| POST   | `/v1/membership/reactivate` | Membership reactivation                 |
| POST   | `/v1/membership/create`     | Stripe webhook (payment confirmation)   |

---

## 🔐 Architecture Overview

**Security notes:**

- Access tokens short-lived (15 min), refresh tokens rotate on reuse
- Refresh tokens stored in HTTP-only cookies (not accessible via JavaScript)
- Stripe payment intent created on backend, confirmed via webhook
- All database queries use Prisma (parameterized, SQL injection safe)
- REST API follows stateless principles (except HTTP-only cookies)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- Stripe account (test mode)
- SMTP email service (Resend, etc.)

### Backend Setup

```bash
git clone https://github.com/yourusername/velo-fitness-backend.git
cd velo-fitness-backend
npm install
```

**Create Environment Variables**

```
NODE_ENV=node_environment
PORT=app_port
APP_URL=your_app_url
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret_key
JWT_SECRET = your_token_scret_key
REFRESH_SECRET_KEY=your_refresh_token_secret_key
RESEND_API_KEY=re_your_resend_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_test_key
```

**Run migration and seed database**

```
npx prisma migrate dev --name init
npx prisma db seed
```

**Run Backend**

```
npm run dev
```

### Front end Setup

```bash
git git@github.com:Nhlalo/VeloFitness.git
cd VeloFitness
npm install
```

**Create Environment Variables**

```
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_API_URL=your_api_url
```

**Run Frontend**

```
npm run dev
```

## 🧠 Challenges & Learnings

Token rotation – Implementing refresh token reuse detection to prevent theft

Stripe webhook idempotency – Ensuring payments aren't processed twice if webhook retries occur

Prisma migrations – Managing schema changes without breaking production data

Type sharing – Using shared TypeScript types between frontend and backend

REST API design – Structuring endpoints with proper HTTP methods and status codes

Separate repos – Managing two codebases for the same project (environment variables, deployment sync)

📝 Future Improvements
Admin dashboard for class management

Waitlist functionality for full classes

Social login (Google, Facebook)

🙏 Acknowledgements
Stripe – Payment processing

Prisma – ORM

Tailwind CSS – Styling

JWT – Authentication

Resend - email

📬 Contact
Email – nhlalonkosi@gmail.com

Frontend Repo: https://github.com/Nhlalo/VeloFitness
Backend Repo: https://github.com/Nhlalo/VeloFitnessBackend
