document.addEventListener('DOMContentLoaded', function () {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(res => res.json())
        .then(res => {
            const pokemones = res.results;
            const output = document.getElementById('pokemones');
            let htmlString = '';

            pokemones.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(res => res.json())
                    .then(detalles => {
                        const imagenAltaCalidad = detalles.sprites.other['official-artwork'].front_default;
                        htmlString += `
                        <div class="card">
                            <div class="pokemon-img">
                                <img src="${imagenAltaCalidad}" alt="${detalles.name}">
                            </div>
                            <div class="data">
                                <span class="pokemon-name">${detalles.name}</span>
                                <span class="pokemon-h">Altura: ${detalles.height / 10} m</span>
                                <span class="pokemon-w">Peso: ${detalles.weight / 10} kg</span>
                                <span class="pokemon">Tipo: ${detalles.types.map(typeInfo => typeInfo.type.name).join(', ')}</span>
                            </div>
                        </div>
                    `;
                        output.innerHTML = htmlString;
                    })
                    .catch(err => console.error(err));
            });

        })
        .catch(err => console.error(err));

}); //FINAL