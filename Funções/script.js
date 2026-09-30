/* ===========================================================
   Pra onde foi meu dinheiro? — GABARITO da primeira etapa

   Só o que a turma já viu: const, let, if/else if/else,
   acumulador, contador, querySelector, addEventListener,
   .value, textContent e classList.

   Três coisas novas, pequenas:
     - evento.preventDefault()   impede o formulário de
                                 recarregar a página
     - .trim()                   tira os espaços das pontas
     - .replace('.', ',')        troca o ponto pela vírgula

   Nada de arrays nem funções declaradas. A formatação de
   valores se repete várias vezes de propósito — é o gancho
   para funções mais adiante.
   =========================================================== */
   


const formulario = document.querySelector('.formulario');
const campoDescricao = document.querySelector('.campo-descricao');
const campoValor = document.querySelector('.campo-valor');
const erro = document.querySelector('.erro');

const telaTotal = document.querySelector('.total');
const telaQuantidade = document.querySelector('.quantidade');
const telaMedia = document.querySelector('.media');
const telaMaior = document.querySelector('.maior');
const telaRestante = document.querySelector('.restante');
const telaHistorico = document.querySelector('.historico');


/* -----------------------------------------------------------
   Funções
----------------------------------------------------------- */

    function formatarReais(valor) {
        'R$ ' .toFixed(2).replace('.', ',')
    };

    function telaTotal(valor) {
        
    }


    function telaMedia(total, quantidade){

    }

    


/* -----------------------------------------------------------
   Valores fixos
   ----------------------------------------------------------- */

const ORCAMENTO = 50;


/* -----------------------------------------------------------
   O que o programa precisa lembrar entre um gasto e outro.

   Ficam FORA do ouvinte: se ficassem dentro, nasceriam de
   novo a cada gasto e o total nunca passaria de um valor.
   ----------------------------------------------------------- */

let total = 0;              // acumulador
let quantidade = 0;         // contador
let maiorValor = 0;         // o maior visto até agora
let maiorDescricao = '';
let historico = '';         // acumulador de texto


/* -----------------------------------------------------------
   Escutar e alterar
   ----------------------------------------------------------- */

formulario.addEventListener('submit', function (evento) {

    /* Sem esta linha, o formulário tenta enviar os dados e a
       página recarrega — e tudo o que foi somado some. */
    evento.preventDefault();

    /* trim() tira os espaços do começo e do fim. Sem ele, uma
       descrição com três espaços passaria na validação. */
    const descricao = campoDescricao.value.trim();
    const valor = Number(campoValor.value);

    /* Validação: o primeiro teste verdadeiro para a cadeia.
       Só chega no else quem passou por todos. */
    if (descricao === '') {
        erro.textContent = 'Escreva uma descrição.';
    } else if (campoValor.value === '') {
        erro.textContent = 'Informe o valor.';
    } else if (valor <= 0) {
        erro.textContent = 'O valor precisa ser maior que zero.';
    } else {

        erro.textContent = '';

        // ===== ANTES DO INTERVALO — guiado =================

        // o total
        total = total + valor;

        // o maior gasto
        /* Com > (e não >=), em caso de empate fica o
           primeiro gasto que chegou naquele valor. */
        if (valor > maiorValor) {
            maiorValor = valor;
            maiorDescricao = descricao;
        }

        // ===== DEPOIS DO INTERVALO — atividade =============

        // parte 1: quantidade
        quantidade = quantidade + 1;

        // parte 2: média — calculada na hora, não precisa
        // ser lembrada entre um gasto e outro
        const media = total / quantidade;

        // parte 3: histórico
        historico = historico + descricao + ' — R$ ' + valor.toFixed(2).replace('.', ',') + '\n';

        // parte 4: orçamento
        const restante = ORCAMENTO - total;

        if (restante >= 0) {
            telaRestante.textContent = 'R$ ' + restante.toFixed(2).replace('.', ',') + ' disponíveis';
        } else {
            telaRestante.textContent = 'Passou R$ ' + (-restante).toFixed(2).replace('.', ',') + ' do orçamento';
        }

        if (total > ORCAMENTO) {
            telaTotal.classList.add('estourado');
            telaRestante.classList.add('estourado');
        } else {
            telaTotal.classList.remove('estourado');
            telaRestante.classList.remove('estourado');
        }

        // ===== mostrar na tela ============================

        total10.textContent = formatarReais(valor);
        telaQuantidade.textContent = quantidade;
        telaMedia.textContent = formatarReais(valor);
        telaMaior.textContent = maiorDescricao + formatarReais(valor);
        telaHistorico.textContent = historico;

        // limpar para o próximo
        campoDescricao.value = '';
        campoValor.value = '';
    }

});
