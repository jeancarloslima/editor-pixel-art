const botaoSizeOpcao = document.getElementById("size-opcao");
const tamanhosLapis = document.querySelectorAll("#lista-tamanhos-lapis li");
const botaoGridOpcao = document.getElementById("grid-opcao");
const botaoClearOpcao = document.getElementById("clear-opcao");
let elementosTabela;
let corPrimaria = "#0d1b2a";
let corSecundaria = "#FFF";

function criaTela(tamanho) {
    const tabela = document.getElementById("tabela");
    let conteudoHtml = "";

    for (let i = 0; i < tamanho; i++) {
        let linha = '<tr class="linha-tabela">'

        for (let j = 0; j < tamanho; j++) {
            linha += "\n" + '<td class="elemento-tabela"></td>';
        }
        
        conteudoHtml += linha + "</tr>";
    }

    tabela.innerHTML = conteudoHtml;
}

criaTela(10);
elementosTabela = document.querySelectorAll(".elemento-tabela");

botaoSizeOpcao.addEventListener("click", () => {
    if (botaoSizeOpcao.classList.contains("desativado")) {
        botaoSizeOpcao.classList.remove("desativado");
        botaoSizeOpcao.classList.add("ativado");
    } else {
        botaoSizeOpcao.classList.remove("ativado");
        botaoSizeOpcao.classList.add("desativado");
    }
})

botaoGridOpcao.addEventListener("click", () => {
    if (botaoGridOpcao.classList.contains("ativado")) {
        botaoGridOpcao.classList.remove("ativado");
        botaoGridOpcao.classList.add("desativado");

        elementosTabela.forEach((elemento) => {
            elemento.style.borderColor = "transparent";
        });
    } else {
        botaoGridOpcao.classList.remove("desativado");
        botaoGridOpcao.classList.add("ativado");

        elementosTabela.forEach((elemento) => {
        elemento.style.borderColor = "var(--cor-primaria)";
    })
    }
});

tamanhosLapis.forEach((lapis) => {
    lapis.addEventListener("click", () => {
        for (const elemento of tamanhosLapis) {
            elemento.classList.remove("selecionado");
        }

        lapis.classList.add("selecionado");
    }) 
})

botaoClearOpcao.addEventListener("click", () => {
    const elementosTabela = document.querySelectorAll(".elemento-tabela");

    elementosTabela.forEach((elemento) => {
        elemento.style.backgroundColor = "#FFF";
    })
})

function preencherPrimario(elemento) {
    elemento.style.backgroundColor = corPrimaria;
}

function preencherSecundario(elemento) {
    elemento.style.backgroundColor = corSecundaria;
}

elementosTabela.forEach(elemento => {
    elemento.addEventListener('mousedown', function (e) {
        e.preventDefault();

        if (e.button === 0) {
            preencherPrimario(this);
        } else if (e.button === 2) {
            preencherSecundario(this);
        }
    });

    elemento.addEventListener('mouseover', function (e) {
        if (e.buttons === 1) {
            preencherPrimario(this);
        } else if (e.buttons === 2) {
            preencherSecundario(this);
        }
    });

    elemento.addEventListener('contextmenu', e => e.preventDefault());
});
