export function formatarPreco(valor) {
  const numero = Number(valor)

  if(isNaN(numero)) return 'R$ 0,00'

  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}