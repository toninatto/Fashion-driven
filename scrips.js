let enviopedido = {};
let verium;
let veridois;
let veritres;
let atributoum;
let atributodois;
let atributotres;
let referencia;
let recentes;
let autor;
let usuario = prompt("Qual o seu nome?");

pegarRecentes();

function pegarRecentes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");

    promise.then(carregarDados);
}

function carregarDados(response) {
    recentes = response.data;
    postarRecentes();
}

//O certo seria usar "author" aqui, mas o author não consta no API, aí fica como undefined.
function postarRecentes() {
    let postagens = document.querySelector(".ultimos-pedidos");
    postagens.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        postagens.innerHTML += `<div class="caixa-ultimo" onclick="cliqueRecentes(this)">
        <img class="recente_${i}" src=${recentes[i].image}/>
        <h1>Criador: <span>${recentes[i].owner}</span></h1> 
    </div>`;
    }
}

//O certo aqui seria colocar autor, mas o autor não consta no API.
function cliqueRecentes(recomendado) {

    let confirmacao = confirm("Deseja encomendar esse modelo?");

    if (confirmacao === true) {
        for (let i = 0; i < 10; i++) {
            let algo = recomendado.querySelector(`.recente_${i}`);
            console.log(algo);
            if (algo !== null) {
                atributoum = recentes[i].model;
                atributodois = recentes[i].neck;
                atributotres = recentes[i].material;
                referencia = recentes[i].image;
                nome = recentes[i].owner;

                enviarPedido()
            }
        }
    }
}

let eum = document.querySelectorAll(".escolhas");

function selecionarItem(elemento) {

    let pai = elemento.parentNode.parentNode;

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

        nome = usuario;

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

        enviarPedido();
    }
}

//Aqui deveria vir a variável autor, mas tá bugada
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