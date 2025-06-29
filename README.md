# 🛒 Shop Easy

A simple full-stack e-commerce website built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This project demonstrates core features of an online shopping platform with a clean and responsive frontend and a functional backend API.

---

## 🌐 Live Demo

> _Coming soon or deploy using Render, Railway, or VPS._

---

## 📦 Features

### ✅ Frontend (React.js + Vite)

- Homepage displaying a list of products.
- Product Detail Page with image, price, and description.
- Cart Page: view selected items, quantity, and total price.
- Basic navigation bar for switching between Home and Cart.
- Responsive UI (basic styling included or customizable).

### ✅ Backend (Node.js + Express.js)

- RESTful APIs to:
  - Fetch all products
  - Fetch product by ID
  - Manage cart (add/remove items) — **optional**
- MongoDB as the database (hosted locally or using MongoDB Atlas)
- Seed script to populate initial product data

---

## 🧱 Tech Stack

| Layer       | Tech           |
|-------------|----------------|
| Frontend    | React.js (Vite), TypeScript |
| Backend     | Node.js, Express.js |
| Database    | MongoDB        |
| API Testing | Postman (optional) |
| Dev Tools   | Nodemon, dotenv, CORS |

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shop-easy.git
cd shop-easy
```

### 2. Setup Backend

```bash
cd backend
npm install
```

### 3. Create `.env` file

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
PORT=5000
```

### 4. Seed Product Data

```bash
npm run seed
```

### 5. Start Backend Server

```bash
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/products`        | Get all products            |
| GET    | `/api/products/:id`    | Get product by ID           |
| GET    | `/api/cart`            | Get current cart (optional) |
| POST   | `/api/cart/add`        | Add item to cart (optional) |
| POST   | `/api/cart/remove`     | Remove item from cart       |

---

## 📁 Project Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── config/
├── seed/
├── .env
└── server.js
```

---

## 👨‍💻 Author

**Siddardha Chaitanya**

- [GitHub](https://github.com/Siddu-06-0405/)
- [LinkedIn](https://www.linkedin.com/in/siddardha-chaitanya-5a804b298/)

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).