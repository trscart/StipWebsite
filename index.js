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
            if ($(window).scrollTop() + $(window).height() > $(this).offset().top + $(this).outerHeight() - 10) {
                $(this).animate({ 'opacity': '1' }, 500);
            }
        });

    });

    $(".stip-contactUs").click(function () {

    });

    $(".stip-demoRequest").click(function () {

    });
});
