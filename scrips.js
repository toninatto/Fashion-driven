let enviopedido = {};
let verium;
let veridois;
let veritres;
let atributoum;
let atributodois;
let atributotres;
let referencia;
let recentes;
let nome = prompt("Qual o seu nome?");

pegarRecentes();

function pegarRecentes () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    
    promise.then(carregarDados);
}

function carregarDados (response) {
    recentes = response.data;
    postarRecentes ();
}

function postarRecentes () {
    console.log(recentes);
    console.log(recentes.length);
    let postagens = document.querySelector(".ultimos-pedidos");
    postagens.innerHTML = "";
    for (let i = 0; i < recentes.length; i++) {
        postagens.innerHTML += `<div class="caixa-ultimo" onclick="cliqueRecentes(this)">
        <img src=${recentes[i].image}/>
        <h1>Criador: <span>${recentes[i].owner}</span></h1>
    </div>`

    }

}

function cliqueRecentes (recomendado) {
    console.log(recomendado);
}

let eum = document.querySelectorAll(".escolhas");
console.log(eum);

function selecionarItem(elemento) {

    let pai = elemento.parentNode.parentNode;
    console.log(pai);

    if (pai.querySelector(".clicado") !== null) {
        pai.querySelector(".clicado").classList.remove("clicado");
    }

    elemento.classList.toggle("clicado");
    verium = eum[0].querySelector(".clicado");
    veridois = eum[1].querySelector(".clicado");
    veritres = eum[2].querySelector(".clicado");
    if (verium !== null && veridois !== null && veritres !== null) {
        setInterval(botaoFinalizar, 1000);
    }
}

function botaoFinalizar() {

    referencia = document.querySelector(".caixa-finalizacao Input").value;
    console.log(referencia);

    if (referencia !== "") {
        document.querySelector(".botao").classList.add("ligar");
    } else {
        document.querySelector(".botao").classList.remove("ligar");
    }
}

function confirmarPedido() {

    if (document.querySelector(".ligar") === null) {
        alert("Selecione as três características e coloque um link adequado de uma imagem de referência");
    } else {

        alert("Seu pedido foi enviado, aguarde confirmação.");

        console.log(verium);
        atributoum = verium.parentNode.querySelector(".auxiliar").innerHTML;
        atributodois = veridois.parentNode.querySelector(".auxiliar").innerHTML;
        atributotres = veritres.parentNode.querySelector(".auxiliar").innerHTML;

        if (atributoum === "T-shirt") {
            atributoum = "t-shirt";
        } else if (atributoum === "Camiseta") {
            atributoum = "top-tank";
        } else if (atributoum === "Manga longa") {
            atributoum = "long";
        }

        if (atributodois === "Gola V") {
            atributodois = "v-neck";
        } else if (atributodois === "Gola Redonda") {
            atributodois = "round";
        } else if (atributodois === "Gola polo") {
            atributodois = "polo";
        }

        if (atributotres === "Seda") {
            atributotres = "silk";
        } else if (atributotres === "Algodão") {
            atributotres = "cotton";
        } else if (atributotres === "Poliéster") {
            atributotres = "polyester";
        }
        console.log(atributoum);
        console.log(atributodois);
        console.log(atributotres);
        enviarPedido();
    }
}

function enviarPedido() {
    enviopedido = {
        model: atributoum,
        neck: atributodois,
        material: atributotres,
        image: referencia,
        owner: nome,
        author: nome
    }
    let promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", enviopedido);
    console.log(promise);

    promise.then(sucessoEnvio);
    promise.catch(tratarErro);
    
}
function sucessoEnvio(response) {
    alert("Seu pedido foi confirmado!");
    pegarRecentes();
}

function tratarErro(error) {
    console.log(error.response);
    alert("Ops, não conseguimos processar sua encomenda.")    
}