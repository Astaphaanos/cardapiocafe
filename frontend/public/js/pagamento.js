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

mesaSpan.textContent = pedido.mesaId

document.addEventListener('DOMContentLoaded', () => {
  renderizarPagamento()
  btnConfirmarPagamento()
  metodoDePagamento()
})

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
      <span>${formatarPreco(subtotal)}</span>
    </div>

    <div class="resumo-linha">
      <span>Taxa de serviço (10%)</span>
      <span>${formatarPreco(taxaServico)}</span>
    </div>
  `

  totalSpan.textContent = `${formatarPreco(total)}`
}

function btnConfirmarPagamento() {
  const btnConfirmar = document.getElementById('btn-confirmar-pagamento')
  const mesas = JSON.parse(localStorage.getItem('mesas'))
  const mesaSelecionada = JSON.parse(localStorage.getItem('mesaSelecionada'))

  btnConfirmar.addEventListener('click', () => {
      if (!Array.isArray(mesas) || !mesaSelecionada) {
      alert('Erro ao finalizar pagamento')
      return
    }

    const mesa = mesas.find(m => Number(m.id) === Number(mesaSelecionada.id))
    if(!mesa) {
      alert("Mesa não encontrada")
      return
    }

    mesa.status = 'livre'
    mesaSelecionada.status = 'livre'

    if(pedido) {
      pedido.status = 'pago'
      localStorage.setItem('pedidoAtual', JSON.stringify(pedido))
    }

   localStorage.setItem('mesas', JSON.stringify(mesas))
    localStorage.setItem('mesaSelecionada', JSON.stringify(mesaSelecionada))

    alert('Pagamento confirmado! Mesa liberada.')

    window.location.href = '../pages/home.html'
  })
}


function metodoDePagamento() {
   const cards = document.querySelectorAll('.metodo-pagamento-card')

  let metodoSelecionado = null

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove ativo de todos
      cards.forEach(c => c.classList.remove('ativo'))

      // Adiciona ativo no clicado
      card.classList.add('ativo')

      // Guarda o método selecionado
      metodoSelecionado = card.dataset.metodo

      console.log('Método selecionado:', metodoSelecionado)
    })
  })
}