//loading animation
$(".stip-loading").delay(3000).animate({ 'opacity': '0' }, 500)
setTimeout(function () { $(".stip-loading").addClass('z-index-low') }, 3500);

/*console.log(Cookies.get())

console.log(window.location.href.indexOf("index"))

if (window.location.href.indexOf("index") <= -1) {
    Cookies.set('loadingAnimation', 1);
    if (Cookies.get('loadingAnimation')) {
        $(".stip-loading").remove()
    }
}

console.log(Cookies.get())*/

$(document).ready(function () {

    // change menu icon color in blog section
    if ($(location).attr('href').includes("blog")) {
        $(".line").css("background-color", "#4384f1")
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > $("#stip-scrollDetect").offset().top) { // nav-item change on scroll
            $('.stip-menuIcon').addClass('stip-menuIconScrolled');
            if ($(location).attr('href').includes("blog")) {
                $(".line").css("background-color", "#ffffff")
            }
        } else {
            $('.stip-menuIcon').removeClass('stip-menuIconScrolled');
            if ($(location).attr('href').includes("blog")) {
                $(".line").css("background-color", "#4384f1")
            }
        }

        $('.stip-hideMe').each(function (i) { // appear effect on scrool
            if ($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight() - 30) {
                $(this).animate({ 'opacity': '1' }, 500);
            }
        });
    });

    $(".stip-menuIcon").click(function (e) { //hambuger icon animation
        e.preventDefault();
        $(".stip-hamburgerIcon").toggleClass('active');
        $(".stip-navModal").toggleClass('stip-navModalAppear')
        $('body').toggleClass('overflow-body');
        if ($(window).scrollTop() > $("#stip-scrollDetect").offset().top) {
            $('.stip-menuIcon').toggleClass('stip-menuIconScrolled');
        }
    });

    $(".stip-demoRequest").click(function () { // append demo section
        var source = document.getElementById("stip-demoSection").innerHTML;
        var template = Handlebars.compile(source);
        $('body').append(template(template))

        $('body').css("overflow", "hidden")

        // ajax call for demo request
        $("#stip-demoSend").click(function () {
            if ($('#stip-phone-demo').val() && $('#stip-email-demo').val()) {
                console.log("here")
                $('.stip-inputRequired').css("border-color", "transparent")
                $('.stip-labelRequired').css("color", "white")

                let data = {
                    "company_name": $('#stip-companyName-demo').val(),
                    "firstname": $('#stip-firstName-demo').val(),
                    "lastname": $('#stip-lastName-demo').val(),
                    "phone": $('#stip-phone-demo').val(),
                    "email": $('#stip-email-demo').val(),
                    "captcha": "..."
                }
                fetch('https://stip.io/app/stip_rest/api/company/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(function (res) {
                        if (res.status == 201) { //if status 201
                            $('.stip-messageSend').css("background-color", "#16B72E")
                            $('.stip-messageSend').css("color", "white")
                            $('.stip-messageSend').text("Messaggio inviato");
                            setTimeout(function () {
                                $('.stip-messageSend').css("background-color", "#f8f9fa")
                                $('.stip-messageSend').css("color", "black")
                                $('.stip-messageSend').text("Invia");
                            }, 1300);
                        }
                    })
                    .catch(function (err) { //if error
                        $('.stip-messageSend').css("background-color", "#FF2828")
                        $('.stip-messageSend').css("color", "white")
                        $('.stip-messageSend').text("Errore, riprova");
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            $('.stip-messageSend').text("Invia");
                        }, 1300);
                    })

            } else {
                $('.stip-inputRequired').css("border-color", "#FF2828")
                $('.stip-labelRequired').css("color", "#FF2828")
            }
        });

        $(".stip-demoCloseIcon").click(function (e) {
            e.preventDefault()
            $('body').css("overflow", "auto")
            $(".stip-demoContainer").remove();
        })
    })

    // ajax call for contact request
    $("#stip-contactUs").click(function () {
        if ($('#stip-fullName-contact').val() && $('#stip-email-contact').val() && $('#stip-msg-contact').val()) {
            console.log("here")
            $('.stip-inputRequired').css("border-color", "transparent")
            $('.stip-labelRequired').css("color", "white")

            let data = {
                "fullname": $('#stip-fullName-contact').val(),
                "phone": $('#stip-phone-contact').val(),
                "email": $('#stip-email-contact').val(),
                "question": $('#stip-msg-contact').val(),
                "captcha": "..."
            }
            fetch('https://stip.io/app/stip_rest/api/companyQuestion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(function (res) {
                    if (res.status == 201) { //if status 201
                        $('.stip-messageSend').css("background-color", "#16B72E")
                        $('.stip-messageSend').css("color", "white")
                        $('.stip-messageSend').text("Messaggio inviato");
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            $('.stip-messageSend').text("Invia");
                        }, 1300);
                    }
                })
                .catch(function (err) { //if error
                    $('.stip-messageSend').css("background-color", "#FF2828")
                    $('.stip-messageSend').css("color", "white")
                    $('.stip-messageSend').text("Errore, riprova");
                    setTimeout(function () {
                        $('.stip-messageSend').css("background-color", "#f8f9fa")
                        $('.stip-messageSend').css("color", "black")
                        $('.stip-messageSend').text("Invia");
                    }, 1300);
                })

        } else {
            $('.stip-inputRequired').css("border-color", "#FF2828")
            $('.stip-labelRequired').css("color", "#FF2828")
        }
    });

    anime({
        targets: '.stip-loadLogo',
        scale: ["1", "1.05", "1"],
        easing: 'easeInOutQuint',
        loop: true,
        duration: 1800
    });

    anime({
        targets: '.stip-rect',
        scaleY: ["1", "0.7", "1.05", "1"],
        easing: 'easeInOutQuint',
        loop: true,
        delay: 300,
        duration: 1500
    });

    anime({
        targets: '.stip-spunta',
        scale: ["1", "0.7", "1"],
        fill: ["#4384f1", "#FD6B15", "#4384f1"],
        rotateY: ["0", "360"],
        easing: 'easeInOutExpo',
        loop: true,
        delay: 600,
        duration: 1200
    })

    // blog card compile PROVA
    $("#prova").click(function () {
        var context = { cardTitle: "Title", cardTxt: "Lorem Ipsum" };
        var source = document.getElementById("stip-blogCard").innerHTML;
        var template = Handlebars.compile(source);
        for (let index = 0; index < 3; index++) {
            $('#stip-blogCards').append(template(context))

        }
    })

    $("#stip-loadMore").click(function () {
        var context = { cardTitle: "Title", cardTxt: "Lorem Ipsum" };
        var source = document.getElementById("stip-blogCard").innerHTML;
        var template = Handlebars.compile(source);
        for (let index = 0; index < 3; index++) {
            $('#stip-blogCards').append(template(context))
        }
        /*$('html,body').animate({
            scrollTop: $("#stip-blogCards").offset().top + $("#stip-blogCards").outerHeight()
        },
            1500);*/
    })

    // footer scroll to section animation
    $(".stip-linkToSection").click(function (e) {
        if ($(location).attr('href').includes(e.currentTarget.pathname)) { // scroll animation if section is on page
            $('html,body').animate({
                scrollTop: $(e.target.attributes[0].nodeValue).offset().top
            },
                1000);
        }
    })


    // hashtag button append
    let hashtag = ["#CustomerCare", "#CustomerSuccess", "#AssistenzaClienti", "#CustomerSatisfaction", "#IntelligenzaArtificiale", "#DeepLearning", "#SocialCustomerCare", "#CRM", "#IA"]
    hashtag.forEach(function (item, index) {
        $('#stip-hashtag').append("<button type='button' class='btn btn-outline-primary m-2 stip-txt'>" + item + "</button>")
    })

    if ($(location).attr('href').includes("platform.html")) { //reprompt demo request after 3 min in platform page
        setTimeout(function () {
            $(
                [
                    '<div class="container-fluid text-center h-100 fixed-top stip-reprompt-container">',
                    '<div class="row flex-grow-1">',
                    '<div class="col">',
                    '<div class="card stip-reprompt">',
                    '<div class="card-body">',
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="stip-closeReprompt">',
                    '<span aria-hidden="true">&times;</span>',
                    '</button>',
                    '<h1 class="stip-h1">Vuoi migliorare la CX dei tuoi clienti?</h1>',
                    '<h2 class="stip-h3">Migliora il tuo Social ed Email Customer Care con Stip! Lasciaci la tua mail e ti invieremo il nostro materiale informativo.</h2>',
                    '<div class="input-group mt-4">',
                    '<input type="text" class="form-control stip-txt" placeholder="Email aziendale" aria-label="Email aziendale" aria-describedby="button-addon2">',
                    '<div class="input-group-append">',
                    '<button class="btn btn-outline-secondary stip-emailSectionBtn" type="button" id="button-addon2">Invia</button>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join("\n")
            ).appendTo($("body"));

            $("#stip-closeReprompt").click(function () {
                console.log("here")
                $(".stip-reprompt-container").css("display", "none")
            })
        }, 180000);
    }

    // maps
    var place = { lat: 41.901610, lng: 12.503200 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 15, center: place });
    var marker = new google.maps.Marker({ position: place, map: map });
    var contentString = '<div id="content">' +
        '<h1 class="stip-h3">HUB LVenture Group e LUISS EnLabs</h1>' +
        '<p class="stip-txt">Roma Termini, Via Marsala, 29/h, 00185 Roma RM</p>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
});


// clear coockie on unload
$(window).on("unload", function (e) {
    Cookies.remove('loadingAnimation');
});
