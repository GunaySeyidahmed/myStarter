$(document).ready(function () {

    $(document).on('click', '.header__menu-open', function () {
        $(this).addClass('d-none');
        $('.header__menu-close').addClass('d-flex');
        $('.header').addClass('header--open');
    });

    $(document).on('click', '.header__menu-close', function () {
        $(".header__menu-open").removeClass('d-none');
        $(this).removeClass('d-flex');
        $('.header').removeClass('header--open');
    });

    $(document).on('click', '.show-more-js', function (e) {
        e.preventDefault();
        showMore();
    });

    function showMore(){
        var length=$(".news__info").length;
        var x=3;
        console.log(length);
        $('.load-more-js div:lt('+x+')').show();
        x= (x+3 <= length) ? x+3 : length;
        console.log(x);
        $('.load-more-js div:lt('+x+')').show();
    }

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
