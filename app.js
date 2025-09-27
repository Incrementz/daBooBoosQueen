// Smooth scroll + demo contact form (no backend wired yet)
function qs(sel, root=document){return root.querySelector(sel)}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')
      if (id.length > 1) {
        e.preventDefault()
        document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'})
      }
    })
  })
})
function submitContact(e){
  e.preventDefault()
  const form = e.target
  const data = Object.fromEntries(new FormData(form).entries())
  const status = qs('#formStatus')
  status.textContent = "Thanks! We'll be in touch shortly."
  form.reset()
  return false
}
