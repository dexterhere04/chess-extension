import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,

  name: "Gambit Voice",

  version: "0.1.0",

  description:
    "Real-time voice chat for Chess.com players.",

  action: {
    default_title: "Gambit Voice",
    default_popup: "popup.html",
  },

  background: {
    service_worker: "src/background.ts",
    type: "module",
  },

  icons: {
    "16": "icons/icon16.png",
    "32": "icons/icon32.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png",
  },

  permissions: [
    "storage",
    "tabs",
    "scripting",
    "notifications",
    "activeTab",
    "alarms"
  ],

  host_permissions: [
    "https://www.chess.com/*",
    "https://*.chess.com/*",

    "http://localhost:8080/*",
    "http://localhost:7880/*",

    "https://api.gambitvoice.com/*"
  ],

  content_scripts: [
    {
      matches: [
        "https://www.chess.com/*"
      ],

      js: [
        "src/content.ts"
      ],

      run_at: "document_idle"
    }
  ],

  web_accessible_resources: [
    {
      resources: [
        "*.js",
        "*.css",
        "*.svg",
        "*.png"
      ],

      matches: [
        "https://www.chess.com/*"
      ]
    }
  ],

  externally_connectable: {
    matches: [
      "https://www.chess.com/*"
    ]
  }
});