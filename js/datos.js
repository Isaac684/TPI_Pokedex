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

      const pokemonAltura = document.createElement('p');
      pokemonAltura.textContent = `Altura: ${detallesPokemon.height/ 10} m`;

      const pokemonPeso = document.createElement('p');
      pokemonPeso.textContent = `Peso: ${detallesPokemon.weight/10} kg`;

      const pokemonTipo = document.createElement('p');
      pokemonTipo.textContent = `Tipo: ${tipo}`;
      const habilidadPoke = document.createElement("p");
      habilidadPoke.textContent = "Habilidades:"

      cartaPoke.appendChild(pokemonimg);
      cartaPoke.appendChild(pokemonName);
      cartaPoke.appendChild(pokemonAltura)
      cartaPoke.appendChild(pokemonPeso)
      cartaPoke.appendChild(pokemonTipo)
      cartaPoke.appendChild(habilidadPoke);

      const abilities = detallesPokemon.abilities;
      abilities.forEach(ab =>{
        const ability = document.createElement("p");
        ability.textContent = ab.ability.name;
        cartaPoke.appendChild(ability);
      })


      const cardContainer = document.createElement('div');
      cardContainer.className = 'pokemon-card-container';
      cardContainer.appendChild(cartaPoke);

      contenedorPoke.appendChild(cardContainer);

      cartaPoke.addEventListener('click', () => {
        const audio = new Audio('swish.wav');
        audio.play();
        detallesPoke.style.visibility = "visible"
        mostrarDetalles(detallesPokemon, tipo, color);
      });
    });
  }

  function mostrarDetalles(pokemon, tipo, color) {
    const infoPoke = `
      <div id="menu" style="margin-top: 10px;">
        <button id="btnCerrar" class="btnCerrar" style="background-color: #333; color: white; padding: 5px 10px; border: none; cursor: pointer;margin-bottom: 2rem;">Cerrar</button>
      </div>
      <div class="pokestatsImg" style="background-color: ${color+"D0"};">
        <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}" id="imgpokemon" style="max-width: 100%; height: auto; opacity: 100%;">
      </div>
      <h2 style="margin-top: 10px;">${pokemon.name}</h2>
      <div id="infoContainer" style=" margin-top: 5px;">
      <button id="opcion1" class="opcion" style=" color: white; padding: 5px 10px; border: none; cursor: pointer;">Stats</button>
      <button id="opcion2" class="opcion" style=" color: white; padding: 5px 10px; border: none; cursor: pointer;">Moves</button>
        <div id="Info1" style="flex: 1; padding: 10px;"></div>
        <div id="Info2" style="flex: 1; padding: 10px;"></div>
      </div>
    `;
  
    detallesPoke.innerHTML = infoPoke;
    detallesPoke.style.right = '0';
  
  
    const btnCerrar = detallesPoke.querySelector('.btnCerrar');
    btnCerrar.addEventListener('click', () => {
      CerrarDetalles();
      efectoBlur();
    });
  
    const opcion1 = detallesPoke.querySelector('#opcion1');
    const opcion2 = detallesPoke.querySelector('#opcion2'); // defino variables para el boton y divs
    const InfoDiv1 = document.querySelector('#Info1');
    const InfoDiv2 = document.querySelector('#Info2');
  
    opcion1.addEventListener('click', () => {
      mostrarOpcion1Info(InfoDiv1, pokemon); //creo el evento del  boton click y le paso un metodo que este mostrara la info de stats
      InfoDiv2.innerHTML = '';  //recibe dos parametros
    });
    //Se declaran las variables para la paginacion de los movimientos 
    const itemsPorPagina = 10;//Es la cantidad de moves que se mostraran por pagina
    let pagActual = 1//La pagina que se esta mostrardo
    opcion2.addEventListener('click', () => {
      mostrarOpcion2Info(InfoDiv2, pokemon,itemsPorPagina,pagActual); //lo mismo para el metodo de moves
      InfoDiv1.innerHTML = ''; 
    });
  
    efectoBlur();
  }

  function mostrarOpcion2Info(infoDiv, pokemon, itemsPorPagina, pagActual){
    const moves = pokemon.moves;
    const pagTotales = Math.ceil(moves.length / itemsPorPagina);//Se hace el calculo del total de la paginas
    const inicio = (pagActual - 1) * itemsPorPagina;//Se calcula el indice de inicio
    const final = Math.min(inicio + itemsPorPagina, moves.length);//calcula el índice final para la porción de datos que se mostrará en la página actual
  
    let info1 = "";
    for (let i = inicio; i < final; i++) {
      const mv = moves[i];//Se toma la posicion del movimiento para ser mostrado en el html
      info1 += `
        <div class="stat-line-move">
          <span class="stat-label">${i + 1}</span>
          <span class="stat-value">${mv.move.name}</span>
        </div>
      `;
    }
  
    let info = `
      <div class="info-stat-move">
        <h3 style="text-align:center;padding-top:5px;" >Movimientos</h3>
        ${info1}
      </div>
    `;
  
    const paginas = `
      <div>
        <button accion-pag="anterior"><<</button>
        <span>Pagina ${pagActual} de ${pagTotales}</span>
        <button accion-pag="siguiente">>></button>
      </div>
    `;
  
    infoDiv.innerHTML = info + paginas;//Se agrega la informacion al div

    const btnsPaginacion = document.querySelectorAll("[accion-pag]");//Se obtinen los botones
    btnsPaginacion.forEach((boton) =>{//Se recorre el arreglo de los botones para asignales el evento click
      boton.addEventListener("click", () =>{
        const accion = boton.getAttribute("accion-pag");//Se obtiene la informacion del atributo accion-pag
        if(accion === "siguiente" && pagActual < pagTotales){//Se verifica si este es igual a siguiente y que la
          pagActual++;                                       //pagina actual sea menor que el total de paginas
        }else if(accion === "anterior" && pagActual >1){
          pagActual--;
        }
        //Una vez ya actualizada la pagina actual se llama la funcion mostrarOpcion2Info para que la pagina mostrada sea la correspondiente
        mostrarOpcion2Info(infoDiv, pokemon, itemsPorPagina, pagActual);
      });
    });
}

  function mostrarOpcion1Info(infoDiv, pokemon) {
    //creo una funcion, luego una variable para obtener las stats 
    console.log(pokemon.abilities)
    console.log(pokemon)
    const stats = pokemon.stats;
    const hp = stats.find(stat => stat.stat.name === 'hp').base_stat;  //con find obtenemos los valores individuales de cada estadistica
    const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
    const spAttack = stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    const spDefense = stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;
    const total = stats.reduce((acu, stat) => acu + stat.base_stat, 0); //luego utilizamos reduce para obtener la info almacenada en base_Stat para sumarla
   
    const info = `
    <div class="info-stat">
      <h3 style="text-align:center;padding:15px;" >ESTADISTICAS</h3>
    <div class="stat-line">
      <span class="stat-label">HP:</span>
      <span class="stat-value">${hp}</span>
      <div class="stat-bar hp-bar" style="--hp: ${((hp/200)*100).toFixed(2)}%;"></div>
    </div>
    <div class="stat-line">
      <span class="stat-label">Ataque:</span>
      <span class="stat-value">${attack}</span>
      <div class="stat-bar attack-bar" style="--attack: ${((attack/200)*100).toFixed(2)}%;"></div>
    </div>
    
    <div class="stat-line">  
      <span class="stat-label">Defensa:</span>
      <span class="stat-value">${defense}</span>
      <div class="stat-bar defense-bar" style="--defense: ${((defense/200)*100).toFixed(2)}%;"></div>
    </div>
    <div class="stat-line">
      <span class="stat-label">Ataque Especial:</span>
      <span class="stat-value">${spAttack}</span>
      <div class="stat-bar spAttack-bar" style="--spAttack: ${((spAttack/200)*100).toFixed(2)}%;"></div>
    </div>
    <div class="stat-line">
      <span class="stat-label">Defensa Especial:</span>
      <span class="stat-value">${spDefense}</span>
      <div class="stat-bar spDefense-bar" style="--spDefense: ${((spDefense/200)*100).toFixed(2)}%;"></div>
    </div>
    <div class="stat-line">
      <span class="stat-label">Velocidad:</span>
      <span class="stat-value">${speed}</span>
      <div class="stat-bar speed-bar" style="--speed: ${((speed/200)*100).toFixed(2)}%;"></div>
    </div>
    <div class="stat-line">
      <span style="margin-rignt:3px;" class="stat-label">Total:</span>
      <span class="stat-value">${total}</span>
      <div class="stat-bar total-bar" style="--total: ${((total/700)*100).toFixed(2)}%;"></div>
    </div>
  </div>
`;

infoDiv.innerHTML = info;


  
  }

  function CerrarDetalles() {
    detallesPoke.style.right = '-100%';
    detallesPoke.style = 'hidden'
    detallesPoke.innerHTML = '';
  }

  function efectoBlur() {
    const blur = document.getElementById('blur')
    blur.classList.toggle('active')
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