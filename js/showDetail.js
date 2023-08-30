export function mostrarDetalles(pokemon, tipo, color, detallesPoke) {
    const infoPoke = `
      <div id="menu" style="margin-top: 10px;">
        <button id="btnCerrar" class="btnCerrar" style="background-color: #333; color: white; padding: 5px 10px; border: none; cursor: pointer;margin-bottom: 2rem;">Cerrar</button>
      </div>
      <div class="pokestatsImg" style="background-color: ${color+"D0"}">
        <div class="pokebola"></div>
        <div class="lineaCentral"></div>
        <img src="${pokemon.sprites.versions['generation-v']['black-white'].animated.front_default}" alt="${pokemon.name}" id="imgpokemon">
      </div>
      <h2 style="margin-top: 10px;">${pokemon.name}</h2>
      <div id="infoContainer" style=" margin-top: 5px;">
      <button id="opcion1" class="opcion" style=" color: white; padding: 5px 10px; border: none; cursor: pointer;">Stats</button>
      <button id="opcion2" class="opcion" style=" color: white; padding: 5px 10px; border: none; cursor: pointer;">Moves</button>
        <div id="Info1" style="flex: 3; margin-top: 10px;"></div>
        <div id="Info2" style="flex: 3; margin-top: 10px;"></div>
      </div>
    `;
  
    detallesPoke.innerHTML = infoPoke;
    detallesPoke.style.right = '0';
  
  
    const btnCerrar = detallesPoke.querySelector('.btnCerrar');
    btnCerrar.addEventListener('click', () => {
      CerrarDetalles(detallesPoke);
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

function CerrarDetalles(detallesPoke) {
    detallesPoke.style.right = '-100%';
    detallesPoke.style = 'hidden'
    detallesPoke.innerHTML = '';
}
function efectoBlur() {
    const blur = document.getElementById('blur')
    blur.classList.toggle('active')
  }