let navPosition = 0;
let navMenuPosition = 0;

window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
        if(navPosition === 1){
            $(".menu").css('display', 'block');
            $(".nav-container").animate({ height: '80px' }, 200, function() {
                $(".menu").animate({ top: '80px' }, 200);
                $(".nav-container").css('height', '80px');
                $(".nav-container").css('background-color', 'rgba(0, 0, 0, 0.1)');
                $(".menu").css('top', '80px');
            });
            navPosition = 0;
        }
    } else {
        if(navPosition === 0){
            $(".nav-container").animate({ height: '60px' }, 200, function() {
                $(".menu").animate({ top: '60px' }, 200);
                $(".nav-container").css('height', '60px');
                $(".nav-container").css('background-color', 'rgba(0, 0, 0, 0.9)');
                $(".menu").css('top', '60px');
                $(".menu").css('display', 'none');
            });
            navPosition = 1;
        }
    }
});

$(window).resize(function() {
    var width = $(window).width();
    if(width > 1023){
        $(".menu").animate({ left: '-100%', opacity: 0 }, 100, function() {
            $(".menu").css('left', '-100%');
            $(".menu").css('opacity', '0');
            $(".menu").css('display', 'none');
        });
        navMenuPosition = 0;
    }
});

$(document).ready(function(){
  $(".menu-button").click(function(){
    if(navMenuPosition === 0){
        $(".menu").css('display', 'block');
        $(".menu").animate({ left: '0px', opacity: 1 }, 100, function() {
            $(".menu").css('left', '0px');
            $(".menu").css('opacity', '1');
        });
        navMenuPosition = 1;
    } else {
        $(".menu").animate({ left: '-100%', opacity: 0 }, 100, function() {
            $(".menu").css('left', '-100%');
            $(".menu").css('opacity', '0');
            $(".menu").css('display', 'none');
        });
        navMenuPosition = 0;
    }
  });
});