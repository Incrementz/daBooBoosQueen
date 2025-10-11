export function createBookingButton({ text = 'Book FREE cleanup', href, layout = 'month_view' }) {
  const button = document.createElement('a')
  button.className = `btn ${variant}`
  button.dataset.calLink = 'da-boo-boos-queen-sntbbp/free-first-pet-waste-removal'
  button.dataset.calNamespace = 'free-first-pet-waste-removal'
  button.dataset.calConfig = JSON.stringify({ layout })
  button.href = href || 'https://cal.com/da-boo-boos-queen-sntbbp/free-first-pet-waste-removal'
  button.textContent = text
  return button
}
