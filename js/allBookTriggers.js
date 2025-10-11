document.addEventListener('DOMContentLoaded', () => {
  const nsName = 'free-first-pet-waste-removal'
  const triggers = document.querySelectorAll(`[data-cal-namespace="${nsName}"]`)
  if (!triggers.length) return

  const isMod = (e) => e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (isMod(e)) return
      const ns = window.Cal?.ns?.[nsName]
      if (ns) {
        e.preventDefault()
        const cfg = btn.getAttribute('data-cal-config')
        ns('open', { calLink: btn.dataset.calLink, config: cfg ? JSON.parse(cfg) : {} })
      } // else: allow href fallback
    })
  })
})
