let carrinho = []

const carrinhoBtn = document.querySelector('.btn-carrinho')
const modal = document.getElementById('carrinho-modal')
const fecharModalBtn = modal.querySelector('.fechar')

// Abrir o modal
carrinhoBtn.addEventListener('click', () => {
  modal.classList.remove('hidden')
})

// Fechar o modal
fecharModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden')
})

// Função para adicionar produto ao carrinho

export function adicionarAoCarrinho(produto) {
  const produtoExistente = carrinho.find((item) => item.id === produto.id)

  if (produtoExistente) {
    produtoExistente.quantidade++
  } else {
    carrinho.push({
      ...produto,
      quantidade: 1,
    })
  }
  renderizarCarrinho()
}

function renderizarCarrinho() {
  const containerCarrinho = document.getElementById('carrinho-itens')
  containerCarrinho.innerHTML = ''

  if (carrinho.length === 0) {
    containerCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
    return
  }

  carrinho.forEach((item) => {
    const div = document.createElement('div')
    div.className = 'item-carrinho'

    div.innerHTML = `
    <div class="item-info">
      <div>
        <h4>${item.nome}</h4>
        <span class="preco-unit">R$ ${item.preco.toFixed(2)}</span>
      </div>
      <button class="remover-item">✖</button>
    </div>

    <div class="item-controles">
      <button class="menos">−</button>
      <span class="quantidade">${item.quantidade}</span>
      <button class="mais">+</button>
      <span class="item-total">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
    </div>
    `
    container.appendChild(div)
  })
}

export function ativarBotoesAdicionar(produtos) {
  const botoes = document.querySelectorAll('.cardapio-card button')

  botoes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      adicionarAoCarrinho(produtos[index])
    })
  })
}
