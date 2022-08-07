import $ from 'jquery';

$(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $('#scroll_top').show();
        } else {
            $('#scroll_top').hide();
        }
        if ((document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)) < 1) {
            $('#scroll_top').hide();
        }
    });


    $('#scroll_top').click(function () {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });
});

