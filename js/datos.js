import { pokeSearch } from "./pokeSearch.js";
import { createPokeCard } from "./createPokeCard.js";
import { loadPokemon } from "./loadPokemon.js";
const Pokedex = (function () {
  const musicabg = document.getElementById('musica_Fondo');
  const contenedorPoke = document.getElementById('pokemon');
  const detallesPoke = document.getElementById('detallePokemon');
  let mostrado = false;

  async function cargarDatos() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    return data.results;
  }
  async function cartaPokemon() {
    
    const dataPokemon = await cargarDatos();
    let jsonPokemon = await loadPokemon(dataPokemon);
    jsonPokemon.forEach(poke =>{
      createPokeCard(poke,contenedorPoke,detallesPoke);
    });
    
    //Se llama al input que contendra la informacion de busqueda
    const txtBusqueda = document.getElementById("txtBuscar");
    txtBusqueda.addEventListener("input", () =>{ //Se le asigna el evento input para que cuando el texto cambie se ejecute la busqueda
      let resultado = [];
      if(txtBusqueda.value == ""){
        contenedorPoke.innerHTML = "";
        resultado = [];
        jsonPokemon.forEach(poke =>{
          createPokeCard(poke,contenedorPoke,detallesPoke);
        });
      }else{
        resultado = [];
        resultado = pokeSearch(txtBusqueda.value, jsonPokemon);//Se le mandan los datos a la funcion pokeSearch para que este nos devuelva un arreglo con los elementos encontrados
        contenedorPoke.innerHTML = "";
        if(resultado.length >0 && resultado.length != 150){//Se verifica si hay elementos
          //En el caso de que hayan elementos de recorren y se crean sus cartas para que sean mostradas
          console.log(resultado);
          resultado.forEach(pokemonesEncontrados =>{
            createPokeCard(pokemonesEncontrados,contenedorPoke,detallesPoke);
          });
        }else{
          //En el caso de que no entonces simplemente se muestra un texto indicando que no se encontro nada
          const fallo = document.createElement("p");
          fallo.textContent = "No se encontro a ningun pokemon :(";
  
          contenedorPoke.appendChild(fallo);
        }
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







