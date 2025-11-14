## Todo App

I wanted to try out TanStack Start (which is still in beta) so I made this
simple todo app with Google authentication and a MongoDB database.

NOTE: because it's using a release candidate I have not deployed this anywhere
yet, but it does work locally and has comprehensive unit tests.

https://github.com/user-attachments/assets/a50d388a-9226-453f-8873-ec017571274a

### Environment

You'll need the following env vars:

- `VITE_BASE_URL`: http://localhost:3000 in development
- `GOOGLE_CLIENT_ID`: your Google API client ID
- `GOOGLE_CLIENT_SECRET`: your Google API client secret
- `MONGO_URI`: your MongoDB connection string
- `SESSION_SECRET`: a secret key of your choosing (min 30 chars)

### Setup

This project uses pnpm as its package manager.

Install dependencies:

```bash
pnpm i
```

### Development

Start the development server

```bash
pnpm dev
```

### Testing

Run unit tests in watch mode

```bash
pnpm test
```

Run unit tests and generate a coverage report

```bash
pnpm test run --coverage
```
