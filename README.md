<div align="center">
  <br>
  <img alt="Roommate" src="" width="200px">
  <h1> Roommate </h1>
  <strong>💰 AI-powered wealth management web app—securely link multiple bank accounts, track transactions with receipt uploads, set budgets, and receive personalized AI-driven monthly reports based on past data.</strong>
</div>

### ⚙️ Tech Stack
## Features
- **Personal Account & Authentication**: Secure login with JWT, including access and refresh tokens for persistent sessions.
- **Profile Creation & Editing**: Add personal details like avatar, description, and lifestyle preferences.
- **User Search & Filters**: Search for users with advanced filtering options based on traits.
- **Roommate Requests**: Send/receive roommate requests with custom messages and manage them (approve, decline, rescind).
- **Roommate List**: View your personal roommates as well as other users' roommates.

## Frontend

**Technologies**: React.js, Axios, Bootstrap

- Integrated API calls using Axios for backend communication.
- Styled the UI with Bootstrap for a clean, responsive design.
- Implemented JWT-based authentication for secure login.
- Used Access and Refresh Tokens for session management.
- Developed user-friendly forms to create and edit profiles.
- Enabled profile search functionality with filters.
- Implemented features to manage roommate requests and interactions.

## Backend

**Technologies**: Express.js, Knex.js, AWS SDK

- Applied MVC architecture for clean and scalable code.
- Used Knex.js to interact with the database for profile and request management.
- Implemented CORS for secure API access.
- Managed JWT authentication and session persistence.
- Integrated AWS SDK for managing user avatar images in S3.
- Generated signed URLs using CloudFront for secure image access.
- Configured logging middleware for monitoring and debugging.

## Database

**Technologies**: PostgreSQL, Sequelize ORM

- Stored user profiles, requests, and roommate data in PostgreSQL.
- Used Sequelize ORM for efficient database management and queries.

### Avatar Image Management:
- **S3** and **CloudFront** for scalable, high-performance image delivery.
- **Secrets Manager** for securely managing private keys to generate signed CloudFront URLs.

## CI/CD Pipeline

### Unit Testing:
- Emphasis on writing unit tests for backend API calls and frontend components.
- All unit tests must pass before merging any changes into the main branch to ensure functionality and stability.

### Deployment with GitHub Actions:
- **Frontend**: The React client is compiled and sent to an **S3 bucket**, followed by invalidating the **CloudFront** cache to deliver updated content.
- **Backend**: Docker images are uploaded to **ECR** and deployed through **ECS** using Fargate, ensuring the latest changes are live.

## Configuration

### Development Setup

#### Frontend:
1. Set the `.env` file in the frontend directory with `REACT_APP_API_URL=http://localhost:8000/api/v1`.
2. Install dependencies: `npm install`.
3. Run the app: `npm run start`.

#### Backend:
1. Set the `.env` file in the backend directory with `CLIENT_URL=http://localhost:3000`.
2. Set `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` for user authentication.
3. Configure local MySQL with Docker or use an **RDS instance**.
4. Set up **S3**, **CloudFront**, and **Secrets Manager** for avatar image management.
5. Run the backend server: `npm run dev`.

### Production Setup

#### Frontend:
1. Set the `.env` file with `REACT_APP_API_URL=https://api.xyz.com/api/v1`.
2. Configure **S3** for static content, **CloudFront** for CDN, **Route 53** for DNS, and **ACM** for SSL/TLS certificates.
3. Deploy the React app: `npm run deploy`.

#### Backend:
1. Set the `.env` file with `CLIENT_URL=https://xyz.com`.
2. Configure **RDS MySQL**, **ECR**, **ECS**, and **Fargate** for deployment.
3. Set up **S3**, **CloudFront**, and **Secrets Manager** for avatar image storage and signed URL generation.

## Conclusion
This application follows best practices in cloud architecture and CI/CD pipelines, ensuring reliable and scalable deployment on AWS. The system is designed to provide secure, efficient, and user-friendly roommate matching functionality.