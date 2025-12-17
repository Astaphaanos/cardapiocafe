import {listarMesas} from "../../api/api.js"

document.addEventListener('DOMContentLoaded', async() => {
  const result = await listarMesas()

  const mesasSalvas = JSON.parse(localStorage.getItem('mesas'))

  const mesasAtualizadas = Array.isArray(mesasSalvas)
    ? result.map(mesaApi => {
        const mesaLocal = mesasSalvas.find(m => Number(m.id) === Number(mesaApi.id))
        return mesaLocal ? mesaLocal : mesaApi
      })
    : result

    localStorage.setItem('mesas', JSON.stringify(mesasAtualizadas))


  const container = document.getElementById('mesas-container')

  if(!Array.isArray(result)) {
    container.innerHTML = '<p>Erro ao carregar as mesas.</p>'
    return
  }

  const mesas = JSON.parse(localStorage.getItem('mesas'))

  mesas.forEach(mesa => {
    const card = document.createElement('div')
    card.className = 'mesa-card'

    card.dataset.id = mesa.id
    card.dataset.status = mesa.status

    card.classList.remove('livre', 'ocupada')

    if (mesa.status === 'ocupado') {
      card.classList.add('ocupada')
    } else {
      card.classList.add('livre')
    }


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