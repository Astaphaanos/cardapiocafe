import {listarMesas} from "../../api/api.js"

document.addEventListener('DOMContentLoaded', async() => {
  const result = await listarMesas()

  const container = document.getElementById('mesas-container')

  if(!Array.isArray(result)) {
    container.innerHTML = '<p>Erro ao carregar as mesas.</p>'
    return
  }

  result.forEach(mesa => {
    const card = document.createElement('div')
    card.className = 'mesa-card'

    const statusLower = mesa.status.toLowerCase()
    card.classList.add(statusLower)

    card.innerHTML = `
      <span>${mesa.status}</span>
      <h2>${mesa.numeroMesa}</h2>
      <p>Mesa ${mesa.numeroMesa}</p>
    `;
    container.appendChild(card)
  });
})