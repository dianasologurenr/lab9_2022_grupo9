$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');

    let locaciones = [];
    var elemPorPag = 10;
    var pagActual = 1;

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/region/" + idRegion,
        success: function (response) {
            var totalElem = response.locations.length;
            var totalPag = Math.ceil(totalElem / elemPorPag);

            // region
            $('#labelRegion').html('Región ' + response.name);

            // lista de locaciones
            $.each(response.locations, function (key, value) {
                locaciones.push(value)
            });

            // inicializamos
            verPag(pagActual, totalPag)
            $("#paginador").html(genPaginador(pagActual, totalPag))

            // acciones
            $(".pag").on("click", "button", function () {
                verPag($(this).val(), totalPag)
            })
            $("#next").on("click", "button", function () {
                var next = Number(pagActual) + 1
                verPag(next, totalPag)
            })
            $("#previous").on("click", "button", function () {
                var previous = Number(pagActual) - 1
                verPag(previous, totalPag)
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
        // pagina anterior
        var disableP = pagActual <= 1 ? 'disabled' : ''
        var previous = '<li id="previous" class="page-item ' + disableP + ' "><button class="page-link">Previous</button></li>\n'

        // pagina siguiente
        var disableN = pagActual >= totalPag ? 'disabled' : ''
        var next = '<li id="next" class="page-item ' + disableN + ' "><button class="page-link">Next</button></li>'

        // locaciones
        var html = ''
        for (let p = 1; p <= totalPag; p++) {
            html = html + '<li class="pag page-item  ' + (p === pagActual ? 'active' : '') + ' " id="pag' + p + '">\n' +
                '<button value="' + p + '" class="page-link">' + p + '</button>\n' + '</li>\n'
        }
        return previous + html + next
    }

    function verPag(p, totalPag) {
        console.log(p)
        // removemos estilos
        $("#pag" + pagActual).removeClass("active")
        // actualizamos pagina
        pagActual = (p>totalPag || p < 1)? 1 : p
        console.log(pagActual)
        // agregamos estilos
        $("#pag" + pagActual).addClass("active")

        // estilos de previous y next
        $("#previous").addClass(pagActual <= 1 ? 'disabled' : '')
        $("#previous").removeClass(pagActual > 1 ? 'disabled' : '')
        $("#next").addClass(pagActual >= totalPag ? 'disabled' : '')
        $("#next").removeClass(pagActual < totalPag ? 'disabled' : '')

        // locaciones
        let locacionHtml = "";
        $.each(locaciones, function (key, value) {
            var item = key + 1
            if ((pagActual - 1) * 10 + 1 <= item && item <= 10 * pagActual) {
                locacionHtml = locacionHtml + genLocacion(item, value.name, value.url);
            }
        });
        $('#tablaLocaciones').html(locacionHtml);
    }
});
