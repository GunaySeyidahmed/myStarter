/*import 'babel-polyfill';*/

/*import {MDCSwitch} from '@material/switch';*/

/*const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));*/

/*let switches = document.querySelectorAll('.mdc-switch');

Array.from(switches).forEach((el)=>{
    let switchControl = new MDCSwitch(el);
})*/

/*var switches = $('.mdc-switch');
$( switches ).each(function() {
    let switchControl = new MDCSwitch(this);
});

'use strict'*/

$(document).ready(function () {



    function cl(a){
        console.log(a)
    }


    var f1;
    (f1=function() {
        
    })();


    $(document).on('click touchstart', function (event) {

    })

    $(document).on('click touch', function (event) {
        
    })


    $(' ').on({
        mouseenter: function () {
            
        },
        mouseleave: function () {
            
        }
    })


    if (window.innerWidth < 768) {

    }


    window.onresize = function () {
 
    };


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


    /** hover img */

    $(".hover-img__wrapper:not(.hover-img__wrapper--active)").each(function () {
        var defaultImg = $(this).find('img');
        var hiddenImg = defaultImg.clone();
        var hoverSrc = hiddenImg.attr('data-src');
        hiddenImg.attr('src' , hoverSrc).hide().insertBefore(defaultImg);

        $(this).on({
            mouseenter: function mouseenter() {
                defaultImg.hide();
                hiddenImg.show();
            },
            mouseleave: function mouseleave() {
                defaultImg.show();
                hiddenImg.hide();
            }
        });
    });

    var defaultImg = $(".hover-img__wrapper--active").find('img').hide();
    var hiddenImg = defaultImg.clone();
    var hoverSrc = hiddenImg.attr('data-src');
    hiddenImg.attr('src' , hoverSrc).insertBefore(defaultImg).show();



    $('.selectpicker').selectpicker();

    $('.time').datetimepicker({
        format: 'HH:mm',
        defaultDate: moment(),
        icons: {
            up: "material-icons",
            down: "material-icons"
        }
    });

    $('.date').datetimepicker({
        format: 'DD.MM.YY',
        defaultDate: moment(),
        icons: {
            previous: 'material-icons',
            next: 'material-icons'
        }
    });



    

    $('input.only-number').bind('keypress', function (e) {
        if ( e.which != 13 ) {
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
        if(t !== x) {
            
        }
    };
});