
function togglePokemonInfo(event) {
    var infoCard = event.currentTarget.closest('.content-container').querySelector('.info-card');
    infoCard.style.display = (infoCard.style.display === 'none' || infoCard.style.display === '') ? 'block' : 'none';
}


const infoButtons = document.querySelectorAll('.btn2');
infoButtons.forEach(function(button) {
    button.addEventListener('click', togglePokemonInfo);
});


//pokebola
const pokebola = document.querySelector('.pokebola'); //defino el div donde se mostrara la pokebola

pokebola.addEventListener('click', async () => { //asigno evento click
    pokebola.style.display = 'none';

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); //hago la peticion en este caso de los 150 pokemones
    const data = await response.json();
    const pokemons = data.results;

    
    const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)]; //en una variable almaceno unpokemon aleatorio

    
    const resp = await fetch(randomPokemon.url); //obtengo la info de ese pokemon
    const pokemon = await resp.json();

    
    const pokemonDiv = document.createElement('div'); // Crea un div para mostrar la información del Pokémon
    pokemonDiv.className = 'pokemon-container'; //aca en el inner defino como se mostrara el gif y nombre
    pokemonDiv.innerHTML = `    
        <img style="width:300px;height:300px;" src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}" id="imgpokemon">
        <p style="color:white;font-size:50px;" >  Eres un ${pokemon.name.toUpperCase()}</p>
    `;

    
    pokemonDiv.style.border = "2px solid white";
    pokemonDiv.style.padding = "20px";
    pokemonDiv.style.textAlign = "center";     //estilos al div
    pokemonDiv.style.marginTop = "20px";
    pokemonDiv.style.width="500px";
    pokemonDiv.style.height="500px";

    document.body.appendChild(pokemonDiv); //metemos el el div y el pokemon a mostrar en el body
});
