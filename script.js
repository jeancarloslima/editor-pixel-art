const botoesTrocarCor = document.querySelectorAll("input[type='color']");
const botaoSizeOpcao = document.getElementById("size-opcao-botao");
const campoTamanhoTabela = document.getElementById("size");
const botaoAplicarTamanho = document.getElementById("aplicarTamanho");
const tamanhosLapis = document.querySelectorAll("#lista-tamanhos-lapis li");
const botaoGridOpcao = document.getElementById("grid-opcao-botao");
const botaoClearOpcao = document.getElementById("clear-opcao-botao");
let elementosTabela;
let corPrimaria = "#0d1b2a";
let corSecundaria = "#FFF";
let tamanhoLapis = 1;

function criaTela(tamanho) {
    const tabela = document.getElementById("tabela");
    let conteudoHtml = "";

    for (let i = 0; i < tamanho; i++) {
        let linha = '<tr class="linha-tabela">'

        for (let j = 0; j < tamanho; j++) {
            linha += "\n" + `<td class="elemento-tabela coluna${j + 1}"></td>`;
        }

        conteudoHtml += linha + "</tr>";
    }

    tabela.innerHTML = conteudoHtml;
    elementosTabela = document.querySelectorAll(".elemento-tabela");
    adicionaPintura();

    if (botaoGridOpcao.classList.contains("desativado")) {
        botaoGridOpcao.click();
        botaoGridOpcao.click();
    };
}

criaTela(10);

botoesTrocarCor.forEach((botao) => {
    botao.addEventListener("input", () => {
        if (botao.id === "alterarCorPrincipal") {
            corPrimaria = botao.value;
        } else {
            corSecundaria = botao.value;
        }
    })
})

botaoSizeOpcao.addEventListener("click", () => {
    if (botaoSizeOpcao.classList.contains("desativado")) {
        botaoSizeOpcao.classList.remove("desativado");
        botaoSizeOpcao.classList.add("ativado");
    } else {
        botaoSizeOpcao.classList.remove("ativado");
        botaoSizeOpcao.classList.add("desativado");
    }
});

botaoAplicarTamanho.addEventListener("click", (e) => {
    e.preventDefault();

    if (campoTamanhoTabela.value !== "") {
        criaTela(Math.floor(Number(campoTamanhoTabela.value)));
    };
});

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

        tamanhoLapis = Number(lapis.id[14]);
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

    adicionaPinturaCasasAdjacentes(elemento, corPrimaria);
}

function preencherSecundario(elemento) {
    elemento.style.backgroundColor = corSecundaria;

    adicionaPinturaCasasAdjacentes(elemento, corSecundaria);
}

function adicionaPintura() {
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
}

function adicionaPinturaCasasAdjacentes(elemento, cor) {
    if (tamanhoLapis === 2) {
        const quadrado2 = elemento.previousElementSibling;
        const linhaAnterior = elemento.closest("tr").previousElementSibling;
        let quadrados = [quadrado2];
        
        if (linhaAnterior !== null) {
            const quadrado3 = linhaAnterior.querySelector(`.${elemento.classList[1]}`);
            const quadrado4 = quadrado3.previousElementSibling;
            quadrados = [quadrado2, quadrado3, quadrado4];
        }

        quadrados.forEach((quadrado) => {
            if (quadrado) {
                quadrado.style.backgroundColor = cor;
            }
        });
    } else if (tamanhoLapis === 3) {

    } else if (tamanhoLapis === 4) {

    }
}