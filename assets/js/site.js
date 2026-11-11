/* Interactables marketing site. No dependencies.
   The hero is a small working session: a Capture list flows into Vote, Pick, Big numbers, Decision and the Summary,
   the same way the product's live data model works. Everything stays in this page. */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (n, d = 0) => Number(n).toLocaleString("en-GB", { maximumFractionDigits: d });
  const money = (n) => (n >= 100000 ? `£${num(n / 1000)}k` : `£${num(n)}`);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The QR code on the Vote slide is real: it opens this demo on a phone.
  const QR_SIZE = 29;
  const QR_PATH = "M0 0h7v1h-7zM10 0h2v1h-2zM14 0h1v1h-1zM18 0h2v1h-2zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM12 1h1v1h-1zM16 1h2v1h-2zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM9 2h1v1h-1zM14 2h2v1h-2zM17 2h1v1h-1zM19 2h2v1h-2zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM10 3h1v1h-1zM13 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM9 4h1v1h-1zM12 4h1v1h-1zM20 4h1v1h-1zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM12 5h1v1h-1zM15 5h2v1h-2zM19 5h1v1h-1zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM9 7h1v1h-1zM11 7h1v1h-1zM13 7h1v1h-1zM15 7h3v1h-3zM19 7h1v1h-1zM0 8h1v1h-1zM3 8h1v1h-1zM5 8h2v1h-2zM8 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM20 8h2v1h-2zM23 8h1v1h-1zM3 9h2v1h-2zM7 9h1v1h-1zM10 9h4v1h-4zM15 9h4v1h-4zM20 9h1v1h-1zM22 9h1v1h-1zM25 9h1v1h-1zM28 9h1v1h-1zM0 10h4v1h-4zM5 10h4v1h-4zM10 10h2v1h-2zM13 10h3v1h-3zM18 10h2v1h-2zM23 10h5v1h-5zM0 11h1v1h-1zM2 11h2v1h-2zM7 11h4v1h-4zM12 11h2v1h-2zM16 11h1v1h-1zM19 11h1v1h-1zM21 11h3v1h-3zM26 11h2v1h-2zM3 12h1v1h-1zM6 12h2v1h-2zM9 12h3v1h-3zM14 12h2v1h-2zM17 12h2v1h-2zM20 12h3v1h-3zM25 12h1v1h-1zM27 12h2v1h-2zM0 13h2v1h-2zM4 13h1v1h-1zM10 13h1v1h-1zM13 13h4v1h-4zM19 13h3v1h-3zM2 14h3v1h-3zM6 14h2v1h-2zM10 14h1v1h-1zM12 14h3v1h-3zM22 14h7v1h-7zM0 15h2v1h-2zM3 15h3v1h-3zM8 15h2v1h-2zM11 15h2v1h-2zM15 15h1v1h-1zM17 15h4v1h-4zM25 15h1v1h-1zM27 15h1v1h-1zM0 16h1v1h-1zM2 16h1v1h-1zM4 16h4v1h-4zM9 16h3v1h-3zM13 16h1v1h-1zM17 16h2v1h-2zM20 16h2v1h-2zM23 16h1v1h-1zM27 16h1v1h-1zM1 17h3v1h-3zM7 17h2v1h-2zM13 17h4v1h-4zM21 17h3v1h-3zM25 17h1v1h-1zM28 17h1v1h-1zM0 18h1v1h-1zM2 18h2v1h-2zM5 18h2v1h-2zM10 18h2v1h-2zM14 18h5v1h-5zM20 18h1v1h-1zM22 18h1v1h-1zM27 18h2v1h-2zM2 19h1v1h-1zM5 19h1v1h-1zM9 19h4v1h-4zM14 19h1v1h-1zM17 19h3v1h-3zM24 19h1v1h-1zM27 19h2v1h-2zM0 20h1v1h-1zM3 20h4v1h-4zM12 20h1v1h-1zM15 20h2v1h-2zM20 20h5v1h-5zM26 20h1v1h-1zM8 21h1v1h-1zM10 21h1v1h-1zM14 21h2v1h-2zM17 21h1v1h-1zM19 21h2v1h-2zM24 21h1v1h-1zM26 21h3v1h-3zM0 22h7v1h-7zM10 22h2v1h-2zM16 22h1v1h-1zM20 22h1v1h-1zM22 22h1v1h-1zM24 22h1v1h-1zM27 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h3v1h-3zM14 23h1v1h-1zM16 23h1v1h-1zM20 23h1v1h-1zM24 23h3v1h-3zM28 23h1v1h-1zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM9 24h3v1h-3zM15 24h3v1h-3zM20 24h5v1h-5zM27 24h1v1h-1zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM8 25h6v1h-6zM17 25h1v1h-1zM19 25h1v1h-1zM22 25h5v1h-5zM28 25h1v1h-1zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM12 26h1v1h-1zM14 26h1v1h-1zM17 26h1v1h-1zM21 26h1v1h-1zM24 26h3v1h-3zM28 26h1v1h-1zM0 27h1v1h-1zM6 27h1v1h-1zM9 27h1v1h-1zM11 27h2v1h-2zM15 27h6v1h-6zM27 27h1v1h-1zM0 28h7v1h-7zM8 28h1v1h-1zM10 28h1v1h-1zM12 28h1v1h-1zM14 28h2v1h-2zM17 28h1v1h-1zM20 28h1v1h-1zM25 28h1v1h-1zM27 28h1v1h-1z";

  /* ───────────── The demo ───────────── */
  const CLIENTS = [
    { name: "Calder & Row", p: "#0f3d3e", a: "#f2a541" },
    { name: "Northfold", p: "#1d3a8a", a: "#ff6b4a" },
    { name: "Juniper Legal", p: "#4a1942", a: "#e3b505" },
  ];
  const STEPS = [
    { id: "capture", name: "Capture" }, { id: "vote", name: "Vote" }, { id: "pick", name: "Pick" },
    { id: "numbers", name: "Big numbers" }, { id: "decision", name: "Decision" }, { id: "summary", name: "Summary" },
  ];
  const OPTIONS = [
    { title: "Fix it this quarter", sub: "Start now, with a named owner" },
    { title: "Pilot for 30 days", sub: "Prove it on one team first" },
    { title: "Park it for now", sub: "Revisit at the next review" },
  ];
  const MAX_ROWS = 6, SIM_VOTES = 11;
  let uid = 0;
  const row = (text, people, hrs) => ({ id: `r${++uid}`, text, people, hrs });
  const fresh = () => ({
    step: 0, client: 0, look: "classic", seen: new Set([0]),
    rows: [row("Rekeying invoices", 4, 6), row("Chasing approvals", 6, 3), row("Building the weekly report", 2, 5)],
    newRow: null, votes: {}, simmed: 0, mine: null,
    rankBy: "votes", count: 2, rate: 40,
    decision: null, owner: "", when: "",
  });
  let S = fresh();
  let timers = [];

  const slideEl = $("#slide"), scribeEl = $("#scribe"), runEl = $("#run"), flowEl = $("#flow");
  if (!slideEl) return;

  const hours = (r) => r.people * r.hrs * 52;
  const votesOf = (r) => (S.votes[r.id] || 0) + (S.mine === r.id ? 1 : 0);
  const totalVotes = () => S.rows.reduce((n, r) => n + votesOf(r), 0);
  const ranked = () => [...S.rows].sort((a, b) => (S.rankBy === "votes" ? votesOf(b) - votesOf(a) : 0) || hours(b) - hours(a));
  const picked = () => ranked().slice(0, Math.min(S.count, S.rows.length));
  const pickedHours = () => picked().reduce((n, r) => n + hours(r), 0);

  function frame(kicker, title, body) {
    const c = CLIENTS[S.client];
    return `<div class="slide-in"><div class="s-kicker">${kicker}</div><h3 class="s-title">${title}</h3>
      <div class="s-body">${body}</div>
      <div class="s-foot"><span class="s-client">${esc(c.name)}</span><span class="s-by">delivered by <b>your logo</b></span></div></div>`;
  }
  const tile = (label, value, sub = "", cls = "") => `<div class="s-tile ${cls}"><small>${label}</small><strong>${value}</strong>${sub ? `<span>${sub}</span>` : ""}</div>`;

  const SLIDES = {
    capture() {
      const total = S.rows.reduce((n, r) => n + hours(r), 0);
      const body = `<table class="s-table ${S.rows.length > 4 ? "compact" : ""}"><thead><tr><th class="n">#</th><th>Time thief</th><th class="num">People</th><th class="num">Hrs a week</th></tr></thead><tbody>
        ${S.rows.map((r, i) => `<tr class="${r.id === S.newRow ? "new" : ""}"><td class="n">${i + 1}</td><td>${esc(r.text)}</td><td class="num">${num(r.people)}</td><td class="num">${num(r.hrs, 1)}</td></tr>`).join("")}
        </tbody></table>${S.rows.length ? "" : `<p class="s-empty">Nothing captured yet.</p>`}
        <div class="s-totalrow">${tile("Hours a year", num(total), "", "compact")}</div>`;
      return frame("Where the time goes", "What steals your team's time?", body);
    },
    vote() {
      const max = Math.max(1, ...S.rows.map(votesOf));
      const body = `<div class="s-vote">
        <div class="s-join"><div class="s-qr"><svg viewBox="-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}" role="img" aria-label="QR code that opens this demo on a phone"><path d="${QR_PATH}"/></svg></div>
          <p>join.interactables.app<b>K7X2 M4PQ</b></p></div>
        <div><div class="s-bars">${S.rows.map((r) => `<div class="s-bar ${S.mine === r.id ? "mine" : ""}" data-row="${r.id}"><label><span>${esc(r.text)}</span><b>${votesOf(r)}</b></label><div><i style="--w:${(votesOf(r) / max) * 100}%"></i></div></div>`).join("")}</div>
          <p class="s-status"><b>Voting is open</b> · <span data-total>${totalVotes()}</span> votes so far</p></div></div>`;
      return frame("The room decides", "Which should we fix first?", body);
    },
    pick() {
      const top = picked().map((r) => r.id);
      const body = `<div class="s-picks ${S.rows.length > 4 ? "compact" : ""}">${ranked().map((r, i) => {
        const on = top.includes(r.id);
        const score = S.rankBy === "votes" ? `${votesOf(r)}<small>${votesOf(r) === 1 ? "vote" : "votes"}</small>` : `${num(hours(r))}<small>hrs a year</small>`;
        return `<div class="s-pick ${on ? "on" : ""}"><i>${i + 1}</i><span>${esc(r.text)}</span><b>${score}</b>${on ? "<u>Picked</u>" : ""}</div>`;
      }).join("") || `<p class="s-empty">The list fills in as it's captured.</p>`}</div>`;
      return frame("Priorities", S.count === 1 ? "The one to fix first" : `The top ${Math.min(S.count, S.rows.length) || S.count} to fix first`, body);
    },
    numbers() {
      const h = pickedHours(), names = picked().map((r) => esc(r.text));
      const body = `<div class="s-tiles">
        ${tile("Hours a year", num(h), "across the picked rows")}
        ${tile("Cost a year", money(h * S.rate), `at £${S.rate} an hour`)}
        ${tile("Working weeks", num(h / 37.5, 1), "of one person's time")}</div>
        <p class="s-note">${names.length ? `From what you captured: ${names.join(" and ")}.` : "Capture a row to see the numbers."}</p>`;
      return frame("What it costs", "The size of the prize", body);
    },
    decision() {
      const body = `<div class="s-options">${OPTIONS.map((o, i) => `<div class="s-option ${S.decision === i ? "on" : ""}"><small>${S.decision === i ? "Agreed" : `Option ${"ABC"[i]}`}</small><strong>${o.title}</strong><span>${o.sub}</span></div>`).join("")}</div>
        <div class="s-agreed"><span>Owner <b>${esc(S.owner) || "–"}</b></span><span>By when <b>${esc(S.when) || "–"}</b></span></div>`;
      return frame("Commit", "Where do we start?", body);
    },
    summary() {
      const top = picked().map((r) => r.id), h = pickedHours(), d = S.decision;
      const body = `<div class="s-sum">
        <div><h4>What we heard, and how the room voted</h4><ul>${ranked().map((r) => `<li class="${top.includes(r.id) ? "on" : ""}"><span>${esc(r.text)}</span><b>${num(hours(r))} hrs · ${votesOf(r)} ${votesOf(r) === 1 ? "vote" : "votes"}</b></li>`).join("")}</ul></div>
        <div><h4>The numbers</h4><div class="s-fig"><div><strong>${num(h)}</strong><span>hours a year</span></div><div><strong>${money(h * S.rate)}</strong><span>a year</span></div></div>
          <h4>What we agreed</h4><div class="s-dec ${d === null ? "none" : ""}">${d === null ? "No decision recorded yet." : `<strong>${OPTIONS[d].title}</strong>${esc(S.owner) || "Owner to confirm"}${S.when ? ` · by ${esc(S.when)}` : ""}`}</div></div></div>`;
      return frame("Follow-up pack", "What we covered today", body);
    },
  };

  const fx = (s) => `<code class="fx">${s}</code>`;
  const SCRIBES = {
    capture() {
      const full = S.rows.length >= MAX_ROWS;
      return `<h3>Capture what the room says</h3>
        <form id="f-add" autocomplete="off">
          <label class="field"><span>Time thief</span><input type="text" name="text" maxlength="34" placeholder="e.g. Copying data between systems" required></label>
          <div class="row2"><label class="field"><span>People</span><input type="number" name="people" min="1" max="500" value="3" inputmode="numeric" required></label>
            <label class="field"><span>Hrs a week</span><input type="number" name="hrs" min="0.5" max="40" step="0.5" value="4" inputmode="decimal" required></label></div>
          <button class="btn-add" type="submit" ${full ? "disabled" : ""}>${full ? "Six rows is plenty for a demo" : "Add to the screen"}</button>
        </form>
        <ul class="rows">${S.rows.map((r) => `<li><span>${esc(r.text)}</span><button type="button" data-del="${r.id}" aria-label="Remove ${esc(r.text)}">×</button></li>`).join("")}</ul>
        <div class="spacer"></div>${fx("sum(thieves, people * hrsWeek * 52)")}`;
    },
    vote() {
      const c = CLIENTS[S.client];
      return `<div class="phone" style="--p:${c.p};--a:${c.a}"><div class="phone-in">
          <div class="phone-top"><small>${esc(c.name)} · live vote</small><strong>Which should we fix first?</strong></div>
          <div class="phone-opts">${S.rows.map((r) => `<button type="button" data-vote="${r.id}" aria-pressed="${S.mine === r.id}">${esc(r.text)}</button>`).join("")}</div>
          <p class="phone-foot">${S.mine ? "Vote counted. You can change it, but not vote twice." : "Tap one. No account, no name."}</p>
        </div></div>
        <p>You're a phone in the room now. The other ${SIM_VOTES} votes are simulated for this demo.</p>`;
    },
    pick() {
      return `<h3>Rank the list</h3><p>Every row now carries the room's votes, so Pick can rank by them.</p>
        <div><div class="field-label" id="l-rank">Rank by</div><div class="seg" role="group" aria-labelledby="l-rank" style="margin-top:6px">
          <button type="button" data-rank="votes" aria-pressed="${S.rankBy === "votes"}">Votes</button><button type="button" data-rank="hours" aria-pressed="${S.rankBy === "hours"}">Hours a year</button></div></div>
        <div><div class="field-label" id="l-count">Pick the top</div><div class="seg" role="group" aria-labelledby="l-count" style="margin-top:6px">
          ${[1, 2, 3].map((n) => `<button type="button" data-count="${n}" aria-pressed="${S.count === n}">${n}</button>`).join("")}</div></div>
        <div class="spacer"></div>${fx(S.rankBy === "votes" ? "rankBy: votes" : "rankBy: people * hrsWeek * 52")}`;
    },
    numbers() {
      return `<h3>Work out the numbers</h3><p>These figures read only the picked rows. Go back, change a row or the vote, and they move.</p>
        <label class="field"><span>Hourly rate</span><span class="range-val" id="rate-val">£${S.rate}</span>
          <input class="range" type="range" id="rate" min="15" max="150" step="5" value="${S.rate}" aria-label="Hourly rate in pounds"></label>
        <div class="spacer"></div>${fx("sum(picked.thieves, people * hrsWeek * 52) * rate")}`;
    },
    decision() {
      return `<h3>Record the decision</h3>
        <div class="opts" role="group" aria-label="Decision">${OPTIONS.map((o, i) => `<button type="button" data-decide="${i}" aria-pressed="${S.decision === i}">${o.title}</button>`).join("")}</div>
        <div class="row2"><label class="field"><span>Owner</span><input type="text" id="owner" maxlength="22" value="${esc(S.owner)}" placeholder="Name"></label>
          <label class="field"><span>By when</span><input type="text" id="when" maxlength="18" value="${esc(S.when)}" placeholder="e.g. 30 Nov"></label></div>
        <div class="spacer"></div><p>Decisions, owners and dates go straight into the follow-up pack.</p>`;
    },
    summary() {
      return `<h3>That's a session</h3><p>Five slides, one list, and every figure came from the room. The pack is branded, ready to print or paste into an email.</p>
        <p>Now picture ninety minutes with a client's leadership team.</p><div class="spacer"></div>
        <div class="cta-col"><a class="btn btn-primary" href="mailto:hello@interactables.app?subject=Interactables%20access">Request access</a>
          <button type="button" class="btn-again" data-again>Run it again</button></div>`;
    },
  };

  const FLOWS = {
    capture: () => `The total is a formula over the list. Next, the room votes on ${S.rows.length === 1 ? "this row" : `these ${S.rows.length} rows`}.`,
    vote: () => `Each row now carries a <code>votes</code> value for later slides to use.`,
    pick: () => `Big numbers reads <code>picked.thieves</code>, the rows highlighted here.`,
    numbers: () => `Change a row on slide 1 and these figures change with it.`,
    decision: () => `The decision, its owner and the date land in the Summary.`,
    summary: () => `Everything the room said, written up in the client's brand.`,
  };

  function renderSlide() { slideEl.innerHTML = SLIDES[STEPS[S.step].id](); }
  function renderScribe() { scribeEl.innerHTML = SCRIBES[STEPS[S.step].id](); }
  function renderChrome() {
    const id = STEPS[S.step].id;
    runEl.innerHTML = STEPS.map((s, i) => `<button type="button" role="tab" id="tab-${s.id}" aria-selected="${i === S.step}" tabindex="${i === S.step ? 0 : -1}" class="${S.seen.has(i) && i !== S.step ? "done" : ""}" data-step="${i}"><i>${i + 1}</i>${s.name}</button>`).join("");
    flowEl.innerHTML = FLOWS[id]();
    $("#prev").disabled = S.step === 0;
    $("#next").disabled = S.step === STEPS.length - 1;
    $("#scribe-label").textContent = id === "vote" ? "What each person sees" : "What you see";
    $("#scribe-sub").textContent = id === "vote" ? "Their phone" : "Scribe view";
    runEl.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduced ? "auto" : "smooth" });
  }
  function theme() {
    const c = CLIENTS[S.client];
    slideEl.style.setProperty("--p", c.p); slideEl.style.setProperty("--a", c.a);
    slideEl.dataset.look = S.look;
    $$("#clients button").forEach((b, i) => b.setAttribute("aria-checked", String(i === S.client)));
  }
  function render() { renderChrome(); renderSlide(); renderScribe(); }

  let pingT;
  /** Shows that an edit has just reached the client's screen. */
  function ping() {
    const sync = $("#sync"), note = $("#screen-note");
    note.textContent = "● Updated just now"; note.classList.add("on");
    sync.classList.remove("ping"); void sync.offsetWidth; sync.classList.add("ping");
    clearTimeout(pingT); pingT = setTimeout(() => { sync.classList.remove("ping"); note.classList.remove("on"); }, 1600);
  }
  function addRow(text, people, hrs) {
    if (S.rows.length >= MAX_ROWS) return null;
    const r = row(text, Math.min(people, 500), Math.min(hrs, 40));
    S.rows.push(r); S.newRow = r.id; render(); ping();
    return r;
  }
  function removeRow(id) {
    S.rows = S.rows.filter((r) => r.id !== id);
    S.simmed -= S.votes[id] || 0; delete S.votes[id];
    if (S.mine === id) S.mine = null;
    S.newRow = null; render(); ping();
  }

  function stopSim() { timers.forEach(clearTimeout); timers = []; }
  /** Simulated phones: votes arrive over a few seconds, leaning towards the rows that cost the most time. */
  function startSim() {
    stopSim();
    const want = SIM_VOTES - S.simmed;
    if (want <= 0 || !S.rows.length) return;
    for (let k = 0; k < want; k++) {
      timers.push(setTimeout(() => {
        if (!S.rows.length) return;
        const weights = S.rows.map((r) => Math.sqrt(hours(r)) + 6);
        let t = Math.random() * weights.reduce((a, b) => a + b, 0), i = 0;
        while (i < weights.length - 1 && (t -= weights[i]) > 0) i++;
        const r = S.rows[i];
        S.votes[r.id] = (S.votes[r.id] || 0) + 1; S.simmed++;
        if (STEPS[S.step].id === "vote") updateBars();
      }, reduced ? 0 : 500 + k * 420 + Math.random() * 260));
    }
  }
  function updateBars() {
    const max = Math.max(1, ...S.rows.map(votesOf));
    S.rows.forEach((r) => {
      const el = slideEl.querySelector(`[data-row="${r.id}"]`);
      if (!el) return;
      el.classList.toggle("mine", S.mine === r.id);
      el.querySelector("b").textContent = votesOf(r);
      el.querySelector("i").style.setProperty("--w", `${(votesOf(r) / max) * 100}%`);
    });
    const t = slideEl.querySelector("[data-total]"); if (t) t.textContent = totalVotes();
  }

  function go(i) {
    i = Math.max(0, Math.min(STEPS.length - 1, i));
    if (i === S.step) return;
    stopSim();
    S.step = i; S.seen.add(i); S.newRow = null;
    render();
    if (STEPS[i].id === "vote") startSim();
  }

  // Controls
  $("#clients").innerHTML = CLIENTS.map((c, i) => `<button type="button" role="radio" aria-checked="${i === 0}" aria-label="${esc(c.name)}" title="${esc(c.name)}" data-client="${i}" style="--p:${c.p};--a:${c.a}"></button>`).join("");
  $("#clients").addEventListener("click", (e) => {
    const b = e.target.closest("[data-client]"); if (!b) return;
    S.client = +b.dataset.client; theme(); renderSlide(); if (STEPS[S.step].id === "vote") renderScribe();
  });
  $("#look").addEventListener("change", (e) => { S.look = e.target.value; theme(); });
  runEl.addEventListener("click", (e) => { const b = e.target.closest("[data-step]"); if (b) go(+b.dataset.step); });
  $("#prev").addEventListener("click", () => go(S.step - 1));
  $("#next").addEventListener("click", () => go(S.step + 1));
  // The room screen's keys: arrows move between slides (when you're not typing).
  $("#stage").addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) return;
    if (e.key === "ArrowRight") { go(S.step + 1); runEl.querySelector('[aria-selected="true"]')?.focus(); e.preventDefault(); }
    if (e.key === "ArrowLeft") { go(S.step - 1); runEl.querySelector('[aria-selected="true"]')?.focus(); e.preventDefault(); }
  });

  scribeEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.id !== "f-add" || S.rows.length >= MAX_ROWS) return;
    const f = new FormData(e.target), text = String(f.get("text")).trim();
    const people = Math.round(+f.get("people")), hrs = +f.get("hrs");
    if (!text || !(people > 0) || !(hrs > 0)) return;
    addRow(text, people, hrs);
    $('#f-add [name="text"]')?.focus();
  });
  scribeEl.addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    const d = t.dataset;
    if (d.del) removeRow(d.del);
    else if (d.vote) {
      S.mine = d.vote;
      $$("[data-vote]", scribeEl).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.vote === S.mine)));
      $(".phone-foot", scribeEl).textContent = "Vote counted. You can change it, but not vote twice.";
      updateBars(); ping();
    } else if (d.rank) { S.rankBy = d.rank; renderSlide(); renderScribe(); ping(); }
    else if (d.count) { S.count = +d.count; renderSlide(); renderScribe(); ping(); }
    else if (d.decide !== undefined) {
      S.decision = S.decision === +d.decide ? null : +d.decide;
      $$("[data-decide]", scribeEl).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.decide === S.decision)));
      renderSlide(); ping();
    } else if ("again" in d) { stopSim(); uid = 0; const keep = { client: S.client, look: S.look }; S = Object.assign(fresh(), keep); render(); }
  });
  scribeEl.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "rate") { S.rate = +t.value; $("#rate-val").textContent = `£${S.rate}`; renderSlide(); }
    if (t.id === "owner") { S.owner = t.value.trim(); renderSlide(); }
    if (t.id === "when") { S.when = t.value.trim(); renderSlide(); }
    if (["rate", "owner", "when"].includes(t.id)) ping();
  });

  theme(); render();

  /* ───────────── Click sparks (the logo's cursor) ───────────── */
  function spark(x, y) {
    const s = document.createElement("span");
    s.className = "spark"; s.style.left = `${x}px`; s.style.top = `${y}px`;
    s.innerHTML = '<i style="--r:-28deg"></i><i style="--r:12deg"></i><i style="--r:52deg"></i>';
    document.body.append(s);
    setTimeout(() => s.remove(), 500);
  }
  if (!reduced) {
    document.addEventListener("pointerdown", (e) => { if (e.target.closest("button, .btn, select, [data-spark]")) spark(e.clientX, e.clientY); });
  }

  /* ───────────── Autoplay: the demo edits itself until the visitor takes over ─────────────
     A cursor types a row into the scribe view and adds it; it appears on the client's screen. Then it takes it off again. */
  if (!reduced) {
    const stage = $("#stage"), ghost = $("#ghost");
    const LINES = [["Copying data between systems", 5, 4], ["Month-end reconciliation by hand", 3, 6]];
    let auto = false, started = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const moveTo = (el, fx = .5, fy = .6) => {
      const a = el.getBoundingClientRect(), b = stage.getBoundingClientRect();
      ghost.style.transform = `translate(${a.left - b.left + a.width * fx}px, ${a.top - b.top + a.height * fy}px)`;
      ghost.classList.add("on");
    };
    const halt = () => {
      if (!auto) return;
      auto = false; ghost.classList.remove("on");
      const input = $('#f-add [name="text"]');
      if (input) { input.classList.remove("typing"); input.value = ""; }
      $("#f-add .btn-add")?.classList.remove("pressed");
    };
    const play = async () => {
      auto = true;
      const ok = () => auto && STEPS[S.step].id === "capture";
      await wait(1300);
      for (let n = 0; ok(); n++) {
        const [text, people, hrs] = LINES[n % LINES.length];
        let input = $('#f-add [name="text"]');
        moveTo(input, .12, .55); await wait(850); if (!ok()) break;
        input.classList.add("typing");
        for (const ch of text) { input.value += ch; await wait(38 + Math.random() * 40); if (!ok()) break; }
        if (!ok()) break;
        $('#f-add [name="people"]').value = people; $('#f-add [name="hrs"]').value = hrs;
        await wait(350); if (!ok()) break;
        const btn = $("#f-add .btn-add");
        moveTo(btn, .5, .5); await wait(850); if (!ok()) break;
        btn.classList.add("pressed");
        const b = btn.getBoundingClientRect(); spark(b.left + b.width / 2, b.top + b.height / 2);
        await wait(160); if (!ok()) break;
        const r = addRow(text, people, hrs);
        await wait(3400); if (!ok() || !r) break;
        const del = $(`[data-del="${r.id}"]`);
        if (del) { moveTo(del, .5, .5); await wait(850); if (!ok()) break; const d = del.getBoundingClientRect(); spark(d.left + d.width / 2, d.top + d.height / 2); }
        removeRow(r.id);
        await wait(1500);
      }
      halt();
    };
    ["pointerdown", "keydown", "wheel", "touchstart"].forEach((t) => stage.addEventListener(t, (e) => { if (e.isTrusted && t !== "wheel") halt(); }, { passive: true }));
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting && !started) { started = true; io.disconnect(); play(); } }, { threshold: .35 }).observe(stage);
  }

  /* ───────────── Slide-type minis ───────────── */
  // Board: click a card to move it to the next column.
  const cols = $$('[data-mini="board"] .m-col');
  if (cols.length) {
    const cards = [["Rekeying", 0], ["Approvals", 0], ["Reports", 1], ["Onboarding", 2]];
    const draw = () => cols.forEach((c, i) => {
      $$(".m-card", c).forEach((x) => x.remove());
      cards.forEach((card, k) => { if (card[1] === i) c.insertAdjacentHTML("beforeend", `<button type="button" class="m-card" data-card="${k}" aria-label="${card[0]}: move to the next column">${card[0]}</button>`); });
    });
    cols[0].parentElement.addEventListener("click", (e) => {
      const b = e.target.closest("[data-card]"); if (!b) return;
      const k = +b.dataset.card; cards[k][1] = (cards[k][1] + 1) % cols.length; draw();
      cols[0].parentElement.querySelector(`[data-card="${k}"]`)?.focus();
    });
    draw();
  }
  // Scale: click a step to place Today; click again further up to place Target.
  const steps = $("#scale-steps");
  if (steps) {
    let today = 2, target = 5, next = "today";
    const draw = () => { steps.innerHTML = Array.from({ length: 7 }, (_, i) => `<button type="button" style="--i:${i}" class="${i === today ? "today" : i === target ? "target" : ""}" data-mark="${i === today ? "Today" : i === target ? "Target" : ""}" data-i="${i}" aria-label="Step ${i + 1}${i === today ? ", today" : i === target ? ", target" : ""}">${i + 1}</button>`).join(""); };
    steps.addEventListener("click", (e) => {
      const b = e.target.closest("[data-i]"); if (!b) return;
      const i = +b.dataset.i;
      if (next === "today") { today = i; if (target <= today) target = Math.min(6, today + 1); if (today === 6) today = 5, target = 6; next = "target"; }
      else { if (i > today) target = i; else today = i; next = "today"; }
      draw(); steps.querySelector(`[data-i="${i}"]`)?.focus();
    });
    draw();
  }
  // Decision: choose one.
  $$('[data-mini="decision"]').forEach((m) => m.addEventListener("click", (e) => {
    const b = e.target.closest(".m-opt"); if (!b) return;
    $$(".m-opt", m).forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
  }));
  // For each: step through the picked items.
  if ($("#each-next")) {
    const items = [["Rekeying invoices", 180], ["Chasing approvals", 240], ["Building the weekly report", 96]];
    let i = 0;
    const draw = () => { $("#each-count").textContent = `${i + 1} of ${items.length}`; $("#each-name").textContent = items[i][0]; $("#each-val").textContent = items[i][1]; };
    $("#each-next").addEventListener("click", () => { i = (i + 1) % items.length; draw(); });
    $("#each-prev").addEventListener("click", () => { i = (i + items.length - 1) % items.length; draw(); });
  }

  /* ───────────── Assistant: an example proposal (scripted, and labelled as such) ───────────── */
  const PROPOSALS = [
    { title: "Prioritise and commit", mins: 45, sum: "Six slides. The room places itself, lists what costs it time, votes, and leaves with one decision and an owner.",
      slides: [["Where are we today?", "Scale"], ["What steals our time?", "Capture"], ["Which first?", "Vote"], ["The top two", "Pick"], ["What would fixing it save?", "For each"], ["Where do we start?", "Decision"]] },
    { title: "Quarterly review", mins: 60, sum: "Eight slides. Last quarter's actions, what changed, the numbers, then priorities for the next quarter chosen by the room.",
      slides: [["Welcome and agenda", ""], ["What we agreed last time", ""], ["What's changed since?", "Capture"], ["Where we are now", "Scale"], ["The numbers", "Big numbers"], ["Next quarter's priorities", "Vote"], ["Now, next, later", "Board"], ["Actions and owners", "Decision"]] },
    { title: "Finance system discovery", mins: 90, sum: "Eight slides. Who's in the room, where the current system hurts, what matters most, and a clear next step.",
      slides: [["Who's in the room", ""], ["How it works today", ""], ["Where it hurts", "Capture"], ["What matters most?", "Vote"], ["The three to dig into", "Pick"], ["Walk through each one", "For each"], ["What it costs us", "Big numbers"], ["What happens next", "Decision"]] },
  ];
  const aiOut = $("#ai-out"), aiInput = $("#ai-input");
  if (aiOut) {
    let aiTimer;
    const propose = (p, typed) => {
      clearTimeout(aiTimer);
      aiOut.innerHTML = `<p class="ai-thinking"><i></i><i></i><i></i>Drafting slides, live questions and timings…</p>`;
      aiTimer = setTimeout(() => {
        aiOut.innerHTML = `<div class="proposal"><div class="proposal-head"><strong>${p.title}</strong><span>${p.slides.length} slides · ${p.mins} min</span></div><p>${p.sum}</p>
          <ol>${p.slides.map(([t, type], i) => `<li style="--i:${i}"><span>${t}</span>${type ? `<em>${type}</em>` : ""}</li>`).join("")}</ol>
          <div class="proposal-actions"><button type="button" class="btn btn-white" data-apply>Apply</button><button type="button" class="btn btn-discard" data-discard>Discard</button></div>
          <p class="proposal-note">${typed ? "This page shows an example proposal. In the app, the assistant drafts from your own words." : "An example proposal. In the app, it's drafted from your words and your client's context."}</p></div>`;
      }, reduced ? 0 : 1100);
    };
    $("#ai-chips").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      aiInput.value = b.textContent; propose(PROPOSALS[$$("#ai-chips button").indexOf(b)], false);
    });
    $("#ai-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const v = aiInput.value.trim(); if (!v) { aiInput.focus(); return; }
      const chip = $$("#ai-chips button").findIndex((b) => b.textContent === v);
      propose(PROPOSALS[chip < 0 ? 0 : chip], chip < 0);
    });
    aiInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#ai-form").requestSubmit(); } });
    aiOut.addEventListener("click", (e) => {
      if (e.target.closest("[data-apply]")) aiOut.innerHTML = `<div class="applied">Applied as unsaved edits. Save when you're happy.<button type="button" data-undo>Undo</button></div>`;
      else if (e.target.closest("[data-discard], [data-undo]")) { aiOut.innerHTML = ""; aiInput.focus(); }
    });
  }

  /* ───────────── Meetings: the Heard tray ───────────── */
  const heardList = $("#heard-list"), heardOn = $("#heard-on");
  if (heardList) {
    const HEARD = [
      { text: "Finance: rekeying invoices, 4 people, about 6 hrs a week", src: "Meeting chat · 10:42", kind: "Row" },
      { text: "“We approve the same thing three times.”", src: "Typed by the scribe · 10:47", kind: "Note" },
      { text: "Priya to share the month-end checklist by Friday", src: "Meeting chat · 10:51", kind: "Action" },
    ];
    let left, on;
    const draw = () => {
      heardList.innerHTML = left.map((k) => `<li><div>${esc(HEARD[k].text)}<small>${HEARD[k].kind} · ${HEARD[k].src}</small></div><button type="button" class="heard-skip" data-skip="${k}">Skip</button><button type="button" class="heard-add" data-add="${k}">Add</button></li>`).join("")
        || `<li style="background:none;border-style:dashed"><div>That's everything heard so far.</div><button type="button" class="heard-skip" data-reset>Start again</button></li>`;
      heardOn.innerHTML = on.map((k) => `<li>${esc(HEARD[k].text)}</li>`).join("") || `<li class="empty">Nothing reaches the screen until you add it.</li>`;
    };
    const reset = () => { left = HEARD.map((_, i) => i); on = []; draw(); };
    heardList.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      if ("reset" in b.dataset) return reset();
      const k = +(b.dataset.add ?? b.dataset.skip);
      left = left.filter((x) => x !== k); if (b.dataset.add !== undefined) on.push(k);
      draw();
    });
    reset();
  }

  /* ───────────── Page chrome ───────────── */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(el); });
  } else reveals.forEach((el) => el.classList.add("in"));
})();
