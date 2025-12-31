// /js/site-header.js

function getBasePath() {
  // Local dev (live-server / localhost): serve from "/"
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

function fixHeaderPaths() {
  if (!BASE_PATH) return

  document
    .querySelectorAll(
      'header a[href^="/"], header img[src^="/"], header script[src^="/"], header link[href^="/"]'
    )
    .forEach((el) => {
      const attr = el.hasAttribute('href') ? 'href' : 'src'
      const val = el.getAttribute(attr)
      if (!val || !val.startsWith('/') || val.startsWith('//')) return
      if (val.startsWith(BASE_PATH + '/')) return
      el.setAttribute(attr, BASE_PATH + val)
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

async function injectHeader() {
  const host = document.querySelector('#site-header')
  if (!host) return

  const res = await fetch(withBase('/header.html'), { cache: 'no-cache' })
  if (!res.ok) {
    console.warn('Header inject failed:', res.status, res.url)
    return
  }

  host.innerHTML = await res.text()
  fixHeaderPaths()
  setupHeaderInteractions()
}

document.addEventListener('DOMContentLoaded', injectHeader)
