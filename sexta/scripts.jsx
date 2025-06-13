// Event Listener
document.getElementById("contactForm").addEventListener("submit", handleFormSubmit);
document.getElementById('portfolioButton').onclick = function() {
    window.location.href = 'portifolio.html';
};
document.getElementById("editButton").addEventListener("click", toggleEditMode);

// Funções principais
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = getFormData();

    if (!validateEmail(formData.email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    updateSummary(formData);
    alert("Formulário enviado com sucesso!");
}

function getFormData() {
    return {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value,
        phone: document.getElementById("phone").value,
        reason: document.getElementById("reason").value,
    };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateSummary(data) {
    const summaryList = document.getElementById("summaryList");
    summaryList.innerHTML = "";

    // Tradução das chaves para português
    const fieldTranslations = {
        name: "Nome",
        email: "Email",
        age: "Idade",
        phone: "Número",
        reason: "Motivo",
    };

    Object.keys(data).forEach((key) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${fieldTranslations[key]}:</strong> <span contenteditable="false">${data[key]}</span>`;
        summaryList.appendChild(listItem);
    });
}

function toggleEditMode() {
    const summaryList = document.getElementById("summaryList");
    const editButton = document.getElementById("editButton");

    const isEditing = editButton.textContent === "Salvar";

    summaryList.querySelectorAll("span").forEach((span) => {
        span.contentEditable = !isEditing; // Alterna entre editável e não editável
    });

    editButton.textContent = isEditing ? "Editar" : "Salvar"; // Alterna o texto do botão

    if (isEditing) {
        saveEditedData();
    }
}

function saveEditedData() {
    const summaryList = document.getElementById("summaryList");
    const updatedData = {};

    summaryList.querySelectorAll("li").forEach((listItem) => {
        const key = listItem.querySelector("strong").textContent.replace(":", "").toLowerCase();
        const value = listItem.querySelector("span").textContent;
        updatedData[key] = value;
    });

    console.log("Dados atualizados:", updatedData); // Exibe os dados atualizados no console
}

// Funções auxiliares
function highlightInvalidField(fieldId) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = "red"; // Destaca o campo com borda vermelha
    field.focus(); // Foca no campo inválido
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}