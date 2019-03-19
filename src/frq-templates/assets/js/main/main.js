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


    $('.date').datetimepicker({
        format: 'DD.MM.YY',
        defaultDate: moment(),
        icons: {
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right'
        }
    }).on('dp.change', function () {
        if ($(this).val() != 0) {
            $(this).closest('.form-group').find('label').addClass('color-dark-green');
        } else $(this).closest('.form-group').find('label').removeClass('color-dark-green');
    });

    var stickyFooterFunc;
    (stickyFooterFunc = function stickyFooterFunc() {
        $('footer').css('position', 'static');
        $('body').css('min-height', '100px');

        var bodyHeight = $('body').outerHeight();
        if (window.innerHeight > bodyHeight) {
            $('body').css('min-height', '100vh');
            $('footer').css({'position': 'absolute', 'bottom': '0'});
        }
    })();

    stickyFooterFunc();

    $('.form-group input, textarea').keyup(function () {
        if ($(this).val() != 0) {
            $(this).closest('.form-group').find('label').addClass('color-dark-green');
        } else $(this).closest('.form-group').find('label').removeClass('color-dark-green');
    });


    $('select.selectpicker').on('change', function () {
        var selected = $(this).val();
        console.log(selected);
        if (selected) {
            $(this).closest('.form-group').find('label').addClass('color-dark-green');
        } else
            $(this).closest('.form-group').find('label').removeClass('color-dark-green');
    });


    $("input").on("click", function () {
        $(this).closest('.form-group').find('p').addClass('color-dark-green');
        $(this).closest('.form-group').find('label.mb-10').addClass('color-dark-green');
    });


    $('').each(function () {
        var _select = $(this).find('select');
        _select.on('changed.bs.select', function () {

            var _selectedOption = $(this).find('option:selected');
        })
    });

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


        stickyFooterFunc();
        var t = w.innerWidth || e.clientWidth || g.clientWidth;
        if (t !== x) {

        }
    };
});
