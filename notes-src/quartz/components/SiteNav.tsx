import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Top bar copied from tigerwuu.github.io so the notes look like part of the main site
const SITE = "https://tigerwuu.github.io"
const LINKS: [string, string][] = [
  ["About", "about.html"],
  ["Projects", "projects.html"],
  ["Activities", "activities.html"],
  ["Hobbies", "hobbies.html"],
  ["Notes", "notes.html"],
  ["Contact", "contact.html"],
]

export default (() => {
  const SiteNav: QuartzComponent = () => (
    <nav class="site-nav">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Kdam+Thmor+Pro&display=swap"
      />
      <a class="site-brand" href={`${SITE}/index.html`}>
        TigerWuu
      </a>
      <ul>
        {LINKS.map(([label, href]) => (
          <li class={label === "Notes" ? "active" : ""}>
            <a href={`${SITE}/${href}`}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
  // when the notes are embedded in the main site's Bootstrap page, hide this bar
  // and tell the outer page which note is open so it can keep its URL in sync
  SiteNav.beforeDOMLoaded = `if (window.self !== window.top) document.documentElement.classList.add("embedded")`
  SiteNav.afterDOMLoaded = `document.addEventListener("nav", () => {
    if (window.self === window.top) return
    window.parent.postMessage({ type: "quartz-nav", path: location.pathname, title: document.title }, "*")
  })`
  return SiteNav
}) satisfies QuartzComponentConstructor
