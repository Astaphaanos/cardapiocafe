import { registrarMesa } from "../../api/api.js"

document.addEventListener('DOMContentLoaded', () => {
  const formMesa = document.getElementById('form-registrar-mesa')

  if(formMesa) {
    formMesa.addEventListener('submit', async (e) => {
      e.preventDefault()

      const inputNumeroMesa = document.getElementById('inputNumeroMesa').value.trim()

      const dado = {
        numeroMesa: inputNumeroMesa
      }

      try {
        const result = await registrarMesa(dado)

        if(result) {
          alert('✅ Mesa criada com sucesso')
          console.log(result)
          window.location.href= '../pages/home.html'
        } else {
          alert('⚠️ Erro ao criar a mesa. Tente mais tarde!')
        }
      } catch (error) {
        console.log("Erro ao conectar com a API", error)
      }
    })
  }
})