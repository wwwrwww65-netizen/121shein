# @repo/api

This package contains the tRPC API for the monorepo. It's built with Express and provides type-safe endpoints that can be consumed by the web and mobile applications.

## Features

- **tRPC Framework**: End-to-end type safety from backend to frontend.
- **Express Server**: A robust and minimal web server.
- **Zod Validation**: Schema validation for API inputs.
- **Database Integration**: Connects to the `@repo/db` package to interact with the database.
- **Dockerized**: Comes with a multi-stage `Dockerfile` for building optimized production images.

## How to Use

### Development

To start the API server in development mode (with hot-reloading), run the following command from the monorepo root:

```bash
npm run dev --workspace=@repo/api
```

The server will be available at `http://localhost:4000`.

### Build

To build the API for production, run the following command from the monorepo root:

```bash
npm run build --workspace=@repo/api
```

The compiled output will be in the `dist` folder.

### Production

To run the built server in production, use:

```bash
npm start --workspace=@repo/api
```

Make sure you have a `.env` file with the necessary environment variables (like `DATABASE_URL`) in the monorepo root.
