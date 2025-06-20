const dashboard = document.getElementById("dashboard");
const tools = JSON.parse(localStorage.getItem("devopsTools") || "[]");

const grouped = tools.reduce((acc, tool) => {
  acc[tool.category] = acc[tool.category] || [];
  acc[tool.category].push(tool);
  return acc;
}, {});

for (const category in grouped) {
  const section = document.createElement("div");
  section.innerHTML = `<h2 class='text-xl font-bold mb-4'>${category}</h2>`;
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
  grouped[category].forEach(tool => {
    const badge = tool.status === "Concluido" ? "✅" :
                  tool.status === "Em Progresso" ? "⏳" : "🕒";
    const logo = tool.logo?.startsWith("<svg")
      ? `<div class='w-[100px] h-[100px] flex items-center justify-center'>${tool.logo}</div>`
      : `<img src='${tool.logo}' alt='logo' class='h-[100px] w-[100px] object-contain'/>`;
    grid.innerHTML += `
      <div class="p-4 border bg-white shadow rounded flex flex-col items-center text-center">
        <div class="mb-2">${logo}</div>
        <div class="font-bold text-gray-800">${tool.name}</div>
        <div class="text-sm italic text-gray-600">${badge} ${tool.status}</div>
      </div>
    `;
  });
  section.appendChild(grid);
  dashboard.appendChild(section);
}
