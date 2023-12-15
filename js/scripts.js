// Height is in m

const pokemonList = [
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Pidgey', height: 0.3, types: ['flying', 'normal']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']}
];

// forEach loop writes pokemon details to index page
pokemonList.forEach(function(pokemon) {
  document.write(`<h2>${pokemon.name}</h2>
                <h3>${
                  pokemon.height >= 1
                    ? `Height: ${pokemon.height}m - Wow! That is big!`
                    : `Height: ${pokemon.height}m`
                }</h3>`);
});