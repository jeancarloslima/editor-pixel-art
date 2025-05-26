const elementosTabela = document.querySelectorAll(".elemento-tabela");

elementosTabela.forEach(elemento => {
    elemento.addEventListener('click', () => {
        elemento.classList.toggle('preenchido');
        console.log(elemento);
        
    });
});