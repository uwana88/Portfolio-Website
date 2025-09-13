let navPosition = 0;
let navMenuPosition = 0;

const sections = [
    { id: "top", nav: "home_nav" },
    { id: "about_section", nav: "about_nav" },
    { id: "skills_section", nav: "skills_nav" },
    { id: "certification_section", nav: "certification_nav" },
    { id: "cv_section", nav: "cv_nav" },
    { id: "contact_section", nav: "contact_nav" }
];

window.addEventListener('scroll', function() {
    let scrollY = window.scrollY + 100; // add offset for header/nav height
    let current = sections[0]; // fallback
    sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el && scrollY >= el.offsetTop) {
            current = section;
        }
    });
    document.querySelectorAll(".nav_active").forEach(el => el.classList.remove("nav_active") );
    document.getElementById(current.nav).classList.add("nav_active");

    if (window.scrollY === 0) {
        if(navPosition === 1){
            $(".menu").css('display', 'block');
            $(".nav-container").animate({ height: '80px' }, 200, function() {
                $(".menu").animate({ top: '80px' }, 200);
                $(".nav-container").css('height', '80px');
                $(".nav-container").css('background-color', 'rgba(0, 0, 0, 0.6)');
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

