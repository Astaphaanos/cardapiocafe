import { buscarMesaPorId, deletarMesa, editarMesaApi, listarMesas } from '../../api/api.js'

document.addEventListener('DOMContentLoaded', async () => {
  const result = await listarMesas()

  // Funcionalidade de 'Modo de Gerenciamento para editar e excluir as mesas'
  let modoGerenciamento = false

  const mesasSalvas = JSON.parse(localStorage.getItem('mesas'))

  const mesasAtualizadas = Array.isArray(mesasSalvas)
    ? result.map((mesaApi) => {
        const mesaLocal = mesasSalvas.find((m) => Number(m.id) === Number(mesaApi.id))
        return mesaLocal ? mesaLocal : mesaApi
      })
    : result

  localStorage.setItem('mesas', JSON.stringify(mesasAtualizadas))

  const container = document.getElementById('mesas-container')

  if (!Array.isArray(result)) {
    container.innerHTML = '<p>Erro ao carregar as mesas.</p>'
    return
  }

  const mesas = JSON.parse(localStorage.getItem('mesas'))

  mesas.forEach((mesa) => {
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

       <div class="mesa-acoes">
        <button class="editar">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button class="excluir">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
    container.appendChild(card)
  })

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.mesa-card')
    if(!card) return

    // btn de excluir
    if(e.target.closest('.excluir')) {
      e.stopPropagation()
      excluirMesa(card.dataset.id)
      return
    }

    if(e.target.closest('.editar')) {
      e.stopPropagation()
      editarMesa(card.dataset.id)
      return
    }

    if (modoGerenciamento) return

    const mesaSelecionada = {
      id: card.dataset.id,
      status: card.dataset.status,
    }

    localStorage.setItem('mesaSelecionada', JSON.stringify(mesaSelecionada))

    if (mesaSelecionada.status === 'livre') {
      window.location.href = `../pages/cardapio.html?mesa=${mesaSelecionada.id}`
    } else {
      window.location.href = `../pages/pagamento.html?mesa=${mesaSelecionada.id}`
    }
  })

  const btnGerenciar = document.getElementById('btn-gerenciar-mesas')

  if (btnGerenciar) {
    btnGerenciar.addEventListener('click', () => {
      modoGerenciamento = !modoGerenciamento
      btnGerenciar.textContent = modoGerenciamento ? 'Sair do gerenciamento' : 'Gerenciar mesas'
      document.body.classList.toggle('modo-gerenciamento', modoGerenciamento)
    })
  }
})

async function excluirMesa(id) {
  const confirmar = confirm('Tem certeza que deseja excluir essa mesa?')
  if(!confirmar) return

  try {
    await deletarMesa(id)
    
    let mesas = JSON.parse(localStorage.getItem('mesas')) || []
    mesas = mesas.filter(m => Number(m.id) !== Number(id))
    localStorage.setItem('mesas', JSON.stringify(mesas))

    document.querySelector(`.mesa-card[data-id="${id}"]`)?.remove()
    alert('Mesa excluída com sucesso')
  } catch (error) {
    alert('Erro ao excluir mesa')
  }
}

async function editarMesa(id) {
  try {
    const mesa = await buscarMesaPorId(id)

    const novoNumero = prompt('Novo número da mesa', mesa.numeroMesa)
    if(!novoNumero) return

    const response = await editarMesaApi(id, {numeroMesa: novoNumero})
    const mesaAtualizada = response.mesaAtualizada

    let mesas = JSON.parse(localStorage.getItem('mesas')) || []
    mesas = mesas.map(m =>
      Number(m.id) === Number(id) ? mesaAtualizada : m
    )
    localStorage.setItem('mesas', JSON.stringify(mesas))

    const card = document.querySelector(`.mesa-card[data-id="${id}"]`)
    card.querySelector('h2').textContent = mesaAtualizada.numeroMesa
    card.querySelector('p').textContent = `Mesa ${mesaAtualizada.numeroMesa}`

    alert('Mesa atualizada com sucesso')
  } catch (error) {
     alert('Erro ao editar mesa')
  }
}