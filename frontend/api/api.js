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

//* Pegar mesa individualmente
export async function pegarMesaPorId(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/${id}`)
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Deletar mesa 
export async function deletarMesa(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/deletar/${id}`, {
      method: "DELETE"
    });
    return res
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Editar Mesa 
export async function buscarMesaPorId(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/${id}`)
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

export async function editarMesaApi(id, dados) {
  try {
    const res = await fetch(`${BASE_URL}/api/mesas/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Listar produtos (na lista de produtos)
export async function listarProdutos() {
  try {
    const res = await fetch(`${BASE_URL}/api/produtos/listar`)
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Deletar produtos (na lista de produtos)
export async function deletarProdutos(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/produtos/deletar/${id}`, {
      method: "DELETE"
    });
    return res
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

//* Editar produto (na lista de produtos)
export async function buscarProdutoPorId(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/produtos/${id}`)
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}

export async function editarProduto(id, dados) {
  try {
    const res = await fetch(`${BASE_URL}/api/produtos/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    return res.json()
  } catch (error) {
    console.log("Erro ao conectar com a API", error);
    throw new Error("Erro ao conectar com a API");
  }
}