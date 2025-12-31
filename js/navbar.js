// Place nav header bar at each page
async function inject(selector, url) {
  const host = document.querySelector(selector)
  if (!host) return null

  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) return null

  host.innerHTML = await res.text()
  return host
}

document.addEventListener('DOMContentLoaded', async () => {
  const host = document.querySelector('#site-header')
  if (!host) return

  // 🔑 Make the mount element be the sticky header container
  host.classList.add('site-header')

  await inject('#site-header', '/daBooBoosQueen/header.html')

  // Use the host as "header" (reliable even if header.html has no wrapper)
  const header = host
  const toggle = header.querySelector('.nav-toggle')
  const nav = header.querySelector('#primary-nav')

  if (!toggle || !nav) return

  // Toggle
  toggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('open')
    toggle.setAttribute('aria-expanded', String(isOpen))
  })

  // Close on link click + return focus to toggle (nice for keyboard users)
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      header.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
      toggle.focus()
    }
  })

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.classList.contains('open')) return
    if (!header.contains(e.target)) {
      header.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      header.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
      toggle.focus()
    }
  })

  // Click brand and close hamburger
  const brandEl =
    header.querySelector('.brand') || header.querySelector('img[alt*="Da Boo Boo Queen"]')

  if (!brandEl) return

  brandEl.addEventListener('click', () => {
    if (header.classList.contains('open')) {
      header.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    }
  })
})
