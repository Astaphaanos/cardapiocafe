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
  atualizarBadge()
}

// Renderizar o carrinho
function renderizarCarrinho() {
  const containerCarrinho = document.getElementById('carrinho-itens')
  const footer = document.getElementById('carrinho-footer')
  const totalSpan = document.getElementById('carrinho-total-preco')
  containerCarrinho.innerHTML = ''

  if (carrinho.length === 0) {
    containerCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>'
    footer.classList.add('hidden')
    atualizarBadge()
    return
  }

  footer.classList.remove('hidden')

  let total = 0

  carrinho.forEach((item) => {
    total += item.preco * item.quantidade

    const div = document.createElement('div')
    div.className = 'item-carrinho'

    div.innerHTML = `
    <div class="item-info">
      <div>
        <h4>${item.nome}</h4>
        <span class="preco-unit">R$ ${item.preco}</span>
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
    containerCarrinho.appendChild(div)

    div.querySelector('.mais').addEventListener('click', () => {
      item.quantidade++
      renderizarCarrinho()
    })

    div.querySelector('.menos').addEventListener('click', () => {
      if(item.quantidade > 1) {
        item.quantidade--
      } else {
        carrinho.splice(item, 1)
      }
      renderizarCarrinho()
    })

    div.querySelector('.remover-item').addEventListener('click', () => {
      carrinho.splice(item, 1)
      renderizarCarrinho()
    })
  })

  totalSpan.textContent = `R$ ${total.toFixed(2)}`;
  atualizarBadge()
}

// Botões de adicionar ao carrinho
export function ativarBotoesAdicionar(produtos) {
  const botoes = document.querySelectorAll('.cardapio-card button')

  botoes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      adicionarAoCarrinho(produtos[index])
    })
  })
}

function atualizarBadge() {
  const badge = document.getElementById('carrinho-count')

  const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0)
  badge.textContent = totalItens 
  badge.style.display = totalItens > 0 ? "flex" : "none"
}

function renderizarFooter() {

}