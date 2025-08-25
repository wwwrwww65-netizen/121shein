# web

This is the main storefront application for the e-commerce platform, built with Next.js and the App Router.

## Features

- **Next.js App Router**: Modern, server-centric routing and data fetching.
- **TypeScript**: Type safety throughout the application.
- **Tailwind CSS**: Styled using the shared UI package's Tailwind config.
- **tRPC Integration**: Type-safe API calls to the backend service using the tRPC client.
- **Dockerized**: Comes with a multi-stage `Dockerfile` for building an optimized, standalone production image.

## How to Use

### Development

To start the web application in development mode, run the following command from the monorepo root:

```bash
npm run dev --workspace=web
```

The application will be available at `http://localhost:3000`.

### Build

To build the web application for production, run the following command from the monorepo root:

```bash
npm run build --workspace=web
```

This will create an optimized production build in the `.next` folder. The Dockerfile uses this build to create a standalone image.

### Prerequisites

For the application to run correctly and fetch data from the API, you must have the API service running and have a `.env` file at the monorepo root with the `NEXT_PUBLIC_API_URL` variable correctly set. See the root `README.md` for more details.
