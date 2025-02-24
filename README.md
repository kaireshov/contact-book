# 📖 Contact Book  

### 📌 About the Project  
Contact Book is a web application for managing contacts. Users can register, log in, and manage their contacts efficiently.  

### 🚀 Deployment  
The application is deployed on **Render**:  
🔗 **Frontend**: [https://contact-book-nk37.onrender.com](https://contact-book-nk37.onrender.com)  
🔗 **Backend API**: [https://contact-book-nk37.onrender.com/api](https://contact-book-nk37.onrender.com/api)  

### 📌 Features  
- User registration and authentication  
- Contact management (name, email, phone)  
- CRUD operations for contacts  
- JWT authentication  
- MongoDB database integration  

### 🛠️ Technologies  
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (via Mongoose)  
- **Deployment**: [Render](https://render.com)  

### 📌 Installation (Local Setup)  
1. **Clone the repository**  
   ```sh
   git clone https://github.com/kaireshov/contact-book.git
   cd contact-book
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Start the server**  
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:10000`  

### 📌 Environment Variables (`.env`)  
Create a `.env` file in the root directory and add:  
   ```env
   JWT_SECRET=+FIJZ3LJWk3Kqu8GsZCNkvBn+Zs+D/eWW+hVNEnMofE=
   MONGO_URI=mongodb+srv://admin:pass123@cluster0.1pagp.mongodb.net/contact_book?retryWrites=true&w=majority&appName=Cluster0
   PORT=10000
   ```

### 📌 API Endpoints  
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in an existing user |
| `GET` | `/contacts` | Retrieve all user contacts |
| `POST` | `/contacts` | Add a new contact |
| `PUT` | `/contacts/:id` | Update a contact |
| `DELETE` | `/contacts/:id` | Delete a contact |
