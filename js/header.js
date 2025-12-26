async function inject(selector, url) {
  const host = document.querySelector(selector)
  if (!host) return

  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) return

  host.innerHTML = await res.text()
}

document.addEventListener('DOMContentLoaded', async () => {
  await inject('#site-header', '/header.html')

  // Wire up hamburger AFTER header is injected
  const toggle = document.querySelector('.nav-toggle')
  const nav = document.getElementById('primary-nav')

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!isOpen))
      nav.classList.toggle('open', !isOpen)
    })
  }
})
