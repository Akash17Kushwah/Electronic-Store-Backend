# 🛒 Electronic Store Backend

A robust, enterprise-level backend system for an Electronic Store built with **Spring Boot 3.x**. This project provides a complete set of REST APIs to manage users, products, categories, shopping carts, orders, and payments.

## 🚀 Features

- **User Management**: Registration, profile updates, and role-based access control (RBAC).
- **Product Catalog**: Manage categories and products with image upload support.
- **Shopping Cart**: Add/remove items and calculate totals.
- **Order Management**: Create orders, track status, and manage order history.
- **Secure Authentication**: JWT (JSON Web Token) based authentication with Spring Security 6.
- **Payment Integration**: Support for **Razorpay** payment gateway.
- **Cloud Storage**: Image uploads handled via **Cloudinary**.
- **Social Login**: Support for Google Login.
- **API Documentation**: Interactive documentation using **Swagger UI**.

## 🛠️ Technology Stack

- **Core Framework**: Spring Boot 3.1.2
- **Language**: Java 21
- **Security**: Spring Security 6 + JWT
- **Database**: JPA / Hibernate (H2 for local testing, MySQL compatible)
- **Image Upload**: Cloudinary SDK
- **Payment Gateway**: Razorpay Java SDK
- **Mapping**: ModelMapper
- **Documentation**: SpringDoc OpenAPI (Swagger)

## 🏗️ Project Architecture (Blueprint)

The project follows a standard N-Tier architecture:
1.  **Controller Layer**: Handles HTTP requests and maps them to service methods.
2.  **Service Layer**: Contains business logic and orchestrates data flow.
3.  **Repository Layer**: Interacts with the database using Spring Data JPA.
4.  **Entity Layer**: JPA entities representing the database schema.
5.  **DTO Layer**: Data Transfer Objects for clean API communication.
6.  **Security Layer**: JWT filters, authentication providers, and entry points.

## 🏁 Getting Started

### Prerequisites
- JDK 21
- Maven 3.9+
- (Optional) MySQL Server 8.0+

### Local Setup
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Configuration:**
    - The project uses `application-dev.properties` for local development.
    - Currently configured to use **H2 In-Memory Database** for zero-config startup.
3.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
4.  **Access Swagger UI:**
    Open [http://localhost:9090/swagger-ui/index.html](http://localhost:9090/swagger-ui/index.html)

## 🔑 Default Credentials (Seed Data)

The application automatically seeds the database with the following users on startup:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` |
| **Normal User** | `durgesh@gmail.com` | `durgesh123` |

## 📡 Key Endpoints

- `POST /auth/login`: Authenticate and receive a JWT token.
- `GET /users`: List all users (Admin only).
- `GET /products`: List all products (Public).
- `POST /carts/{userId}`: Add items to a user's cart.
- `POST /orders`: Create a new order from a cart.
- `GET /h2-console`: Database web console (Local dev only).

---
*Created with ❤️ using Spring Boot.*
