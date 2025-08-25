# Shein-Like E-Commerce Platform (Monorepo)

This repository contains the source code for a full-stack, Shein-like e-commerce platform. It is built as a monorepo using `npm` workspaces and contains the web storefront, mobile apps, backend API, and shared packages.

## Architecture Overview

The project is structured as a monorepo with the following key components:

-   `apps/web`: The main e-commerce website, built with Next.js and the App Router.
-   `apps/mobile`: The iOS and Android mobile application, built with React Native and Expo.
-   `packages/api`: The backend API server, built with tRPC and Express.
-   `packages/db`: The database layer, managed by Prisma ORM.
-   `packages/ui`: A shared React component library with a consistent design system using Tailwind CSS.
-   `infra`: Contains the Docker Compose setup for the local development environment and placeholder Terraform files for production infrastructure.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   **Node.js**: Version 18 or higher.
-   **npm**: Version 8 or higher.
-   **Docker** and **Docker Compose**: Required to run the local development services.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Set Up Environment Variables

Copy the `.env.example` file to a new file named `.env` in the root of the project.

```bash
cp .env.example .env
```

Review the variables in the `.env` file. The default values are configured to work with the local Docker Compose setup, but you can customize them if needed.

### 3. Install Dependencies

Install all the dependencies for all packages from the monorepo root.

```bash
npm install
```

### 4. Start Local Development Services

Start the PostgreSQL database, Redis cache, and MinIO object storage using Docker Compose.

```bash
docker-compose -f infra/dev-docker-compose.yml up -d
```

### 5. Run Database Migrations

Apply the database schema to your local PostgreSQL instance using Prisma Migrate.

```bash
npm run db:migrate --workspace=@repo/db
```

### 6. Seed the Database (Optional)

Populate the database with initial sample data (users, products, categories).

```bash
npm run db:seed --workspace=@repo/db
```

### 7. Run the Applications

You can run all applications concurrently or start them individually.

**Run all apps in parallel (recommended):**

```bash
npm run dev
```

**Run individual applications:**

```bash
# Start the API server
npm run dev --workspace=@repo/api

# Start the Web application
npm run dev --workspace=web

# Start the Mobile application
npm run start --workspace=mobile
```

You should now have the following services running:
-   **API Server**: `http://localhost:4000`
-   **Web App**: `http://localhost:3000`
-   **Mobile App (Metro Bundler)**: `http://localhost:8081`

## Available Scripts

Here are some of the most common scripts, which can be run from the monorepo root:

-   `npm run dev`: Starts all applications in development mode.
-   `npm run build`: Builds all applications for production.
-   `npm run lint`: Lints all code in the monorepo.
-   `npm run db:migrate --workspace=@repo/db`: Runs database migrations.
-   `npm run db:seed --workspace=@repo/db`: Seeds the database.
