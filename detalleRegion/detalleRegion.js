
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    let locacion="";
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/region/"+idRegion,
        success: function (response) {
            $.each(response.locations, function (key, value) {
                locacion = locacion + genLocacion(key+1, value.name, value.url);
            });
            $('#tablaLocaciones').html(locacion);
            $('#labelRegion').html('Región '+response.name);
        },
        error: function (ex) {
            console.log(ex);
        }
    });

    function genLocacion(idx, locacion, url) {
        return '<tr>\n' +
            '       <td>' + idx + '</td>\n' +
            '       <td>' + locacion + '</td>\n' +
            '       <td><a type="button" href="./detalleLocacion/detalleLocacion.html?locacion=' + url.split('/').at(-2) + '" class="btn botonDetalle">Detalles</a></td>\n' +
            '   </tr>'
    }

});
