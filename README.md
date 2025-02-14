#Contact Book API

Contact Book is a web application for managing contacts with features such as adding, deleting, grouping contacts, and maintaining a call history.
The backend is built with Node.js + Express + MongoDB, and the frontend is pure HTML, CSS, and JavaScript.

🚀 Features
✅ Add contacts (name, phone, email)
✅ Delete contacts
✅ View contact list
✅ Create groups from existing contacts
✅ View list of groups
✅ Record call history
✅ REST API for integration with other services

🛠 Technologies Used
📌 Backend:
Node.js — server-side
Express.js — routing and request handling
MongoDB (Mongoose) — NoSQL database
Cors — enables API communication with the frontend
Dotenv — for environment variable management
🎨 Frontend:
HTML — page structure
CSS — styling
JavaScript (Fetch API) — API communication
📥 How to Run Locally?
📌 1. Clone the repository
git clone https://github.com/kaireshov/contact-book.git
cd contact-book
📌 2. Install dependencies
npm install
📌 3. Configure environment variables (.env)
Create a .env file and add the following:

MONGO_URI=mongodb+srv://your_user:your_password@yourcluster.mongodb.net/contactbook
PORT=3000
📌 If you are using a local MongoDB instance, set mongodb://localhost:27017/contactbook instead.

📌 4. Start the server
nodemon server.js
✅ The server will run at http://localhost:3000

📡 REST API Documentation
Use Postman or cURL to test the API.

🔹 1. Get all contacts
GET /contacts
curl -X GET http://localhost:3000/contacts
🔹 2. Add a new contact
POST /contacts
curl -X POST http://localhost:3000/contacts \
     -H "Content-Type: application/json" \
     -d '{
           "_id": "c006",
           "name": "Alice Doe",
           "phone": "+987654321",
           "email": "alice@example.com",
           "group_ids": ["g001"]
         }'
🔹 3. Delete a contact
DELETE /contacts/:id
curl -X DELETE http://localhost:3000/contacts/c006
🔹 4. Create a group from existing contacts
POST /groups/create-from-contacts
curl -X POST http://localhost:3000/groups/create-from-contacts \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Work Team",
           "contact_ids": ["c001", "c002"]
         }'
🔹 5. Get all groups
GET /groups
curl -X GET http://localhost:3000/groups
🌍 Deployment (MongoDB Atlas + Render/Vercel/Railway)
Create a MongoDB Atlas Cluster on MongoDB Cloud
Configure environment variables (MONGO_URI)
Deploy the code on a hosting platform (Render/Vercel/Railway)
Set up automatic deployment from GitHub
🖥 Frontend (index.html)
The interface is available at:
http://localhost:3000/
📌 Works without additional build steps — just open it in your browser!

