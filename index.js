$(document).ready(function () {
    let region = "";
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/region",
        success: function (response) {
            $.each(response.results, function (key, value) {
                region = region + genRegion(key+1, value.name, value.url);
            });
            $('#body-paises').html(region);
        },
        error: function (ex) {
            console.log(ex);
        }
    });

    function genRegion(idx, region, url) {
        return '<tr>\n' +
            '       <td>' + idx + '</td>\n' +
            '       <td>' + region + '</td>\n' +
            '       <td><a type="button" href="./detalleRegion/detalleRegion.html?region=' + url.split('/').at(-2) + '" class="btn botonDetalle">Detalles</a></td>\n' +
            '   </tr>'
    }
});