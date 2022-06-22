$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');

    let area = "";
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/location/" + idLocacion,
        success: function (response) {
            $.each(response.areas, function (key, value) {
                area = area + genArea(key + 1, value.name, value.url);
            });
            $('#tablaAreas').html(area);

            $(".pokemon-btn").click(function () {
                console.log(":(")
                pokemones($(this).attr('data-locacion'))
            })

            $("#regresar").attr('href', "../detalleRegion/detalleRegion.html?region=" + response.region.url.split('/').at(-2));
            $("#labelLocacion").text('Locación: ' + response.name);
            $("#labelRegion").text('Región: ' + response.region.name);
        },
        error: function (ex) {
            console.log(ex);
        }
    });

    function genArea(idx, locacion, url) {
        return '<tr>\n' +
            '       <td>' + idx + '</td>\n' +
            '       <td>' + locacion + '</td>\n' +
            '       <td><button class="btn text-white pokemon-btn" data-locacion="' + url.split('/').at(-2) + '">Ver Pokemones</button></td>\n' +
            '   </tr>'
    }

    function genPokemon(name, id) {
        return '<div class="rounded d-flex flex-column align-items-center m-2" style="width: 130px; height: 150px; border: 2px solid #2673ba;">\n' +
            '       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id +'.png">\n' +
            '       <h4>' + name +'</h4>\n' +
            '   </div>';
    }

    function pokemones (idlocarea) {
        console.log(":(")
        let pokemon = "";
        $.ajax({
            type: "GET",
            url: "https://pokeapi.co/api/v2/location-area/" + idlocarea,
            success: function (response) {
                $.each(response.pokemon_encounters, function (key, value) {
                    pokemon = pokemon + genPokemon(value.pokemon.name, value.pokemon.url.split('/').at(-2));
                });
                $('#pokemons').html(pokemon);
            },
            error: function (ex) {
                console.log(ex);
            }
        });
    }


});