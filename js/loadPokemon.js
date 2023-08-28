export async function loadPokemon(dataPokemon) {
    const promises = dataPokemon.map(async pokemon => {
      const pedirPokemon = await fetch(pokemon.url);
      return await pedirPokemon.json();
    });
  
    const detallesPokemon = await Promise.all(promises);
    return detallesPokemon;
  }