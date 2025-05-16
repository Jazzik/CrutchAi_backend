# CrutchAI Backend (TypeScript Edition)

A modern, professional Node.js backend using TypeScript, Express, Supabase, Zod, Winston, Helmet, CORS, and Swagger/OpenAPI documentation.

## Features
- TypeScript for type safety
- Modular Express structure
- Supabase integration for authentication and data
- Request validation with Zod
- Logging with Winston
- Security with Helmet and CORS
- Auto-generated Swagger/OpenAPI docs

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── routes/         # Route definitions
├── services/       # Business logic and external services
├── utils/          # Utility functions
├── docs/           # Swagger/OpenAPI definitions
└── index.ts        # Application entrypoint
```

## Prerequisites
- Node.js (v18 or higher recommended)
- npm
- Supabase account and project

## Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   PORT=3000
   HOST=0.0.0.0
   NODE_ENV=development
   ```

## Running the Application

Development mode (with hot reload):
```bash
npm run dev
```

Build and run in production:
```bash
npm run build
npm start
```

## API Documentation

Swagger UI will be available at: `http://localhost:3000/api/docs`

## Scripts
- `npm run dev` — Start in development mode with hot reload
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Run compiled code
- `npm run docs` — Generate Swagger/OpenAPI JSON

---

For more details, see `src/docs/swaggerDef.ts` and inline comments in the codebase.
- `GET /`: Health check endpoint
- `GET /api/items`: Get all items from Supabase

## Error Handling

The application includes a global error handler that provides consistent error responses across all endpoints.

## Development

The project uses:

- Express.js for the web server
- Supabase for the database
- dotenv for environment variables
- nodemon for development
