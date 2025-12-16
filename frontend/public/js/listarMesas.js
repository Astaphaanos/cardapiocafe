import {listarMesas} from "../../api/api.js"

document.addEventListener('DOMContentLoaded', async() => {
  const result = await listarMesas()

  localStorage.setItem('mesas', JSON.stringify(result))

  const container = document.getElementById('mesas-container')

  if(!Array.isArray(result)) {
    container.innerHTML = '<p>Erro ao carregar as mesas.</p>'
    return
  }

  result.forEach(mesa => {
    const card = document.createElement('div')
    card.className = 'mesa-card'

    card.dataset.status = mesa.status
    card.dataset.id = mesa.id

    const statusLower = mesa.status.toLowerCase()
    card.classList.add(statusLower)

    card.innerHTML = `
      <span>${mesa.status}</span>
      <h2>${mesa.numeroMesa}</h2>
      <p>Mesa ${mesa.numeroMesa}</p>
    `;
    container.appendChild(card)
  });

  document.querySelectorAll('.mesa-card').forEach(card => {
    card.addEventListener('click', () => {
      const mesaSelecionada = {
        id: card.dataset.id,
        status: card.dataset.status
      }

      localStorage.setItem('mesaSelecionada', JSON.stringify(mesaSelecionada))

      if(mesaSelecionada.status === 'livre') {
        window.location.href = `../pages/cardapio.html?mesa=${mesaSelecionada.id}`
      } else {
         window.location.href = `../pages/pagamento.html?mesa=${mesaSelecionada.id}`
      }
    })
  })
})