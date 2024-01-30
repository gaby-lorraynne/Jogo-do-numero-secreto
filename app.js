let listaNumSorteados = [];
let numeroLimite = 10
let numSecreto = gerarNumAleatorio();

let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // Para permitir um leitor de tela: passando por parâmetro o texto que vai ser lido, em que linguagem e entre chaves a velocidade
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial(){
  exibirTexto('h1', 'Jodo do numero secreto');
  exibirTexto('p', 'Escolha um numero entre 1 e 10');
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numSecreto){
      exibirTexto('h1', 'Acertou');
      let palavra = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavra}!`;
      exibirTexto('p', mensagemTentativas);

      // Para habilitar um novo jogo apos acertar, ai vou remover o desabilitado do botao
      document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
      if(chute > numSecreto){
        exibirTexto('p', 'O número secreto é menor');
      }else{
        exibirTexto('p', 'O número secreto é maior');
      }
      tentativas++;
      limparCampo();
    }
}

function gerarNumAleatorio(){
  // Para verificar se o numero escolhido ja foi sorteado e n repetir
  let numEscolhido  = parseInt(Math.random() * numeroLimite + 1);
  let quantElementosLista = listaNumSorteados.length;

  if(quantElementosLista == numeroLimite){
    listaNumSorteados = [];
  }

  if(listaNumSorteados.includes(numEscolhido)){
    return gerarNumAleatorio();
  }else{
    listaNumSorteados.push(numEscolhido);
    return numEscolhido;
  }
}

// Para limpar o campo quando errar
function limparCampo(){
  chute = document.querySelector('input');
  chute.value = '';
}

function reiniciarJogo(){
  numSecreto = gerarNumAleatorio();
  limparCampo();
  tentativas = 1;
  mensagemInicial();

  // Para desabilitar o novo jogo quando estiver jogando na segunda tentativa em diante
  document.getElementById('reiniciar').setAttribute('disabled', true);
}

