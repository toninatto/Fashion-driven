let contadorum = 0;
let contadordois = 0;
let contadortres = 0;


//prompt("Qual o seu nome?");

let eum = document.querySelectorAll(".escolhas");
console.log(eum);

function selecionarItem(elemento) {

    let pai = elemento.parentNode.parentNode;
    console.log(pai);

    if (pai.querySelector(".clicado") !== null) {
        pai.querySelector(".clicado").classList.remove("clicado");
    }

    elemento.classList.toggle("clicado");
    let verium = eum[0].querySelector(".clicado");    
    let veridois = eum[1].querySelector(".clicado");    
    let veritres = eum[2].querySelector(".clicado");
    if (verium !== null && veridois !== null && veritres !== null) {
        setInterval(botaoFinalizar, 1000);
    }
}

function botaoFinalizar() {
    
    let referencia = document.querySelector(".caixa-finalizacao Input").value;
    console.log(referencia);
    
    if (referencia !== "") {
        document.querySelector(".botao").classList.add("ligar");
    } else {
        document.querySelector(".botao").classList.remove("ligar");
    }
}