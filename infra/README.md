# /infra

This directory contains all the infrastructure-related code for the project.

## Local Development Environment

The local development environment is managed by Docker Compose. It includes all the backend services needed to run the platform on your local machine.

### Services

- **PostgreSQL**: The main database for the application.
- **Redis**: A Redis server for caching and session storage.
- **MinIO**: An S3-compatible object storage server, useful for storing images and other assets locally.

### How to Use

1.  **Prerequisites**: Make sure you have Docker and Docker Compose installed on your machine.
2.  **Environment Variables**: Ensure you have a `.env` file in the root of the monorepo with the necessary variables (see `.env.example`).
3.  **Start the Services**: To start all the services, run the following command from the monorepo root:

    ```bash
    docker-compose -f infra/dev-docker-compose.yml up -d
    ```
4.  **Stop the Services**: To stop the services, run:
    ```bash
    docker-compose -f infra/dev-docker-compose.yml down
    ```

## Production Infrastructure (Terraform)

The `terraform/` directory contains the infrastructure-as-code for the production environment, written in Terraform. These files are placeholders and should be filled out to provision resources on your cloud provider of choice (e.g., AWS, GCP, Azure).

## CI/CD (GitHub Actions)

The CI/CD pipeline is defined in `.github/workflows/ci.yml`. It automates linting, testing, and building of the applications on every push and pull request to the `main` branch.
