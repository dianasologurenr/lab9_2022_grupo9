$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    let locacion = "";
    let listaLocacion = [];
    var elemPorPag = 10;
    var pagActual = 1;

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/region/" + idRegion,
        success: function (response) {

            var totalElem = response.locations.length;
            var totalPag = Math.ceil(totalElem / elemPorPag);

            $.each(response.locations, function (key, value) {
                var item = key + 1
                if (1 <= item && item <= 10) {
                    listaLocacion.push(value);
                }
            });

            $.each(listaLocacion, function (key, value) {
                locacion = locacion + genLocacion(key + 1, value.name, value.url);
            });
            $('#tablaLocaciones').html(locacion);
            $('#labelRegion').html('Región ' + response.name);

            $("#paginador").html(genPaginador(pagActual, totalPag))

            $(".pag").on("click", "button",function () {
                var p = $(this).val()
                console.log("holi")
                console.log(p)
                verPag(p)
            })

        },
        error: function (ex) {
            console.log(ex);
        }
    });

    function genLocacion(idx, locacion, url) {
        return '<tr>\n' +
            '       <td>' + idx + '</td>\n' +
            '       <td>' + locacion + '</td>\n' +
            '       <td><a type="button" href="../detalleLocacion/detalleLocacion.html?locacion=' + url.split('/').at(-2) + '" class="btn botonDetalle">Detalles</a></td>\n' +
            '   </tr>'
    }

    function genPaginador(pagActual, totalPag) {
        var disableP = pagActual <= 1 ? 'disabled' : ''
        var previous = '<li class="page-item ' + disableP + ' "><span class="page-link">Previous</span></li>\n'

        var disableN = pagActual >= totalPag ? 'disabled' : ''
        var next = '<li class="page-item ' + disableN + ' "><a class="page-link" href="#">Next</a></li>'

        var html = ''
        for (let p = 1; p <= totalPag; p++) {
            html = html + '<li class="pag page-item  ' + (p === pagActual ? 'active' : '') + ' " id="pag' + p + '">\n' +
                '<button value="' + p + '" class="page-link">' + p + '</button>\n' + '</li>\n'
        }
        return previous + html + next
    }

    function verPag(p) {$.ajax({
            type: "GET",
            url: "https://pokeapi.co/api/v2/region/" + idRegion,
            success: function (response) {
                var totalElem = response.locations.length;
                var totalPag = Math.ceil(totalElem / elemPorPag);

                $.each(response.locations, function (key, value) {
                    var item = key + 1
                    if ((p - 1) * 10 + 1 <= item && item <= 10*p) {
                        listaLocacion.push(value);
                    }
                });

                $.each(listaLocacion, function (key, value) {
                    locacion = locacion + genLocacion(key + 1, value.name, value.url);
                });
                $('#tablaLocaciones').html(locacion);
                $('#labelRegion').html('Región ' + response.name);

                $("#paginador").html(genPaginador(pagActual, totalPag))
            },
            error: function (ex) {
                console.log(ex);
            }
        });

    }


});
