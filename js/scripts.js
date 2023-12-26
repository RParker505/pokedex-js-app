// Height is in m

let pokemonRepository = (function () {

  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  let pokemonModal = document.querySelector('#pokemon-modal');

  function getAll() {
    return pokemonList;
  }

  // add function adds a pokemon to the pokemonList (but it must be an object and must have 2 key/value pairs)
  function add(item) {
    if (typeof item !== 'object'){
    console.log('Item being added must be an object')
    } else if (Object.keys(item).length < 2){
      console.log('Item being added must have 2 key value pairs')
    } else {pokemonList.push(item)}
  }

  // showDetails function logs pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height);
    });
  }

  function showModal(title, text) {
    // Clear all existing modal content
    pokemonModal.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);//hides Modal when button is clicked
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title.toUpperCase();
  
    let contentElement = document.createElement('p');
    contentElement.innerText = ('Height:' + ' ' + text);
    
    let pokemonImage = document.createElement('img');
    pokemonImage.src = 'https://placehold.co/200';
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonImage);
    pokemonModal.appendChild(modal);

    // assigns is-visible class to modal-container
    pokemonModal.classList.add('is-visible');
  }
  
    // function to close/hide the modal
  // will reject the showDialog promise no matter how the modal is closed (ESC, button, etc)
  function hideModal () {
    pokemonModal.classList.remove('is-visible');
  }

  // addListItem function creates a list item and button displaying the pokemon name for each pokemon
  function addListItem(pokemon) {
    let pokemonDetails = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name.toUpperCase();
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

  // executes the hideModal function when ESC is hit
  window.addEventListener ('keydown', (e) => {
    let pokemonModal = document.querySelector('#pokemon-modal');
    if (e.key === 'Escape' && pokemonModal.classList.contains('is-visible')) {
      hideModal();
    }
  });

  pokemonModal.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay (modal-container)
    let target = e.target;
    if (target === pokemonModal) {
      hideModal();
    }
  });

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