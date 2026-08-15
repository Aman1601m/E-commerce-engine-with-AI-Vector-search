# 🚀 High-Performance E-Commerce Engine with AI Vector Search

A scalable backend for an E-Commerce platform built with **Node.js**, **Express.js**, **MongoDB Atlas**, **Redis**, and **Google Gemini Embeddings**.

This project focuses on high-performance product retrieval using Redis caching and AI-powered semantic product search using MongoDB Atlas Vector Search.

---

# 📌 Features

## 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role Based Authorization (Admin/User)

---

## 📦 Product Management

- Create Product
- Update Product
- Delete Product
- Get Product by ID
- Get All Products
- Pagination
- Filtering
- Sorting
- Keyword Search

---

## 🛒 Shopping

- Shopping Cart
- Create Orders
- Stock Management

---

## ⚡ Performance

- Redis Integration
- Cache Aside Pattern
- Product Cache
- Cache Invalidation

---

## 🤖 AI Features

- Google Gemini Embeddings
- Product Embedding Generation
- Semantic Search API
- MongoDB Atlas Vector Search
- Redis Cache for Semantic Search

---

# 🏗️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Cache

- Redis

### Authentication

- JWT

### AI

- Google Gemini API
- Gemini Embedding Model
- MongoDB Atlas Vector Search

---

# 📂 Project Structure

```
backend/
│
├── config/
│   ├── db.js
│   └── redis.js
│
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── orderController.js
│
├── middleware/
│   ├── protect.js
│   ├── authorize.js
│   ├── validate.js
│   ├── errorHandler.js
│   └── notFound.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
│
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── services/
│   ├── productService.js
│   └── embeddingService.js
│
├── utils/
│
├── validations/
│
├── app.js
├── server.js
└── package.json
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into the project

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

JWT_EXPIRES_IN=1d

REDIS_URL=redis://localhost:6379

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

# 🔑 Demo Accounts

To quickly test the application locally without registering, use the following credentials:

**Admin Account:**
- **Email:** `admin@nexus.com`
- **Password:** `admin123`

**Customer Account:**
- **Email:** `user@nexus.com`
- **Password:** `user123`

---

# ▶️ Run the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 📖 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Products

| Method | Endpoint |
|----------|----------------------------|
| GET | /api/products |
| GET | /api/products/:id |
| POST | /api/products |
| PUT | /api/products/:id |
| DELETE | /api/products/:id |
| GET | /api/products/semantic-search?q=search |

---

## Cart

| Method | Endpoint |
|----------|----------------|
| GET | /api/cart |
| POST | /api/cart |
| PUT | /api/cart/:id |
| DELETE | /api/cart/:id |

---

## Orders

| Method | Endpoint |
|----------|----------------|
| POST | /api/orders |
| GET | /api/orders |
| GET | /api/orders/:id |

---

# 🚀 AI Semantic Search

When a product is created:

```
Product
      │
      ▼
Gemini Embedding API
      │
      ▼
Embedding Vector
      │
      ▼
MongoDB Product Document
```

When a user searches:

```
User Query
      │
      ▼
Gemini Embedding
      │
      ▼
MongoDB Atlas Vector Search
      │
      ▼
Top Matching Products
```

---

# ⚡ Redis Cache

The project follows the **Cache Aside Pattern**.

```
Client
   │
   ▼
Redis
   │
 HIT / MISS
   │
   ▼
MongoDB
```

Product cache is automatically invalidated whenever:

- Product Created
- Product Updated
- Product Deleted

Semantic search results are also cached for faster repeated searches.

---

# 📈 Current Status

✅ Authentication
✅ Authorization
✅ Product CRUD
✅ Validation
✅ Global Error Handling
✅ Product Search
✅ Pagination
✅ Filtering
✅ Sorting
✅ Shopping Cart
✅ Orders
✅ Redis Integration
✅ Cache Aside Pattern
✅ Cache Invalidation
✅ Gemini Embeddings
✅ MongoDB Atlas Vector Search
✅ Semantic Product Search
✅ **User Dashboard (Addresses & Order History)**
✅ **Multi-Step Checkout Flow**
✅ **Wishlist Functionality**

---

# Future Improvements

- Payment Gateway Integration
- Product Reviews
- Coupons
- Admin Dashboard
- Image Upload (Cloudinary)
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Developed By

**Aman Shrivastava** & **Shikhar Gupta**

Project:
**High-Performance E-Commerce Engine with AI Vector Search**