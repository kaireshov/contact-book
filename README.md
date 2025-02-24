# 📖 Contact Book API

The **Contact Book API** is a web application that helps users manage their contacts, organize them into groups, and track call histories. Built with **Node.js**, **Express**, and **MongoDB** for the backend, and **HTML**, **CSS**, and **JavaScript** for the frontend, this app offers a smooth and secure way to stay organized!

---

## 🚀 Features

- ✅ **Add new contacts** (name, phone number, email)
- ✅ **Delete contacts** as needed
- ✅ **View a list** of your saved contacts
- ✅ **Create groups** by grouping contacts together
- ✅ **View a list of groups** and manage them
- ✅ **Record call history** for each contact
- ✅ **Secure user authentication** using **JWT**
- ✅ **RESTful API** for easy integration with other systems

---

## 🛠 Technologies Used

### 📌 Backend

- **Node.js**: JavaScript runtime for the server-side logic
- **Express.js**: Web framework for handling API routing
- **MongoDB (with Mongoose)**: NoSQL database for contact storage
- **JWT (JSON Web Token)**: Secure authentication for users
- **Bcrypt.js**: Password hashing to ensure user data security
- **Cors**: Handles frontend-backend communication across different domains
- **Dotenv**: Manages environment variables easily

### 🎨 Frontend

- **HTML**: Structuring the web pages
- **CSS**: Styling the application for a responsive UI
- **JavaScript (Fetch API)**: Handles API requests to the backend

---

## 📥 How to Run Locally?

To run the Contact Book API on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/kaireshov/contact-book.git
cd contact-book
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the server
```bash
nodemon server.js
```
The server will be running on: `http://localhost:3000`

### 5. Open the frontend
Navigate to the `public/` folder and open `index.html` in your browser.

---

## 🔗 API Endpoints

### 📝 Contacts

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/contacts`         | Add a new contact                 |
| GET    | `/contacts`         | Get all contacts (for logged-in users) |
| DELETE | `/contacts/:id`     | Delete a contact by its ID        |

### 🏷 Groups

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/groups`           | Create a new group with contacts  |
| GET    | `/groups`           | Get all groups (for logged-in users) |

### 🔐 Authentication

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/auth/register`    | Register a new user               |
| POST   | `/auth/login`       | Log in and get a JWT token        |

---

## 🎨 Screenshots

### 📋 Contact List
![Contact List Screenshot](path/to/contact-list-image.png)

### 📌 Group Creation
![Group Creation Screenshot](path/to/group-creation-image.png)

---

## 👨‍💻 Contributing

We welcome contributions! Here’s how you can help:

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/contact-book.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b feature-branch
   ```
4. **Make your changes** to the code
5. **Commit your changes**:
   ```bash
   git commit -m "Added new feature"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature-branch
   ```
7. **Create a Pull Request** to the main repository

---

## 📜 License

This project is **open-source** and available under the [MIT License](LICENSE).

---

## 🎯 Contact

- 📧 **Email**: your-email@example.com
- 🌐 **GitHub**: [kaireshov](https://github.com/kaireshov)
# contact-book
# contact-book
