# codeVerdict ⚡

> A full-stack Online Code Judge platform — submit code, get real-time verdicts in a secure sandboxed environment.

[![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go&logoColor=white)](https://golang.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Sandboxed-2496ED?style=flat&logo=docker&logoColor=white)](https://docker.com)
[![Redis](https://img.shields.io/badge/Redis-Queue-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

---

## What is codeVerdict?

**codeVerdict** is a production-grade Online Code Judge — similar to LeetCode or Codeforces — where users can write, submit, and evaluate code against hidden test cases in a secure, sandboxed environment.

Built from scratch with a focus on **security**, **scalability**, and **real-time feedback**. Every submission runs inside an isolated Docker container with strict CPU, memory, and network restrictions — making the judge engine safe against malicious code and resource abuse.

The backend is written in **Go** for high concurrency and low latency, paired with a **Next.js + React** frontend for a fast, SEO-friendly user experience.

---

## Live Demo

> 🔗 [codeverdictapp.com](https://codeverdictapp.com) &nbsp;|&nbsp; 📹 [Watch Demo Video](https://youtu.be/demo-link)

---

## Key Features

- **Multi-language support** — C++17, Python 3, Java 17, JavaScript (Node.js)
- **Secure sandboxed execution** — Docker containers with no network access, read-only filesystem, and strict resource limits
- **Real-time verdicts** — Accepted, Wrong Answer, Time Limit Exceeded, Memory Limit Exceeded, Runtime Error, Compilation Error
- **Monaco code editor** — the same editor powering VS Code, with full syntax highlighting
- **Async submission queue** — Redis-backed job queue keeps the API non-blocking under heavy concurrent load
- **Problem management** — Admins can create problems, configure time/memory limits, and manage hidden test cases
- **User profiles & history** — track submissions, verdicts, and problem-solving progress
- **Leaderboard** — ranked by problems solved and submission accuracy

---

## System Architecture

```
┌──────────────────────┐        ┌──────────────────┐        ┌─────────────────┐
│  Next.js + React     │──────▶ │   API Gateway    │──────▶ │  Backend API    │
│  Monaco Editor       │  HTTPS │  (Auth + Routing)│        │  (Go / Gin)     │
└──────────────────────┘        └──────────────────┘        └────────┬────────┘
                                                                      │
                                         ┌────────────────────────────┼──────────┐
                                         ▼                            ▼          ▼
                                   ┌──────────┐            ┌──────────────┐  ┌──────┐
                                   │  Redis   │            │  PostgreSQL  │  │  S3  │
                                   │  Queue   │            │  Database    │  │Files │
                                   └────┬─────┘            └──────────────┘  └──────┘
                                        │
                                        ▼
                                ┌───────────────┐
                                │ Judge Workers │
                                │ (Docker exec) │
                                └───────────────┘
```

The submission flow is **fully asynchronous** — the Go API responds instantly with a `submission_id`, and the frontend polls for the verdict. This design keeps the server non-blocking under heavy concurrent load, leveraging Go's goroutines for efficient worker management.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14, React 18 | SSR/SSG, routing, UI |
| Code Editor | Monaco Editor | VS Code-grade editing experience |
| Backend | Go 1.22 (Gin framework) | REST API, business logic, concurrency |
| Judge Engine | Go + Docker SDK | Sandboxed code execution |
| Primary Database | PostgreSQL 15 | Users, problems, submissions |
| Cache & Queue | Redis 7 | Async job queue, session cache |
| File Storage | AWS S3 | Test cases, submitted code |
| Containerisation | Docker | Isolated execution environment |
| Deployment | Docker Compose | Local + CI/CD |

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Go](https://golang.org/dl/) 1.22+
- [Node.js](https://nodejs.org/) 18+ (for frontend)
- [PostgreSQL](https://www.postgresql.org/) 15+
- [Redis](https://redis.io/) 7+

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/codeVerdict.git
cd codeVerdict
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/codeverdictdb

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=168h

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_NAME=codeverdictbucket
AWS_REGION=ap-south-1

# Server
PORT=8000
APP_ENV=development
```

### 3. Install dependencies

```bash
# Backend (Go)
cd backend && go mod download

# Frontend (Next.js)
cd ../frontend && npm install
```

### 4. Run database migrations

```bash
cd backend
go run cmd/migrate/main.go up
go run cmd/seed/main.go      # optional: seed sample problems
```

### 5. Pull language Docker images

```bash
docker pull gcc:12           # C++
docker pull python:3.11-slim # Python
docker pull openjdk:17-slim  # Java
docker pull node:18-slim     # JavaScript
```

### 6. Start the application

```bash
# From root directory
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/swagger/index.html |

---

## How the Judge Engine Works

This is the most technically interesting part of codeVerdict. Written entirely in Go, the judge engine leverages goroutines to process multiple submissions concurrently without spawning OS threads per request.

Every submission goes through:

1. **Submission received** → saved to DB with status `PENDING`, job pushed to Redis queue
2. **Go judge worker picks up job** via a blocking `BRPOP` on the Redis queue
3. **Docker container spawned** with strict resource limits:

```bash
docker run \
  --memory="256m" \
  --cpus="1.0" \
  --network none \
  --read-only \
  --tmpfs /tmp:size=64m \
  --ulimit nproc=64 \
  compiler-image \
  timeout 2s ./run < input.txt
```

4. **Output compared** against expected output (whitespace-normalized)
5. **Verdict written** back to DB → Next.js frontend receives result via polling

**Security guarantees:**
- `--network none` — zero outbound internet access from inside the container
- `--read-only` — cannot write to the host filesystem
- `--memory` and `--cpus` — hard resource caps enforced by the kernel
- `ulimit nproc` — prevents fork bomb attacks
- Container is destroyed immediately after execution

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login, returns JWT |
| `GET` | `/api/problems` | List all problems (paginated) |
| `GET` | `/api/problems/:id` | Get single problem |
| `POST` | `/api/submissions` | Submit code |
| `GET` | `/api/submissions/:id` | Poll submission verdict |
| `GET` | `/api/leaderboard` | Global leaderboard |

Full Swagger documentation available at `/swagger/index.html` when running locally.

---

## Project Structure

```
codeVerdict/
├── frontend/                   # Next.js app
│   ├── src/
│   │   ├── app/                # App Router pages (Next.js 14)
│   │   ├── components/         # Editor, ProblemList, VerdictBadge
│   │   └── lib/                # API client, utils
│   └── package.json
│
├── backend/                    # Go API
│   ├── cmd/
│   │   ├── api/main.go         # Server entrypoint
│   │   ├── migrate/main.go     # DB migration runner
│   │   └── worker/main.go      # Judge worker entrypoint
│   ├── internal/
│   │   ├── handler/            # HTTP handlers (Gin)
│   │   ├── model/              # Submission, Problem, User structs
│   │   ├── repository/         # DB queries (sqlx)
│   │   ├── service/
│   │   │   ├── queue.go        # Redis job queue
│   │   │   ├── judge.go        # Docker execution logic
│   │   │   └── storage.go      # S3 integration
│   │   └── middleware/         # JWT auth, rate limiting
│   └── go.mod
│
├── docker-compose.yml
└── .env.example
```

---

## Verdict Types

| Verdict | Meaning |
|---|---|
| ✅ Accepted | All test cases passed |
| ❌ Wrong Answer | Output doesn't match expected |
| ⏱ Time Limit Exceeded | Execution exceeded the time limit |
| 💾 Memory Limit Exceeded | Used more memory than allowed |
| 💥 Runtime Error | Program crashed (segfault, exception) |
| 🔧 Compilation Error | Code failed to compile |

---

## Roadmap

- [x] Multi-language judge engine (Go)
- [x] Secure Docker sandboxing
- [x] Async Redis job queue
- [x] Real-time verdict via polling
- [x] User profiles and submission history
- [ ] Contest mode with live scoreboard
- [ ] WebSocket-based live verdict push (replace polling)
- [ ] Plagiarism detection (MOSS integration)
- [ ] Company hiring portal module
- [ ] Mobile-responsive editor

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

```bash
git checkout -b feature/your-feature-name
# make changes, then open a pull request
```

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

> Built to understand how platforms like LeetCode and Codeforces work under the hood — from the sandboxed judge engine and async submission pipeline to the Go concurrency model powering it all.
