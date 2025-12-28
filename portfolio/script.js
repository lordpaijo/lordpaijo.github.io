const USERNAME = "lordpaijo";

const ALLOWED_REPOS = [
  "iyanls",
  "imeth.cpp",
  "matematika.rs",
  "dynarr",
  "spltui",
  "basham",
  "tetris.v",
  "copycat",
  "fuck",
  "paijorot",
];

async function loadProjects() {
  const container = document.getElementById("projects");

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100`
    );

    if (!res.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await res.json();
    container.innerHTML = "";

    const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

    const filtered = ALLOWED_REPOS.map((name) => repoMap.get(name)).filter(
      (repo) => repo && !repo.fork && !repo.archived
    );

    if (filtered.length === 0) {
      container.innerHTML = "<p>No projects selected.</p>";
      return;
    }

    for (const repo of filtered) {
      const div = document.createElement("div");
      div.className = "project";

      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="description">${repo.description ?? "No description provided."}</p>
        <p class="subtitle">
          ${repo.language ?? "Unknown"} · ★ ${repo.stargazers_count}
        </p>
        <a href="${repo.html_url}" target="_blank">
          View on GitHub →
        </a>
      `;

      container.appendChild(div);
    }
  } catch (err) {
    container.innerHTML = "<p class='subtitle'>Failed to load projects.</p>";
    console.error(err);
  }
}

loadProjects();
