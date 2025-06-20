const modal = document.getElementById("modal");
const table = document.getElementById("toolTable");
const nameInput = document.getElementById("toolName");
const logoInput = document.getElementById("toolLogo");
const statusInput = document.getElementById("toolStatus");
const categoryInput = document.getElementById("toolCategory");
const searchInput = document.getElementById("searchTools");
let tools = JSON.parse(localStorage.getItem("devopsTools") || "[]");
let currentIndex = null;

function renderTable(filter = "") {
  const filtered = tools.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()) || t.category.toLowerCase().includes(filter.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  table.innerHTML = sorted.map((t) => {
    const realIndex = tools.indexOf(t);
    return `
      <tr class="hover:bg-gray-100 transition-colors">
        <td class='p-2'>${t.logo?.startsWith("<svg") ? t.logo : `<img src='${t.logo}' alt='logo' class='h-6 w-6'/>`}</td>
        <td class='p-2'>${t.name}</td>
        <td class='p-2'>${t.status}</td>
        <td class='p-2'>${t.category}</td>
        <td class='p-2'>
          <button onclick="editTool(${realIndex})" class="text-blue-500 hover:underline mr-5"><i class="fa-solid fa-pen"></i> Editar</button>
          <button onclick="deleteTool(${realIndex})" class="text-red-500 hover:underline ml-2"><i class="fa-solid fa-trash"></i> Excluir</button>
        </td>
      </tr>
    `;
  }).join("");
}

function openModal(index = null) {
  currentIndex = index;
  modal.classList.remove("hidden");
  if (index !== null) {
    const t = tools[index];
    nameInput.value = t.name;
    logoInput.value = t.logo;
    statusInput.value = t.status;
    categoryInput.value = t.category;
  } else {
    nameInput.value = "";
    logoInput.value = "";
    statusInput.value = "Concluido";
    categoryInput.value = "";
  }
  nameInput.focus();
}

function closeModal() {
  modal.classList.add("hidden");
  currentIndex = null;
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

modal.addEventListener("click", e => {
  if (e.target === modal || e.target.closest(".cancel-button")) closeModal();
});

function saveTool() {
  const name = nameInput.value.trim();
  const logo = logoInput.value.trim();
  const status = statusInput.value;
  const category = categoryInput.value.trim();

  if (!name || !status || !category) return alert("Preencha todos os campos obrigatórios.");

  if (currentIndex !== null) {
    tools[currentIndex] = { name, logo, status, category };
  } else {
    tools.push({ name, logo, status, category });
  }

  localStorage.setItem("devopsTools", JSON.stringify(tools));
  closeModal();
  renderTable(searchInput.value);
}

function deleteTool(index) {
  if (confirm("Deseja excluir esta ferramenta?")) {
    tools.splice(index, 1);
    localStorage.setItem("devopsTools", JSON.stringify(tools));
    renderTable(searchInput.value);
  }
}

function editTool(index) {
  openModal(index);
}

function importTools(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        tools = [...tools, ...imported];
        localStorage.setItem("devopsTools", JSON.stringify(tools));
        renderTable(searchInput.value);
      }
    } catch (err) {
      alert("Erro ao importar JSON");
    }
  };
  reader.readAsText(file);
}

function exportTools() {
  const blob = new Blob([JSON.stringify(tools, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ferramentas-devops.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.getElementById("searchTools").addEventListener("input", (e) => {
  renderTable(e.target.value);
});

renderTable();