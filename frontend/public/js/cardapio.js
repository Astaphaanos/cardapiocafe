import { listarProdutos } from "../../api/api.js";
import { adicionarAoCarrinho } from "./carrinho.js";

let produtos = []; // para filtros

document.addEventListener('DOMContentLoaded', async () => {
  produtos = await listarProdutos();   // carrega produtos da API
  renderizarProdutos(produtos); // exibe todos no início
  configurarFiltros()
});

function renderizarProdutos(lista) {
  const containerCardapio = document.getElementById('cardapio-lista');
  containerCardapio.innerHTML = '';

  lista.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'cardapio-card';

    card.dataset.id = produto.id;

    card.innerHTML = `
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
      <button type="button">+ Adicionar</button>
    `;

    card.querySelector('button').addEventListener('click', () => {
      adicionarAoCarrinho(produto);
    });
    
    containerCardapio.appendChild(card);
  });
}

// FILTROS
function configurarFiltros() {
  const botoes = document.querySelectorAll('.filtro-btn');

botoes.forEach(btn => {
  btn.addEventListener('click', () => {
    const categoria = btn.dataset.categoria;

      if (categoria === 'todos') {
        renderizarProdutos(produtos);
      } else {
        const filtrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(filtrados);
      }
    });
  });
}
