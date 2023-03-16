const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

//SACAMOS LA INFO DE LA API INTRODUCIENDO UN ID
const fetchPokemon = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    createPokemon(data);
  };

  let limit = 9;
  let offset = 1;
  
  previous.addEventListener("click", () => {
    if (offset != 1) {
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
  });
  
  next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  });
  



  //RECORREMOS DEL 1 AL ID NECESARIO MOSTRANDOLOS TODOS
  const fetchPokemons = async (offset, limit) => {
    for (let i = offset; i < offset + limit; i++) {
        await fetchPokemon(i);
        
    }
  }

    //CREAMOS LA CARTA 
const createPokemon = (pokemon) => {
    const card = document.createElement(`div`);
    card.classList.add(`pokemon-block`);

    const spritesContainer = document.createElement(`div`);
    spritesContainer.classList.add(`img-container`);

    const sprites= document.createElement(`img`);
    sprites.src = pokemon.sprites.front_default

    spritesContainer.appendChild(sprites);

    const number = document.createElement(`p`);
    number.textContent = `#${pokemon.id}`

    const name = document.createElement(`p`);
    name.classList.add(`name`);
    name.textContent = pokemon.name

    card.appendChild(spritesContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card)
}

function removeChildNodes (parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset,limit);



//const filter = (pokemon) => {
//  const divFiltro$$ = document.createElement("div");
//  const input$$ = document.createElement("input");
//  input$$.setAttribute("type", "text");
//  input$$.addEventListener(`input`, () => filtrar (pokemon));
//  divFiltro$$.appendChild(divFiltro$$);
//  document.body.appendChild(divFiltro$$);
//}

//const init = async () => {
//  const pokemon = await fetchPokemon();
//  filter(pokemon);
//  createPokemon(pokemon);
//}

//init();
