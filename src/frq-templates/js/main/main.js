$(document).ready(function () {


    $(document).on('click', '.header__menu-open', function () {
        $(this).addClass('d-none');
        $('.header__menu-close').addClass('d-flex');
        $('.header').addClass('header--open');
        $('.logo-white').addClass('d-none');
        $('.logo-blue').removeClass('d-none');
        $('.header__top').addClass('header__top--blue');
    });

    $(document).on('click', '.header__menu-close', function () {
        $(".header__menu-open").removeClass('d-none');
        $(this).removeClass('d-flex');
        $('.header').removeClass('header--open');
        $('.logo-white').removeClass('d-none');
        $('.logo-blue').addClass('d-none');
        $('.header__top').removeClass('header__top--blue');
    });


    $(document).on('click touchstart', function (event) {

    })
    $(document).on('click touch', function (event) {

    })

    $('').each(function () {
        var _select = $(this).find('select');
        _select.on('changed.bs.select', function () {

            var _selectedOption = $(this).find('option:selected');
        })
    })


    $("#accordion").on('show.bs.collapse', function () {

    });
    $("#accordion").on('hide.bs.collapse', function () {

    });



    // $('.selectpicker').selectpicker();



    $('input.only-number').bind('keypress', function (e) {
        if (e.which != 13) {
            return (/[\d.+]/.test(e.key));  // IE > 9
        }
    });


    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;

    window.onresize = function () {


        var t = w.innerWidth || e.clientWidth || g.clientWidth;
        if (t !== x) {

        }
    };
});
