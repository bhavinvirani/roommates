<div align="center">
  <br>
  <img alt="Roommate" src="https://github.com/user-attachments/assets/3dfc15b4-b7fb-4ae8-b932-607230ad68c3" width="200px">
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

## Cloud Architecture

The application is deployed on AWS Cloud, following the AWS Well-Architected Framework to ensure scalability, security, and reliability. Multiple AWS services are integrated to optimize performance and maintain best practices.

![301356490-024714eb-f4df-4145-b9b5-b2e504253ad9-2](https://github.com/user-attachments/assets/96936f5b-b427-4c02-a4dc-c2348fa9ee7b)

### **Frontend Architecture**
- **React.js Client** deployed using AWS services.
- **Amazon S3** for hosting static content.
- **CloudFront** as a CDN for fast and global content delivery.
- **ACM (AWS Certificate Manager)** for SSL/TLS certificates to secure communication.
- **Route 53** for DNS management and domain routing.

### **Backend Architecture**
- **Node.js Express API** containerized and stored in **ECR (Elastic Container Registry)**.
- **ECS (Elastic Container Service)** with **Fargate** for serverless, containerized deployment.
- **ALB (Application Load Balancer)** to distribute incoming traffic efficiently.
- **Secrets Manager** to manage sensitive environment variables like private keys securely.

### **Database Architecture**
- **Amazon RDS (Relational Database Service)** with **Postgres** for structured data storage.
- RDS is configured with automated backups, scaling, and multi-AZ deployment for high availability.

### **Media Storage & Delivery**
- **Amazon S3** for storing avatar images.
- **CloudFront** for caching and globally distributing images.
- **Secrets Manager** for securely retrieving private keys to generate CloudFront signed URLs.

### **Security & Compliance**
- **IAM Roles & Policies** to enforce least privilege access.
- **VPC (Virtual Private Cloud)** for secure networking and resource isolation.
- **Security Groups** to control inbound and outbound traffic.
- **CORS (Cross-Origin Resource Sharing)** implemented to allow controlled API access.

### **Scalability & Reliability**
- **Auto Scaling Groups** for backend services to handle varying traffic loads.
- **CloudWatch** for monitoring logs, performance metrics, and system health.
- **ECS Task Scheduling** for managing long-running background processes.



## CI/CD Pipeline

### Unit Testing:
- Emphasis on writing unit tests for backend API calls and frontend components.
- All unit tests must pass before merging any changes into the main branch to ensure functionality and stability.

### Deployment with GitHub Actions:
- **Frontend**: The React client is compiled and sent to an **S3 bucket**, followed by invalidating the **CloudFront** cache to deliver updated content.
- **Backend**: Docker images are uploaded to **ECR** and deployed through **ECS** using Fargate, ensuring the latest changes are live.

## Example
<img width="1494" alt="Banner" src="https://github.com/user-attachments/assets/94e6e4b4-6db2-4b9c-924b-e90dd016dea2" />
<img width="652" alt="signup" src="https://github.com/user-attachments/assets/9fae9065-dbba-462f-b001-331a653d06dd" />
<img width="962" alt="User-Profile" src="https://github.com/user-attachments/assets/51ac3317-3457-4110-9314-41ab53494288" />
<img width="1501" alt="Roommate-request-sent" src="https://github.com/user-attachments/assets/313e49a1-903b-4347-9c74-577aa4726d52" />
<img width="1500" alt="Roommate-request-recived" src="https://github.com/user-attachments/assets/a5e7a491-72a8-4a2f-998f-5b30b2ba6c76" />
<img width="1487" alt="roommate-profile" src="https://github.com/user-attachments/assets/e81fcf08-73ca-4dd4-a4ed-4a8e1efe978e" />


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
