## 📘 Digital Wallet System

A backend RESTful API built with **Node.js, Express, and MongoDB** that supports:

* User registration/login with JWT
* Virtual wallet operations (deposit, withdraw, transfer)
* Transaction history
* Basic fraud detection (rule-based)
* Admin reports

---

## 🚀 Features

* ✅ User registration & login (secure password hashing with bcrypt)
* 🔐 JWT-based authentication
* 💸 Deposit, Withdraw, Transfer APIs
* 📜 Per-user transaction history
* 🛡️ Rule-based fraud flagging
* 📊 Admin APIs for monitoring and summaries

---

## 📁 Folder Structure

```
digital-wallet/
├── controllers/         # Route logic
├── middleware/          # JWT auth
├── models/              # MongoDB schemas
├── routes/              # All API endpoints
├── utils/               # Fraud logic and helpers
├── .env                 # Env variables
├── .gitignore
├── server.js            # Entry point
```

---

## 🔧 Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* JWT for secure auth
* bcryptjs for password encryption
* Postman for API testing

---

## 🧪 Setup & Run Locally

### 📥 Clone the Repository

```bash
git clone https://github.com/KumarSharmaAkash/wallet_system.git
cd wallet_system
```

### 📦 Install Dependencies

```bash
npm install
```

### ⚙️ Setup `.env` File

Create a `.env` file in the root and add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/digital-wallet
JWT_SECRET=yourVerySecretKey
```

### ▶️ Start the Server

```bash
npm run dev
```

Make sure MongoDB is running locally (or connect to Atlas).

---

## 🔐 Authentication APIs

| Method | Route                      | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/api/auth/register`       | Register user                   |
| POST   | `/api/auth/login`          | Login user                      |
| GET    | `/api/auth/protected-test` | Test JWT protection (use token) |

---

## 💰 Wallet APIs (require JWT)

| Method | Route                      | Description         |
| ------ | -------------------------- | ------------------- |
| POST   | `/api/wallet/deposit`      | Deposit funds       |
| POST   | `/api/wallet/withdraw`     | Withdraw funds      |
| POST   | `/api/wallet/transfer`     | Transfer to user    |
| GET    | `/api/wallet/transactions` | View user's history |

Header for these:

```
Authorization: Bearer <your_token>
```

---

## 🛡️ Fraud Detection

Flags:

* More than 7 transfers in 1 minute
* Any transfer over 10,000,000 units

Flagged transactions are logged (mocked, no real ML).

---

## 🛠️ Admin APIs

| Method | Route                  | Description                    |
| ------ | ---------------------- | ------------------------------ |
| GET    | `/api/admin/fraud`     | View flagged transactions      |
| GET    | `/api/admin/sum`       | Aggregate all user balances    |
| GET    | `/api/admin/topUsers`  | Top users by volume or balance |

---

## 🔄 Postman Setup

1. Use `/api/auth/register` or `/api/auth/login` to get a token.
2. Add token to **Headers**:

   ```
   Key: Authorization
   Value: Bearer <token>
   ```
3. Call protected wallet or admin routes.


---

## 🔗 API Documentation

📘 Access the full public Postman documentation here:  
[Digital Wallet API Docs](https://documenter.getpostman.com/view/45213642/2sB2qaigcL)


## 👨‍💻 Author

Made with ❤️ by Akash

