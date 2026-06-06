# Recetópolis — Web
 
A community recipe platform where users can discover, share, and manage their own recipes.
 
---
 
## Tech Stack
 
| Layer | Technology |
|-------|------------|
| Framework | Astro 5 |
| Styling | Tailwind CSS |
| Database | MongoDB (Docker) |
| ODM | Mongoose |
| Auth | JWT + HTTP-only Cookies |
| Runtime | Node.js |
 
---
 
## Features
 
- Browse predefined and community recipes
- Search and filter by category, difficulty, and keyword
- User authentication (register, login, logout)
- Create, edit, and delete personal recipes
- Add and remove favorite recipes
- Leave reviews and ratings on recipes
---

## Project Structure
 
```
src/
├── components/
│   ├── profile/
│   │   ├── Sidebar.astro
│   │   └── EditProfileForm.astro
│   ├── Card.astro
│   ├── Navbar.astro
│   └── Footer.astro
│
├── layouts/
│   ├── Layout.astro
│   └── ProfileLayout.astro
│
├── lib/
│   ├── db.ts
│   └── jwt.ts
│
├── models/
│   ├── Recipe.ts
│   ├── User.ts
│   └── Review.ts
│
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── logout.ts
│   │   ├── recipes/
│   │   │   ├── index.ts
│   │   │   └── [id].ts
│   │   ├── users/
│   │   │   ├── index.ts
│   │   │   ├── [id].ts
│   │   │   └── [id]/
│   │   │       └── favorites/
│   │   │           ├── index.ts
│   │   │           └── [recipeId].ts
│   │   └── reviews/
│   │       ├── index.ts
│   │       └── [recipeId].ts
│   ├── auth/
│   │   ├── login.astro
│   │   └── register.astro
│   ├── profile/
│   │   ├── index.astro
│   │   ├── favorites.astro
│   │   └── recipes/
│   │       ├── index.astro
│   │       └── create.astro
│   └── index.astro
│
├── styles/
│   └── global.css
│
├── env.d.ts
└── middleware.ts
 
scripts/
└── seed.ts
 
docker-compose.yml
.env.example
```
 
---
 
## Getting Started
 
```bash
# 1. Clone the repo
git clone https://github.com/Dannychipil/Recetopolis.git
cd Recetopolis
 
# 2. Install dependencies
pnpm install
 
# 3. Set up environment variables
cp .env.example .env
 
# 4. Start MongoDB
docker-compose up -d
 
# 5. Seed the database
pnpm seed
 
# 6. Start the dev server
pnpm dev
```
 
---
 
## Environment Variables
 
```env
MONGODB_URI=mongodb://localhost:27017/recetopolis
JWT_SECRET=your_secret_key_here
```
