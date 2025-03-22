# Formative-Project-Product-Catalog-API

# Product Catalog API

## Overview
The Product Catalog API allows users to register, log in, and manage products in a catalog. It provides authentication, user management, and CRUD operations for products.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcryptjs (for password hashing)
- jsonwebtoken (JWT authentication)
- Postman (for API testing)

---

## Installation and Setup
### Prerequisites
- Node.js and npm installed
- MongoDB running locally or via a cloud provider (e.g., MongoDB Atlas)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   cd product-catalog-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

---

## API Documentation

### Authentication Endpoints
#### Register a User
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### Login a User
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

---

### Protected Routes
Protected routes require authentication via a JWT token.

#### Access a Protected Route
- **Endpoint:** `GET /api/protected-route`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Access granted"
  }
  ```

---

### Product Endpoints
#### Create a Product
- **Endpoint:** `POST /api/products`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "name": "Laptop",
    "description": "A high-performance laptop",
    "price": 1200
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product created successfully"
  }
  ```

#### Get All Products
- **Endpoint:** `GET /api/products`
- **Response:**
  ```json
  [
    {
      "id": "123",
      "name": "Laptop",
      "description": "A high-performance laptop",
      "price": 1200
    }
  ]
  ```

#### Update a Product
- **Endpoint:** `PUT /api/products/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Request Body:**
  ```json
  {
    "name": "Updated Laptop",
    "description": "An even better laptop",
    "price": 1300
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product updated successfully"
  }
  ```

#### Delete a Product
- **Endpoint:** `DELETE /api/products/:id`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```

