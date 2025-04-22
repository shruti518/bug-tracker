let bugs = JSON.parse(localStorage.getItem("bugs")) || [];
let editIndex = -1;

const bugForm = document.getElementById("bug-form");
const bugName = document.getElementById("bug-name");
const bugDescription = document.getElementById("bug-description");
const bugCategory = document.getElementById("bug-category");
const bugList = document.getElementById("bug-list");
const filterCategory = document.getElementById("filter-category");
const filterStatus = document.getElementById("filter-status");

function saveBugs() {
  localStorage.setItem("bugs", JSON.stringify(bugs));
}

function renderBugs() {
  bugList.innerHTML = "";

  const categoryFilter = filterCategory.value;
  const statusFilter = filterStatus.value;

  bugs.forEach((bug, index) => {
    if (
      (categoryFilter === "All" || bug.category === categoryFilter) &&
      (statusFilter === "All" || bug.status === statusFilter)
    ) {
      const li = document.createElement("li");
      li.className = "list-group-item";

      li.innerHTML = `
        <strong>${bug.name}</strong><br/>
        ${bug.description}<br/>
        <span class="badge bg-secondary">${bug.category}</span><br/>
        ${new Date(bug.timestamp).toLocaleString()}
        <div class="mt-2">
          <button class="btn btn-success btn-sm me-2 status-btn">${bug.status}</button>
          <button class="btn btn-warning btn-sm me-2 edit-btn">Edit</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
      `;

      // Status button
      li.querySelector(".status-btn").addEventListener("click", () => {
        bug.status = bug.status === "Open" ? "Closed" : "Open";
        saveBugs();
        renderBugs();
      });

      // Edit button
      li.querySelector(".edit-btn").addEventListener("click", () => {
        bugName.value = bug.name;
        bugDescription.value = bug.description;
        bugCategory.value = bug.category;
        editIndex = index;
        bugForm.querySelector("button").textContent = "Update Bug";
      });

      // Delete button
      li.querySelector(".delete-btn").addEventListener("click", () => {
        bugs.splice(index, 1);
        saveBugs();
        renderBugs();
      });

      bugList.appendChild(li);
    }
  });
}

// Submit form (Add or Edit)
bugForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = bugName.value.trim();
  const description = bugDescription.value.trim();
  const category = bugCategory.value;

  if (editIndex > -1) {
    bugs[editIndex] = {
      ...bugs[editIndex],
      name,
      description,
      category,
    };
    editIndex = -1;
    bugForm.querySelector("button").textContent = "Add Bug";
  } else {
    const newBug = {
      name,
      description,
      category,
      status: "Open",
      timestamp: new Date().toISOString(),
    };
    bugs.push(newBug);
  }

  saveBugs();
  renderBugs();
  bugForm.reset();
});

// Filters
filterCategory.addEventListener("change", renderBugs);
filterStatus.addEventListener("change", renderBugs);

// Initial render
renderBugs();
