const botaoGridOpcao = document.getElementById("grid-opcao");
const tamanhosLapis = document.querySelectorAll("#lista-tamanhos-lapis li");
const elementosTabela = document.querySelectorAll(".elemento-tabela");

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
        elemento.style.borderColor = "var(--cor-secundaria)";
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

function preencher(elemento) {
    elemento.classList.add('preenchido');
}

function despreencher(elemento) {
    elemento.classList.remove('preenchido');
}

elementosTabela.forEach(elemento => {
    elemento.addEventListener('mousedown', function (e) {
        e.preventDefault();

        if (e.button === 0) {
            preencher(this);
        } else if (e.button === 2) {
            despreencher(this);
        }
    });

    elemento.addEventListener('mouseover', function (e) {
        if (e.buttons === 1) {
            preencher(this);
        } else if (e.buttons === 2) {
            despreencher(this);
        }
    });

    elemento.addEventListener('contextmenu', e => e.preventDefault());
});