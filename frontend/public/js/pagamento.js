import { formatarPreco } from "../utils/formatarPreco.js"


const produtosContainer = document.getElementById('produtos-selecionados')
const resumoContainer = document.getElementById('pedido-resumo-total')
const totalSpan = document.getElementById('total-pedidos')
const mesaSpan = document.getElementById('mesaId')

// Recupera pedido confirmado
const pedido = JSON.parse(localStorage.getItem('pedidoAtual'))

if (!pedido || !Array.isArray(pedido.itens)) {
  alert('Nenhum pedido encontrado')
  window.location.href = '../pages/mesas.html'
}

// Mesa
mesaSpan.textContent = pedido.mesaId

function renderizarPagamento() {
  produtosContainer.innerHTML = ''
  resumoContainer.innerHTML = ''

  let subtotal = 0

  // Produtos
  pedido.itens.forEach(item => {
    subtotal += item.subtotal

    const div = document.createElement('div')
    div.className = 'produto-pagamento'

    div.innerHTML = `
      <div class="produtos-selecionar-container">
        <div class="produto-info">
          <p>${item.nome}</p>
          <span>Qtd: ${item.quantidade}</span>
        </div>
        <div class="produto-preco">
          <p>R$ ${item.subtotal}</p>
          <span>R$ ${item.preco} cada</span>
        </div>
      </div>
    `

    produtosContainer.appendChild(div)
  })

  // Totais
  const taxaServico = subtotal * 0.1
  const total = subtotal + taxaServico

  resumoContainer.innerHTML = `
    <div class="resumo-linha">
      <span>Subtotal</span>
      <span>R$ ${subtotal}</span>
    </div>

    <div class="resumo-linha">
      <span>Taxa de serviço (10%)</span>
      <span>R$ ${taxaServico}</span>
    </div>
  `

  totalSpan.textContent = `R$ ${total}`
}

renderizarPagamento()
