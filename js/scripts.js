// Height is in m

const pokemonList = [
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Pidgey', height: 0.3, types: ['flying', 'normal']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']}
];

// Loop iterates over each item in pokemonList array and highlights large pokemon
for (let i = 0; i < pokemonList.length; i++) {
    const pokemon = pokemonList[i];
    const pokemonHeight = pokemonList[i].height;
    const html = `<h2>${pokemon.name}</h2>
                  <h3>${
                    pokemonHeight >= 1
                      ? `Height: ${pokemonHeight}m - Wow! That is big!`
                      : `Height: ${pokemonHeight}m`
                  }</h3>`;
    document.write(html);
  }