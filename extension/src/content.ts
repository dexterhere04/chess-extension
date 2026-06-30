console.log("Gambit Voice content script loaded");

const badge = document.createElement("div");

badge.textContent = "🎤 Gambit Voice";

badge.style.position = "fixed";
badge.style.bottom = "20px";
badge.style.right = "20px";
badge.style.zIndex = "999999";
badge.style.background = "#0B3D2E";
badge.style.color = "white";
badge.style.padding = "8px 12px";
badge.style.borderRadius = "8px";
badge.style.fontFamily = "sans-serif";

document.body.appendChild(badge);