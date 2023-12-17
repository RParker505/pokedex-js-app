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

  // add function adds a pokemon to the pokemonList (but it must be an object and must have 3 key/value pairs)
  function add (item) {
    if (typeof item !== 'object'){
    console.log('Item being added must be an object')
    } else if (Object.keys(item).length < 3){
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
  let pokemonDetails = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('pokemon-button');
});