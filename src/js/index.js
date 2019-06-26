$(document).ready(function () {
    $(".stip-menuIcon").click(function (e) { //hambuger icon animation
        e.preventDefault();
        $(".stip-hamburgerIcon").toggleClass('active');
        $(".stip-navModal").toggleClass('stip-navModalAppear')
        $('.stip-menuIcon').removeClass('stip-menuIconScrolled');
    });

    $(window).scroll(function () {
        console.log($(window).scrollTop() + " / " + $(".stip-heroTitle").offset().top)
        if ($(window).scrollTop() > $(".stip-heroTitle").offset().top) { // nav-item change on scroll
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

    $(".stip-contactUs").click(function () {

    });

    $(".stip-demoRequest").click(function () {

    });

    //load animation
    $(".stip-loading").delay(3000).animate({ 'opacity': '0' }, 500)

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
});
