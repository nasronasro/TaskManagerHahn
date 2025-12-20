# TaskManagerHahn - Full-Stack Task Management System

### Hahn Software Morocco - End of Studies Internship 2026

This project is a high-performance, containerized Task Management application designed to demonstrate enterprise-grade development standards. The implementation focuses on Clean Architecture, SOLID principles, and a professional DevOps lifecycle.

## Quick Start: Run with Docker

The entire ecosystem (API, Database, and Frontend) is orchestrated via Docker Compose. To start the application:

1. **Ensure Docker Desktop is running.**
    
2. **Open your terminal** in the project root.
    
3. **Run the following command:**
    
    ```
    docker compose up --build
    ```
    

Once the containers are healthy, the application will be accessible at the ports defined in the `docker-compose.yaml` file.

## 📺 Video Demonstration

A full walkthrough of the application, including the backend Swagger documentation and frontend workflows, is available here: [Project Showcase Video](http://youtube.com/watch?v=tKSs7xDUo-Q "null")

## Tech Stack

- **Backend:** .NET 10 (Web API)
    
- **Frontend:** React 19
    
- **Database:** SQL Server 2022
    
- **Testing:** xUnit
    
- **Containerization:** Docker and Docker Compose
    

## Architecture and Features

### Backend (.NET 10)

- **Clean Architecture:** Organized into Domain, Application, Infrastructure, and Presentation (API) layers to ensure high maintainability and decoupling.
    
- **Patterns:** Implemented the Repository Pattern for data abstraction and a Service Layer for business logic orchestration.
    
- **Data Flow:** Utilized DTOs (Data Transfer Objects) to manage data exchange between layers and keep the API controllers thin.
    
- **Documentation:** Integrated Swagger for real-time API exploration and documentation.
    
- **Testing:** Developed unit tests using xUnit to ensure the reliability of core business logic.
    

### Frontend (React 19)

- **Modular Structure:** Leveraged Custom Hooks to encapsulate logic, keeping components focused on the UI.
    
- **Core Workflows:** Developed full flows for user authentication (Login), project creation, and task management.
    
- **Dynamic Progress:** Integrated a real-time progress bar to track task completion within projects.
    

### DevOps and Git Flow

- **Docker Integration:** Used Dockerfiles and Docker Compose with health checks to manage service dependencies (ensuring SQL Server is ready before the API starts).
    
- **Version Control:** Simulated a professional environment using Git Flow with structured feature branches and frequent, descriptive commits.
    

## Manual Development Setup

### 1. Database Setup

Ensure SQL Server is installed locally or via a separate container. Update the connection string in the `appsettings.json` file within the backend project.

### 2. Running the Backend

Navigate to the backend directory:

```
dotnet restore
dotnet run
```

The API will be available for testing via the Swagger UI.

### 3. Running the Frontend

Navigate to the frontend directory:

```
npm install
npm run dev
```

### Project Context

This repository was developed as part of the application process for the **Hahn Software Morocco End of Studies Internship 2026**.
