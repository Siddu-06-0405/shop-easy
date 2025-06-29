
# 🛒 Shop Easy

Welcome to **Shop Easy**, a full-featured e-commerce web application built using the **MERN stack** — **MongoDB**, **Express.js**, **React.js**, and **Node.js**. This project showcases a scalable online shopping experience with features like authentication, cart management, wishlist, orders, and integrated payments.

---

## 🌐 Live Demo

▶️ **Live URL**: [https://shop-easy-b72o.onrender.com/](https://shop-easy-b72o.onrender.com/)

---

## 🎯 Features

### 🖼️ Frontend (React + Vite + TypeScript)

- ⚡ Lightning-fast performance with Vite bundler
- 🎨 Modern UI using Tailwind CSS & shadcn/ui components
- 👥 User authentication (signup/login with JWT)
- 🛒 Add to cart, update quantity, remove items
- ❤️ Wishlist toggle with heart icon
- 🧾 Razorpay payment gateway integration
- 📦 Order history and status tracking (Amazon-style UI)
- 🧑‍💼 Admin panel to manage products and orders
- 🔐 Protected routes using React Router
- 📱 Fully responsive design (mobile-first)
- 🎯 State management with React Query (@tanstack/react-query)

### ⚙️ Backend (Node.js + Express.js)

- 🔐 Secure JWT-based authentication
- 🧩 Modular REST API (products, cart, wishlist, orders, users)
- 💳 Razorpay payment verification (signature-based)
- 📁 File upload support for product images (Multer)
- 📊 Admin-only access control for product management
- 🌍 CORS + dotenv + express middlewares
- 🧪 Seed script to pre-populate product data

---

## 🔧 Technologies Used

| Category        | Technology               |
|-----------------|--------------------------|
| Frontend        | React, TypeScript, Vite  |
| Styling         | Tailwind CSS, shadcn/ui  |
| State Management| React Query, Context API |
| Routing         | React Router Dom         |
| Icons           | Lucide React             |
| Backend         | Node.js, Express.js      |
| Database        | MongoDB (Mongoose)       |
| Authentication  | JWT                      |
| Payments        | Razorpay                 |
| Deployment      | Render.com               |
| Testing         | Postman (manual)         |

---

## 🧩 Folder Structure

```
shop-easy/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── .env
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        │   └── ui/              # shadcn/ui components
        ├── hooks/
        ├── lib/
        ├── pages/
        ├── types/
        ├── utils/
        └── main.tsx
```

---

## 🚀 Getting Started Locally

### 📁 Clone Repository

```bash
git clone https://github.com/Siddu-06-0405/shop-easy.git
cd shop-easy
```

### 🔙 Backend Setup

#### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

#### 2️⃣ Create .env file
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_API_KEY=your_razorpay_key
RAZORPAY_API_SECRET=your_razorpay_secret
MODE=development
```

#### 3️⃣ Seed Product Data
```bash
npm run seed
```

#### 4️⃣ Start Backend Server
```bash
npm start
```
🟢 Server runs on http://localhost:5000

💡 Serves frontend from ../frontend/dist when MODE=production

### 🔜 Frontend Setup

#### 1️⃣ Install Dependencies
```bash
cd frontend
npm install
```

#### 2️⃣ Environment File
An `.env` file in frontend folder is already present, just modify it to below configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

#### 3️⃣ Start Development Server
```bash
npm run dev
```
🟢 Frontend runs on http://localhost:8080

#### 4️⃣ Build Frontend for Production
```bash
npm run build
```
📁 Build output will be in `frontend/dist` and will be auto-served by the backend if MODE=production.

---

## 🧪 API Endpoints

### 🛍 Products

| Method | Route                          | Description            |
|--------|--------------------------------|------------------------|
| GET    | `/api/products`                | Get all products       |
| GET    | `/api/products/total-products` | Get total product count |
| GET    | `/api/products/:id`            | Get single product     |
| POST   | `/api/products`                | Create a new product   |
| PUT    | `/api/products/:id`            | Update a product       |
| DELETE | `/api/products/:id`            | Delete a product       |


### 🛒 Cart

| Method | Route             | Description             |
|--------|-------------------|-------------------------|
| GET    | `/api/cart`       | Get user's cart         |
| POST   | `/api/cart/add`   | Add item to cart        |
| POST   | `/api/cart/remove`| Remove item from cart   |
| POST   | `/api/cart/clear` | Clear all items in cart |


### ❤️ Wishlist
| Method | Route               | Description             |
|--------|---------------------|-------------------------|
| GET    | `/api/wishlist`     | Get wishlist items      |
| POST   | `/api/wishlist`     | Add product to wishlist |
| DELETE | `/api/wishlist/:id` | Remove from wishlist    |


### 🔐 Auth
| Method | Route                          | Description              |
|--------|--------------------------------|--------------------------|
| POST   | `/api/auth/register`           | Register a new user      |
| POST   | `/api/auth/login`              | Login a user             |
| GET    | `/api/auth/profile`            | Get user profile         |
| GET    | `/api/auth/total-users`        | Get total user count     |
| GET    | `/api/auth/all-customers`      | Get all customers        |


### 📦 Orders
| Method | Route                              | Description                  |
|--------|------------------------------------|------------------------------|
| GET    | `/api/orders`                      | Get all orders (admin)       |
| GET    | `/api/orders/:id`                  | Get order by ID              |
| GET    | `/api/orders/o/total-orders`       | Get total number of orders   |
| GET    | `/api/orders/o/total-revenue`      | Get total revenue            |
| GET    | `/api/orders/o/recent-orders`      | Get recent orders            |
| PUT    | `/api/orders/:id/status`           | Update order status          |
| DELETE | `/api/orders/:id`                  | Delete an order              |
| POST   | `/api/orders`                      | Place a new order (auth)     |
| GET    | `/api/orders/user/:id`             | Get orders by user ID (auth) |


### 💳 Payments

| Method | Route                                 | Description                         |
|--------|---------------------------------------|-------------------------------------|
| POST   | `/api/payments/checkout`              | Initiate a Razorpay checkout        |
| POST   | `/api/payments/payment-verification`  | Verify Razorpay payment signature   |
| GET    | `/api/payments/verify-payment-status` | Check payment status                |


---

## 🛡️ Environment Variables (Render)

Render will use these under Environment > Secret Files or Environment Variables.

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=supersecretjwtkey
RAZORPAY_API_KEY=rzp_test_xxxxxxxxx
RAZORPAY_API_SECRET=xxxxxxxxxxxxxx
MODE=production
```

📂 Or put them into a secret file named `.env` in Render dashboard.

---

## 🚀 Deployment on Render

### Backend Build Command
```bash
cd frontend && npm install && npm run build && cd ../backend && npm install
```

### Start Command
```bash
node backend/server.js
```

### Static Directory
Leave it blank — the backend will serve `frontend/dist` automatically if `MODE=production`.

---

## 📱 Key Features Showcase

### 🎨 Amazon-Style Order History
- Professional order cards with status indicators
- Detailed order tracking and delivery information
- Action buttons for reordering, reviews, and returns
- Responsive design that works on all devices

### 🛒 Shopping Cart Management
- Real-time cart updates
- Quantity adjustments
- Persistent cart state across sessions

### 💳 Secure Payment Integration
- Razorpay payment gateway
- Payment verification and order confirmation
- Secure transaction handling

### 🔐 Authentication & Authorization
- JWT-based authentication
- Protected routes for authenticated users
- Admin-only access controls

---

## 👨‍💻 Author

**Siddardha Chaitanya**

- 🧑‍💻 GitHub: [@Siddu-06-0405](https://github.com/Siddu-06-0405)
- 💼 LinkedIn: [@siddardha-chaitanya](https://www.linkedin.com/in/siddardha-chaitanya-5a804b298/)
- 📧 Email: csiddhardha0@gmail.com

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Razorpay Docs](https://razorpay.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render.com](https://render.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 🏁 Future Improvements

- ✅ Product reviews & ratings
- ✅ Email notifications for order confirmation
- ✅ Inventory stock auto-update
- ✅ Admin product image upload
- ✅ Mobile-first UI optimization
- ✅ Pagination for product listing
- 🔄 Real-time order tracking
- 🔄 Advanced search and filtering
- 🔄 Wishlist sharing functionality
- 🔄 Multi-language support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Siddu-06-0405/shop-easy/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!
