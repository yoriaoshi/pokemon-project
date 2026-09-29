const products = document.querySelector(".card-grid");


// fetch to get 10 Pokémon only from the API

fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
    .then((res) => res.json())
    .then((data) => {

        data.results.forEach((pokemon) => {

            // this is to get information about each Pokémon

            fetch(pokemon.url)
                .then((res) => res.json())
                .then((pokemonData) => {

                    const types = pokemonData.types
                        .map((type) => type.type.name)
                        .join(" / ");


                    // here is to create the Pokémon card

                    products.innerHTML += `
                        <div
                            class="card flex flex-col items-center rounded-2xl bg-gray-100 p-5 text-center shadow-sm">

                            <img
                                src="${pokemonData.sprites.front_default}"
                                alt="${pokemonData.name}"
                                class="mx-auto h-36 w-36 object-contain"
                            >

                            <h3
                                class="mt-3 font-['Fredoka'] text-xl font-bold capitalize text-[#172A5B]">

                                ${pokemonData.name}

                            </h3>

                            <p
                                class="mt-2 font-['Manrope'] text-sm capitalize text-gray-500">

                                ${types}

                            </p>


                            <!--here is add to collection button -->

                            <button
                                type="button"
                                class="add-button mt-auto rounded-full bg-[#2563EB] px-5 py-2.5 font-['Manrope'] text-sm font-semibold text-white transition hover:bg-blue-700"
                                data-id="${pokemonData.id}">

                                Add to collection

                            </button>

                        </div>
                    `;
                });

        });

    })
    .catch((error) => {

        console.error("Error fetching Pokémon:", error);

    });


// here add pokemon to collection

document.addEventListener("click", (event) => {

    if (event.target.classList.contains("add-button")) {

        const pokemonId = event.target.dataset.id;


        // here get the existing collection

        let collection =
            JSON.parse(localStorage.getItem("collection")) || [];


        // here add Pokémon if it is not already in the collection

        if (!collection.includes(pokemonId)) {

            collection.push(pokemonId);

            localStorage.setItem(
                "collection",
                JSON.stringify(collection)
            );

            event.target.textContent = "Added ✓";

        } else {

            event.target.textContent = "Already added";

        }

        console.log("My collection:", collection);

    }

});
