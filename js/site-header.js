function getBasePath() {
  // Local dev: serve from "/"
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return ''

  // GitHub Pages project site: "/<repo>"
  // Example: https://incrementz.github.io/daBooBoosQueen/...
  if (location.hostname === 'incrementz.github.io') {
    const first = location.pathname.split('/').filter(Boolean)[0]
    return first ? `/${first}` : ''
  }

  // Custom domain: usually root
  return ''
}

const BASE_PATH = getBasePath()

function withBase(path) {
  if (!BASE_PATH) return path
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}

function fixHeaderPaths(root = BASE_PATH) {
  if (!root) return

  document
    .querySelectorAll(
      'header a[href^="/"], header img[src^="/"], header script[src^="/"], header link[href^="/"]'
    )
    .forEach((el) => {
      const attr = el.hasAttribute('href') ? 'href' : 'src'
      const val = el.getAttribute(attr)

      // only rewrite true root-relative paths (skip "//cdn...")
      if (!val || !val.startsWith('/') || val.startsWith('//')) return

      // avoid double-prefixing
      if (val.startsWith(root + '/')) return

      el.setAttribute(attr, root + val)
    })
}

function setupHeaderInteractions() {
  const header = document.querySelector('.site-header')
  const toggle = document.querySelector('.nav-toggle')
  const nav = document.getElementById('primary-nav')

  if (!header || !toggle || !nav) return

  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  document.querySelectorAll('.dropdown-toggle').forEach((a) => {
    const li = a.closest('.dropdown')
    if (!li) return

    a.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        e.preventDefault()
        const isOpen = li.classList.toggle('open')
        a.setAttribute('aria-expanded', String(isOpen))
      }
    })
  })

  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (!link) return
    if (link.classList.contains('dropdown-toggle')) return
    header.classList.remove('open')
    toggle.setAttribute('aria-expanded', 'false')
  })
}
