// Função para remover a classe que torna a div opaca após o carregamento
window.addEventListener('load', function () {
    var overlay = document.getElementById('overlay');
    overlay.classList.add('fade-out'); // Adiciona a classe que inicia a animação de fade out

    // Aguarde a animação terminar e então remova a div de overlay
    overlay.addEventListener('animationend', function () {
        overlay.style.display = 'none';
    });
});