const API_CONTACTS = "http://localhost:3000/contacts";
const API_GROUPS = "http://localhost:3000/groups/create-from-contacts";

// 🔹 Добавление контакта
async function addContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const contact = { _id: `c${Date.now()}`, name, phone, email, group_ids: [] };

    const response = await fetch(API_CONTACTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
    });

    if (response.ok) {
        alert("Contact added!");
        loadContacts();
    } else {
        alert("Error adding contact");
    }
}

// 🔹 Загрузка контактов в список и чекбоксы
async function loadContacts() {
    try {
        const response = await fetch("http://localhost:3000/contacts");
        const contacts = await response.json();

        const contactsList = document.getElementById("contacts-list");
        const checkboxesContainer = document.getElementById("contacts-checkboxes");

        contactsList.innerHTML = "";  // ✅ Очищаем список перед загрузкой новых контактов
        checkboxesContainer.innerHTML = "";

        contacts.forEach(contact => {
            // Добавляем контакт в список
            const div = document.createElement("div");
            div.className = "contact";
            div.innerHTML = `
                <span>${contact.name} - ${contact.phone}</span>
                <button class="delete-btn" onclick="deleteContact('${contact._id}')">Delete</button>
            `;
            contactsList.appendChild(div);

            // Добавляем чекбокс для создания группы
            const checkboxDiv = document.createElement("div");
            checkboxDiv.innerHTML = `
                <input type="checkbox" id="cb-${contact._id}" value="${contact._id}">
                <label for="cb-${contact._id}">${contact.name}</label>
            `;
            checkboxesContainer.appendChild(checkboxDiv);
        });

    } catch (error) {
        console.error("Error loading contacts:", error);
        alert("Error loading contacts");
    }
}


// 🔹 Удаление контакта
async function deleteContact(id) {
    try {
        const response = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete contact");
        }

        alert("Contact deleted!");
        await loadContacts();  // ✅ Перезагружаем список контактов после удаления
    } catch (error) {
        console.error("Error deleting contact:", error);
        alert(`Error deleting contact: ${error.message}`);
    }
}


// 🔹 Создание группы из выбранных контактов
async function createGroup() {
    const groupName = document.getElementById("group-name").value;
    const selectedContacts = Array.from(document.querySelectorAll("#contacts-checkboxes input:checked"))
        .map(cb => cb.value);

    if (!groupName || selectedContacts.length === 0) {
        alert("Please enter a group name and select at least one contact.");
        return;
    }

    const groupData = { name: groupName, contact_ids: selectedContacts };

    const response = await fetch(API_GROUPS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groupData),
    });

    if (response.ok) {
        alert("Group created!");
        loadGroups();
    } else {
        alert("Error creating group");
    }
}

// 🔹 Загрузка списка групп
async function loadGroups() {
    const response = await fetch("http://localhost:3000/groups");
    const groups = await response.json();

    const groupsList = document.getElementById("groups-list");
    groupsList.innerHTML = "";

    groups.forEach(group => {
        const div = document.createElement("div");
        div.className = "group";
        div.innerHTML = `<span>${group.name} (${group.contacts.length} contacts)</span>`;
        groupsList.appendChild(div);
    });
}

// 🔹 Загружаем контакты и группы при старте
loadContacts();
loadGroups();
