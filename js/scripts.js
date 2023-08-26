let globalPokemonList =[]
pokemonList=[
{name:"Bulbasaur",height:0.7,types:["grass","poison"]},
{name:"Charizard",height:1.7,types:["fire","flying"]},
{name:"Parasect",height:1.4,types:["grass","bug"]}
]

let modalContainer = document.querySelector('#exampleModal');

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

  function showModal(pokemon) {
    let modalBody=$(".modal-body");
    let modalTitle=$(".modal-title");
    let modalHeader=$(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement=$("<h1>"+pokemon.name+ "</h1>");
    let imageElementFront=$('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrl);
    // let imageElementBack=$('<img class="modal-img" style="width:50%">');
    // imageElementBack.attr("src",pokemon.imageUrl);

    let heightElement=$("<p>"+"height: "+pokemon.height+ "</p>");
    let weightElement=$("<p>"+"weight: "+pokemon.weight+ "</p>");
    
    let typesArray=[];
    pokemon.types.forEach(function (item){
      console.log(item.type.name)
      typesArray.push(item.type.name);
    });
    let typesElement=$("<p>"+"type: "+typesArray.join(", ")+ "</p>");

    let Abilities=[];
    pokemon.abilities.forEach(function (item){
      console.log(item.ability.name)
      Abilities.push(item.ability.name);
    });

    let abilitiesElement=$("<p>"+"abilities: "+Abilities.join(", ")+ "</p>");

    modalTitle.append(nameElement);
    // modalBody.append(imageElementBack);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      // console.log(pokemon);
    });
  }

  function addListItem(pokemon){
    let img_url = "";
    loadDetails(pokemon).then(function () {
      img_url = pokemon.imageUrl;
    
    let pokeList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    let buttonImage=document.createElement('img');
    console.log("HOLA" + img_url);
    buttonImage.setAttribute("src",img_url);
    button.innerText=pokemon.name;
    button.classList.add('button-class');
    button.type = 'button';
    button.classList.add('btn', 'btn-primary');
    button.setAttribute("data-target", "#exampleModal"); 
    button.setAttribute("data-toggle", "modal");
    button.appendChild(buttonImage);
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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
        console.log("Added:", pokemon.name);
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
      item.weight=details.weight;
      item.types = details.types;
      item.abilities=details.abilities;
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
