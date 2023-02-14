let inputDescricao = document.getElementById("descricao");
let detalhamento = document.getElementById("detalhamento");
let botaoSair = document.getElementById('buttonSair');
let usuarioLogadoOn = JSON.parse(localStorage.getItem('infoLista'));

const form = document.getElementById('form-recados');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  salvarRecados()
});

document.addEventListener('DOMContentLoaded', () => {
  if (!usuarioLogadoOn) {
    alert("Você não tem acesso a essa área, por favor faça login");
    window.location.href = "newAccount.html"
  }

  criarRecados(usuarioLogadoOn)
});

botaoSair.addEventListener('click', () => {
  const user = JSON.parse(localStorage.getItem('infoLista'));
  const indice = user.findIndex((user) => user.nome === usuarioLogadoOn.nome);

  user[indice] = usuarioLogadoOn;
  localStorage.setItem('infoLista', JSON.stringify(user));

  localStorage.removeItem('infoLista')
  window.location.href = "index.html"
});

//Salvar Recados

function salvarRecados() {
  recadoHTML = {
    id: Math.floor((Math.random() * 1004.75) + 7),
    descricao: descricao.value,
    detalhamento: detalhamento.value
  }

  usuarioLogadoOn[0].posts.push(recadoHTML)
  localStorage.setItem('infoLista', JSON.stringify(usuarioLogadoOn))
  criarRecados(usuarioLogadoOn)

  form.reset();

};

//Criar Recados
function criarRecados(valor) {

  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  valor[0].posts.forEach(dado => {
    const linhaTr = document.createElement('tr')
    linhaTr.setAttribute('style', 'border: 0.02px solid #d7d7d7;')
    linhaTr.setAttribute('id', dado.id)

    const idRecado = document.createElement('td')
    idRecado.innerText = dado.id

    const descricaoRecado = document.createElement('td')
    descricaoRecado.innerText = dado.descricao

    const detalhamentoRecado = document.createElement('td')
    detalhamentoRecado.innerText = dado.detalhamento

    const botaoEditar = document.createElement('button')
    botaoEditar.setAttribute('type', 'button')
    botaoEditar.setAttribute('class', 'buttonRecados')
    botaoEditar.innerText = 'Editar'
    botaoEditar.addEventListener('click', () => {
      if (botaoEditar.innerText === 'Editar') {
        editarRecados(dado, botaoEditar, botaoExcluir)
      } else {
        atualizar(dado, botaoEditar, botaoExcluir)
      }
    })

    const botaoExcluir = document.createElement('button')
    botaoExcluir.setAttribute('type', 'button')
    botaoExcluir.setAttribute('class', 'buttonRecados')
    botaoExcluir.innerText = 'Excluir'

    botaoExcluir.addEventListener('click', () => {
      if (botaoExcluir.innerText == 'Cancelar') {
        editarRecados()
      } else {
        excluirRecados(dado)
      }
    })

    linhaTr.appendChild(idRecado);
    linhaTr.appendChild(descricaoRecado);
    linhaTr.appendChild(detalhamentoRecado);
    linhaTr.appendChild(botaoEditar);
    linhaTr.appendChild(botaoExcluir)
    tbody.appendChild(linhaTr)
  });
}

//Editar Recados
function editarRecados(value, editar, excluir) {
  editar.innerText = 'Atualizar'
  editar.setAttribute('style', 'background: #2980b9')

  descricao.value = value.descricao,
    detalhamento.value = value.detalhamento

  excluir.innerText = 'Cancelar'
  excluir.setAttribute('style', 'background: #2980b9')

  excluir.addEventListener('click', () => {
    editar.innerText = 'Editar'
    editar.setAttribute('style', 'background: #fff')
    excluir.innerText = 'Excluir'
    excluir.setAttribute('style', 'background: #fff')
  })
}

//Excluir recados
function excluirRecados(dado) {
  document.getElementById(`${dado.id}`).remove()
  recadosAtualizado = usuarioLogadoOn[0].posts.filter((recado) => recado.id !== dado.id)

  usuarioLogadoOn[0].posts = recadosAtualizado
  console.log(recadosAtualizado)

  localStorage.setItem('infoLista', JSON.stringify(usuarioLogadoOn))
}


//Atualizar(button)
function atualizar(dados, editar, excluir) {

  const indiceRecado = usuarioLogadoOn[0].posts.findIndex((dado) => dado.id === dados.id)


  let recadoAtt = {
    id: dados.id,
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  }

  usuarioLogadoOn[0].posts[indiceRecado] = recadoAtt
  localStorage.setItem('infoLista', JSON.stringify(usuarioLogadoOn))

  location.reload()

  editar.innerText = 'Editar'
  excluir.innerText = 'Excluir'

  form.reset()
}