(function () {
    const grid = document.getElementById("grid");
    const count = document.getElementById("count");

    const games = Array.isArray(window.GAMES) ? window.GAMES : [];

    function card(game) {
        const el = document.createElement("article");
        el.className = "card";

        const h = document.createElement("h3");
        h.textContent = game.title || "Untitled";

        const p = document.createElement("p");
        p.textContent = game.description || "";

        const actions = document.createElement("div");
        actions.className = "actions";

        const play = document.createElement("a");
        play.className = "btn";
        play.href = game.url;
        play.target = "_blank";
        play.rel = "noopener noreferrer";
        play.textContent = "Play";

        const copy = document.createElement("button");
        copy.className = "btn";
        copy.type = "button";
        copy.textContent = "Copy URL";
        copy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(game.url);
                copy.textContent = "Copied!";
                setTimeout(() => (copy.textContent = "Copy URL"), 900);
            } catch {
                prompt("Copy this URL:", game.url);
            }
        });

        actions.appendChild(play);
        actions.appendChild(copy);

        el.appendChild(h);
        if (p.textContent) el.appendChild(p);
        el.appendChild(actions);

        return el;
    }

    function render() {
        grid.innerHTML = "";
        for (const g of games) {
            grid.appendChild(card(g));
        }
        count.textContent = `${games.length} game${games.length === 1 ? "" : "s"} total`;
    }

    render();
})();