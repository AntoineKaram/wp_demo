# Backend Services with Dapr Integration

This project contains two backend services (`api-service` and `data-service`) and a frontend (`React` + `TypeScript`), integrated with Dapr for service discovery and communication. The services are containerized using Docker Compose and communicate via the Dapr HTTP API.

---

## Project Structure

```yml
Dapr/ # Contains Dapr configuration (e.g., config.yaml)
docker-compose.yml # Manages all services and sidecars
services/
├── api-service/ # Handles API requests and calls other services
├── data-service/ # Manages supplier data and interacts with the database
frontend/ # React + TypeScript frontend service
```

---

## Services

### 1. data-service

- Manages supplier data.
- Connects to a PostgreSQL database to store and retrieve data.
- Dapr sidecar configured to expose HTTP API on port `3501`.

### 2. api-service

- Frontend-facing API service.
- Invokes `data-service` using Dapr for supplier-related operations.
- Dapr sidecar configured to expose HTTP API on port `3502`.

### 3. frontend

- Built using React + TypeScript.
- Serves as the user interface for interacting with the backend services.
- Uses environment variables to configure API endpoints.
- Runs on port `5173` during development (recommended => port `80` in production (served by NGINX)).

---

## Technologies Used

- **Dapr**: Service-to-service invocation, access control, and service discovery.
- **Docker Compose**: Orchestrates services and sidecars.
- **Node.js & Express**: Backend services.
- **React + TypeScript**: Frontend SPA.
- **PostgreSQL**: Database for supplier data.
- **Redis**: Optional for caching and pub/sub if needed.

---

## Running the Project

### Prerequisites

1. Install Docker and Docker Compose.
2. Clone this repository:
   ```bash
   git clone https://github.com/AntoineKaram/wp_demo
   cd wp_demo
   ```

### Start the Services

To start all services and Dapr sidecars, run:

```bash
docker-compose up --build
```
### Start the Frontend

```bash
cd ./frontend
npm install
npm run dev
```
### Verify the Services
1. Frontend:
    - Access the frontend at: http://localhost:5173

2. Dapr HTTP API for `data-service`:
   ```bash
   curl http://localhost:3501/v1.0/invoke/data-service/method/suppliers
   ```
3. Dapr HTTP API for `api-service`:
   ```bash
   curl http://localhost:3501/v1.0/invoke/api-service/method/suppliers
   ```

---

## Environment Variables

| Service        |     Variable      | Description                                |
| :------------- | :--------------:  | ------------------------------------------ |
| `data-service` |  `DATABASE_URL`   | Connection string for PostgreSQL database. |
| `api-service`  | `DAPR_HTTP_PORT`  | Dapr HTTP API port for service discovery.  |
| `api-service`  | `DAPR_HTTP_HOST`  | Hostname for Dapr HTTP API.                |
| `frontend`     |`VITE_API_BASE_URL`| Base URL for API requests in the frontend. |

## Docker Compose Services

| Service             | Description                                  | Port Bindings |
| ------------------- | -------------------------------------------- | ------------- |
| `data-service`      | Backend service for supplier data.           | `3001:3001`   |
| `api-service`       | Frontend-facing API service.                 | `3002:3002`   |
| `data-service-dapr` | Dapr sidecar for data-service.               | `3501, 50001` |
| `api-service-dapr`  | Dapr sidecar for api-service.                | `3502, 50002` |
| `postgres`          | PostgreSQL database for data-service.        | `5432:5432`   |
| `redis`             | Redis server (optional for caching/pub-sub). | `6379:6379`   |
