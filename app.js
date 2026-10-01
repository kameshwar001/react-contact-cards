// --- State Management ---
let contacts = [
  {
    id: "lead-1",
    name: "Kameshwar S",
    email: "kameshwar@example.com",
    phone: "+91 98765 43210",
    role: "Lead Developer"
  },
  {
    id: "lead-2",
    name: "Alex Smith",
    email: "alex.smith@example.com",
    phone: "+1 555-0199",
    role: "UI/UX Designer"
  }
];

// --- DOM References ---
const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const contactRole = document.getElementById("contactRole");
const userListContainer = document.getElementById("userListContainer");
const contactCountBadge = document.getElementById("contactCountBadge");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// --- Render / Update Function ---
function renderUserList(filterTerm = "") {
  userListContainer.innerHTML = "";

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
    c.role.toLowerCase().includes(filterTerm.toLowerCase())
  );

  contactCountBadge.textContent = `${filteredContacts.length} Total`;

  if (filteredContacts.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }
  emptyState.classList.add("hidden");

  filteredContacts.forEach((contact) => {
    const card = document.createElement("article");
    card.className = "contact-card";

    const initial = contact.name.trim().charAt(0).toUpperCase() || "?";

    card.innerHTML = `
      <div>
        <div class="card-top">
          <div class="avatar">${initial}</div>
          <div>
            <h3>${escapeHTML(contact.name)}</h3>
            <span class="card-role">${escapeHTML(contact.role)}</span>
          </div>
        </div>
        <div class="card-details">
          <p><strong>Email:</strong> ${escapeHTML(contact.email)}</p>
          <p><strong>Phone:</strong> ${escapeHTML(contact.phone)}</p>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">Delete</button>
      </div>
    `;

    userListContainer.appendChild(card);
  });
}

// --- Add Contact Handler ---
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newContact = {
    id: "contact-" + Date.now(),
    name: contactName.value.trim(),
    email: contactEmail.value.trim(),
    phone: contactPhone.value.trim(),
    role: contactRole.value
  };

  // Add dynamically to the top of list
  contacts.unshift(newContact);

  // Clear input fields
  contactForm.reset();

  // Re-render
  renderUserList(searchInput.value);
});

// --- Delete Contact Handler ---
window.deleteContact = function(id) {
  contacts = contacts.filter((item) => item.id !== id);
  renderUserList(searchInput.value);
};

// --- Real-time Search Handler ---
searchInput.addEventListener("input", (e) => {
  renderUserList(e.target.value);
});

// --- Dark/Light Mode Toggle ---
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggleBtn.textContent = newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Helper to escape HTML characters
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Initial render
renderUserList();