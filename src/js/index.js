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

    //append favicon in every page
    $("head").append('<link rel="icon" href="src/img/favicon.ico">')

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

    // validate Work email address
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

    // roi calculation
    let teamNum
    let ticketNum

    let avarege_handle_time_nostip
    let automation_coefficient
    let savingTime

    let roi
    let saving_stip
    let fee_stip
    let service_cost_nostip
    let service_cost_stip
    let avarege_handle_time_stip

    $("#roi-form").change(function () {
        teamNum = $("#roi-input1").val()
        ticketNum = $("#roi-input2").val()

        avarege_handle_time_nostip = teamNum * 140 * 60 / ticketNum
        if (avarege_handle_time_nostip > 8) {
            automation_coefficient = 0.7
        } else {
            automation_coefficient = 0.6
        }
        savingTime = Math.round((avarege_handle_time_nostip * automation_coefficient * ticketNum) / 60)

        avarege_handle_time_stip = avarege_handle_time_nostip * (1 - automation_coefficient)
        service_cost_stip = 0.37 * ticketNum * avarege_handle_time_stip
        service_cost_nostip = 0.37 * avarege_handle_time_nostip * ticketNum
        fee_stip = 0.5 * ticketNum
        saving_stip = service_cost_nostip - service_cost_stip - fee_stip
        roi = Math.round(saving_stip / fee_stip * 100)

        $("#roi-num1").text(savingTime + "h")
        $("#roi-num2").text(roi + "%")
    });

    // report modal
    $("#report-channel-other").hide()
    let checkbox_channel_counter = 1
    $("#report-channel").change(function () {
        console.log($("#report-channel").val())
        $("#report-channel-other").show()
        if (checkbox_channel_counter == 1) {
            checkbox_channel_counter += 1
            $("#report-channel-other").show()
        } else {
            checkbox_channel_counter = 1
            $("#report-channel-other").hide()
        }
    });
    $("#report-crm-other").hide()
    $("#report-crm").change(function () {
        if ($("#report-crm").val() == "Altro") {
            $("#report-crm-other").show()
        } else {
            $("#report-crm-other").hide()
        }
    });

    $("#form_meeting_btn").click(function () {
        if (validateCorporateEmail($("#roi-input-email").val())) {
            let data = {
                "team_num": $('#roi-input1').val(),
                "tickets_num": $('#roi-input2').val(),
                "email": $('#roi-input-email').val()
            }

            // fetch call
            fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(function (res) {
                    window.location.href = "https://meetings.hubspot.com/fabrizio-aiello";
                })
                .catch(function (err) { //if error
                    console.log(err)
                })
        }
        else { // show border and label error on demo email input
            $("#roi-input-email").css("border-color", "#ff6161")
            $(".stip-emailLabelError").remove()
            if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                $("#report-email-group").append("<label class='stip-emailLabelError' style='color: #ff6161;'>Must be a Work email address</label>")
            } else {
                $("#report-email-group").append("<label class='stip-emailLabelError' style='color: #ff6161;'>Deve essere una email aziendale</label>")
            }
        }
    });

    $("#meeting-btn-nav").hide()
    $(window).scroll(function () {
        if ($(window).scrollTop() > $("#meeting-scroll-detect").offset().top && ($(location).attr('href').includes("roi") || $(location).attr('href').includes("video-demo"))) { // meeting btn fixed top
            $("#meeting-btn-nav").show()
        } else if ($(window).scrollTop() < $("#meeting-scroll-detect").offset().top) {
            $("#meeting-btn-nav").hide()
        }
    });

    /* const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    
    v = canvg.Canvg.fromString(ctx, '<svg width="600" height="600"><text x="50" y="50">Hello World!</text></svg>');

    $("#report-download-btn").click(function (e) {
        e.preventDefault()
        let roi_num1 = $("#roi-num1").text()
        let roi_num2 = $("#roi-num2").text()

        $("#report-download-form")[0].reset();
        $('#download-report-modal').modal('hide');
        console.log(roi_num2)

        var imgData = canvas.toDataURL('image/png');
        // Generate PDF
        var doc = new jsPDF('p', 'pt', 'a4');
        doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
        doc.save('test.pdf');
    }); */

    // demo page steps and request
    $("#stip-demo-secondForm").hide()
    $("#stip-demo-thanks").hide()
    $("#stip-otherCrm").hide()
    let idDemoRequest // id to append to the url of second form request
    let activeCampaignDemoData = { // data to send to activecampaign
        "email": "",
        "first_name": "",
        "last_name": "",
        "customer_acct_name": "",
        "p[3]": [3]
    }
    $("#stip-demo-firstForm").submit(function (e) { // first form and on submit show thank you page
        e.preventDefault()
        if (validateCorporateEmail($("#stip-email-demo").val())) {
            let data = {
                "firstname": $('#stip-firstName-demo').val(),
                "lastname": $('#stip-lastName-demo').val(),
                "email": $('#stip-email-demo').val(),
                "phone": $('#stip-phone-demo').val()
            }

            activeCampaignDemoData = { // data to send to activecampaign
                "email": $('#stip-email-demo').val(),
                "first_name": $('#stip-firstName-demo').val(),
                "last_name": $('#stip-lastName-demo').val(),
                "customer_acct_name": "",
                "p[3]": [3]
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
                $(".stip-email-demo").append("<label class='stip-txt stip-emailLabelError' style='color: #ff6161;'>Must be a Work email address</label>")
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

        activeCampaignDemoData = { // data to send to activecampaign
            "email": $('#stip-email-demo').val(),
            "first_name": $('#stip-firstName-demo').val(),
            "last_name": $('#stip-lastName-demo').val(),
            "customer_acct_name": $('#stip-companyName-demo').val(),
            "p[3]": [3]
        }

        // active campaign call only eng
        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
            fetch('https://stip.api-us1.com/admin/api.php?api_action=contact_add&api_key=caee5334c6676e9ae58822a1207e89c396ab0922d66f849c171126418c87310c9e24ad73', { //active campaign fetch call to add contact to a list
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: toUrlEncoded(activeCampaignDemoData)
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (err) { //if error
                    console.log(err)
                })
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

    // validate email and company name, then enable the "download btn" to download 60 stats or paper
    $("form :input").on('keyup touchend', function () {
        if (validateEmail($("#stip-email-download").val()) && $("#stip-companyName-download").val()) {
            $(".stip-download-btn").removeClass("stip-downloadDisable")
            $(".stip-download-btn").addClass("stip-download")
            if ($(location).attr('href').includes("blog") || $(location).attr('href').includes("digital-customer-service-guide")) { // if location is blog, download paper
                $(".stip-download-btn").attr("download", "60 stats and figures about 2020 Digital Customer Service.pdf")
                $(".stip-download-btn").attr("href", "./src/download/60 stats and figures about 2020 Digital Customer Service.pdf")
            } else if (!$(location).attr('href').includes("blog") && !$(location).attr('href').includes("digital-customer-service-guide")) { // if location is home download paper
                $(".stip-download-btn").attr("download", "The New Essential for Brands in 2019.pdf")
                $(".stip-download-btn").attr("href", "./src/download/The New Essential for Brands in 2019.pdf")
            }
        } else {
            $(".stip-download-btn").removeClass("stip-download")
            $(".stip-download-btn").addClass("stip-downloadDisable")
            $(".stip-download-btn").removeAttr("download")
            $(".stip-download-btn").removeAttr("href")
        }
    })

    const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&'); // application/x-www-form-urlencoded encoded
    // download paper or 60stats
    $(".stip-download-btn").click(function () {
        let page
        if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
            page = "home"
            let activeCampaignData = { // data to send to activecampaign
                "email": $('#stip-email-download').val(),
                "first_name": $('#stip-name-download').val().split(' ').slice(0, -1).join(' '),
                "last_name": $('#stip-name-download').val().split(' ').slice(-1).join(' '),
                "customer_acct_name": $('#stip-companyName-download').val(),
                "p[1]": [1]
            }
            fetch('https://stip.api-us1.com/admin/api.php?api_action=contact_add&api_key=caee5334c6676e9ae58822a1207e89c396ab0922d66f849c171126418c87310c9e24ad73', { //active campaign fetch call to add contact to a list
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: toUrlEncoded(activeCampaignData)
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (err) { //if error
                    console.log(err)
                })
        } else {
            page = window.location.pathname.replace('/', '').replace('.html', '')
        }
        let data = {
            "name": $('#stip-name-download').val(),
            "email": $('#stip-email-download').val(),
            "company_name": $('#stip-companyName-download').val(),
            "page": page
        }

        // fetch call for send "data" information before download the files
        fetch('https://stipworld.com/api/papers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) {
                console.log(res)
                $('.stip-download-modalBody').hide()
                $('.stip-download-modalHeader').css("border", "none")
                $('#modalDownloadSubtitle').hide()
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) { // appned thank you message
                    $('#modalDownloadTitle').text("You are good to go!")
                    if ($(location).attr('href').includes("blog") || $(location).attr('href').includes("digital-customer-service-guide")) { // if location is blog or lead magnet page and language is en-EN
                        $('.modal-header').append("<p>Your free copy of <b style ='font-weight: 800'>60 Stats and Lessons to boost your Digital Customer Service</b> should automatically download.</p>")
                    } else if (!$(location).attr('href').includes("blog") && !$(location).attr('href').includes("digital-customer-service-guide")) { // if location is home and language is en-EN
                        $('.modal-header').append("<p>Your free copy of the <b style ='font-weight: 800'>Paper on Digital Customer Service Trends and Insights</b> should automatically download.</p>")
                    }
                } else {
                    $('#modalPaperTitle').text("Tutto pronto!")
                    if ($(location).attr('href').includes("blog") || $(location).attr('href').includes("digital-customer-service-guide")) { //  if location is blog or lead magnet page and language is it-IT
                        $('.modal-header').append("<p>La tua copia gratuita del <b style ='font-weight: 800'>60 Stats and Lessons per migliorare il tuo Digital Customer Service</b> si scaricherà automaticamente.</p>")
                    } else if (!$(location).attr('href').includes("blog") && !$(location).attr('href').includes("digital-customer-service-guide")) { // if location is home and language is it-IT
                        $('.modal-header').append("<p>La tua copia gratuita del <b style ='font-weight: 800'>Paper su innovazione e nuovi trend del Digital Customer Service</b> si scaricherà automaticamente.</p>")
                    }
                }
            })
            .catch(function (err) { //if error
                console.log(err)
                $('.stip-download-btn').css("background-color", "#ff6161");
                if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                    $('.stip-download-btn').text("Error, try again");
                } else {
                    $('.stip-download-btn').text("Errore, riprova");
                }
                setTimeout(function () {
                    $('.stip-download-btn').css("background-color", "#399fad");
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('.stip-download-btn').text("Scaricalo ora!");
                    } else {
                        $('.stip-download-btn').text("Download now!");
                    }
                }, 1300);
            })
    })

    // ajax call for contact request
    $("#stip-contact-form").submit(function (e) {
        e.preventDefault()

        // active campaign call only eng
        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
            let activeCampaignData = { // data to send to activecampaign
                "email": $('#stip-email-contact').val(),
                "first_name": $('#stip-fullName-contact').val().split(' ').slice(0, -1).join(' '),
                "last_name": $('#stip-fullName-contact').val().split(' ').slice(-1).join(' '),
                "p[2]": [2]
            }
            fetch('https://stip.api-us1.com/admin/api.php?api_action=contact_add&api_key=caee5334c6676e9ae58822a1207e89c396ab0922d66f849c171126418c87310c9e24ad73', { //active campaign fetch call to add contact to a list
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: toUrlEncoded(activeCampaignData)
            })
                .then(function (res) {
                    console.log(res)
                })
                .catch(function (err) { //if error
                    console.log(err)
                })
        }

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

    // validate email and company name, then enable the "download btn" to download 60 stats or paper
    $("#stip-deck-form :input").on('keyup touchend', function () {
        if (validateEmail($('#stip-email-deck').val())) {
            $("#stip-deck-send").removeClass("stip-downloadDisable")
            $("#stip-deck-send").addClass("stip-download")
            $("#stip-deck-send").attr("download", "stip_pitch_deck.pdf")
            $("#stip-deck-send").attr("href", "./src/download/stip_pitch_deck.pdf")
        } else {
            $("#stip-deck-send").removeClass("stip-download")
            $("#stip-deck-send").addClass("stip-downloadDisable")
            $("#stip-deck-send").removeAttr("download")
            $("#stip-deck-send").removeAttr("href")
        }
    })

    // send data and then download deck
    $("#stip-deck-send").click((function (e) {
        e.preventDefault(); if (validateEmail($("#stip-email-deck").val())) {
            let data = { email: $("#stip-email-deck").val(), company_name: "Stip", page: "deck" }; $("#stip-deck-send").text(""), $("#stip-deck-send").append("<img style='width: 2em' src='src/img/loading.gif'>"), $.ajax({
                url: "https://stipworld.com/api/papers/", data: data, type: "POST", success: function (res) {
                    var element = document.createElement('a');
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.setAttribute('href', "./src/download/stip_pitch_deck.pdf");
                    element.setAttribute('download', "stip_pitch_deck.pdf");
                    element.click();
                    window.URL.revokeObjectURL(element.href);
                    document.body.removeChild(element);
                    let context; console.log(res), "en-EN" == sessionStorage.getItem("language") || "it-IT" != navigator.language && null == sessionStorage.getItem("language") ? (context = { thanksTitle: "Thank you for filling our form!" }, $("#stip-deck-send").text("Download Stip Deck")) : (context = { thanksTitle: "Grazie per aver compilato il form!" }, $("#stip-deck-send").text("Download Stip Deck")); let source = document.getElementById("stip-thanks").innerHTML, template = Handlebars.compile(source); $("body").append(template(context)), $(".stip-closeReprompt").click((function () { $(".stip-reprompt-container").css("display", "none"), $("#stip-deck-form")[0].reset() }))
                }, error: function (err) { console.log(err), "en-EN" == sessionStorage.getItem("language") || "it-IT" != navigator.language && null == sessionStorage.getItem("language") ? $("#stip-deck-send").text("Error, try again") : $("#stip-deck-send").text("Errore, riprova"), setTimeout((function () { "en-EN" == sessionStorage.getItem("language") || "it-IT" != navigator.language && sessionStorage.getItem("language"), $("#stip-deck-send").text("Download Stip Deck") }), 1300) }
            });
        }
    }))

    //test ai
    if ($(location).attr('href').includes("test-ai")) {
        var url_string = window.location.href;
        var url = new URL(url_string);
        var basePath = url.searchParams.get("base_url");
        //var basePath = "https://postepay.stipworld.com";
        console.log(basePath);
        let data = {
            "username": "root@company.it",
            "password": "81014"
        }
        let token
        //test ai authorization call
        $.ajax({
            url: basePath + '/api/rest-auth/login/',
            data: data,
            type: 'POST',
            success: function (res) {
                console.log(res)
                token = res.key
            },
            error: function (err) { //if error
                console.log(err)
            }
        });
        //test ai ajax call
        $("#stip-testai-form").submit(function (e) {
            e.preventDefault()
            $('.stip-prediction').remove() // delete old predictions
            $('.stip-ai-form').remove() // delete old predictions
            $("#stip-testai-send").text("")
            $("#stip-testai-send").append("<img style='width: 2em' src='src/img/loading.gif'>");

            $.ajax({
                url: basePath + '/api/predictions/category/?text=' + $('.stip-testai-txt').val(),
                headers: {
                    "Authorization": "Token " + token
                },
                type: 'GET',
                success: function (res) {
                    console.log(res)
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('#stip-testai-send').text("Send");
                    } else {
                        $('#stip-testai-send').text("Invia");
                    }
                    $('.stip-aiResponse').append("<h2 class='stip-h2 stip-colorTxt stip-prediction'>" + res.path + "</h2>")

                    // subcategories ajax call
                    $.ajax({
                        url: basePath + '/api/company_categories/' + res.id + '/form_fields/',
                        headers: {
                            "Authorization": "Token " + token
                        },
                        type: 'GET',
                        success: function (res) {
                            let data = JSON.parse(res)
                            console.log(data)
                            data.forEach((item, index) => {
                                if (item.component == "select" && !item.ask_finished) {
                                    if (item.text_to_require) {
                                        $('.stip-aiResponse').append("<form class='stip-ai-form'><div class='form-group'><label class='stip-p'>" + item.text_to_require + "</label><select class='form-control' id='" + index + "'></select></div></form>")
                                        item.options.forEach(option => {
                                            $('#' + index).append("<option>" + option + "</option>")
                                        })
                                    } else {
                                        $('.stip-aiResponse').append("<form class='stip-ai-form'><div class='form-group'><label class='stip-p'>" + item.label + "</label><select class='form-control' id='" + index + "'></select></div></form>")
                                        item.options.forEach(option => {
                                            $('#' + index).append("<option>" + option + "</option>")
                                        })
                                    }
                                } else if (!item.ask_finished) {
                                    if (item.text_to_require) {
                                        $('.stip-aiResponse').append("<form class='stip-ai-form'><div class='form-group'><label class='stip-p'>" + item.text_to_require + "</label><input type='text' class='form-control' placeholder='Text'></div></form>")
                                    } else {
                                        $('.stip-aiResponse').append("<form class='stip-ai-form'><div class='form-group'><label class='stip-p'>" + item.label + "</label><input type='text' class='form-control' placeholder='Text'></div></form>")
                                    }
                                }
                            });
                        },
                        error: function (err) { //if error
                            console.log(err)
                        }
                    });
                },
                error: function (err) { //if error
                    console.log(err)
                    if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                        $('#stip-testai-send').text("Error, try again");
                    } else {
                        $('#stip-testai-send').text("Errore, riprova");
                    }
                    setTimeout(function () {
                        if (sessionStorage.getItem('language') == "en-EN" || (navigator.language != "it-IT" && sessionStorage.getItem('language') == null)) {
                            $('#stip-testai-send').text("Send");
                        } else {
                            $('#stip-testai-send').text("Invia");
                        }
                    }, 1300);
                }
            });
        })
    }

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

    //active campaign
    (function (e, t, o, n, p, r, i) { e.visitorGlobalObjectAlias = n; e[e.visitorGlobalObjectAlias] = e[e.visitorGlobalObjectAlias] || function () { (e[e.visitorGlobalObjectAlias].q = e[e.visitorGlobalObjectAlias].q || []).push(arguments) }; e[e.visitorGlobalObjectAlias].l = (new Date).getTime(); r = t.createElement("script"); r.src = o; r.async = true; i = t.getElementsByTagName("script")[0]; i.parentNode.insertBefore(r, i) })(window, document, "https://diffuser-cdn.app-us1.com/diffuser/diffuser.js", "vgo");
    vgo('setAccount', '475858217');
    vgo('setTrackByDefault', true);
    vgo('process');
    /* end analytics, facebook and cookies */

    if (!$(location).attr('href').includes("contacts") && !$(location).attr('href').includes("privacy-policy") && !$(location).attr('href').includes("support") && !$(location).attr('href').includes("demo") && !$(location).attr('href').includes("test")) {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            disable: false,
            once: true
        });
    }
});