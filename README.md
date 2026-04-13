# 101509539 | COMP3133 Assignment 2

**Full Stack Employee Management System**  
George Brown College | Full Stack Development II

---

## Student Info

| Field | Value |
|-------|-------|
| Student ID | 101509539 |
| Name | Nirja Dabhi |
| Course | COMP3133 - Full Stack Development II |
| Assignment | Assignment 2 (16%) |

---

## Live Links

| Resource | URL |
|----------|-----|
| Frontend (Vercel) | https://101509539-comp3133-assignment2.vercel.app |
| Backend (Render) | https://comp3133-backend-jbd1.onrender.com/graphql |
| GitHub Repository | https://github.com/whatnirja/101509539_comp3133_assignment2 |

---

## Tech Stack

### Frontend
- Angular 19 (Standalone Components)
- Apollo Angular (GraphQL client)
- Angular Material UI
- TypeScript
- SCSS

### Backend
- Node.js + Express
- Apollo Server 4 (GraphQL)
- MongoDB + Mongoose
- JWT Authentication
- dotenv

---

## Project Structure

```
101509539_comp3133_assignment/
├── frontend/                          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── login/             # Login screen
│   │   │   │   ├── signup/            # Signup screen
│   │   │   │   ├── employee-list/     # Employee directory
│   │   │   │   ├── employee-add/      # Add employee form
│   │   │   │   ├── employee-edit/     # Edit employee form
│   │   │   │   └── employee-view/     # Employee detail view
│   │   │   ├── core/
│   │   │   │   ├── services/          # Auth + Employee services
│   │   │   │   ├── guards/            # Route auth guard
│   │   │   │   └── interceptors/      # JWT interceptor
│   │   │   └── graphql/               # GraphQL queries/mutations
│   │   └── styles.scss                # Global styles
│   └── package.json
├── backend/                           # Node.js GraphQL API
│   ├── src/
│   │   ├── config/                    # MongoDB connection
│   │   ├── graphql/                   # TypeDefs + Resolvers
│   │   └── middleware/                # JWT auth middleware
│   └── server.js
└── README.md
```

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8081
```

Run backend:
```bash
node server.js
```

Backend runs at: `http://localhost:8081/graphql`

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs at: `http://localhost:4200`

---

## Features

### Authentication
- User Signup with validation
- User Login with JWT token
- Session management via localStorage
- Protected routes with AuthGuard
- Logout with session clear

### Employee Management
- **List** — View all employees in a table with avatars, badges, salary
- **Add** — Form with all fields + profile photo upload (base64)
- **View** — Detailed profile card with all employee info
- **Edit** — Pre-filled form to update any employee field
- **Delete** — One-click delete with confirmation

### Search
- Search by department
- Search by designation
- Real-time GraphQL query

### UI/UX
- Modern dashboard layout with icon sidebar
- Stat cards (Total Employees, Departments, Designations)
- Responsive design
- Form validation with error messages
- Angular Material components

---

## GraphQL API

### Queries
| Query | Description |
|-------|-------------|
| `login(input)` | Authenticate user, returns JWT |
| `getAllEmployees` | Fetch all employees |
| `getEmployeeByEid(eid)` | Fetch single employee |
| `searchEmployees(designation, department)` | Search employees |
| `me` | Get current user |

### Mutations
| Mutation | Description |
|----------|-------------|
| `signup(input)` | Register new user |
| `addEmployee(input)` | Create new employee |
| `updateEmployeeByEid(eid, input)` | Update employee |
| `deleteEmployeeByEid(eid)` | Delete employee |

---

## Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** hosted on [MongoDB Atlas](https://cloud.mongodb.com)

---

## Screenshots

See `screenshots.pdf` submitted on D2L for:
- MongoDB data
- GraphQL API tests (Postman)
- Frontend CRUD operations
- Search functionality
