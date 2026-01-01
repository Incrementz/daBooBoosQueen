// Wrapped in a IIFE, could do with site-header
;(function () {
  function detectBaseFromThisScript() {
    const scripts = Array.from(document.scripts)
    const me =
      document.currentScript ||
      scripts.find((s) => (s.src || '').includes('/js/site-footer.js')) ||
      scripts.find((s) => (s.src || '').includes('site-footer.js'))

    if (!me || !me.src) return ''

    const u = new URL(me.src)
    const suffix = '/js/site-footer.js'

    if (u.pathname.endsWith(suffix)) {
      const base = u.pathname.slice(0, -suffix.length)
      return base === '/' ? '' : base
    }

    const idx = u.pathname.indexOf('/js/')
    if (idx >= 0) {
      const base = u.pathname.slice(0, idx)
      return base === '/' ? '' : base
    }

    return ''
  }

  const BASE_PATH = detectBaseFromThisScript()

  function withBase(path) {
    if (!BASE_PATH) return path
    return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
  }

  function fixFooterPaths() {
    if (!BASE_PATH) return

    const scope = document.querySelector('#site-footer')
    if (!scope) return

    scope.querySelectorAll('a[href^="/"], img[src^="/"]').forEach((el) => {
      const attr = el.hasAttribute('href') ? 'href' : 'src'
      const val = el.getAttribute(attr)

      if (!val || !val.startsWith('/') || val.startsWith('//')) return
      if (val.startsWith(BASE_PATH + '/')) return

      el.setAttribute(attr, BASE_PATH + val)
    })
  }

  async function injectFooter() {
    const host = document.querySelector('#site-footer')
    if (!host) return

    const res = await fetch(withBase('/footer.html'), { cache: 'no-cache' })
    if (!res.ok) {
      return
    }

    host.innerHTML = await res.text()
    fixFooterPaths()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter)
  } else {
    injectFooter()
  }
})()
