# 📊 DevOps Learning Dashboard

A lightweight and local-first web dashboard to help you visually track your DevOps learning journey. This project uses only HTML, TailwindCSS, and JavaScript — no server or database needed.

---

## 🎯 Features

- 📁 Group tools by **category**
- ✅ Mark tools as **Completed**, **In Progress**, or **Pending**
- ➕ **Add**, ✏️ **edit**, and 🗑️ **delete** tools easily
- ⬆️ **Import** or ⬇️ **export** your tools as JSON
- 📱 Responsive UI (mobile to desktop)
- 💾 All data is stored in the browser's localStorage

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/devops-dashboard.git
cd devops-dashboard
```

### 2. Open in browser

Just open `index.html` directly in your browser. No server needed.

---

## 🧠 How to Use

### Home Page (`index.html`)

* Displays all your tools grouped by category.
* Each tool shows its logo, name, and status.
* Click the ✏️ icon to go to the editor.

### Editor Page (`editor.html`)

* Add new tools with name, status, logo (URL or SVG), and category.
* Click **Edit** or **Delete** to manage your entries.
* Use the **Import JSON** button to load a `.json` file with tools (it adds to your list, not replaces).
* Use the **Export JSON** button to download your current list for backup.

---

## 🧩 JSON Format Example

Here’s how your tools are stored and imported/exported:

```json
[
  {
    "name": "Docker",
    "logo": "https://cdn.logo.com/docker.svg",
    "category": "Containers and Orchestration",
    "status": "Completed"
  },
  {
    "name": "Prometheus",
    "logo": null,
    "category": "Monitoring and Observability",
    "status": "Pending"
  }
]
```

---

## 📸 Screenshots

[Home](https://drive.google.com/file/d/1zflAbhxZvsJtBGvdX6s-nlStzU6HtoDW/view?usp=sharing)

[Editor](https://drive.google.com/file/d/1sir3HLwA4Y152FFFaEqLX9Fjm4MjQyrW/view?usp=sharing)

---

## 🛠 Tech Stack

* HTML
* TailwindCSS (via CDN)
* JavaScript (vanilla)
* LocalStorage API
