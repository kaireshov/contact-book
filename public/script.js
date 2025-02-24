const API_BASE = "http://localhost:3000";
const TOKEN_KEY = "contactBookToken";

// 🔹 Register a new user
async function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("Registration successful! Please log in.");
        window.location.href = "index.html";
    } else {
        alert("Error registering user.");
    }
}

// 🔹 Login user
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem(TOKEN_KEY, result.token);
        alert("Login successful!");
        showApp();
    } else {
        alert("Invalid email or password.");
    }
}

// 🔹 Logout user
function logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.reload();
}

// 🔹 Show/Hide UI Sections
function showApp() {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("app-section").classList.remove("hidden");

    loadContacts();  
    loadGroups(); 
}


// 🔹 Load contacts
async function loadContacts() {
    const token = localStorage.getItem("contactBookToken");

    const response = await fetch("http://localhost:3000/contacts", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const contacts = await response.json();
    const contactsList = document.getElementById("contacts-list");
    const contactsCheckboxes = document.getElementById("contacts-checkboxes");

    contactsList.innerHTML = "";
    contactsCheckboxes.innerHTML = "";

    contacts.forEach(contact => {
        const div = document.createElement("div");
        div.className = "contact";
        div.innerHTML = `
            <span>${contact.name} - ${contact.phone}</span>
            <button class="delete-btn" onclick="deleteContact('${contact._id}')">🗑 Delete</button>
        `;
        contactsList.appendChild(div);

        const checkboxDiv = document.createElement("div");
        checkboxDiv.innerHTML = `
            <input type="checkbox" class="contact-checkbox" value="${contact._id}"> ${contact.name}
        `;
        contactsCheckboxes.appendChild(checkboxDiv);
    });
}

async function loadGroups() {
    const token = localStorage.getItem("contactBookToken");

    const response = await fetch("http://localhost:3000/groups", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const groups = await response.json();
    const groupsList = document.getElementById("groups-list");
    groupsList.innerHTML = "";

    groups.forEach(group => {
        const memberNames = (group.contacts && group.contacts.length > 0) 
            ? group.contacts.map(contact => contact.name).join(", ") 
            : "No members";  

        const div = document.createElement("div");
        div.className = "group";
        div.innerHTML = `
            <strong>${group.name}</strong>
            <p>Members: ${memberNames}</p>
        `;
        groupsList.appendChild(div);
    });
}



// 🔹 Add contact
async function addContact() {
    const token = localStorage.getItem("contactBookToken");
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();

    console.log("📤 Sending contact data:", { name, phone, email });

    const response = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            phone,
            email,
            group_ids: []
        })
    });

    if (response.ok) {
        alert("✅ Contact added!");
        loadContacts();
    } else {
        const error = await response.json();
        console.error("❌ Error adding contact:", error);
        alert(`Error: ${error.message}`);
    }
}



async function createGroup() {
    const token = localStorage.getItem("contactBookToken");
    const name = document.getElementById("group-name").value.trim();

    const selectedContacts = [];
    document.querySelectorAll(".contact-checkbox:checked").forEach(checkbox => {
        selectedContacts.push(checkbox.value);
    });

    console.log("📤 Sending group data:", { name, selectedContacts });

    if (!name || selectedContacts.length === 0) {
        alert("Please enter a group name and select at least one contact.");
        return;
    }

    const response = await fetch("http://localhost:3000/groups", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            contacts: selectedContacts
        })
    });

    if (response.ok) {
        alert("✅ Group created!");
        loadGroups();
    } else {
        const error = await response.json();
        console.error("❌ Error creating group:", error);
        alert(`Error: ${error.message}`);
    }
}


async function deleteContact(contactId) {
    const token = localStorage.getItem("contactBookToken");

    const response = await fetch(`http://localhost:3000/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (response.ok) {
        alert("Contact deleted successfully!");
        loadContacts();
    } else {
        const error = await response.json();
        console.error("❌ Error deleting contact:", error);
        alert(`Error: ${error.message}`);
    }
}


// 🔹 Auto-login check
if (localStorage.getItem(TOKEN_KEY)) {
    showApp();
}
