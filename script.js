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
            quadrados.push(quadrado3, quadrado4);
        }

        quadrados.forEach((quadrado) => {
            if (quadrado) {
                quadrado.style.backgroundColor = cor;
            }
        });
    } else if (tamanhoLapis === 3) {
        const quadrado2 = elemento.previousElementSibling;
        const quadrado3 = elemento.nextElementSibling;
        const linhaAnterior = elemento.closest("tr").previousElementSibling;
        const linhaPosterior = elemento.closest("tr").nextElementSibling;
        let quadrados = [quadrado2, quadrado3];
        
        if (linhaAnterior !== null) {
            const quadrado4 = linhaAnterior.querySelector(`.${elemento.classList[1]}`);
            const quadrado5 = quadrado4.previousElementSibling;
            const quadrado6 = quadrado4.nextElementSibling;
            quadrados.push(quadrado4, quadrado5, quadrado6);
        }

        if (linhaPosterior !== null) {
            const quadrado7 = linhaPosterior.querySelector(`.${elemento.classList[1]}`);
            const quadrado8 = quadrado7.previousElementSibling;
            const quadrado9 = quadrado7.nextElementSibling;
            quadrados.push(quadrado7, quadrado8, quadrado9);
        }

        quadrados.forEach((quadrado) => {
            if (quadrado) {
                quadrado.style.backgroundColor = cor;
            }
        });
    } else if (tamanhoLapis === 4) {
        const quadrado2 = elemento.previousElementSibling;
        const quadrado4 = elemento.nextElementSibling;
        const linhaAnterior = elemento.closest("tr").previousElementSibling;
        const linhaPosterior = elemento.closest("tr").nextElementSibling;
        let linhaAnterior2 = null;
        
        let quadrados = [quadrado2, quadrado4];
        
        if (quadrado2) {
            const quadrado3 = quadrado2.previousElementSibling;
            quadrados.push(quadrado3);
        }

        if (linhaAnterior) {
            linhaAnterior2 = linhaAnterior.previousElementSibling;
        }

        if (linhaAnterior !== null) {
            const quadrado5 = linhaAnterior.querySelector(`.${elemento.classList[1]}`);
            const quadrado6 = quadrado5.previousElementSibling;
            const quadrado8 = quadrado5.nextElementSibling;
            quadrados.push(quadrado5, quadrado6, quadrado8);

            if (quadrado6) {
                const quadrado7 = quadrado6.previousElementSibling;
                quadrados.push(quadrado7);
            }
        }

        if (linhaAnterior2 !== null) {
            const quadrado9 = linhaAnterior2.querySelector(`.${elemento.classList[1]}`);
            const quadrado10 = quadrado9.previousElementSibling;
            const quadrado12 = quadrado9.nextElementSibling;
            quadrados.push(quadrado9, quadrado10, quadrado12);

            if (quadrado10) {
                const quadrado11 = quadrado10.previousElementSibling;
                quadrados.push(quadrado11);
            }
        }

        if (linhaPosterior !== null) {
            const quadrado13 = linhaPosterior.querySelector(`.${elemento.classList[1]}`);
            const quadrado14 = quadrado13.previousElementSibling;
            const quadrado16 = quadrado13.nextElementSibling;
            quadrados.push(quadrado13, quadrado14, quadrado16);

            if (quadrado14) {
                const quadrado15 = quadrado14.previousElementSibling;
                quadrados.push(quadrado15);
            }
        }

        quadrados.forEach((quadrado) => {
            if (quadrado) {
                quadrado.style.backgroundColor = cor;
            }
        });
    }
}