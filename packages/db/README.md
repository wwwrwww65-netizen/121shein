# @repo/db

This package contains all the database-related code for the monorepo. It uses Prisma as the ORM to interact with the PostgreSQL database.

## Features

- **Prisma Schema**: The schema is defined in `prisma/schema.prisma`.
- **Database Migrations**: Migrations are managed by Prisma Migrate.
- **Database Seeding**: A seed script is available to populate the database with initial data.
- **Type-safe Client**: Prisma generates a type-safe client that can be used by other packages (like the API server).

## How to Use

### Generate Prisma Client

To generate the Prisma client based on the schema, run:

```bash
npm run db:generate -w @repo/db
```

### Run Migrations

To apply database migrations, run:

```bash
npm run db:migrate -w @repo/db
```
This will create and apply SQL migrations based on the changes in the `schema.prisma` file.

### Seed the Database

To populate the database with the initial data defined in `prisma/seed.ts`, run:

```bash
npm run db:seed -w @repo/db
```

**Note**: You need to have a running PostgreSQL server and a correctly configured `.env` file at the root of the monorepo for these commands to work. See the root `README.md` for more details on setup.
