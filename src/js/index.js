//loading animation
$(".stip-loading").delay(3000).animate({ 'opacity': '0' }, 500)
setTimeout(function () { $(".stip-loading").addClass('z-index-low') }, 3500);

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

    let click = 1
    $(".stip-menuIcon").click(function (e) { //hambuger icon animation
        e.preventDefault();
        $(".stip-hamburgerIcon").toggleClass('active');
        $(".stip-navModal").toggleClass('stip-navModalAppear')
        $('body').toggleClass('overflow-body');
        if ($(window).scrollTop() > $("#stip-scrollDetect").offset().top) {
            $('.stip-menuIcon').toggleClass('stip-menuIconScrolled');
        }
    });

    $(".stip-contactUs").click(function () {

    });

    $(".stip-demoRequest").click(function () {

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

        console.log($("#stip-blogCards").offset())

        $('html,body').animate({
            scrollTop: $("#stip-blogCards").offset().top + $("#stip-blogCards").outerHeight()
        },
            1500);
    })


    // hashtag button append
    let hashtag = ["#CustomerCare", "#CustomerSuccess", "#AssistenzaClienti", "#CustomerSatisfaction", "#IntelligenzaArtificiale", "#DeepLearning", "#SocialCustomerCare", "#CRM", "#IA"]
    hashtag.forEach(function (item, index) {
        $('#stip-hashtag').append("<button type='button' class='btn btn-outline-primary m-2 stip-txt'>" + item + "</button>")
    })
});
