
const Pokedex = (function () {
  const musicabg = document.getElementById('musica_Fondo');
  const contenedorPoke = document.getElementById('pokemon');
  const detallesPoke = document.getElementById('detallePokemon');
  let mostrado = false;

  async function cargarDatos() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    return data.results;
  }

  async function cartaPokemon() {
    
    const dataPokemon = await cargarDatos();
    dataPokemon.forEach(async pokemon => {
      let tipo, color;
      const cartaPoke = document.createElement('div');
      cartaPoke.className = 'pokemon-card';

      const pedirPokemon = await fetch(pokemon.url);
      const detallesPokemon = await pedirPokemon.json();

      const tipoPokemon = detallesPokemon.types[0].type.name;

    


      switch (tipoPokemon) {
        case 'grass':
          cartaPoke.style.backgroundColor = '#78C850';
          tipo = "Planta";
          color = '#78C850';
          break;
        case 'fire':
          cartaPoke.style.backgroundColor = '#F08030';
          tipo = "Fuego";
          color = '#F08030';
          break;
        case 'water':
          cartaPoke.style.backgroundColor = '#6890F0';
          tipo = "Agua";
          color = '#6890F0';
          break;
        case 'rock':
          cartaPoke.style.backgroundColor = '#777';
          tipo = "Roca";
          color = '#777';
          break;
        case 'poison':
            cartaPoke.style.backgroundColor = '#A33EA1';
            tipo = "Veneno";
            color = '#A33EA1';
            break;
        case 'bug':
            cartaPoke.style.backgroundColor = '#A6B91A';
            tipo = "Insecto";
            color = '#A6B91A';
            break;
        case 'psychic':
              cartaPoke.style.backgroundColor = '#F95587';
              tipo = "Psiquico";
              color = '#F95587';
              break;
        case 'fairy':
                cartaPoke.style.backgroundColor = '#D685AD';
                tipo = "Hada";
                color = '#D685AD';
              break;
        case 'ground':
                cartaPoke.style.backgroundColor = '#E2BF65';
                tipo = "Tierra";
                color = '#E2BF65';
          break;
        case 'electric':
            cartaPoke.style.backgroundColor = '#F7D02C';
            tipo = "Electrico";
            color = '#F7D02C';
      break;
      case ' fighting':
            cartaPoke.style.backgroundColor = '#C22E28';
            tipo = "Lucha";
            color = '#C22E28';
      break;
      case '  flying':
            cartaPoke.style.backgroundColor = '#A98FF3';
            tipo = "Volador";
            color = '#A98FF3';
      break;
      case 'ice':
            cartaPoke.style.backgroundColor = '#96D9D6';
            tipo = "Hielo";
            color = '#96D9D6';
      break;
      case 'dragon':
            cartaPoke.style.backgroundColor = '#6F35FC';
            tipo = "Dragon";
            color = '#6F35FC';
      break;
        default:
          cartaPoke.style.backgroundColor = '#A8A878';
          tipo = "Normal";
          color = '#A8A878';
          break;
      }


      
      const pokemonimg = document.createElement('img');
      pokemonimg.id = 'imgpokemon';
      pokemonimg.src = detallesPokemon.sprites.front_default;
      pokemonimg.alt = pokemon.name;

      const pokemonName = document.createElement('p');
      pokemonName.textContent = pokemon.name;

      cartaPoke.appendChild(pokemonimg);
      cartaPoke.appendChild(pokemonName);
      
      
      const cardContainer = document.createElement('div');
      cardContainer.className = 'pokemon-card-container'; 
      cardContainer.appendChild(cartaPoke);
      
      contenedorPoke.appendChild(cardContainer);

      cartaPoke.addEventListener('click', () => {
        const audio = new Audio('swish.wav');
        audio.play();
        detallesPoke.style.visibility="visible"
        mostrarDetalles(detallesPokemon, tipo, color);
      });
    });
  }

  function mostrarDetalles(pokemon, tipo, color) {
  
    const infoPoke = `
      <div style="background-color: ${color};">
      <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}" id="imgpokemon">
      </div>
      <h2>${pokemon.name}</h2>
      <p>Altura: ${(pokemon.height) / 10} m</p>
      <p>Peso: ${pokemon.weight / 10} kg</p>
      <p>Tipo: ${tipo}</p>
      <button id="btnCerrar" class="btnCerrar">Cerrar</button>
    `;
  
    detallesPoke.innerHTML = infoPoke;
    detallesPoke.style.right = '0';
  
    const btnCerrar = detallesPoke.querySelector('.btnCerrar');
    btnCerrar.addEventListener('click', () => {
      CerrarDetalles();
    });
  }
  
  function CerrarDetalles() {
    detallesPoke.style.right = '-100%';
    detallesPoke.style='hidden'
    detallesPoke.innerHTML = '';
  }
  

  return {
    cartaPokemon: cartaPokemon
  };
})();

Pokedex.cartaPokemon();
