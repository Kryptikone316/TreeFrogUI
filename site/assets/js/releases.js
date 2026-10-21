// shortcut: scans the newest 100 releases; add pagination if a 100-release prerelease streak becomes possible.
const api = "https://api.github.com/repos/tzubertowski/TreeFrogUI/releases?per_page=100";

function inlineMarkdown(text, parent) {
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|~~[^~]+~~|\*[^*\n]+\*|_[^_\n]+_|`[^`\n]+`|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;
  let start = 0;
  for (const match of text.matchAll(pattern)) {
    parent.append(document.createTextNode(text.slice(start, match.index)));
    const token = match[0];
    let tag, value = token;
    if (token.startsWith("**") || token.startsWith("__")) [tag, value] = ["strong", token.slice(2, -2)];
    else if (token.startsWith("~~")) [tag, value] = ["del", token.slice(2, -2)];
    else if (token.startsWith("*") || token.startsWith("_")) [tag, value] = ["em", token.slice(1, -1)];
    else if (token.startsWith("`")) [tag, value] = ["code", token.slice(1, -1)];
    else {
      const [, label, href] = token.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
      const link = document.createElement("a");
      link.href = href;
      link.rel = "noopener noreferrer";
      link.target = "_blank";
      link.textContent = label;
      parent.append(link);
      start = match.index + token.length;
      continue;
    }
    const element = document.createElement(tag);
    element.textContent = value;
    parent.append(element);
    start = match.index + token.length;
  }
  parent.append(document.createTextNode(text.slice(start)));
}

function renderMarkdown(markdown, parent) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const fence = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      const code = [];
      for (i++; i < lines.length && !lines[i].startsWith(fence[1]); i++) code.push(lines[i]);
      i++;
      const pre = document.createElement("pre");
      const block = document.createElement("code");
      block.textContent = code.join("\n");
      pre.append(block);
      parent.append(pre);
      continue;
    }

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const element = document.createElement(`h${Math.min(6, heading[1].length + 3)}`);
      inlineMarkdown(heading[2], element);
      parent.append(element);
      i++;
      continue;
    }

    if (/^\s{0,3}(?:---+|\*\*\*+|___+)\s*$/.test(line)) {
      parent.append(document.createElement("hr"));
      i++;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote = document.createElement("blockquote");
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        const p = document.createElement("p");
        inlineMarkdown(lines[i++].replace(/^\s*>\s?/, ""), p);
        quote.append(p);
      }
      parent.append(quote);
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[i + 1])) {
      const cells = row => row.trim().replace(/^\||\|$/g, "").split("|").map(cell => cell.trim());
      const table = document.createElement("table");
      const head = document.createElement("thead");
      const header = document.createElement("tr");
      for (const value of cells(line)) {
        const th = document.createElement("th");
        inlineMarkdown(value, th);
        header.append(th);
      }
      head.append(header);
      table.append(head);
      i += 2;
      const body = document.createElement("tbody");
      while (i < lines.length && lines[i].includes("|")) {
        const tr = document.createElement("tr");
        for (const value of cells(lines[i++])) {
          const td = document.createElement("td");
          inlineMarkdown(value, td);
          tr.append(td);
        }
        body.append(tr);
      }
      table.append(body);
      parent.append(table);
      continue;
    }

    const list = line.match(/^\s*(?:([-+*])|(\d+)\.)\s+(.+)$/);
    if (list) {
      const ordered = Boolean(list[2]);
      const element = document.createElement(ordered ? "ol" : "ul");
      while (i < lines.length) {
        const item = lines[i].match(/^\s*(?:([-+*])|(\d+)\.)\s+(.+)$/);
        if (!item || Boolean(item[2]) !== ordered) break;
        const li = document.createElement("li");
        inlineMarkdown(item[3], li);
        element.append(li);
        i++;
      }
      parent.append(element);
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !/^\s{0,3}(?:#{1,6}\s|```|~~~|[-+*]\s|\d+\.\s|>|(?:---+|\*\*\*+|___+)\s*$)/.test(lines[i])) paragraph.push(lines[i++].trim());
    const p = document.createElement("p");
    inlineMarkdown(paragraph.join(" ") || lines[i++].trim(), p);
    parent.append(p);
  }
}

fetch(api, { headers: { Accept: "application/vnd.github+json" } })
  .then(response => {
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    return response.json();
  })
  .then(items => {
    for (const kind of ["stable", "prerelease"]) {
      const release = items.find(item => !item.draft && item.prerelease === (kind === "prerelease"));
      const card = document.querySelector(`[data-release="${kind}"]`);
      if (!release) {
        card.querySelector("[data-release-title]").textContent = "No release found";
        continue;
      }
      card.querySelector("[data-release-title]").textContent = release.name || release.tag_name;
      const date = card.querySelector("[data-release-date]");
      date.dateTime = release.published_at;
      date.textContent = new Date(release.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      const link = card.querySelector("[data-release-link]");
      link.href = release.html_url;
      const notes = card.querySelector("[data-release-notes]");
      renderMarkdown(release.body || "See the release page for details.", notes);
    }
    document.querySelector("[data-release-status]").textContent = "";
  })
  .catch(() => {
    for (const card of document.querySelectorAll("[data-release]")) {
      card.querySelector("[data-release-title]").textContent = "Unavailable";
      card.querySelector("[data-release-notes]").textContent = "Open GitHub to see the release notes.";
    }
    document.querySelector("[data-release-status]").textContent = "Latest releases couldn't load. Browse all releases on GitHub.";
  });
