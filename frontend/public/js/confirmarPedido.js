const containerItens = document.getElementById('confirmar-itens')
const containerResumo = document.getElementById('pedido-resumo')
const mesaSpan = document.getElementById('mesaId')
const btnConfirmar = document.getElementById('btn-confirmarPedido')

const pedido = JSON.parse(localStorage.getItem('pedidoAtual'))
const mesaId = localStorage.getItem('mesaSelecionada')

if (!pedido || !Array.isArray(pedido.itens)) {
  alert('Pedido inválido')
  window.location.href = '../pages/cardapio.html'
}

function renderizarPedido() {
  containerItens.innerHTML = ""
  containerResumo.innerHTML = ""
  mesaSpan.textContent = pedido.mesaId

  let subtotal = 0

   pedido.itens.forEach(item => {
    const preco = Number(item.preco)
    const quantidade = Number(item.quantidade)
    const itemSubtotal = preco * quantidade
    subtotal += itemSubtotal

    const div = document.createElement('div')
    div.className = 'pedido-item'

    div.innerHTML = `
      <div class="item-info">
        <div>
          <p>${item.nome}</p>
          <span>Quantidade: ${quantidade}</span>
        </div>

        <div class="item-preco">
          <p>R$ ${itemSubtotal.toFixed(2)}</p>
          <span>R$ ${preco.toFixed(2)} cada</span>
        </div>
      </div>
    `

    containerItens.appendChild(div)
  })

  const taxaServico = subtotal * 0.1
  const total = subtotal + taxaServico

  containerResumo.innerHTML = `
  <div class="resumo-linha">
      <p class="subtotal">Subtotal</p>
      <span class="subtotal">R$ ${subtotal.toFixed(2)}</span>
    </div>

    <div class="resumo-linha">
      <p>Taxa de serviço (10%)</p>
      <span>R$ ${taxaServico.toFixed(2)}</span>
    </div>

    <div class="resumo-total">
      <p>Total</p>
      <span>R$ ${total.toFixed(2)}</span>
    </div>
  `
}

//* Botão de confirmar pedido
btnConfirmar.addEventListener('click', () => {
  const pedido = JSON.parse(localStorage.getItem('pedidoAtual'))
  const mesas = JSON.parse(localStorage.getItem('mesas'))
  const mesaSelecionada = JSON.parse(localStorage.getItem('mesaSelecionada'))

  if (!pedido || !mesaSelecionada || !Array.isArray(mesas)) {
    alert('Erro no pedido ou mesa')
    return
  }

  const mesa = mesas.find(m => Number(m.id) === Number(mesaSelecionada.id))
  if (!mesa) {
    alert('Mesa não encontrada')
    return
  }

  pedido.status = 'aberto'
  mesa.status = 'ocupado'

  localStorage.setItem('pedidoAtual', JSON.stringify(pedido))
  localStorage.setItem('mesas', JSON.stringify(mesas))

  alert('Pedido confirmado')
  window.location.href = '../pages/home.html'
})

renderizarPedido()