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
    $(window).scroll(function () {
        if ($(window).scrollTop() > $("#stip-scrollDetect").offset().top) { // nav-item change on scroll
            $('.stip-menuIcon').addClass('stip-menuIconScrolled');
        } else {
            $('.stip-menuIcon').removeClass('stip-menuIconScrolled');
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

    // ajax call for demo request
    $("#stip-demoRequest").click(function () {
        let data = {
            "company_name": $('#stip-companyName-demo').val(),
            "firstname": $('#stip-firstName-demo').val(),
            "lastname": $('#stip-lastName-demo').val(),
            "phone": $('#stip-phone-demo').val(),
            "email": $('#stip-email-demo').val(),
            "captcha": "..."
        }
        console.log(data)
        fetch('https://stip.io/app/stip_rest/api/company/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) { console.log(res) })
            .catch(function (err) { console.log(err) })
    });

    // ajax call for contact request
    $("#stip-contactUs").click(function () {
        let data = {
            "fullname": $('#stip-fullName-contact').val(),
            "phone": $('#stip-phone-contact').val(),
            "email": $('#stip-email-contact').val(),
            "question": $('#stip-msg-contact').val(),
            "captcha": "..."
        }
        console.log(data)
        fetch('https://stip.io/app/stip_rest/api/companyQuestion/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(function (res) { console.log(res) })
            .catch(function (err) { console.log(err) })
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


    // blog card compile
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


    // hashtag button append
    let hashtag = ["#CustomerCare", "#CustomerSuccess", "#AssistenzaClienti", "#CustomerSatisfaction", "#IntelligenzaArtificiale", "#DeepLearning", "#SocialCustomerCare", "#CRM", "#IA"]
    hashtag.forEach(function (item, index) {
        $('#stip-hashtag').append("<button type='button' class='btn btn-outline-primary m-2 stip-txt'>" + item + "</button>")
    })


});


// clear coockie on unload
$(window).on("unload", function (e) {
    Cookies.remove('loadingAnimation');
});
