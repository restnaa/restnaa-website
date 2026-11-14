import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const SOURCE_URL = 'https://github.com/restnaa/restnaa'
const RELEASE_URL = 'https://github.com/restnaa/restnaa/releases/tag/v0.1.4-beta.3'
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function Icon({ name, size = 18 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="m18 15-6-6-6 6" /></>,
    arrowDown: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
    moon: <><path d="M20.5 15.7A8.5 8.5 0 0 1 8.3 3.5 8.5 8.5 0 1 0 20.5 15.7Z" /><path d="M17 3v3M18.5 4.5h-3" /></>,
    windows: <><path d="m3 5 8-1v8H3V5ZM13 3.8l8-1.1v9.3h-8V3.8ZM3 13h8v8l-8-1.1V13ZM13 13h8v9.3L13 21V13Z" /></>,
    github: <><path d="M15 22v-3.9c.1-1.4-.3-2.3-1-3.1 3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 4c.1-.4.5-1.9-.2-3.9 0 0-1.3-.4-4.1 1.5a14.1 14.1 0 0 0-7.5 0C4.7-.3 3.4.1 3.4.1c-.7 2-.3 3.5-.2 3.9A5.5 5.5 0 0 0 1.7 8c0 5.4 3.5 6.6 6.8 7-.7.8-1.1 1.7-1 3.1V22" /><path d="M6.5 18.5c-3 .9-3-1.5-4.3-1.7" /></>,
    eye: <><path d="M2.2 12s3.5-6 9.8-6 9.8 6 9.8 6-3.5 6-9.8 6-9.8-6-9.8-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    move: <><path d="M9 5V3m6 2V3M5 9H3m18 0h-2M7 7 5.6 5.6m11.4 1.4 1.4-1.4M8 14.5c.8 1.4 2.1 2.4 4 2.4 1.8 0 3.2-1 4-2.4" /><path d="M12 9v4" /></>,
    water: <><path d="M12 2s6 6.1 6 11a6 6 0 0 1-12 0c0-4.9 6-11 6-11Z" /><path d="M9 15.2c.7 1 1.7 1.5 3 1.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    shield: <><path d="M12 3 20 6v5c0 4.8-3.2 8.3-8 10-4.8-1.7-8-5.2-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    spark: <><path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
  }
  return <svg {...common}>{paths[name] || paths.spark}</svg>
}

function Logo({ compact = false }) {
  return <a className="logo" href="#top" aria-label="Restnaa home">
    <span className="logo-mark"><Icon name="moon" size={compact ? 18 : 20} /></span>
    {!compact && <span>restnaa</span>}
  </a>
}

const features = [
  { id: 'rest', icon: 'eye', label: 'Rest', title: 'Give your eyes a place to land.', text: 'Independent eye-break intervals with a gentle panel that stays out of your way. Done, snooze, skip, or close for now.', points: ['Automatic eye-break panels', 'Snooze and skip actions', 'Reduced-motion support'], image: asset('/screenshots/eye-break.png') },
  { id: 'move', icon: 'move', label: 'Move', title: 'Small resets. Better momentum.', text: 'Keep movement reminders separate from eye breaks, with working days and hours that follow your real schedule.', points: ['Independent movement interval', 'Selected days and working hours', 'Pause anytime, for any reason'], image: asset('/screenshots/dashboard.png') },
  { id: 'water', icon: 'water', label: 'Water', title: 'An optional nudge to refill.', text: 'A third, independent reminder category for water. Tune the interval or turn it off; the app does not turn a preference into a health score.', points: ['Optional water reminders', 'Independent 30–240 minute range', 'No quantities or medical claims'], image: asset('/screenshots/settings.png') },
]

const faqs = [
  { q: 'Is Restnaa really offline?', a: 'Normal app operation uses local SQLite and does not call a Restnaa backend. The project does not implement accounts, cloud sync, analytics, or telemetry. WebView2 and Windows component traffic remain a separate platform boundary, so the project does not claim strict zero egress.' },
  { q: 'What does the beta support?', a: 'Restnaa targets Windows 10 and 11 on x64. The current public candidate is 0.1.4 Beta 3 and is unsigned, so Windows may show an unknown publisher or SmartScreen warning.' },
  { q: 'Will it interrupt me while I am presenting?', a: 'You control the interruption surface. Use Pause or Quiet mode for guaranteed app quiet, choose working hours and days, and opt out of automatic break panels when you want reminders without the panel.' },
  { q: 'Where is my data stored?', a: 'Your settings and break history stay in the local app profile at %APPDATA%\\com.restnaa.desktop\\restnaa.sqlite3. The app does not encrypt that SQLite file; back it up while Restnaa is fully quit if you need a recovery copy.' },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState('rest')
  const [openFaq, setOpenFaq] = useState(0)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const active = features.find((feature) => feature.id === activeFeature)

  const closeMobile = () => setMobileOpen(false)

  return <div className="site" id="top">
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          <a href="#why" onClick={closeMobile}>Why Restnaa</a>
          <a href="#features" onClick={closeMobile}>What it does</a>
          <a href="#privacy" onClick={closeMobile}>Built quietly</a>
          <a href="#faq" onClick={closeMobile}>FAQ</a>
        </nav>
        <div className="header-actions">
          <a className="text-link source-link" href={SOURCE_URL} target="_blank" rel="noreferrer"><Icon name="github" size={17} /> <span>Source</span></a>
          <button className="button button-small button-light" onClick={() => setDownloadOpen(true)}>Get the beta <Icon name="arrow" size={16} /></button>
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}><Icon name={mobileOpen ? 'close' : 'menu'} /></button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Windows desktop / 0.1.4 beta 3</div>
            <h1>Work better.<br /><em>Rest smarter.</em></h1>
            <p className="hero-lede">A quiet desktop companion for the moments your body already knows it needs.</p>
            <div className="hero-cta">
              <button className="button button-primary" onClick={() => setDownloadOpen(true)}>Get the Windows beta <Icon name="arrow" size={17} /></button>
              <a className="button button-ghost" href="#features">See how it works <Icon name="arrowDown" size={16} /></a>
            </div>
            <div className="hero-proof"><span><Icon name="windows" size={16} /> Windows 10 / 11</span><span className="proof-divider" /><span><Icon name="shield" size={16} /> Local-first by design</span></div>
          </div>
          <div className="hero-visual" aria-label="Restnaa dashboard preview">
            <div className="visual-glow" />
            <div className="window-frame hero-window">
              <div className="window-topbar"><span className="window-dots"><i /><i /><i /></span><span className="window-title">Restnaa / Today</span><span className="window-status">● running</span></div>
              <div className="window-content dashboard-preview">
                <div className="preview-sidebar"><div className="mini-mark"><Icon name="moon" size={17} /></div><div className="side-line active" /><div className="side-line" /><div className="side-line" /><div className="side-bottom" /></div>
                <div className="preview-main">
                  <div className="preview-top"><div><div className="tiny-label">TUESDAY, NOVEMBER 14</div><h3>Good morning.</h3></div><span className="status-pill"><span /> On schedule</span></div>
                  <div className="next-break"><div><span className="card-kicker"><Icon name="eye" size={13} /> NEXT EYE BREAK</span><strong>in 18 minutes</strong><small>Rest your eyes for a moment.</small></div><div className="break-ring"><span>18</span><small>MIN</small></div></div>
                  <div className="preview-cards"><div><span><Icon name="move" size={13} /> Movement</span><strong>42 <small>min</small></strong></div><div><span><Icon name="water" size={13} /> Water</span><strong>1h 02 <small>next</small></strong></div></div>
                  <div className="preview-footer"><span>Today’s rhythm</span><div className="rhythm-bars"><i /><i /><i /><i /><i /><i className="muted" /><i className="muted" /><i className="muted" /></div></div>
                </div>
              </div>
            </div>
            <div className="floating-note"><span className="note-icon"><Icon name="spark" size={16} /></span><div><strong>A small reset is ready</strong><span>Eye break · 2 min</span></div><span className="note-arrow"><Icon name="arrow" size={14} /></span></div>
            <div className="visual-caption">A calmer rhythm, running quietly in the background.</div>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll to explore</span><span className="scroll-line" /></div>
      </section>

      <section className="intro-band" id="why">
        <div className="container intro-grid">
          <div className="section-tag">01 / The idea</div>
          <div><h2>The best reminder is the one that respects your attention.</h2><p>Restnaa lives in your tray, follows the hours you choose, and asks for just enough attention to help you return to the work that matters.</p></div>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="container">
          <div className="section-heading"><div><div className="section-tag">02 / What it does</div><h2>One app. Three kinds of reset.</h2></div><p>Each category has its own rhythm, its own toggle, and its own place in your local history.</p></div>
          <div className="feature-layout">
            <div className="feature-tabs" role="tablist" aria-label="Restnaa capabilities">
              {features.map((feature, index) => <button key={feature.id} className={activeFeature === feature.id ? 'feature-tab active' : 'feature-tab'} onClick={() => setActiveFeature(feature.id)} role="tab" aria-selected={activeFeature === feature.id}><span className="feature-number">0{index + 1}</span><span className="feature-tab-icon"><Icon name={feature.icon} size={19} /></span><span className="feature-tab-label">{feature.label}</span><span className="feature-tab-arrow"><Icon name="arrow" size={16} /></span></button>)}
              <div className="tab-footnote"><Icon name="clock" size={15} /> Independent schedules, not a one-size-fits-all timer.</div>
            </div>
            <div className="feature-detail">
              <div className="detail-copy"><div className="detail-icon"><Icon name={active.icon} size={22} /></div><h3>{active.title}</h3><p>{active.text}</p><ul>{active.points.map((point) => <li key={point}><span><Icon name="arrow" size={12} /></span>{point}</li>)}</ul></div>
              <div className="detail-image"><img src={active.image} alt={`${active.label} view from the Restnaa desktop app`} /><span className="image-label">REAL APP VIEW / {active.label.toUpperCase()}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="system-section" id="privacy">
        <div className="container system-grid">
          <div className="system-copy"><div className="section-tag">03 / Built quietly</div><h2>Less noise. More control.</h2><p>Restnaa is deliberately small in all the ways that matter. No account to create. No dashboard in the cloud. No productivity theater.</p><a className="inline-link" href={SOURCE_URL} target="_blank" rel="noreferrer">Read the source on GitHub <Icon name="arrow" size={16} /></a></div>
          <div className="principles">
            <div className="principle"><span className="principle-icon"><Icon name="shield" size={20} /></span><div><h3>Local-first</h3><p>Settings and history stay in a local SQLite profile on your Windows machine.</p></div><span className="principle-index">01</span></div>
            <div className="principle"><span className="principle-icon"><Icon name="clock" size={20} /></span><div><h3>Rust-owned rhythm</h3><p>One scheduler owns reminders, so the app stays predictable when the UI is quiet.</p></div><span className="principle-index">02</span></div>
            <div className="principle"><span className="principle-icon"><Icon name="github" size={20} /></span><div><h3>Open by default</h3><p>MIT-licensed source, visible limitations, and contribution paths that welcome small fixes.</p></div><span className="principle-index">03</span></div>
          </div>
        </div>
      </section>

      <section className="workflow-section">
        <div className="container workflow-grid">
          <div className="workflow-visual"><div className="workflow-orbit" /><div className="workflow-screen"><div className="screen-top"><span>restnaa</span><span>Settings</span></div><div className="screen-body"><div className="settings-heading"><span className="settings-back">‹</span><div><small>PERSONALIZE</small><strong>Your rhythm</strong></div></div><div className="setting-row"><span><Icon name="eye" size={16} /> Eye breaks</span><b className="toggle on"><i /></b></div><div className="setting-row"><span><Icon name="move" size={16} /> Movement</span><b className="toggle on"><i /></b></div><div className="setting-row"><span><Icon name="water" size={16} /> Water reminders</span><b className="toggle"><i /></b></div><div className="setting-row"><span><Icon name="moon" size={16} /> Quiet mode</span><b className="toggle"><i /></b></div></div></div><div className="workflow-bubble"><Icon name="spark" size={16} /> Your settings, your pace.</div></div>
          <div className="workflow-copy"><div className="section-tag">04 / Your pace</div><h2>Make the app fit the day you actually have.</h2><p>Choose working days and hours. Pause reminders before a presentation. Let the dashboard stay closed in the tray while the scheduler keeps doing its quiet work.</p><div className="workflow-list"><div><span>01</span><strong>Set your hours</strong><small>Schedule eye, movement, and water reminders independently.</small></div><div><span>02</span><strong>Stay in control</strong><small>Pause, snooze, skip, or quiet the app whenever you need to.</small></div><div><span>03</span><strong>Look back locally</strong><small>See Done, Snoozed, Skipped, and Unanswered in your history.</small></div></div></div>
        </div>
      </section>

      <section className="trust-section">
        <div className="container trust-inner"><div><div className="section-tag">05 / Honest software</div><h2>Ready to try the quieter option?</h2><p>Restnaa is an unsigned Windows beta. Review the installation notes and known limitations before you install.</p></div><div className="trust-actions"><button className="button button-primary" onClick={() => setDownloadOpen(true)}>View the beta release <Icon name="arrow" size={17} /></button><a className="button button-outline" href={SOURCE_URL + '#readme'} target="_blank" rel="noreferrer">Read the README <Icon name="arrow" size={16} /></a></div></div>
      </section>

      <section className="faq-section" id="faq">
        <div className="container faq-grid"><div><div className="section-tag">06 / Questions</div><h2>Good to know.</h2><p className="faq-intro">A few useful details before you make it part of your day.</p></div><div className="faq-list">{faqs.map((faq, index) => <div className={openFaq === index ? 'faq-item open' : 'faq-item'} key={faq.q}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{faq.q}</span><span className="faq-icon"><Icon name="chevron" size={17} /></span></button>{openFaq === index && <p>{faq.a}</p>}</div>)}</div></div>
      </section>
    </main>

    <footer className="site-footer"><div className="container footer-top"><div><Logo /><p className="footer-note">A quiet Windows desktop app for better work and better rest.</p></div><div className="footer-links"><div><span>Explore</span><a href="#why">Why Restnaa</a><a href="#features">What it does</a><a href="#faq">FAQ</a></div><div><span>Project</span><a href={SOURCE_URL} target="_blank" rel="noreferrer">GitHub source</a><a href={SOURCE_URL + '/blob/main/PRIVACY.md'} target="_blank" rel="noreferrer">Privacy</a><a href={SOURCE_URL + '/blob/main/CONTRIBUTING.md'} target="_blank" rel="noreferrer">Contributing</a></div></div></div><div className="container footer-bottom"><span>© 2026 Restnaa</span><span>MIT licensed · Made for Windows</span><a href="#top">Back to top <Icon name="arrowUp" size={14} /></a></div></footer>

    {downloadOpen && <div className="modal-backdrop" role="presentation" onClick={() => setDownloadOpen(false)}><div className="download-modal" role="dialog" aria-modal="true" aria-labelledby="download-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setDownloadOpen(false)} aria-label="Close download dialog"><Icon name="close" size={18} /></button><div className="modal-mark"><Icon name="windows" size={23} /></div><div className="eyebrow">Windows 10 / 11 · x64</div><h2 id="download-title">Start with the beta.</h2><p>The current Restnaa 0.1.4 Beta 3 release is unsigned. Download it from GitHub, compare the matching SHA-256 checksum, and read the installation notes before opening.</p><div className="modal-actions"><a className="button button-primary" href={RELEASE_URL} target="_blank" rel="noreferrer">Open beta release <Icon name="arrow" size={16} /></a><a className="modal-doc" href={SOURCE_URL + '/blob/main/docs/INSTALLATION.md'} target="_blank" rel="noreferrer">Read installation notes <Icon name="arrow" size={14} /></a></div><div className="modal-meta"><span><Icon name="shield" size={14} /> Unsigned pre-release</span><span><Icon name="github" size={14} /> Open source</span></div></div></div>}
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
