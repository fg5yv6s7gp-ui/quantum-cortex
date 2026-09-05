const STORAGE_KEY = "quantum-cortex-posts-v5";

try {
  ["quantum-cortex-posts-v1", "quantum-cortex-posts-v2", "quantum-cortex-posts-v3", "quantum-cortex-posts-v4"].forEach(function (k) {
    localStorage.removeItem(k);
  });
} catch (e) {}

const SEED = [];

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

let posts = loadPosts();
const form = document.getElementById("post-form");
const toast = document.getElementById("toast");

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cardHtml(p) {
  const tags = (p.tags || []).map(function (t) {
    return "<span class=\"tag\">" + escapeHtml(t) + "</span>";
  }).join("");
  return "<article class=\"card\"><div class=\"card-meta\"><span>" +
    escapeHtml(p.year || "") + "</span>" + tags +
    "</div><h3>" + escapeHtml(p.title) + "</h3><div class=\"authors\">" +
    escapeHtml(p.authors || "A.") +
    "</div><p class=\"abstract\" style=\"white-space:pre-wrap\">" +
    escapeHtml(p.abstract) + "</p></article>";
}

function renderSection(id, section) {
  const el = document.getElementById(id);
  if (!el) return;
  const list = posts.filter(function (p) { return p.section === section; });
  el.innerHTML = list.map(cardHtml).join("");
}

function render() {
  renderSection("quantum-feed", "quantum-physics");
  renderSection("neuro-feed", "neuroscience");
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const tags = (data.tags || "").split(",").map(function (t) { return t.trim().toLowerCase(); }).filter(Boolean);
    posts.unshift({
      id: "p-" + Date.now(),
      section: data.section,
      title: data.title.trim(),
      authors: (data.authors || "A.").trim(),
      year: data.year.trim() || String(new Date().getFullYear()),
      tags: tags,
      abstract: data.abstract.trim(),
      createdAt: new Date().toISOString()
    });
    savePosts(posts);
    form.reset();
    document.getElementById("authors").value = "A.";
    toast.style.display = "block";
    toast.textContent = "Posted to " + (data.section === "neuroscience" ? "Neuroscience" : "Quantum physics") + ".";
    setTimeout(function () { toast.style.display = "none"; }, 3500);
    render();
    document.getElementById(data.section).scrollIntoView({ behavior: "smooth" });
  });
}

render();
