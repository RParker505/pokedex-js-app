// Height is in m

let pokemonRepository = (function () {

  let pokemonList = [
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Pidgey', height: 0.3, types: ['flying', 'normal']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']}
  ];

  function getAll () {
    return pokemonList;
  }

  function add (item) {
    if (typeof item !== 'object'){
    console.log('Item being added must be an object')
    } else if (item.length < 3){
      console.log('Item being added must have 3 key value pairs')
    } else {pokemonList.push(item)}
  }

  return {
    add: add,
    getAll: getAll
  };

})();

// forEach loop writes pokemon details to index page
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(`<h2>${pokemon.name}</h2>
                <h3>${
                  pokemon.height >= 1
                    ? `Height: ${pokemon.height}m - Wow! That is big!`
                    : `Height: ${pokemon.height}m`
                }</h3>`);
});