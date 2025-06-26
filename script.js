const elementosTabela = document.querySelectorAll(".elemento-tabela");

elementosTabela.forEach(elemento => {
    elemento.addEventListener("mousedown", () => {
        elemento.classList.add('preenchido');
        console.log(elemento);
    })

    elemento.addEventListener('mouseover', function (e) {
        if (e.buttons === 1) {
            elemento.classList.add('preenchido');
            console.log(elemento);
        }
    });
});