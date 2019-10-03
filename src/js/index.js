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

    $(".stip-file-support").change(function (e) {
        console.log(e)
    });

    // append option in support selects
    if ($(location).attr('href').includes("support")) {
        fetch('https://stipworld.com/api/sectionchoices/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) {
                res.json().then(function (data) {
                    //console.log(data)
                    data.forEach(element => {
                        $(".stip-section-support").append("<option value=" + element[0] + ">" + element[1] + "</option>");
                    });
                })
            })
            .catch(function (err) { //if error
                console.log(err)
            })

        fetch('https://stipworld.com/api/categorychoices/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) {
                res.json().then(function (data) {
                    //console.log(data)
                    data.forEach(element => {
                        $(".stip-category-support").append("<option value=" + element[0] + ">" + element[1] + "</option>");
                    });
                })
            })
            .catch(function (err) { //if error
                console.log(err)
            })
    }

    /* roi calculation
    $(".costReduction-txt").text(-3.33 * $("#volumeSlider").val() + "€")
    $(".timeReduction-txt").text(0.8 * $("#priceSlider").val() + "h")
    $("#volumeSlider").change(function () {
        $(".costReduction-txt").text(-3.33 * $("#volumeSlider").val() + "€")
    });
    $("#priceSlider").change(function () {
        $(".timeReduction-txt").text(0.8 * $("#priceSlider").val() + "h")
    });*/

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
        if ($(window).scrollTop() > 0 && !$(location).attr('href').includes("contacts") && !$(location).attr('href').includes("blog")) { // nav-item change on scroll
            $('.stip-nav').css("padding", "0 5em")
            $('.stip-nav').css("background-color", "white")
            $('.stip-nav').css("box-shadow", "0 0rem 1rem rgba(0,0,0,0.1)")
            $(".stip-languageDrop").css("color", "#4384f1")
        }
        else if (!$(location).attr('href').includes("contacts") && !$(location).attr('href').includes("blog")) {
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
    fetch('https://stip.io/blog/api/articles/latests/', {
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
                    $(".stip-footerBlog").append("<a href='https://stip.io/blog/" + data[i].slug + "' title='blog' class='stip-txt'>" + data[i].draft_title.split(' ').slice(0, 6).join(' ').concat(" ...") + "</a>");
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
        $("#stip-demo-form").submit(function (e) {
            e.preventDefault()
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
                            context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                        } else {
                            context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
                        }
                        let source = document.getElementById("stip-thanks").innerHTML;
                        let template = Handlebars.compile(source);
                        $('body').append(template(context))

                        $(".stip-closeReprompt").click(function () {
                            $(".stip-reprompt-container").css("display", "none")
                            $("#stip-demo-form")[0].reset()
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
        });

        $(".stip-demoCloseIcon").click(function (e) {
            e.preventDefault()
            $('body').css("overflow", "auto")
            $(".stip-demoContainer").remove();
        })
    }

    // validate email
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // demo page steps and request
    $("#stip-demo-secondForm").hide()
    $("#stip-demo-lastForm").hide()
    $("#stip-demo-next").click(function () {
        if (validateEmail($("#stip-email-demo").val())) {
            $("#stip-demo-firstForm").hide()
            $("#stip-demo-secondForm").show()
            $(".stip-demoHero").css("background-image", "url('./src/img/demoBG_2.png')")
        }
        else {
            $("#stip-email-demo").css("border-color", "#ff6161")
        }
    })
    // ajax call for demo request
    $("#stip-demo-form").submit(function (e) {
        e.preventDefault()
        $("#stip-demo-secondForm").hide()
        $("#stip-demo-lastForm").show()
        $(".stip-demoHero").css("background-image", "url('./src/img/checkIllustration.png')")
        if ($(window).width() < 576) {
            console.log("eo")
            $(".stip-demoHero").css("background-size", "contain")
        }
        let data = {
            "firstname": $('#stip-firstName-demo').val(),
            "lastname": $('#stip-lastName-demo').val(),
            "email": $('#stip-email-demo').val(),
            "phone": $('#stip-phone-demo').val(),
            "company_name": $('#stip-companyName-demo').val(),
            "company_num": $('.stip-companyNum-demo').val(),
            "captcha": "..."
        }
        console.log(data)
        /*
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
                        context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                    } else {
                        context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
                    }
                    let source = document.getElementById("stip-thanks").innerHTML;
                    let template = Handlebars.compile(source);
                    $('body').append(template(context))

                    $(".stip-closeReprompt").click(function () {
                        $(".stip-reprompt-container").css("display", "none")
                        $("#stip-demo-form")[0].reset()
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
            })*/
    });

    if ($(location).attr('href').includes("#demo-request")) {
        demoCall()
    }

    // ajax call for demo request
    $(".stip-demoRequest").click(function () { // append demo section
        document.location.href = "#demo-request"
        location.reload();
        demoCall()
    })

    // ajax call for contact request
    $("#stip-contact-form").submit(function (e) {
        e.preventDefault()
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
                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                } else {
                    context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    $(".stip-reprompt-container").css("display", "none")
                    $("#stip-contact-form")[0].reset()
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
    });

    // lock scroll when there is a touch event on roi sliders
    $("#priceSlider").on('touchstart', function () {
        $('body').css("overflow-y", "hidden")
    });
    $("#volumeSlider").on('touchstart', function () {
        $('body').css("overflow-y", "hidden")
    });

    // ajax call for quote request
    $(".stip-requestQuoteBtn").click(function () {
        if ($('#stip-email-quote').val()) {
            $('.stip-inputRequired').css("border-color", "#ced4da")

            let data = {
                "email": $('#stip-email-quote').val(),
                "volume": $('#volumeSlider').val(),
                "price": $('#priceSlider').val(),
            }
            console.log($('#stip-email-quote').val() + " " + $('#volumeSlider').val() + " " + $('#priceSlider').val())
            /*fetch('', {
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
                            context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                        } else {
                            context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
                        }
                        let source = document.getElementById("stip-thanks").innerHTML;
                        let template = Handlebars.compile(source);
                        $('body').append(template(context))

                        $(".stip-closeReprompt").click(function () {
                            $(".stip-reprompt-container").css("display", "none")
                            $('#stip-email-quote').val("")
                        })
                    }
                })
                .catch(function (err) { //if error
                    //console.log(err)
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('.stip-requestQuoteBtn').text("Error, try again");
                    } else {
                        $('.stip-requestQuoteBtn').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('.stip-requestQuoteBtn').text("Quote request");
                        } else {
                            $('.stip-requestQuoteBtn').text("Richiedi preventivo");
                        }
                    }, 1300);
                })*/

        } else {
            $('.stip-inputRequired').css("border-color", "#FF2828")
        }
    })

    // ajax call for email newsletter
    $("#stip-email-form").submit(function (e) {
        e.preventDefault()
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

                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                } else {
                    context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    $(".stip-reprompt-container").css("display", "none")
                    $("#stip-email-form")[0].reset()
                })
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
    })

    // ajax call for support request
    $("#stip-support-form").submit(function (e) {
        e.preventDefault()
        let data = {
            "name": $('#stip-name-support').val(),
            "email": $('#stip-email-support').val(),
            "domain_app": $('#stip-domain-support').val(),
            "section": $('.stip-section-support').val(),
            "category": $('.stip-category-support').val(),
            /*"file": $(".stip-file-support").val(),*/
            "description": $('.stip-description-support').val()
        }

        fetch('https://stipworld.com/api/alertdown/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) {
                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    context = { thanksTitle: "Thank you for filling our form!" };
                } else {
                    context = { thanksTitle: "Grazie per aver compilato il form!" };
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    $(".stip-reprompt-container").css("display", "none")
                    $("#stip-support-form")[0].reset()
                })
            })
            .catch(function (err) { //if error
                //console.log(err)
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    $('.stip-support-send').text("Error, try again");
                } else {
                    $('.stip-support-send').text("Errore, riprova");
                }
                setTimeout(function () {
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('.stip-support-send').text("Send");
                    } else {
                        $('.stip-support-send').text("Invia");
                    }
                }, 1300);
            })
    })

    // category dropdown
    $(".stip-categoryDropItem").click(function () {
        $("#stip-categoryDrop").html($(this).text());
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
                    context = { thanksTitle: "Thank you for filling our form!", thanksSubtitle: "We will contact you as soon as possible at the email address you indicated. Best!" };
                } else {
                    context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto all'indirizzo email che hai indicato. Ciao!" };
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
        let placeEn = { lat: 37.870171, lng: -122.268624 };
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
        });

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

    if (!$(location).attr('href').includes("contacts") && !$(location).attr('href').includes("privacy-policy") && !$(location).attr('href').includes("support") && !$(location).attr('href').includes("demo")) {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            disable: false,
            once: true
        });
    }
});