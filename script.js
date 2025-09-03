const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonImage2 = document.querySelector('.pokemon_image2');
const pokemonType = document.querySelector('.pokemon_type');
const pokemonAbilities = document.querySelector('.abilities');
const pokemonStats = document.querySelector('.stats');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const notFound = document.querySelector('.not-found');
const infoCard = document.querySelector('.info-card');
const pokemonInfo = document.querySelector('.pokemon-info')

const colors = {
  fire: '#ff7676',
  grass: '#6cd461',
  electric: '#ffd43b',
  water: '#69baf1',
  ground: '#d6a671',
  rock: '#b2a57c',
  fairy: '#fbb6d9',
  poison: '#ca98db',
  bug: '#a7c957',
  dragon: '#8c7aa9',
  psychic: '#ff9eb5',
  flying: '#98c0f0',
  fighting: '#d94f4f',
  normal: '#e2cfc3',
  ghost: '#846a9d',
  ice: '#99e1f2',
  dark: '#5c5c5c'
};

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    return await APIResponse.json();
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.textContent = 'Loading...';
  pokemonNumber.textContent = '';
  const data = await fetchPokemon(pokemon);

  if (data) {
  notFound.style.display = 'none';

  // Corrigir imagens
  pokemonImage.src = data.sprites.front_default || 'placeholder.png';
  pokemonImage2.src = data.sprites.back_default || 'placeholder.png';

  pokemonImage.style.display = 'block';
  pokemonImage2.style.display = 'block';

  // Mostrar o elemento que contém as informações
  pokemonInfo.style.display = 'block';  // <-- ESSA LINHA É IMPORTANTE

  // Preencher conteúdo
  pokemonName.textContent = data.name;
  pokemonNumber.textContent = data.id;
  pokemonType.textContent = data.types.map(t => t.type.name).join(', ');
  pokemonAbilities.textContent = data.abilities.map(a => a.ability.name).join(', ');
  pokemonStats.innerHTML = data.stats.map(stat => `
    <li>${stat.stat.name}: ${stat.base_stat}</li>
  `).join('');

  const mainType = data.types[0].type.name;
  infoCard.style.backgroundColor = colors[mainType] || '#fff';

  searchPokemon = data.id;
  input.value = '';
} else {
  notFound.style.display = 'block';
  pokemonImage.style.display = 'none';
  pokemonImage2.style.display = 'none';

  pokemonName.textContent = 'Não encontrado';
  pokemonNumber.textContent = '';
  pokemonType.textContent = '';
  pokemonAbilities.textContent = '';
  pokemonStats.innerHTML = '';

  // Ocultar o elemento de info
  pokemonInfo.style.display = 'none';  // <-- OCULTA O ELEMENTO
}

  
if (data.id <= 649) {
  pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'] || '';
  pokemonImage2.src = data.sprites.versions['generation-v']['black-white']['animated']['back_default'] || '';
} else {
  pokemonImage.src = data.sprites.other['official-artwork']['front_default'] || '';
  pokemonImage2.src = data.sprites.front_default || '';
}

  
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});


buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1)
        searchPokemon -= 1;
    renderPokemon(searchPokemon)
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});


renderPokemon(searchPokemon);


