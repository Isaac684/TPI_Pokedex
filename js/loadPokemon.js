import { Pokemon } from "./objectPokemon.js";
export async function loadPokemon(dataPokemon) {
    const promises = dataPokemon.map(async pokemon => {
      const pedirPokemon = await fetch(pokemon.url);
      const detallesPokemon = await pedirPokemon.json();

      const pokemonObject = new Pokemon(detallesPokemon.name, detallesPokemon.sprites, detallesPokemon.height,
                                        detallesPokemon.weight, detallesPokemon.types, detallesPokemon.abilities, 
                                        detallesPokemon.moves, detallesPokemon.stats);
      console.log(pokemonObject.constructor.name);
      return pokemonObject;
    });

    const pokemonObject = await Promise.all(promises);
    return pokemonObject;
  }