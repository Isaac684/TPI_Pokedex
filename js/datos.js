import { pokeSearch } from "./pokeSearch.js";
import { createPokeCard } from "./createPokeCard.js";
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
      createPokeCard(pokemon, contenedorPoke, detallesPoke);
    });

  }

  



  document.getElementById('introVideo').addEventListener('ended', function () {
    document.getElementById('intro').classList.toggle("introSalida")
    document.body.style.overflow = 'auto';
  });
  return {
    cartaPokemon: cartaPokemon
  };

})();

Pokedex.cartaPokemon();







