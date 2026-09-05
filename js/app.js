const STORAGE_KEY = "quantum-cortex-posts-v2";

const SEED = [
  {
    id: "seed-qc-1",
    title: "Quantum physics in simple language — how it works in daily life",
    authors: "Kiran Vale",
    year: "2026",
    tags: ["quantum-physics", "primer", "daily-life"],
    abstract: "Quantum physics is the science of very small things: atoms, electrons, and particles of light.\n\nThe big world looks solid and simple. A chair is in one place. A switch is on or off. A ball moves in a path you can watch. Quantum physics says the smallest pieces of that world do not always follow those everyday pictures.\n\nThat does not mean your house is fake. It means the parts inside your house follow a stricter, stranger set of rules. Those rules still make the normal world work.\n\nThe basic idea\n\nIn daily life, a thing is one thing at a time. A coin is heads or tails. A light is on or off.\n\nAt the atomic scale, a system can hold more than one possibility at once. This is called superposition. It is not only \u201cwe do not know yet.\u201d The system is not forced to be a single option until something definite happens.\n\nThat definite event is a measurement. A detector clicks. Light hits a sensor. A device records one answer. After that, there is one result.\n\nTwo tiny things can also share one description after they interact. This is entanglement. Checking one is linked to the other, even if they are far apart. This is not a message racing between them after you look. The link was already in their shared state. It also does not let you send a useful text faster than light. One side still looks random until both results are compared.\n\nThere is a limit as well. Some pairs of facts cannot both be perfectly sharp at the same time. The more tightly you pin down one, the less tightly you can pin down the other. This is the uncertainty principle. It is a rule about nature, not a slogan that \u201cnothing is real.\u201d\n\nEnergy can also come in packets. That is why the field is called \u201cquantum.\u201d Light can arrive as photons. An atom can jump from one energy level to another. Those jumps are why many modern devices work.\n\nHow this works in daily life\n\nYou do not need a lab to live with quantum physics. You already use it.\n\nYour phone and computer. Chips are made of semiconductors. Electrons in those materials do not move like tiny cars on a road. They follow quantum rules about energy levels and what paths are allowed. Transistors switch on and off because engineers learned those rules well enough to control current. No quantum theory, no modern electronics.\n\nLED lights and phone screens. An LED is not just a small bulb. Electrons drop from one energy level to another and release photons. The color depends on the size of that jump. That is quantum behavior turned into light you can read by.\n\nLasers. A laser is a crowd of atoms sending out photons in a coordinated way. Barcode scanners, some medical tools, fiber-optic internet, and many pointers use this. The coordinated light starts from electrons and energy levels, not from a regular flashlight trick.\n\nCameras and solar panels. Light hits a surface as photons. Those photons can kick electrons and make a current or a signal. Your phone camera and a solar panel both depend on that. Light is not only a smooth wave in these devices. It also acts like packets.\n\nMRI scans. An MRI machine does not take a normal photo of your body. It uses quantum properties of atomic nuclei in water and tissue, plus strong magnets and radio waves, to build an image. The hospital machine is large. The rule it uses is small-scale physics.\n\nGPS and exact time. GPS needs clocks that stay accurate. The best clocks count very stable vibrations in atoms. Those clocks are built on quantum energy levels. Your maps app feels ordinary. The timing behind it is not.\n\nChemistry in your body and kitchen. Bonds between atoms are about how electrons are shared or arranged. That arrangement is a quantum problem. Cooking, breathing, batteries, and medicines all sit on chemistry, and chemistry sits on electrons following quantum rules.\n\nWhy the world still looks normal\n\nIf atoms are strange, why does a table feel solid and a coin feel like one coin? Because a table is not one electron. It is an enormous number of atoms. When huge numbers of quantum events add up, the odd details usually average out. You get a stable object with one place, one weight, and one temperature. The strange layer is still there. You just meet the finished version of it.\n\nThat is why quantum physics can sound unreal and still run the real world.\n\nWhat quantum physics is not\n\nIt is not a free pass to say anything. \u201cQuantum\u201d does not mean \u201cmy wish is science.\u201d It does not mean every feeling is a particle experiment. It does not erase cause and effect in daily life.\n\nThe real theory is strict. It gives numbers. Experiments test those numbers. When a claim cannot be tested, or when it ignores the actual rules, it is no longer quantum physics. It is only using a famous word.",
    link: "",
    createdAt: "2026-09-04T23:08:00.000Z",
    seed: true
  },
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
      const hay = `${p.title} ${p.authors} ${p.abstract} ${(p.tags || []).join(" ")}`.toLowerCase();
      return tagOk && (!q || hay.includes(q));
    });
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
      <p class="abstract" style="white-space:pre-wrap">${escapeHtml(p.abstract)}</p>
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
