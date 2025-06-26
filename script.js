const elementosTabela = document.querySelectorAll(".elemento-tabela");

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