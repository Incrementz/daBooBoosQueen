// js/site-header.js

const BASE_PATH = (() => {
  // GitHub Pages project site detection
  if (location.hostname === 'incrementz.github.io') {
    return '/daBooBoosQueen'
  }
  // Localhost / custom domain
  return ''
})()

function fixHeaderPaths(root = BASE_PATH) {
  if (!root) return

  document
    .querySelectorAll(
      'header a[href^="/"], header img[src^="/"], header script[src^="/"], header link[href^="/"]'
    )
    .forEach((el) => {
      const attr = el.hasAttribute('href') ? 'href' : 'src'
      const val = el.getAttribute(attr)

      // Safety: only rewrite true root-relative paths like "/something"
      // (skip "//cdn...", "mailto:", "tel:", "http", "#hash")
      if (!val || !val.startsWith('/') || val.startsWith('//')) return

      // Avoid double-prefixing if already fixed
      if (val.startsWith(root + '/')) return

      el.setAttribute(attr, root + val)
    })
}

function setupHeaderInteractions() {
  const header = document.querySelector('.site-header')
  const toggle = document.querySelector('.nav-toggle')
  const nav = document.getElementById('primary-nav')

  if (!header || !toggle || !nav) return

  // Hamburger
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  // Dropdown toggles (only intercept click on mobile)
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

  // Close on normal link click
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (!link) return
    if (link.classList.contains('dropdown-toggle')) return

    header.classList.remove('open')
    toggle.setAttribute('aria-expanded', 'false')
  })
}

async function injectHeader() {
  const host = document.querySelector('#site-header')
  if (!host) return

  const res = await fetch(`${BASE_PATH}/header.html`, { cache: 'no-cache' })
  if (!res.ok) {
    console.warn('Header inject failed:', res.status, res.url)
    return
  }

  host.innerHTML = await res.text()
  fixHeaderPaths()
  setupHeaderInteractions()
}

document.addEventListener('DOMContentLoaded', injectHeader)
