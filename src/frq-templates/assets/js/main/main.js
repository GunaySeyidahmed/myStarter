$(document).ready(function () {

    $(document).on('click', '.header__menu-open', function () {
        $(this).addClass('d-none');
        $('.header__menu-close').addClass('d-flex');
        $('.header').addClass('header--open');
        $('body').addClass('noscroll-y');
    });

    $(document).on('click', '.header__menu-close', function () {
        $(".header__menu-open").removeClass('d-none');
        $(this).removeClass('d-flex');
        $('.header').removeClass('header--open');
        $('body').removeClass('noscroll-y');
    });

    $(".collapse").on('show.bs.collapse', function () {
        $(this).prev().addClass('active');
    });
    $(".collapse").on('hide.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });


    $('').each(function () {
        var _select = $(this).find('select');
        _select.on('changed.bs.select', function () {

            var _selectedOption = $(this).find('option:selected');
        })
    })


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
