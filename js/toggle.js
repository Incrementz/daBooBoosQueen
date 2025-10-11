document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header')
  const toggle = document.querySelector('.nav-toggle')
  const nav = document.getElementById('primary-nav')

  if (!header || !toggle || !nav) return

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

  // Click image and close hamburger
  const brandEl =
    document.querySelector('.brand') || document.querySelector('img[alt*="Da Boo Boo Queen"]')

  if (!header || !toggle || !brandEl) return

  brandEl.addEventListener('click', () => {
    // Only do this if the mobile menu is open
    if (header.classList.contains('open')) {
      header.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
      // optional: return focus to the toggle for keyboard users
      // toggle.focus();
    }
    // let navigation proceed normally (to home, etc.)
  })
})
