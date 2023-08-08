let pokemonList =[]
pokemonList=[
{name:"Bulbasaur",height:0.7,types:["grass","poison"]},
{name:"Charizard",height:1.7,types:["fire","flying"]},
{name:"Parasect",height:1.4,types:["grass","bug"]}
]

for (let i=0;i < pokemonList.length; i++){
    text=pokemonList[i].name +" (height: "+ pokemonList[i].height+")."
    if (pokemonList[i].height<1){
      document.write(text+" It's a small pokemon "+"<br>");
    }
    else if (pokemonList[i].height > 1 && pokemonList[i].height < 1.5){
      document.write(text+" It's an average size pokemon "+"<br>");
    }
    else{
      document.write(text+" It's a big pokemon "+"<br>");
    }
}