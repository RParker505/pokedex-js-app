// Height is in m

let pokemonRepository = (function () {

  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  let pokemonModal = document.querySelector('#pokemonModal');

  function getAll() {
    return pokemonList;
  }

  // add function adds a pokemon to the pokemonList (but it must be an object and must have 2 key/value pairs)
  function add(item) {
    if (typeof item !== 'object'){
    console.log('Item being added must be an object')
    } else if (!Object.keys(item).includes("name")){
      console.log('Item being added must have a name')
    } else {pokemonList.push(item)}
  }

  // showDetails function logs pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

function showModal(pokemon) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');
    // Clear all existing modal content
  modalTitle.empty();
  modalBody.empty();
  
    // Add the new modal content
  let pokemonName = $('<h1>' + pokemon.name + '</h1>');
  let pokemonImage = $('<img class="modal-img" style="width=50%">');
  pokemonImage.attr('src', pokemon.imageUrl);
  let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
  const pokemonTypes = document.createElement("p");
  const types = pokemon.types.map(function (item) { return item.type.name; });
  pokemonTypes.innerText = "Types: " + types.join(', ');
  
  modalTitle.append(pokemonName);
  modalBody.append(pokemonImage);
  modalBody.append(pokemonHeight);
  modalBody.append(pokemonTypes);
  }
  
   // addListItem function creates a list item and button displaying the pokemon name for each pokemon
  function addListItem(pokemon) {
    let pokemonDetails = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add('pokemon-button', 'btn', 'btn-primary');
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#pokemonModal');
    button.setAttribute('role', 'button');
    listItem.appendChild(button);
    pokemonDetails.appendChild(listItem);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
    // eventListener calls the showDetails function when the button is clicked
  }

  // loadList function fetches data from API, adds each fetched Pokemon to pokemonList with the add function
  function loadList() {
    return fetch(apiUrl).then(function (response) {
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

  // loadDetails function adds image, height and types to each pokemon (is executed in showDetails function)
  function loadDetails(item) {
    let url = item.detailsUrl;
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

  // These eventListeners are now handled by the Boostrap modal
  // // executes the hideModal function when ESC is hit
  // window.addEventListener ('keydown', (e) => {
  //   let pokemonModal = document.querySelector('#pokemon-modal');
  //   if (e.key === 'Escape' && pokemonModal.classList.contains('is-visible')) {
  //     hideModal();
  //   }
  // });

  // pokemonModal.addEventListener('click', (e) => {
  //   // Since this is also triggered when clicking INSIDE the modal
  //   // We only want to close if the user clicks directly on the overlay (modal-container)
  //   let target = e.target;
  //   if (target === pokemonModal) {
  //     hideModal();
  //   }
  // });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
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