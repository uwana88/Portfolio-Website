$(document).ready(function () {
    function appear(mainElement, element1, element2) {
        const elementTop = $(mainElement).offset().top;
        const elementBottom = elementTop + $(mainElement).outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            if ($(element1).css('opacity') !== '1' || $(element2).css('opacity') !== '1') {
                $(element1).stop(true).animate({ opacity: '1' }, 800, function () {
                    $(element2).stop(true).animate({ opacity: '1' }, 800);
                });
            }
        }
    }

    $(window).on('scroll resize', function () {
        appear('#intro_text', '#intro_title', '#intro_text');
        appear('#intro_text2', '#intro_title2', '#intro_text2');
        appear('#about_text', '#about_title', '#about_text');
        appear('#skills_text', '#skills_title', '#skills_text');
        appear('#contact_text', '#contact_title', '#contact_text');
    });

    $(window).trigger('scroll');
});
