let globalPokemonList =[]
pokemonList=[
{name:"Bulbasaur",height:0.7,types:["grass","poison"]},
{name:"Charizard",height:1.7,types:["fire","flying"]},
{name:"Parasect",height:1.4,types:["grass","bug"]}
]

// for (let i=0;i < pokemonList.length; i++)
// {
//     text=pokemonList[i].name +" (height: "+ pokemonList[i].height+")."
//     if (pokemonList[i].height<1){
//       document.write(text+" It's a small pokemon "+"<br>");
//     }
//     else if (pokemonList[i].height > 1 && pokemonList[i].height < 1.5){
//       document.write(text+" It's an average size pokemon "+"<br>");
//     }
//     else{
//       document.write(text+" It's a big pokemon "+"<br>");
//     }
// }

//Using a forEach() function instead of the for loop to iterate over 
// pokemonList array in order to print the details of each one.


// globalPokemonList.forEach(function (Pokemons){
//   text=Pokemons.name +" (height: "+ Pokemons.height+")."
//   if (Pokemons.height<1){
//     document.write(text+" It's a small pokemon "+"<br>");
//   }
//   else if (Pokemons.height > 1 && Pokemons.height < 1.5){
//     document.write(text+" It's an average size pokemon "+"<br>");
//   }
//   else{
//     document.write(text+" It's a big pokemon "+"<br>");
//   }
// });

let pokemonRepository = (function () {
  let pokemonList = [
    {name:"Bulbasaur",height:0.7,types:["grass","poison"]},
    {name:"Charizard",height:1.7,types:["fire","flying"]},
    {name:"Parasect",height:1.4,types:["grass","bug"]}
    ]

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function addListItem(pokemon){
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText=pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
