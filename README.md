# CrutchAI Backend

A Node.js backend application with Express and Supabase integration.

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── routes/         # Route definitions
├── services/       # Business logic and external services
└── utils/          # Utility functions
```

## Prerequisites

- Node.js (v14 or higher)
- npm
- Supabase account and project

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## API Endpoints

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
