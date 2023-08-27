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
      contenedorPoke.innerHTML = "";
      createPokeCard(pokemon, contenedorPoke, detallesPoke);
    });
    //Se llama al input que contendra la informacion de busqueda
    const txtBusqueda = document.getElementById("txtBuscar");
    txtBusqueda.addEventListener("input", () =>{ //Se le asigna el evento input para que cuando el texto cambie se ejecute la busqueda
      const resultado = pokeSearch(txtBusqueda.value, dataPokemon);//Se le mandan los datos a la funcion pokeSearch para que este nos devuelva un arreglo con los elementos encontrados
      if(resultado.length >0){//Se verifica si hay elementos
        contenedorPoke.innerHTML = "";
        //En el caso de que hayan elementos de recorren y se crean sus cartas para que sean mostradas
        resultado.forEach(async pokemonesEncontrados =>{
          createPokeCard(pokemonesEncontrados,contenedorPoke,detallesPoke);
        })
      }else{
        //En el caso de que no entonces simplemente se muestra un texto indicando que no se encontro nada
        contenedorPoke.innerHTML = "";
        const fallo = document.createElement("p");
        fallo.textContent = "No se encontro a ningun pokemon :(";

        contenedorPoke.appendChild(fallo);
      }
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







