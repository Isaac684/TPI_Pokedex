export function pokeSearch(namePokemon,dataPokemon){
    //Se buscan los pokemones en el arreglo y los que vayan coincidiendo se guardan en un arreglo y se retona
    const resultado = dataPokemon.filter(pokemon=> pokemon.name.includes(namePokemon));

    return resultado;
}

