/*loading animation
if (sessionStorage.getItem('dontLoad') == null) { // do loading animation only one time 
    $(".stip-loading").delay(3000).animate({ 'opacity': '0' }, 500)
    setTimeout(function () { $(".stip-loading").addClass('z-index-low') }, 3500);
    sessionStorage.setItem('dontLoad', 'true');
} else {
    $(".stip-loading").hide()
}

anime({
    targets: '.stip-loadLogo',
    scale: ["0.6", "0.65", "0.6"],
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
    fill: ["#399fad", "#ff6161", "#399fad"],
    rotateY: ["0", "360"],
    easing: 'easeInOutExpo',
    loop: true,
    delay: 600,
    duration: 1200
})*/


$(document).ready(function () {
    console.log("here!")

    // general css change
    if ($(location).attr('href').includes("contacts")) {
        $('.stip-nav').css("padding", "0 5em")
        $('.stip-nav').css("box-shadow", "0 0rem 1rem rgba(0,0,0,0.1)")
    }
    if ($(location).attr('href').includes("contacts")) {
        $('.stip-nav').css("position", "relative")
    }
    $("#navBtn").click(function () {
        if ($(window).scrollTop() == 0 && $(window).width() <= 576) {
            $('.stip-nav').toggleClass("stip-shadow")
            $('.stip-nav').css("background-color", "white")
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$(location).attr('href').includes("contact")) { // nav-item change on scroll
            $('.stip-nav').css("padding", "0 5em")
            $('.stip-nav').css("background-color", "white")
            $('.stip-nav').css("box-shadow", "0 0rem 1rem rgba(0,0,0,0.1)")
            $(".stip-languageDrop").css("color", "#4384f1")
        }
        else if ($(location).attr('href').includes("index")) {
            $('.stip-nav').css("padding", "2em 5em")
            $('.stip-nav').css("background-color", "transparent")
            $('.stip-nav').css("box-shadow", "none")
            $(".stip-languageDrop").css("color", "#ffffff")
        }
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && $(window).width() > 767 && $(location).attr('href').includes("blog")) { // double nav animation
            $('.stip-navs').css("top", -$('.stip-nav').outerHeight())
            $('.stip-navs').css("background-color", "white")
        }
        else if ($(window).scrollTop() > 0 && $(window).width() < 767) {
            $('.stip-navs').css("top", 0)
            $('.stip-navs').css("background-color", "white")
            $('.stip-nav').css("padding", "0 5em")
        }
        else if ($(window).width() > 767 && !$(location).attr('href').includes("contacts")) {
            $('.stip-navs').css("top", 0)
        }
    });

    // get latest articles and append them on footer
    fetch('https://blog.stip.io/api/articles/latests/', {
        mode: "cors",
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(function (res) {
            res.json().then(function (data) {
                //console.log(data)
                for (let i = 0; i < 3; i++) {
                    $(".stip-footerBlog").append("<a href='https://blog.stip.io/" + data[i].slug + "' title='blog' class='stip-txt'>" + data[i].draft_title.split(' ').slice(0,6).join(' ').concat(" ...")  + "</a>");
                }
            })
        })
        .catch(function (err) { //if error
            //console.log(err)
        })

    $(".dropdown-menu li a").click(function () {
        $(".stip-languageDrop:first-child").html($(this).text() + ' <span class="caret"></span>');
    });

    // stip policy language
    $("#stip-policy").click(function () {
        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
            $(this).attr("href", "./privacy-policy-en.html");
        } else {
            $(this).attr("href", "./privacy-policy.html");
        }
    });

    // card append
    $("#stip-loadMore").click(function () {
        var context = { cardTitle: "Title", cardTxt: "Lorem Ipsum", cardDate: "xx/yy/zzzz", cardCategory: $("#stip-categoryDrop").html() };
        var source = document.getElementById("stip-blogCard").innerHTML;
        var template = Handlebars.compile(source);
        for (let index = 0; index < 3; index++) {
            $('#stip-blogCards').append(template(context))
        }
        if ($('.stip-blogCard').length == 6) {
            /*
            // cta append
            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                var context = { ctaTitle: "Full efficiency with zero effort. That is your Customer Care with Stip", ctaDemoBtn: "Demo request", ctaContactBtn: "Contact us" };
            } else {
                var context = { ctaTitle: "Assicurati un Customer Care al massimo dell'efficienza, con il minimo sforzo", ctaDemoBtn: "Richiedi demo", ctaContactBtn: "Contattaci" };
            }
            var source = document.getElementById("stip-blogCta").innerHTML;
            var template = Handlebars.compile(source);
            $('#stip-blogCards').append(template(context))
            // ajax call for demo request
            $(".stip-demoRequest").click(function () { // append demo section
                demoCall()
            })*/
        }
    })

    let demoCall = function () {
        let source
        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) { // source en-EN demo section
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
                    "company_name": "",
                    "firstname": $('#stip-firstName-demo').val(),
                    "lastname": $('#stip-lastName-demo').val(),
                    "phone": $('#stip-phone-demo').val(),
                    "email": $('#stip-email-demo').val(),
                    "captcha": "..."
                }
                // process animation
                $("#stip-demoSend").text("")
                $("#stip-demoSend").append("<img style='width: 2em' src='src/img/loading.gif'>");
                // fetch call
                fetch('https://stipworld.com/api/companyDemoRequest/', {
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
                            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                                $('.stip-messageSend').text("Sent");
                            } else {
                                $('.stip-messageSend').text("Inviata");
                            }
                            setTimeout(function () {
                                $('.stip-messageSend').css("background-color", "#f8f9fa")
                                $('.stip-messageSend').css("color", "black")
                                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('.stip-messageSend').text("Error, try again");
                        } else {
                            $('.stip-messageSend').text("Errore, riprova");
                        }
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
    }

    // ajax call for demo request
    $(".stip-demoRequest").click(function () { // append demo section
        demoCall()
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
            // process animation
            $("#stip-contactUs").text("")
            $("#stip-contactUs").append("<img style='width: 2em' src='src/img/loading.gif'>");
            // fetch call
            fetch('https://stipworld.com/api/companyQuestion/', {
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
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('.stip-messageSend').text("Message sent");
                        } else {
                            $('.stip-messageSend').text("Messaggio inviato");
                        }
                        setTimeout(function () {
                            $('.stip-messageSend').css("background-color", "#f8f9fa")
                            $('.stip-messageSend').css("color", "black")
                            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('.stip-messageSend').text("Error, try again");
                    } else {
                        $('.stip-messageSend').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        $('.stip-messageSend').css("background-color", "#f8f9fa")
                        $('.stip-messageSend').css("color", "black")
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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

    // ajax call for email newsletter
    $(".stip-emailSectionBtn").click(function () {
        if ($('#stip-email-newsletter').val()) {
            $('.stip-inputRequired').css("border-color", "transparent")

            let data = {
                "email": $('#stip-email-newsletter').val(),
            }
            fetch('https://stipworld.com/api/companyNewsletter/', {
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
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                    }
                })
                .catch(function (err) { //if error
                    //console.log(err)
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('.stip-emailSectionBtn').text("Error, try again");
                    } else {
                        $('.stip-emailSectionBtn').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('.stip-emailSectionBtn').text("Send");
                        } else {
                            $('.stip-emailSectionBtn').text("Invia");
                        }
                    }, 1300);
                })

        } else {
            $('.stip-inputRequired').css("border-color", "#FF2828")
        }
    })

    // category dropdown
    $(".stip-categoryDropItem").click(function () {
        $("#stip-categoryDrop").html($(this).text());
    });

    // lang dropdown
    $(".stip-langDropItem").click(function () {
        $("#stip-langDrop").html($(this).text());
    });
    $("#stip-langDrop").click(function () {
        $(this).css("background-color", "transparent")
        $(this).css("color", "#303030")
    });

    // footer scroll to section animation
    $(".stip-linkToSection").click(function (e) {
        if ($(location).attr('href').includes(e.currentTarget.pathname)) { // scroll animation if section is on page
            $('html,body').animate({
                scrollTop: $(e.target.attributes[0].nodeValue).offset().top - $(".stip-sectionTitle").height() - 100
            },
                1000);
        }
    })

    if ($(location).attr('href').includes("platform.html")) { //reprompt demo request after 3 min in platform page
        setTimeout(function () {
            let context
            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
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
        //en map
        /*let placeEn = { lat: 37.870171, lng: -122.268624 };
        let contentStringEn = '<div id="content">' +
            '<h1 class="stip-h3">Skydeck Berkley</h1>' +
            '<p class="stip-txt">2150 Shattuck Ave, Berkley, CA 94704, USA</p>' +
            '</div>';
        var mapEn = new google.maps.Map(
            document.getElementById('mapEn'), { zoom: 15, center: placeEn });
        var markerEn = new google.maps.Marker({ position: placeEn, map: mapEn });
        var infowindowEn = new google.maps.InfoWindow({
            content: contentStringEn
        });
        markerEn.addListener('click', function () {
            infowindowEn.open(mapEn, markerEn);
        });*/

        let placeIt = { lat: 41.901610, lng: 12.503200 };
        let contentStringIt = '<div id="content">' +
            '<h1 class="stip-h3">HUB LVenture Group e LUISS EnLabs</h1>' +
            '<p class="stip-txt">Roma Termini, Via Marsala 29H, Roma, RM 00185, ITALY</p>' +
            '</div>';
        var mapIt = new google.maps.Map(
            document.getElementById('mapIt'), { zoom: 15, center: placeIt });
        var markerIt = new google.maps.Marker({ position: placeIt, map: mapIt });
        var infowindowIt = new google.maps.InfoWindow({
            content: contentStringIt
        });
        markerIt.addListener('click', function () {
            infowindowIt.open(mapIt, markerIt);
        });
    }

    /* analytics, facebook and cookies */
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PJZM6PN')

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-77012119-1');

    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '326854251303193');
    fbq('track', 'PageView');
    /* end analytics, facebook and cookies */

    if (!$(location).attr('href').includes("contacts") && !$(location).attr('href').includes("privacy-policy")) {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            disable: false,
            once: true
        });
    }
});