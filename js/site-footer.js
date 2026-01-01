function getBasePath() {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return ''

  if (location.hostname === 'incrementz.github.io') {
    const first = location.pathname.split('/').filter(Boolean)[0]
    return first ? `/${first}` : ''
  }

  return ''
}

const BASE_PATH = getBasePath()

function withBase(path) {
  if (!BASE_PATH) return path
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
}

function fixFooterPaths(root = BASE_PATH) {
  if (!root) return

  const scope = document.querySelector('#site-footer')
  if (!scope) return

  scope
    .querySelectorAll('a[href^="/"], img[src^="/"], script[src^="/"], link[href^="/"]')
    .forEach((el) => {
      const attr = el.hasAttribute('href') ? 'href' : 'src'
      const val = el.getAttribute(attr)

      if (!val || !val.startsWith('/') || val.startsWith('//')) return
      if (val.startsWith(root + '/')) return

      el.setAttribute(attr, root + val)
    })
}

async function injectFooter() {
  const host = document.querySelector('#site-footer')
  if (!host) return

  const res = await fetch(withBase('/footer.html'), { cache: 'no-cache' })
  if (!res.ok) {
    console.warn('Footer inject failed:', res.status, res.url)
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
