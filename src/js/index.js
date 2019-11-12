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

    // nav changes
    $("#navBtn").click(function () {
        if ($(window).scrollTop() == 0 && $(window).width() <= 576) {
            $('.stip-nav').toggleClass("stip-shadow")
            $('.stip-nav').css("background-color", "white")
        }
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$(location).attr('href').includes("blog")) { // nav-item change on scroll
            $('.stip-nav').css("padding", "0 5em")
            $('.stip-nav').css("background-color", "white")
            $('.stip-nav').css("box-shadow", "0 0rem 1rem rgba(0,0,0,0.1)")
        }
        else if (!$(location).attr('href').includes("blog")) {
            $('.stip-nav').css("padding", "2em 5em")
            $('.stip-nav').css("background-color", "transparent")
            $('.stip-nav').css("box-shadow", "none")
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
        else if ($(window).width() > 767) {
            $('.stip-navs').css("top", 0)
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
    })

    // validate corporate email
    function validateCorporateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var famousDomain = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "libero.it", "me.com", "live.com", "hotmail.com", "live.it", "aol.com", "mail.com"]
        var check
        for (let i = 0; i < famousDomain.length; i++) {
            if (email.includes(famousDomain[i])) {
                check = true
                break
            }
        }
        if (check) {
            return false
        }
        else {
            return re.test(String(email).toLowerCase());
        }
    }
    // validate email
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // demo page steps and request
    $("#stip-demo-secondForm").hide()
    $("#stip-demo-thanks").hide()
    $("#stip-otherCrm").hide()
    let idDemoRequest // id to append to the url of second form request
    $("#stip-demo-firstForm").submit(function (e) { // first form and on submit show thank you page
        e.preventDefault()
        if (validateCorporateEmail($("#stip-email-demo").val())) {
            let data = {
                "firstname": $('#stip-firstName-demo').val(),
                "lastname": $('#stip-lastName-demo').val(),
                "email": $('#stip-email-demo').val(),
                "phone": $('#stip-phone-demo').val()
            }

            // process animation
            $("#stip-demo-send").text("")
            $("#stip-demo-send").append("<img style='width: 2em' src='src/img/loading.gif'>");
            // fetch call
            fetch('https://stipworld.com/api/companyDemoRequest/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(function (res) {
                    res.json().then(function (data) {
                        console.log(data)
                        idDemoRequest = data.id // id to append to the url of second form request
                    })

                    $("#stip-demo-firstForm").hide()
                    $("#stip-demo-thanks").show()
                    $(".stip-demoHero").css("background-image", "url('./src/img/checkIllustration.png')")
                    if ($(window).width() < 576) {
                        $(".stip-demoHero").css("background-size", "contain")
                    }
                    $("#stip-demo-form")[0].reset()
                })
                .catch(function (err) { //if error
                    console.log(err)
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('#stip-demo-send').text("Error, try again");
                    } else {
                        $('#stip-demo-send').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('#stip-demo-send').text("Request your Demo");
                        } else {
                            $('#stip-demo-send').text("Chiedi la tua Demo");
                        }
                    }, 1300);
                })

        }
        else { // show border and label error on demo email input
            $("#stip-email-demo").css("border-color", "#ff6161")
            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                $(".stip-email-demo").append("<label class='stip-txt stip-emailLabelError' style='color: #ff6161;'>Must be a corporate email</label>")
            } else {
                $(".stip-email-demo").append("<label class='stip-txt stip-emailLabelError' style='color: #ff6161;'>Deve essere una email aziendale</label>")
            }
        }
    })
    $(".stip-email-demo").keypress(function () { // remove border and label error on demo email input
        $("#stip-email-demo").css("border-color", "rgb(206, 212, 218)")
        $(".stip-emailLabelError").remove()
    })
    $("#stip-survey-button").click(function () { // onclick show second form and hide thank you page
        $("#stip-demo-secondForm").show()
        $("#stip-demo-thanks").hide()
        if ($(window).width() < 576) {
            $(".stip-demoHero").css("background-image", "none")
        }
        else {
            $(".stip-demoHero").css("background-image", "url('./src/img/demoBG_2.png')")
        }

    })
    $(".stip-crmType-demo").change(function () { // on change select to "other" option, show input field
        if ($(".stip-crmType-demo").val().includes("other")) {
            $("#stip-otherCrm").show()
        } else {
            $("#stip-otherCrm").hide()
        }
    })
    $("#stip-demo-secondForm").submit(function (e) { // second form and on submit show thank you message and redirect to home
        e.preventDefault()
        let crmType
        if ($(".stip-crmType-demo").val().includes("other")) {
            crmType = $("#stip-otherCrm").val()
        } else {
            crmType = $(".stip-crmType-demo").val()
        }
        let data = {
            "company_name": $('#stip-companyName-demo').val(),
            "content_num": $('.stip-contentNum-demo').val(),
            "agent_num": $('.stip-agentNum-demo').val(),
            "crm_type": crmType
        }

        // fetch call
        fetch('https://stipworld.com/api/companyDemoRequest/' + idDemoRequest + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) {
                console.log(res)

                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    context = { thanksTitle: "Thank you for contacting us!", thanksSubtitle: "We will be in touch soon." };
                } else {
                    context = { thanksTitle: "Grazie per aver scritto a Stip!", thanksSubtitle: "Ti contatteremo al più presto. Ciao!" };
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    window.location.href = "index.html";
                })
            })
            .catch(function (err) { //if error
                console.log(err)
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    $('#stip-survey-send').text("Error, try again");
                } else {
                    $('#stip-survey-send').text("Errore, riprova");
                }
                setTimeout(function () {
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('#stip-survey-send').text("Chiedi la tua Demo");
                    } else {
                        $('#stip-survey-send').text("Request your Demo");
                    }
                }, 1300);
            })
    })
    $("#stip-survey-button").click(function () { // onclick show second form and hide thank you page
        $("#stip-demo-secondForm").show()
        $("#stip-demo-thanks").hide()
        if ($(window).width() < 576) {
            $(".stip-demoHero").css("background-image", "none")
        }
        else {
            $(".stip-demoHero").css("background-image", "url('./src/img/demoBG_2.png')")
        }

    })

    // validate email and company name, then enable the "download btn" to download 60stats or paper
    $("form :input").on('keyup touchend', function () {
        if (validateCorporateEmail($("#stip-email-download").val()) && $("#stip-companyName-download").val()) {
            $("#stip-download-btn").removeClass("stip-downloadDisable")
            $("#stip-download-btn").addClass("stip-download")
            if ($(location).attr('href').includes("blog")) { // if location is blog, download paper
                $("#stip-download-btn").attr("download", "60stats.pdf")
                $("#stip-download-btn").attr("href", "./src/download/paper.pdf")
            } else { // if location is home download paper
                $("#stip-download-btn").attr("download", "paper.pdf")
                $("#stip-download-btn").attr("href", "./src/download/60stats.pdf")
            }
            $("#stip-download-btn").click(function () {
                let data = {
                    "name": $('#stip-name-download').val(),
                    "email": $('#stip-email-download').val(),
                    "company_name": $('#stip-companyName-download').val(),
                    "page": "home"
                }

                // ajax call for send "data" information before download the files
                $.ajax({
                    url: 'https://stipworld.com/api/papers/',
                    data: data,
                    type: 'POST',
                    success: function (res) {
                        console.log(res)
                        $('.download-form-group').hide()
                        $('#modalDownloadSubtitle').hide()
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) { // appned thank you message
                            $('#modalDownloadTitle').text("You are good to go!")
                            if ($(location).attr('href').includes("blog") || $(location).attr('href').includes("lead-magnet")) { // if location is blog and language is en-EN
                                $('.modal-header').append("<p>Your free copy of <b style ='font-weight: 800'>60 Stats and Lessons to boost your Digital Customer Service</b> should automatically download.<br><br> If it doesn't, just click on the button below to download it!</p>")
                            } else if (!$(location).attr('href').includes("blog") && !$(location).attr('href').includes("lead-magnet")) { // if location is home and language is en-EN
                                $('.modal-header').append("<p>Your free copy of the <b style ='font-weight: 800'>Paper on Digital Customer Service Trends and Insights</b> should automatically download.<br><br> If it doesn't, just click on the button below to download it!</p>")
                            }
                        } else {
                            $('#modalPaperTitle').text("Tutto pronto!")
                            if ($(location).attr('href').includes("blog") || $(location).attr('href').includes("lead-magnet")) { // if location is blog and language is it-IT
                                $('.modal-header').append("<p>La tua copia gratuita del <b style ='font-weight: 800'>60 Stats and Lessons per migliorare il tuo Digital Customer Service</b> si scaricherà automaticamente.<br><br> In caso di problemi, clicca qui per scaricarlo!</p>")
                            } else if (!$(location).attr('href').includes("blog") && !$(location).attr('href').includes("lead-magnet")) { // if location is home and language is it-IT
                                $('.modal-header').append("<p>La tua copia gratuita del <b style ='font-weight: 800'>Paper su innovazione e nuovi trend del Digital Customer Service</b> si scaricherà automaticamente.<br><br> In caso di problemi, clicca qui per scaricarlo!</p>")
                            }
                        }
                    },
                    error: function (err) { //if error
                        console.log(err)
                        $('#stip-download-btn').css("background-color", "#ff6161");
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('#stip-download-btn').text("Error, try again");
                        } else {
                            $('#stip-download-btn').text("Errore, riprova");
                        }
                        setTimeout(function () {
                            $('#stip-download-btn').css("background-color", "#399fad");
                            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                                $('#stip-download-btn').text("Scaricalo ora!");
                            } else {
                                $('#stip-download-btn').text("Download now!");
                            }
                        }, 1300);
                    }
                });
            })
        } else {
            $("#stip-download-btn").removeClass("stip-download")
            $("#stip-download-btn").addClass("stip-downloadDisable")
            $("#stip-download-btn").removeAttr("download")
            $("#stip-download-btn").removeAttr("href")
        }
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

    // empty files input on close icon click
    $("#stip-empty-files").click(function () {
        $(".stip-file-support").val("")
    })
    // new formData for support request
    var formData = new FormData()
    // ajax call for support request
    $("#stip-support-form").submit(function (e) {
        e.preventDefault()
        formData.append("name", $('#stip-name-support').val())
        formData.append("email", $('#stip-email-support').val())
        formData.append("domain_app", $('#stip-domain-support').val())
        formData.append("section", $('.stip-section-support').val())
        formData.append("category", $('.stip-category-support').val())
        formData.append("description", $('.stip-description-support').val())
        var files = []
        $.each($("input[type='file']")[0].files, function (i, file) {
            files.push(file)
        });
        formData.append('files', files);

        $("#stip-support-send").text("")
        $("#stip-support-send").append("<img style='width: 2em' src='src/img/loading.gif'>");
        $.ajax({
            url: 'https://stipworld.com/api/alertdown/',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                // append thank you message
                let context
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    context = { thanksTitle: "Thank you for filling our form!" };
                    $("#stip-support-send").text("Send")
                } else {
                    context = { thanksTitle: "Grazie per aver compilato il form!" };
                    $("#stip-support-send").text("Invia")
                }
                let source = document.getElementById("stip-thanks").innerHTML;
                let template = Handlebars.compile(source);
                $('body').append(template(context))

                $(".stip-closeReprompt").click(function () {
                    $(".stip-reprompt-container").css("display", "none")
                    $("#stip-support-form")[0].reset()
                })
            },
            error: function (err) { //if error
                console.log(err)
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
            }
        });
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
        var markerEn = new google.maps.Marker({ position: placeEn, map: mapEn, url: "https://www.google.com/maps/place/Berkeley+Skydeck/@37.8700232,-122.2708017,17z/data=!3m1!4b1!4m5!3m4!1s0x80857e9c3255d2f5:0x80750bac5ec71ec6!8m2!3d37.870019!4d-122.268613" });
        var infowindowEn = new google.maps.InfoWindow({
            content: contentStringEn
        });
        google.maps.event.addListener(markerEn, 'click', function () {
            window.open(markerEn.url)
        });

        let placeIt = { lat: 41.901610, lng: 12.503200 };
        let contentStringIt = '<div id="content">' +
            '<h1 class="stip-h3">HUB LVenture Group e LUISS EnLabs</h1>' +
            '<p class="stip-txt">Roma Termini, Via Marsala 29H, Roma, RM 00185, ITALY</p>' +
            '</div>';
        var mapIt = new google.maps.Map(
            document.getElementById('mapIt'), { zoom: 15, center: placeIt });
        var markerIt = new google.maps.Marker({ position: placeIt, map: mapIt, url: "https://www.google.com/maps/place/HUB+LVenture+Group+e+LUISS+EnLabs/@41.9012616,12.5015184,17z/data=!3m1!4b1!4m5!3m4!1s0x132f61a3f6bcb73d:0x461a57bcc3b95f55!8m2!3d41.9012576!4d12.5037071" });
        var infowindowIt = new google.maps.InfoWindow({
            content: contentStringIt
        });
        google.maps.event.addListener(markerIt, 'click', function () {
            window.open(markerIt.url)
        });
    }

    /* analytics, facebook and cookies */
    // google analytics
    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NMMQBC3')

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-77012119-1');

    // facebook insights
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