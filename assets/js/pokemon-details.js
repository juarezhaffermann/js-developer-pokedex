// Extrai o ID do Pokémon da URL
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

// Constroi a URL da API com o ID do Pokémon
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

// Definição da classe Pokemon
class Pokemon {
    constructor() {
        this.name = '';
        this.number = '';
    }
}


// Acessa a API para obter os detalhes do Pokémon
fetch(apiUrl)
    .then(response => response.json())
    .then(pokemonData => {
        // Atualizar os elementos HTML com os detalhes do Pokémon
        document.getElementById('name').innerText = pokemonData.name;
        document.getElementById('number').innerText = `#${pokemonData.id}`;
        document.querySelector('.pokemon img').setAttribute('src', pokemonData.sprites.other.dream_world.front_default);
        document.getElementById('species-result').innerText = pokemonData.species.name;
        document.getElementById('height-result').innerText = `${pokemonData.height / 10} m`;
        document.getElementById('weight-result').innerText = `${pokemonData.weight / 10} kg`;

        const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
        document.getElementById('abilities-result').innerText = abilities;

        // Detalhes de reprodução
        const genderUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonData.id}`;
        fetch(genderUrl)
            .then(response => response.json())
            .then(speciesData => {
                const genderRate = speciesData.gender_rate;
                const genderRatioMale = 100 * (8 - genderRate) / 8;
                const genderRatioFemale = 100 - genderRatioMale;

                document.getElementById('result-male').innerText = `${genderRatioMale.toFixed(1)}%`;
                document.getElementById('result-female').innerText = `${genderRatioFemale.toFixed(1)}%`;
            })
            .catch(error => console.log(error));

        const eggGroupsUrl = pokemonData.species.url;
        fetch(eggGroupsUrl)
            .then(response => response.json())
            .then(speciesData => {
                const eggGroups = speciesData.egg_groups.map(group => group.name).join(', ');
                document.getElementById('egg-groups-result').innerText = eggGroups;
                document.getElementById('egg-cycle-result').innerText = speciesData.hatch_counter;
            })
            .catch(error => console.log(error));

        
    })
    .catch(error => console.log(error));

function addToFavorites() {
    // Recupera os detalhes do Pokémon dos elementos HTML
    const pokemonName = document.getElementById('name').innerText;
    const pokemonNumber = document.getElementById('number').innerText;

    // Cria um objeto Pokémon com os detalhes recuperados
    const pokemon = new Pokemon();
    pokemon.name = pokemonName;
    pokemon.number = pokemonNumber;

        alert(`O Pokémon ${pokemonName} (#${pokemonNumber}) foi adicionado aos favoritos!`);
}