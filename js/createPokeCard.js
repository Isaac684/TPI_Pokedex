import { mostrarDetalles } from "./showDetail.js";
export async function createPokeCard(pokemon, contenedorPoke, detallesPoke){
    let tipo, color;
    console.log(pokemon.constructor.name);
      const cartaPoke = document.createElement('div');
      cartaPoke.className = 'pokemon-card';
      let tipoPokemon="";
      pokemon.types.forEach(tipo =>{
        tipoPokemon += tipo.type.name+", ";
      })

      tipoPokemon = tipoPokemon.slice(0,-2);
      const tipopoke = pokemon.types[0].type.name;

      switch (tipopoke) {
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
      pokemonimg.src = pokemon.sprites.front_default;
      pokemonimg.alt = pokemon.name;

      const pokemonName = document.createElement('p');
      pokemonName.setAttribute("data-poke","name-poke");
      pokemonName.textContent = pokemon.name;

      const pokemonAltura = document.createElement('p');
      pokemonAltura.textContent = `${pokemon.height/ 10} m`;

      const pokemonPeso = document.createElement('p');
      pokemonPeso.textContent = `${pokemon.weight/10} kg`;

      const pokemonTipo = document.createElement('p');
      pokemonTipo.textContent = `${tipoPokemon}`;

      const divData = document.createElement('div')
      divData.className = 'divDataPokemon'
      
      const ability = document.createElement("p");


      cartaPoke.appendChild(pokemonimg);
      cartaPoke.appendChild(pokemonName);
      divData.appendChild(pokemonTipo)
      divData.appendChild(pokemonAltura)
      divData.appendChild(pokemonPeso)
      cartaPoke.appendChild(divData);
      divData.appendChild(ability)

      const abilities = pokemon.abilities;
      let bandera = false
      abilities.forEach(ab =>{
        if (bandera) {
          ability.textContent += `, ${ab.ability.name}`;
        }else{
          ability.textContent += ab.ability.name;
          bandera = true
        }
      })


      const cardContainer = document.createElement('div');
      cardContainer.className = 'pokemon-card-container';
      cardContainer.appendChild(cartaPoke);

      contenedorPoke.appendChild(cardContainer);

      cartaPoke.addEventListener('click', () => {
        const audio = new Audio('swish.wav');
        audio.play();
        detallesPoke.style.visibility = "visible"
        mostrarDetalles(pokemon, tipo, color, detallesPoke);
      });
}