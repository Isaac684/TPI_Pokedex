
function togglePokemonInfo(event) {
    var infoCard = event.currentTarget.closest('.content-container').querySelector('.info-card');
    infoCard.style.display = (infoCard.style.display === 'none' || infoCard.style.display === '') ? 'block' : 'none';
}


const infoButtons = document.querySelectorAll('.btn2');
infoButtons.forEach(function(button) {
    button.addEventListener('click', togglePokemonInfo);
});
