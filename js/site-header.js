async function injectHeader() {
  const host = document.querySelector('#site-header')
  if (!host) return

  const res = await fetch('header.html', { cache: 'no-cache' })
  if (!res.ok) {
    console.warn('Header inject failed:', res.status, res.url)
    return
  }

  host.innerHTML = await res.text()
  setupHeaderInteractions()
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

// Run even if loaded after DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectHeader)
} else {
  injectHeader()
}
