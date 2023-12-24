const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0;
const maxRecords = 120;

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}

                </ol >
            <img
                src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
            </li >
        `)
        const newHtml = newList.join('')
        pokemonList.innerHTML += newHtml

    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)

    }


})
