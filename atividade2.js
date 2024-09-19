// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ id, nome, valor, quantidade });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    carrinho = carrinho.filter(produto => produto.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}`;
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.onclick = () => removerProduto(produto.id);
            li.appendChild(botaoRemover);
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}


// Função para adicionar um novo produto a partir dos inputs
function adicionarNovoProduto() {
    const nome = document.getElementById('nome-produto').value;
    const valor = parseFloat(document.getElementById('valor-produto').value);
    const quantidade = parseInt(document.getElementById('quantidade-produto').value);

    if (nome && valor && quantidade) {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const novoId = carrinho.length > 0 ? carrinho[carrinho.length - 1].id + 1 : 1;

        adicionarProduto(novoId, nome, valor, quantidade);

        // Limpar os inputs após adicionar o produto
        document.getElementById('nome-produto').value = '';
        document.getElementById('valor-produto').value = '';
        document.getElementById('quantidade-produto').value = '';
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Inicializar o carrinho ao carregar a página
exibirCarrinho();