// Height is in m

const pokemonList = [
    {name: 'Venusaur', height: 2, types: ['grass', 'poison']},
    {name: 'Pidgey', height: 0.3, types: ['flying', 'normal']},
    {name: 'Jigglypuff', height: 0.5, types: ['fairy', 'normal']}
];

// Loop iterates over each item in pokemonList array
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<p>pokemonList[i].name' + ' (height:' + 'pokemonList[i].height' + ')');
}

// Highlight a large pokemon
for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height > 1){
      console.log(pokemonList[i].name + " is a big Pokemon!");
      document.write('<p>pokemonList[i].name' + ' is a big Pokemon');
    }
  }