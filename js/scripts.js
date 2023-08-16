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
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
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
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

});
