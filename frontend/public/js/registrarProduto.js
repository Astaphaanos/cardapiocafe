import { registrarProduto } from "../../api/api.js"

document.addEventListener('DOMContentLoaded', () => {
  const formProduto = document.getElementById('form-registrar-produto')

  if(formProduto) {
    document.addEventListener('submit', async (e) => {
      e.preventDefault()

      const inputNomeProduto = document.getElementById('nomeProduto').value.trim()
      const inputCategoriaProduto = document.getElementById('categoriaProduto').value
      const inputPrecoProduto = document.getElementById('precoProduto').value.replace(',', '.').trim()

      const dados = {
        nome: inputNomeProduto,
        categoria: inputCategoriaProduto,
        preco: inputPrecoProduto
      }

      try {
        const result = await registrarProduto(dados)

        if(result) {
          alert('✅ Produto criado com sucesso')
          console.log(result)
          formProduto.reset()
          window.location.href = '../pages/lista-produtos.html'
        } else {
          alert('⚠️ Erro ao criar a mesa. Tente mais tarde!')
        }
      } catch (error) {
        console.log("Erro ao conectar com a API", error)
      }
    })
  }
})