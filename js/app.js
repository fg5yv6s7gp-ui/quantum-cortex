const STORAGE_KEY = "quantum-cortex-posts-v1";

const SEED = [
  {
    id: "seed-1",
    title: "Quantum-like dynamics in whole-brain models of human activity",
    authors: "G. Deco, Y. Sanz Perl, N. Greenstein, S. Chandaria, G. Scholes, M. L. Kringelbach",
    year: "2025",
    tags: ["quantum-like", "whole-brain", "oscillators"],
    abstract: "Whole-brain models built from coupled oscillators fit human neuroimaging better when local node dynamics include quantum-like interference structure. The result does not prove the brain is a quantum computer. It does show that quantum-inspired probability can capture network-level features that purely classical oscillator models miss.",
    link: "https://www.biorxiv.org/content/10.1101/2025.10.02.680057v1",
    createdAt: "2025-10-03T00:00:00.000Z",
    seed: true
  },
  {
    id: "seed-2",
    title: "Experimental support for a microtubule substrate of consciousness",
    authors: "M. C. Wiest",
    year: "2025",
    tags: ["microtubules", "Orch-OR", "anesthesia"],
    abstract: "Reviews evidence that inhalational anesthetics act on neuronal microtubules, consistent with predictions from Penrose-Hameroff Orchestrated Objective Reduction. Also discusses MRI work claiming a macroscopic entangled brain state correlated with conscious report and working memory.",
    link: "https://academic.oup.com/nc/article/2025/1/niaf011/8127081",
    createdAt: "2025-05-06T00:00:00.000Z",
    seed: true
  },
  {
    id: "seed-3",
    title: "Atom-thick semiconductors as all-optical voltage sensors for living cells",
    authors: "Y. Ren, C. De-Eknamkul, E. Cubukcu et al.",
    year: "2025",
    tags: ["quantum materials", "sensing", "neurons"],
    abstract: "Monolayer semiconductors use excitonic quantum statistics to read electrical activity in living cells with light instead of electrodes. The approach points toward high-resolution, less invasive mapping of neural circuits.",
    link: "https://www.sciencedaily.com/releases/2025/03/250303191511.htm",
    createdAt: "2025-03-03T00:00:00.000Z",
    seed: true
  },
  {
    id: "seed-4",
    title: "Three tiers of quantum information science in neurobiology",
    authors: "Quantum Neurobiology review, MDPI",
    year: "2022",
    tags: ["review", "QML", "theory"],
    abstract: "Maps the field into three layers: quantum-inspired analysis of imaging and genomics, neural-field and nanoscience models of signaling, and foundational physics read through a neurobiology lens.",
    link: "https://www.mdpi.com/2624-960x/4/1/8",
    createdAt: "2022-02-12T00:00:00.000Z",
    seed: true
  }
];

function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return [...SEED];
    }
    return JSON.parse(raw);
  } catch {
    return [...SEED];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

let posts = loadPosts();
let activeTag = "all";

const feedEl = document.getElementById("feed");
const searchEl = document.getElementById("search");
const form = document.getElementById("post-form");
const toast = document.getElementById("toast");
const countEl = document.getElementById("post-count");
const userCountEl = document.getElementById("user-count");

function allTags(list) {
  const set = new Set();
  list.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return ["all", ...Array.from(set).sort()];
}

function renderChips() {
  const box = document.getElementById("chips");
  box.innerHTML = "";
  allTags(posts).forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "chip" + (tag === activeTag ? " active" : "");
    btn.textContent = tag === "all" ? "All topics" : tag;
    btn.onclick = () => {
      activeTag = tag;
      render();
    };
    box.appendChild(btn);
  });
}

function filtered() {
  const q = (searchEl.value || "").toLowerCase().trim();
  return posts
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((p) => {
      const tagOk = activeTag === "all" || (p.tags || []).includes(activeTag);
      const hay = `${p.title} ${p.authors} ${p.abstract} ${(p.tags || []).join(" ")}` .toLowerCase();
      return tagOk && (!q || hay.includes(q));
    });
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """);
}
function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, "&#39;");
}

function renderFeed() {
  const list = filtered();
  feedEl.innerHTML = "";
  if (!list.length) {
    feedEl.innerHTML = `<div class="empty">No notes match that filter. Post the first one, or clear search.</div>`;
    return;
  }
  list.forEach((p) => {
    const el = document.createElement("article");
    el.className = "card";
    const tags = (p.tags || [])
      .map((t, i) => `<span class="tag ${i % 2 ? "violet" : ""}">${escapeHtml(t)}</span>`)
      .join("");
    el.innerHTML = `
      <div class="card-meta">
        <span>${escapeHtml(p.year || "")}</span>
        ${tags}
        ${p.seed ? `<span>archive seed</span>` : `<span>your post</span>`}
      </div>
      <h3>${escapeHtml(p.title)}</h3>
      <div class="authors">${escapeHtml(p.authors)}</div>
      <p class="abstract">${escapeHtml(p.abstract)}</p>
      <div class="card-foot">
        ${p.link ? `<a class="link-out" href="${escapeAttr(p.link)}" target="_blank" rel="noopener">Open source →</a>` : `<span></span>`}
        ${p.seed ? "" : `<button class="delete-btn" data-id="${p.id}">Remove</button>`}
      </div>
    `;
    feedEl.appendChild(el);
  });
  feedEl.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = () => {
      posts = posts.filter((p) => p.id !== btn.dataset.id);
      savePosts(posts);
      render();
    };
  });
}

function renderStats() {
  countEl.textContent = String(posts.length);
  userCountEl.textContent = String(posts.filter((p) => !p.seed).length);
}

function render() {
  renderChips();
  renderFeed();
  renderStats();
}

searchEl.addEventListener("input", render);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const tags = (data.tags || "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  const post = {
    id: "p-" + Date.now(),
    title: data.title.trim(),
    authors: data.authors.trim(),
    year: data.year.trim() || String(new Date().getFullYear()),
    tags: tags.length ? tags : ["note"],
    abstract: data.abstract.trim(),
    link: (data.link || "").trim(),
    createdAt: new Date().toISOString(),
    seed: false
  };
  posts.unshift(post);
  savePosts(posts);
  form.reset();
  toast.style.display = "block";
  toast.textContent = "Posted. It lives in this browser until you clear site data.";
  setTimeout(() => (toast.style.display = "none"), 3500);
  activeTag = "all";
  render();
  document.getElementById("archive").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("reset-archive").addEventListener("click", () => {
  if (!confirm("Reset the archive to the original sample papers? Your posts will be removed from this browser.")) return;
  posts = [...SEED];
  savePosts(posts);
  activeTag = "all";
  render();
});

render();
