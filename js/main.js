var APPID = '01fe4e85dada20d976a44fff14f78a6a';	// Your Yahoo Application ID
var DEG = 'c';	// c for celsius, f for fahrenheit

var URL = 'http://api.openweathermap.org/data/2.5/weather';


window.onload = function () {
    var startPos;
    var geoOptions = {
        enableHighAccuracy: true
    }

    var geoSuccess = function (position) {
        startPos = position,
            lat = startPos.coords.latitude,
            lon = startPos.coords.longitude;
        $.getJSON(URL, {lat: lat, lon: lon, appid: APPID, units: 'metric'})
            .done(function (json) {
                buildWeatherWidget(json);
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
    };
    var geoError = function (error) {
        console.log('Error occurred. Error code: ' + error.code);
        switch (error.code) {
            case error.TIMEOUT:
                //showError("A timeout occured! Please try again!");
                break;
            case error.POSITION_UNAVAILABLE:
                //showError('We can\'t detect your location. Sorry!');
                break;
            case error.PERMISSION_DENIED:
                //showError('Please allow geolocation access for this to work.');
                break;
            case error.UNKNOWN_ERROR:
                //showError('An unknown error occured!');
                break;
        }
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    //Latitude: 28.652031 | Longitude: 77.288818

};
function buildWeatherWidget(data) {
    console.log(JSON.stringify(data));
    var iconUrl = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    $('#weather-icon').attr('src', iconUrl);
    $('#temp').html(Math.abs(data.main.temp) + '&deg;C');
    $('#condition').text(data.weather[0].main);
    $('#place').text(data.name);
}


$(function () {
    $('#books-carousel').owlCarousel({
        //center: true,
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoWidth: true,
        lazyLoad: false,
        stagePadding: 100,
        responsive: {
            600: {
                items: 1
            }
        },
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });

    $('#featured-carousel').owlCarousel({
        //center: true,
        items: 4,
        loop: true,
        margin: 15,
        autoplay: true,
        autoWidth: true,
        lazyLoad: false,
        stagePadding: 100,
        responsive: {
            600: {
                items: 1
            }
        },
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });

    $('#news-carousel').owlCarousel({
        //center: true,
        items: 8,
        loop: true,
        margin: 15,
        // autoplay : true,
        autoWidth: true,
        lazyLoad: false,
        stagePadding: 100,
        responsive: {
            600: {
                items: 1
            }
        },
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });
    $('#newspaper-carousel').owlCarousel({
        //center: true,
        items: 8,
        loop: true,
        margin: 15,
        //autoplay : true,
        autoWidth: true,
        stagePadding: 100,
        lazyLoad: false,
        responsive: {
            600: {
                items: 1
            }
        },
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ]
    });


})

function smoothAdd(id, text) {
    var el = $('#' + id);

    var h = el.height();

    el.css({
        height: h,
        overflow: 'hidden'
    });

    var ulPaddingTop = parseInt(el.css('padding-top'));
    var ulPaddingBottom = parseInt(el.css('padding-bottom'));

    el.prepend('<li>' + text + '</li>');

    var first = $('li:first', el);
    var last = $('li:last', el);

    var foh = first.outerHeight();

    var heightDiff = foh - last.outerHeight();

    var oldMarginTop = first.css('margin-top');

    first.css({
        marginTop: 0 - foh,
        position: 'relative',
        top: 0 - ulPaddingTop
    });

    last.css('position', 'relative');

    el.animate({height: h + heightDiff}, 1500)

    first.animate({top: 0}, 250, function () {
        first.animate({marginTop: oldMarginTop}, 1000, function () {
            last.animate({top: ulPaddingBottom}, 250, function () {
                last.remove();

                el.css({
                    height: 'auto',
                    overflow: 'visible'
                });
            });
        });
    });
}


$(function () {
    $("#id_form").submit(function(e){
        var path=$("#id_option").val();
        if(path=="none"){
            console.log("ok");
            $("#id_sub_error").css('display','block');
            e.preventDefault();
            return false;
        }
        $(this).attr('action', path);


    });
});

$(function(){
    $('#events-ticker').totemticker({
        row_height	:	'100px',
        next		:	'#ticker-next',
        previous	:	'#ticker-previous',
        stop		:	'#stop',
        start		:	'#start',
        mousestop	:	true,
    });
    $('#other-ticker').totemticker({
        row_height	:	'100px',
        next		:	'#ticker-next',
        previous	:	'#ticker-previous',
        stop		:	'#stop',
        start		:	'#start',
        mousestop	:	true,
    });
});




