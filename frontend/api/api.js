const BASE_URL = 'http://localhost:3000'

//* Registrar mesa
export async function registrarMesa(dado) {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dado),
    })
    return await res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Registrar produtos
export async function registrarProduto(dados) {
  try {
    const res = await fetch(`${BASE_URL}/api/produtos/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    })
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Listar mesas na homepage
export async function listarMesas() {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/listar`)
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}
