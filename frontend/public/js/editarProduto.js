import { buscarProdutoPorId, editarProduto } from '../../api/api.js'

document.addEventListener('DOMContentLoaded', async () => {
  const formEditar = document.getElementById('form-editar-produto')

  if (!formEditar) return

  const params = new URLSearchParams(window.location.search)
  const id = params.get('id')

  if (!id) {
    alert('ID do produto não encontrado!')
    return
  }

  // 🔥 1. BUSCAR O PRODUTO PELO ID E PREENCHER O FORMULÁRIO
  const produto = await buscarProdutoPorId(id)

  if (!produto) {
    alert("Produto não encontrado!")
    return
  }

  document.getElementById('nomeProduto').value = produto.nome
  document.getElementById('categoriaProduto').value = produto.categoria
  document.getElementById('precoProduto').value = produto.preco

  // 🔥 2. SALVAR ALTERAÇÕES
  formEditar.addEventListener('submit', async (e) => {
    e.preventDefault()

    const dados = {
      nome: document.getElementById('nomeProduto').value,
      categoria: document.getElementById('categoriaProduto').value,
      preco: document.getElementById('precoProduto').value,
    }

    try {
      const result = await editarProduto(id, dados)

      if (result) {
        alert('✅ Produto alterado com sucesso')
        window.location.href = '../pages/lista-produtos.html'
      } else {
        alert('⚠️ Erro ao alterar o produto!')
      }
    } catch (error) {
      console.log('Erro ao conectar com a API', error)
    }
  })
})
