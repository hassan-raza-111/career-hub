# CareerHub - Career Counseling & Resume Builder Platform

A full-stack web application built as a Final Year Project (FYP) that provides professional career counseling services and a resume builder tool. Users can create accounts, build resumes with live preview, download them as PDF, book career counseling sessions, and send contact messages.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Pages & Routes](#pages--routes)
- [Authentication Flow](#authentication-flow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | Next.js 16.2.1 (App Router)        |
| Language   | TypeScript 5                        |
| Frontend   | React 19, Tailwind CSS 4           |
| Database   | MariaDB / MySQL                     |
| ORM        | Prisma 7.6 (with MariaDB adapter)  |
| Auth       | Custom cookie-based sessions        |
| PDF Export | html2canvas-pro + jsPDF             |
| Icons      | React Icons (Font Awesome set)      |
| Linting    | ESLint 9 (Next.js config)           |

---

## Features

### User Authentication
- User registration with name, email, and password
- Secure login with bcrypt password hashing (10 rounds)
- Cookie-based session management (httpOnly, 7-day expiry)
- Protected routes with AuthGuard component
- Logout functionality

### Resume Builder
- Step-by-step resume form with sections:
  - Personal Information (name, job title, email, phone, address)
  - Professional Summary
  - Work Experience (add/remove multiple entries)
  - Education (add/remove multiple entries)
  - Skills (comma-separated)
  - Languages (comma-separated)
- Live preview as you type (side-by-side on desktop)
- Save resume to database
- Download as multi-page PDF
- Auto-loads saved resume on revisit

### Career Counseling
- Browse 4 counseling service types (1-on-1, Online, Skill Assessment, Interview Prep)
- Book counseling sessions with preferred date/time
- View booked sessions history
- Delete/cancel sessions

### Dashboard
- Personalized greeting with user info
- Stats overview (resume status, sessions booked, messages sent, member since)
- Resume summary with quick edit link
- Recent booked sessions list
- Sent messages history
- Quick action links

### Contact System
- Contact form on home page (login required)
- Login prompt for non-authenticated users
- Messages saved to database and visible in dashboard

### Additional
- Responsive design (mobile, tablet, desktop)
- Loading states and spinners throughout
- Error boundary page
- Custom 404 page
- Professional landing page with hero, stats, features, testimonials, and CTA sections
- About page with mission, vision, values, and team info

---

## Project Structure

```
career-hub/
├── app/
│   ├── api/                        # Backend API routes
│   │   ├── auth/
│   │   │   ├── signup/route.ts     # POST - User registration
│   │   │   ├── login/route.ts      # POST - User login
│   │   │   ├── logout/route.ts     # POST - Clear session
│   │   │   └── me/route.ts         # GET  - Current user info
│   │   ├── resume/route.ts         # GET/POST - Resume CRUD
│   │   ├── sessions/route.ts       # GET/POST/DELETE - Counseling sessions
│   │   └── contact/route.ts        # GET/POST - Contact messages
│   ├── components/
│   │   ├── Navbar.tsx              # Navigation bar (auth-aware)
│   │   ├── Footer.tsx              # Site footer
│   │   ├── ContactForm.tsx         # Contact form (auth-aware)
│   │   └── AuthGuard.tsx           # Protected route wrapper
│   ├── lib/
│   │   ├── auth.ts                 # Client-side auth functions
│   │   ├── db.ts                   # Prisma client singleton
│   │   └── session.ts              # Cookie session management
│   ├── generated/prisma/           # Auto-generated Prisma client
│   ├── layout.tsx                  # Root layout (Navbar + Footer)
│   ├── page.tsx                    # Landing page
│   ├── login/page.tsx              # Login / Signup page
│   ├── dashboard/page.tsx          # User dashboard
│   ├── resume/page.tsx             # Resume builder
│   ├── career-counseling/page.tsx  # Counseling booking
│   ├── about/page.tsx              # About page
│   ├── error.tsx                   # Error boundary
│   ├── loading.tsx                 # Loading skeleton
│   ├── not-found.tsx               # 404 page
│   ├── globals.css                 # Global styles + Tailwind
│   └── icon.svg                    # Favicon
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Migration files
├── public/                         # Static assets
├── .env                            # Environment variables
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── prisma.config.ts                # Prisma config
├── postcss.config.mjs              # PostCSS / Tailwind config
└── eslint.config.mjs               # ESLint config
```

---

## Database Schema

The application uses 6 database models:

### User
| Field     | Type     | Notes               |
| --------- | -------- | -------------------- |
| id        | Int      | Primary key, auto-increment |
| name      | String   | User's full name     |
| email     | String   | Unique               |
| password  | String   | bcrypt hashed        |
| createdAt | DateTime | Auto-generated       |
| updatedAt | DateTime | Auto-updated         |

**Relations:** Has many Resumes, Sessions, Contacts

### Resume
| Field     | Type     | Notes               |
| --------- | -------- | -------------------- |
| id        | Int      | Primary key          |
| userId    | Int      | Foreign key to User  |
| title     | String   | Resume title (default: "Untitled Resume") |
| fullName  | String   | Display name on resume |
| jobTitle  | String   | Job title            |
| email     | String   | Contact email        |
| phone     | String   | Phone number         |
| address   | String   | Location             |
| summary   | Text     | Professional summary |
| skills    | String   | Comma-separated skills |
| languages | String   | Comma-separated languages |
| createdAt | DateTime | Auto-generated       |
| updatedAt | DateTime | Auto-updated         |

**Relations:** Belongs to User, Has many Experiences, Has many Educations

### Experience
| Field       | Type   | Notes              |
| ----------- | ------ | ------------------- |
| id          | Int    | Primary key         |
| resumeId    | Int    | Foreign key to Resume |
| company     | String | Company name        |
| role        | String | Job role            |
| duration    | String | e.g. "2020 - Present" |
| description | Text   | Job description     |

### Education
| Field       | Type   | Notes              |
| ----------- | ------ | ------------------- |
| id          | Int    | Primary key         |
| resumeId    | Int    | Foreign key to Resume |
| degree      | String | e.g. "BS Computer Science" |
| institution | String | University/college name |
| year        | String | e.g. "2016 - 2020" |

### Session (Career Counseling)
| Field       | Type     | Notes              |
| ----------- | -------- | ------------------- |
| id          | Int      | Primary key         |
| userId      | Int      | Foreign key to User |
| name        | String   | Applicant name      |
| email       | String   | Applicant email     |
| phone       | String   | Phone number        |
| jobTitle    | String   | Current job title   |
| experience  | String   | Experience level    |
| sessionTime | DateTime | Preferred session time |
| message     | Text     | What they need help with |
| createdAt   | DateTime | Auto-generated      |

### Contact
| Field   | Type     | Notes              |
| ------- | -------- | ------------------- |
| id      | Int      | Primary key         |
| userId  | Int      | Foreign key to User |
| name    | String   | Sender name         |
| email   | String   | Sender email        |
| subject | String   | Message subject     |
| message | Text     | Message body        |
| sentAt  | DateTime | Auto-generated      |

All relations use **Cascade Delete** - deleting a user removes all their data.

### ER Diagram

```
User (1) ──── (N) Resume (1) ──── (N) Experience
  │                    │
  │                    └──── (N) Education
  │
  ├──── (N) Session
  │
  └──── (N) Contact
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description          | Auth Required |
| ------ | ------------------ | -------------------- | ------------- |
| POST   | `/api/auth/signup` | Register new user    | No            |
| POST   | `/api/auth/login`  | Login user           | No            |
| POST   | `/api/auth/logout` | Logout (clear cookie)| No            |
| GET    | `/api/auth/me`     | Get current user     | Yes           |

**POST /api/auth/signup**
```json
// Request
{ "name": "Ahmed", "email": "ahmed@example.com", "password": "123456" }

// Response (200)
{ "message": "Account created successfully!", "user": { "id": 1, "name": "Ahmed", "email": "ahmed@example.com" } }

// Error (409)
{ "error": "Email already registered." }
```

**POST /api/auth/login**
```json
// Request
{ "email": "ahmed@example.com", "password": "123456" }

// Response (200)
{ "message": "Login successful!", "user": { "id": 1, "name": "Ahmed", "email": "ahmed@example.com" } }

// Error (401)
{ "error": "Invalid email or password." }
```

### Resume

| Method | Endpoint       | Description           | Auth Required |
| ------ | -------------- | --------------------- | ------------- |
| GET    | `/api/resume`  | Get user's resume     | Yes           |
| POST   | `/api/resume`  | Create/update resume  | Yes           |

**POST /api/resume**
```json
// Request
{
  "fullName": "Ahmed Khan",
  "jobTitle": "Software Engineer",
  "email": "ahmed@example.com",
  "phone": "+92 300 1234567",
  "address": "Karachi, Pakistan",
  "summary": "Experienced developer...",
  "skills": "JavaScript, React, Node.js",
  "languages": "English, Urdu",
  "experiences": [
    { "company": "TechCorp", "role": "Developer", "duration": "2022 - Present", "description": "Building web apps..." }
  ],
  "educations": [
    { "degree": "BS Computer Science", "institution": "FAST NUCES", "year": "2018 - 2022" }
  ]
}
```

### Sessions (Career Counseling)

| Method | Endpoint            | Description         | Auth Required |
| ------ | ------------------- | ------------------- | ------------- |
| GET    | `/api/sessions`     | Get user's sessions | Yes           |
| POST   | `/api/sessions`     | Book new session    | Yes           |
| DELETE | `/api/sessions?id=` | Delete session      | Yes           |

### Contact

| Method | Endpoint        | Description          | Auth Required |
| ------ | --------------- | -------------------- | ------------- |
| GET    | `/api/contact`  | Get user's messages  | Yes           |
| POST   | `/api/contact`  | Send contact message | Yes           |

---

## Pages & Routes

| Route                | Page                 | Auth Required | Description                    |
| -------------------- | -------------------- | ------------- | ------------------------------ |
| `/`                  | Landing Page         | No            | Hero, features, testimonials, contact |
| `/login`             | Login / Sign Up      | No            | Toggle between login and signup forms |
| `/dashboard`         | User Dashboard       | Yes           | Overview of resume, sessions, messages |
| `/resume`            | Resume Builder       | Yes           | Build, preview, save, and download PDF |
| `/career-counseling` | Career Counseling    | Yes           | Browse services and book sessions |
| `/about`             | About Us             | No            | Mission, vision, values, team  |

---

## Authentication Flow

```
┌─────────┐     POST /api/auth/signup      ┌──────────┐
│  Signup  │ ──────────────────────────────>│  Server  │
│  Form    │     { name, email, password }  │          │
└─────────┘                                 │ 1. Validate
                                            │ 2. Check duplicate email
                                            │ 3. Hash password (bcrypt)
                                            │ 4. Create user in DB
                                            │ 5. Set session cookie
                                            └──────────┘
                                                  │
                                                  v
                                            ┌──────────┐
                                            │ Cookie:  │
                                            │ careerhub│
                                            │ _session │
                                            │ = userId │
                                            └──────────┘
                                                  │
                                                  v
┌─────────┐     GET /api/auth/me            ┌──────────┐
│Protected│ ──────────────────────────────>│  Server  │
│  Page   │     (cookie sent automatically) │          │
└─────────┘                                 │ 1. Read cookie
                                            │ 2. Find user by ID
                                            │ 3. Return user data
                                            └──────────┘
```

**Session Cookie Details:**
- Name: `careerhub_session`
- Value: User ID (integer)
- HttpOnly: Yes (not accessible via JavaScript)
- Secure: Yes (in production only)
- SameSite: Lax
- Max Age: 7 days
- Path: `/`

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **MariaDB** or **MySQL** server running on localhost:3306
- **npm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd career-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/career_hub"
   ```

4. **Create the database**
   ```sql
   CREATE DATABASE career_hub;
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open the application**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable       | Description                        | Example                                        |
| -------------- | ---------------------------------- | ---------------------------------------------- |
| `DATABASE_URL` | MariaDB/MySQL connection string    | `mysql://root:password@localhost:3306/career_hub` |

---

## Available Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start development server with hot reload |
| `npm run build`  | Create optimized production build        |
| `npm run start`  | Start production server                  |
| `npm run lint`   | Run ESLint to check code quality         |

### Prisma Commands

| Command                       | Description                          |
| ----------------------------- | ------------------------------------ |
| `npx prisma migrate dev`      | Run pending migrations (development) |
| `npx prisma generate`         | Regenerate Prisma client             |
| `npx prisma studio`           | Open Prisma database GUI             |
| `npx prisma db push`          | Push schema changes without migration|

---

## Security

| Feature              | Implementation                                    |
| -------------------- | ------------------------------------------------- |
| Password Hashing     | bcryptjs with 10 salt rounds                      |
| SQL Injection        | Prevented by Prisma ORM (parameterized queries)   |
| XSS Protection       | React auto-escapes JSX output                     |
| Cookie Security      | httpOnly, secure (production), sameSite: lax       |
| User Data Isolation  | All queries scoped by authenticated userId         |
| Cascade Deletion     | Deleting user removes all associated data          |
| Input Validation     | Client-side + server-side validation on all forms  |

---

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Requirements for Production

1. Set `NODE_ENV=production` for secure cookies
2. Configure `DATABASE_URL` to point to your production database
3. Ensure MariaDB/MySQL is accessible from the server
4. The `.env` file should never be committed to version control

### Recommended Hosting

- **Frontend + API:** Vercel, Railway, or any Node.js hosting
- **Database:** PlanetScale, Railway MySQL, AWS RDS, or self-hosted MariaDB

---

## License

This project was built as a Final Year Project (FYP) for academic purposes.

---

## Author

**Ahmed Qazi** - Founder & Developer

CareerHub - Empowering individuals to build successful careers.
