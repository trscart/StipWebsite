//loading animation
if (sessionStorage.getItem('dontLoad') == null) { // do loading animation only one time 
    $(".stip-loading").delay(3000).animate({ 'opacity': '0' }, 500)
    setTimeout(function () { $(".stip-loading").addClass('z-index-low') }, 3500);
    sessionStorage.setItem('dontLoad', 'true');
} else {
    $(".stip-loading").hide()
}

$(document).ready(function () {

    // change menu icon color in blog section
    if ($(location).attr('href').includes("blog")) {
        $(".line").css("background-color", "#4384f1")
    }

    if ($(location).attr('href').includes("contacts")) {
        $('.stip-navDesktop').css("background-color", "white")
        $('.stip-navDesktop').css("padding", "0.5em 10em")
        $('.stip-navDesktop').css("box-shadow", "0 0rem 1rem rgba(0,0,0,.175)")
        $('.logo').attr("src", "src/img/logoColor.svg")
        $(".stip-navDesktopItem").css("color", "#4384f1")
        $(".stip-languageDrop").css("color", "#4384f1")
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() > $("#stip-scrollDetect").offset().top) { // nav-item change on scroll
            $('.stip-navDesktop').css("background-color", "white")
            $('.stip-navDesktop').css("padding", "0 10em")
            $('.stip-navDesktop').css("box-shadow", "0 0rem 1rem rgba(0,0,0,.175)")
            $('.logo').attr("src", "src/img/logoColor.svg")
            $(".stip-navDesktopItem").css("color", "#4384f1")
            $(".stip-languageDrop").css("color", "#4384f1")

            $('.stip-menuIcon').addClass('stip-menuIconScrolled');
            if ($(location).attr('href').includes("blog")) {
                $(".line").css("background-color", "#ffffff")
            }
        } else if (!$(location).attr('href').includes("contacts")) {
            $('.stip-navDesktop').css("background-color", "transparent")
            $('.stip-navDesktop').css("padding", "2.5em 10em")
            $('.stip-navDesktop').css("box-shadow", "none")
            $('.logo').attr("src", "src/img/logoWhite.svg")
            $(".stip-navDesktopItem").css("color", "#ffffff")
            $(".stip-languageDrop").css("color", "#ffffff")

            $('.stip-menuIcon').removeClass('stip-menuIconScrolled');
            if ($(location).attr('href').includes("blog")) {
                $(".line").css("background-color", "#4384f1")
            }
        }

        $('.stip-hideMe').each(function (i) { // appear effect on scroll
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

    $(".dropdown-menu li a").click(function () {
        $(".stip-languageDrop:first-child").html($(this).text() + ' <span class="caret"></span>');
    });

    $(".stip-demoRequest").click(function () { // append demo section
        let source
        if (sessionStorage.getItem('language') == "en-EN") { // source en-EN demo section
            source = document.getElementById("stip-demoSection-en").innerHTML;
        } else { // source it-IT demo section
            source = document.getElementById("stip-demoSection-it").innerHTML;
        }
        let template = Handlebars.compile(source);
        $('body').append(template)

        $('body').css("overflow", "hidden")

        // ajax call for demo request
        $("#stip-demoSend").click(function () {
            if ($('#stip-firstName-demo').val() && $('#stip-lastName-demo').val() && $('#stip-email-demo').val()) {
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

                            // append thank you message
                            let context
                            if (sessionStorage.getItem('language') == "en-EN") {
                                context = { thanksTitle: "Thank you for writing us!", thanksSubtitle: "We will contact you as soon as possible." };
                            } else {
                                context = { thanksTitle: "Grazie per averci scritto!", thanksSubtitle: "Ti contatteremo al più presto." };
                            }
                            let source = document.getElementById("stip-thanks").innerHTML;
                            let template = Handlebars.compile(source);
                            $('body').append(template(context))

                            $(".stip-closeReprompt").click(function () {
                                $(".stip-reprompt-container").css("display", "none")
                            })

                            $('.stip-messageSend').css("background-color", "#16B72E")
                            $('.stip-messageSend').css("color", "white")
                            if (sessionStorage.getItem('language') == "en-EN") {
                                $('.stip-messageSend').text("Sent");
                            } else {
                                $('.stip-messageSend').text("Inviata");
                            }
                            setTimeout(function () {
                                $('.stip-messageSend').css("background-color", "#f8f9fa")
                                $('.stip-messageSend').css("color", "black")
                                if (sessionStorage.getItem('language') == "en-EN") {
                                    $('.stip-messageSend').text("Demo request");
                                } else {
                                    $('.stip-messageSend').text("Richiedi demo");
                                }
                            }, 1300);
                        }
                    })
                    .catch(function (err) { //if error
                        $('.stip-messageSend').css("background-color", "#FF2828")
                        $('.stip-messageSend').css("color", "white")
                        if (sessionStorage.getItem('language') == "en-EN") {
                            $('.stip-messageSend').text("Error, try again");
                        } else {
                            $('.stip-messageSend').text("Errore, riprova");
                        }
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            if (sessionStorage.getItem('language') == "en-EN") {
                                $('.stip-messageSend').text("Demo request");
                            } else {
                                $('.stip-messageSend').text("Richiedi demo");
                            }
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
        if ($('#stip-fullName-contact').val() && $('#stip-email-contact').val()) {
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

                        // append thank you message
                        let context
                        if (sessionStorage.getItem('language') == "en-EN") {
                            context = { thanksTitle: "Thank you for writing us!", thanksSubtitle: "We will contact you as soon as possible." };
                        } else {
                            context = { thanksTitle: "Grazie per averci scritto!", thanksSubtitle: "Ti contatteremo al più presto." };
                        }
                        let source = document.getElementById("stip-thanks").innerHTML;
                        let template = Handlebars.compile(source);
                        $('body').append(template(context))

                        $(".stip-closeReprompt").click(function () {
                            $(".stip-reprompt-container").css("display", "none")
                        })

                        $('.stip-messageSend').css("background-color", "#16B72E")
                        $('.stip-messageSend').css("color", "white")
                        if (sessionStorage.getItem('language') == "en-EN") {
                            $('.stip-messageSend').text("Message sent");
                        } else {
                            $('.stip-messageSend').text("Messaggio inviato");
                        }
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            if (sessionStorage.getItem('language') == "en-EN") {
                                $('.stip-messageSend').text("Send");
                            } else {
                                $('.stip-messageSend').text("Invia");
                            }
                        }, 1300);
                    }
                })
                .catch(function (err) { //if error
                    $('.stip-messageSend').css("background-color", "#FF2828")
                    $('.stip-messageSend').css("color", "white")
                    if (sessionStorage.getItem('language') == "en-EN") {
                        $('.stip-messageSend').text("Error, try again");
                    } else {
                        $('.stip-messageSend').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        $('.stip-messageSend').css("background-color", "#f8f9fa")
                        $('.stip-messageSend').css("color", "black")
                        if (sessionStorage.getItem('language') == "en-EN") {
                            $('.stip-messageSend').text("Send");
                        } else {
                            $('.stip-messageSend').text("Invia");
                        }
                    }, 1300);
                })

        } else {
            $('.stip-inputRequired').css("border-color", "#FF2828")
            $('.stip-labelRequired').css("color", "#FF2828")
        }
    });

    $(".stip-emailSectionBtn").click(function () {
        // append thank you message
        let context
        if (sessionStorage.getItem('language') == "en-EN") {
            context = { thanksTitle: "Thank you for writing us!", thanksSubtitle: "We will contact you as soon as possible." };
        } else {
            context = { thanksTitle: "Grazie per averci scritto!", thanksSubtitle: "Ti contatteremo al più presto." };
        }
        let source = document.getElementById("stip-thanks").innerHTML;
        let template = Handlebars.compile(source);
        $('body').append(template(context))

        $(".stip-closeReprompt").click(function () {
            $(".stip-reprompt-container").css("display", "none")
        })
    })

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
                scrollTop: $(e.target.attributes[0].nodeValue).offset().top - $(".stip-sectionTitle").height()
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
            let context
            if (sessionStorage.getItem('language') == "en-EN") {
                context = { popupTitle: "Want to improve your customers' CX?", popupSubtitle: "Improve your Social & Email Customer Care with Stip! Write here your email and you will get our information material in a jiffy!", popupBtn: "Send", emailPlaceholder: "Corporate email" };
            } else {
                context = { popupTitle: "Vuoi migliorare la CX dei tuoi clienti?", popupSubtitle: "Migliora il tuo Social ed Email Customer Care con Stip! Lasciaci la tua mail e ti invieremo il nostro materiale informativo.", popupBtn: "Invia", emailPlaceholder: "Email aziendale" };
            }
            let source = document.getElementById("stip-popup").innerHTML;
            let template = Handlebars.compile(source);
            $('body').append(template(context))

            $(".stip-closeReprompt").click(function () {
                $(".stip-reprompt-container").css("display", "none")
            })

            $(".stip-emailSectionBtn").click(function () {
                $(".stip-reprompt-container").css("display", "none")
                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN") {
                    context = { thanksTitle: "Thank you for writing us!", thanksSubtitle: "We will contact you as soon as possible." };
                } else {
                    context = { thanksTitle: "Grazie per averci scritto!", thanksSubtitle: "Ti contatteremo al più presto." };
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    $(".stip-reprompt-container").css("display", "none")
                })
            })
        }, 210000);
    }

    // maps
    if ($(location).attr('href').includes("contacts")) {
        var place
        var contentString
        if (sessionStorage.getItem('language') != "it-IT" && sessionStorage.getItem('language') != null) {
            place = { lat: 37.870171, lng: -122.268624 };
            contentString = '<div id="content">' +
                '<h1 class="stip-h3">Skydeck Berkley</h1>' +
                '<p class="stip-txt">2150 Shattuck Ave, Berkley, CA 94704, USA</p>' +
                '</div>';
        } else {
            place = { lat: 41.901610, lng: 12.503200 };
            contentString = '<div id="content">' +
                '<h1 class="stip-h3">HUB LVenture Group e LUISS EnLabs</h1>' +
                '<p class="stip-txt">Roma Termini, Via Marsala 29H, Roma, RM 00185, ITALY</p>' +
                '</div>';
        }
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 15, center: place });
        var marker = new google.maps.Marker({ position: place, map: map });
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }
});