function createControls(isSelf: boolean): HTMLDivElement {
  const root = document.createElement("div");

  root.className = "gambitvoice-controls";

  Object.assign(root.style, {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto",
    flexShrink: "0",
  });

  const mic = document.createElement("button");
  mic.textContent = "🎤";

  const speaker = document.createElement("button");
  speaker.textContent = "🔊";

  [mic, speaker].forEach((btn) => {
    Object.assign(btn.style, {
      width: "28px",
      height: "28px",
      border: "none",
      borderRadius: "9999px",
      background: "#3b3b3b",
      color: "white",
      cursor: isSelf ? "pointer" : "default",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "15px",
      transition: "background .15s ease",
    });

    btn.addEventListener("mouseenter", () => {
      btn.style.background = "#4a4a4a";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.background = "#3b3b3b";
    });
  });

  root.append(mic, speaker);

  return root;
}

function inject() {
  const topRow = document.querySelector(
    "#board-layout-player-top .player-row-component"
  ) as HTMLElement | null;

  const bottomRow = document.querySelector(
    "#board-layout-player-bottom .player-row-component"
  ) as HTMLElement | null;

  if (!topRow || !bottomRow) return;

  // Ensure the row is a flex container
  topRow.style.display = "flex";
  topRow.style.alignItems = "center";

  bottomRow.style.display = "flex";
  bottomRow.style.alignItems = "center";

  if (!topRow.querySelector(".gambitvoice-controls")) {
    topRow.appendChild(createControls(false));
  }

  if (!bottomRow.querySelector(".gambitvoice-controls")) {
    bottomRow.appendChild(createControls(true));
  }
}

const observer = new MutationObserver(() => {
  inject();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

inject();