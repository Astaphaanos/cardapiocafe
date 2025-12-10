import { deletarProdutos, listarProdutos } from "../../api/api.js";

document.addEventListener('DOMContentLoaded', async() => {
  const result = await listarProdutos()

  const produtoContainer = document.getElementById('produtos-lista')
  produtoContainer.innerHTML = ''

  if(!Array.isArray(result)) {
    container.innerHTML = '<p>Erro ao carregar as mesas.</p>'
    return
  }

  result.forEach(produto => {
    const card = document.createElement('div')
    card.className = 'produto-card'

    card.innerHTML = `
      <div class="produtos-card-header">
        <h3>${produto.nome}</h3>
        <span>${produto.categoria}</span>
      </div>

      <div class="produtos-card-actions">
        <h3>R$ ${produto.preco}</h3>
        <button class="btn-deletar" data-id="${produto.id}">
          <i class="fa-solid fa-trash"></i>
        </button>
        <button class="btn-editar" data-id="${produto.id}">
          <i class="fa-solid fa-pen"></i>
        </button>
      </div>
    `
    produtoContainer.appendChild(card)
  });
  ativarDeletar()
  ativarEditar()
})

async function ativarDeletar(){
  const btnDeletar = document.querySelectorAll('.btn-deletar')

  btnDeletar.forEach(btn => {
    btn.addEventListener('click', async() => {
      const id = btn.dataset.id;

      const confirmar = confirm('Tem certeza que seja excluir?')
      if(!confirmar) return

      const res = await deletarProdutos(id)

      if (res.ok) {
        alert("Produto deletado!");
        btn.closest('.produto-card').remove()
      } else {
        alert("Erro ao deletar");
      }
    })
  })
}

function ativarEditar() {
  const botoes = document.querySelectorAll(".btn-editar");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      window.location.href = `../pages/editar-produtos.html?id=${id}`;
    });
  });
}

