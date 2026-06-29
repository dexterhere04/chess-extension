import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'Gambit Voice',
  version: '0.1.0',
  description: 'A React-based Chrome extension starter.',
  action: {
    default_title: 'Gambit Voice',
    default_popup: 'popup.html',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  permissions: ['storage', 'activeTab'],
  host_permissions: ['http://*/*', 'https://*/*'],
})