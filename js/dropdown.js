/* */ // delay the dropdown
document.querySelectorAll('.dropdown').forEach((dropdown) => {
  let closeTimer

  const open = () => {
    clearTimeout(closeTimer)
    dropdown.classList.add('open')
  }

  const closeWithDelay = () => {
    clearTimeout(closeTimer)
    closeTimer = setTimeout(() => {
      dropdown.classList.remove('open')
    }, 250)
  }

  dropdown.addEventListener('mouseenter', open)
  dropdown.addEventListener('mouseleave', closeWithDelay)
})
