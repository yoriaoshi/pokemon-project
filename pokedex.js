const collection = document.querySelector("#collection");

const savedPokemon =
  JSON.parse(localStorage.getItem("collection")) || [];


savedPokemon.forEach((pokemonId) => {

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((res) => res.json())
    .then((pokemon) => {

      collection.innerHTML += `
        <div class="card">

          <img
            src="${pokemon.sprites.front_default}"
            alt="${pokemon.name}"
          >

          <h3>${pokemon.name}</h3>

        </div>
      `;

    });

});