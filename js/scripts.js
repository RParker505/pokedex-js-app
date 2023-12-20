// Height is in m

let pokemonRepository = (function () {

  let pokemonList = [
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Pidgey', height: 0.3, types: ['flying', 'normal']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']}
  ];

  function getAll() {
    return pokemonList;
  }

  // add function adds a pokemon to the pokemonList (but it must be an object and must have 3 key/value pairs)
  function add(item) {
    if (typeof item !== 'object'){
    console.log('Item being added must be an object')
    } else if (Object.keys(item).length < 3){
      console.log('Item being added must have 3 key value pairs')
    } else {pokemonList.push(item)}
  }

  // showDetails function logs pokemon details
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  // addListItem function creates a list item and button displaying the pokemon name for each pokemon
  function addListItem(pokemon) {
    let pokemonDetails = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonDetails.appendChild(listItem);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
    // eventListener calls the showDetails function when the button is clicked
  }

  // loadList function fetches data from API, adds each fetched Pokemon to pokemonList with the add function
  function loadList() {
    return fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails(item) {
    let url = item.details;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  // forEach loop writes pokemon details to index page
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});