const shortcuts = [
  'Record a voice command',
  'Inspect the active tab',
  'Save extension state',
]

export default function App() {
  return (
    <main className="popup-shell">
      <section className="hero-card">
        <p className="eyebrow">Chrome extension starter</p>
        <h1>Gambit Voice</h1>
        <p className="lede">
          A React + TypeScript boilerplate for building Chrome extensions with a
          popup, background service worker, and extension manifest wired for V3.
        </p>

        <div className="status-row">
          <span className="status-dot" />
          <span>Ready to customize</span>
        </div>
      </section>

      <section className="panel">
        <h2>Starter actions</h2>
        <ul>
          {shortcuts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}