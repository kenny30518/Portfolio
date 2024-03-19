$(window).on('load', function() {
    setTimeout(function() {
        $('#firstSlideImage').css('transform','scale(1)');
    }, 300);

    setTimeout(function() {
        $('#firstSlideText').css('opacity','1');
        $('#firstSlideText').css('transform','translate(-50%,-50%)');
    }, 300);

    $('.mainMask').addClass("hide");
    $('#firstSlideImage').animate({ opacity: 1 }, 600);
    $('.banner-slider').slick({
        autoplay: true,
        autoplaySpeed: 9000,
        dots: false,
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'ease-in-out',
        arrow: false
    });

    setTimeout(function() {
        $('#firstSlideImage').removeAttr("style");
        $('#firstSlideText').removeAttr("style");
    }, 3000);

    $(".scrollIcon").click(function() {
        $('html, body').animate({
            scrollTop: $("#intro").offset().top-150
        }, 900);
    });

    /* header scroll show and hide */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 476) {
            $('header').addClass("show");
        } else {
            $('header').removeClass("show");
        }
    });

    //page section show and hide animation trigger
    document.addEventListener('scroll',function(){
        var windowHeight = window.innerHeight;
        //get window total height (from top to bottom)
        var pageTotalHeight = windowHeight+scrollY;

        //footer show and hide
        var lowerBannerTop = document.getElementById('lowerBanner').offsetTop;
        var lowerBannerHeight = document.getElementById('lowerBanner').offsetHeight;
        var lowerBannerContentHeight = lowerBannerTop + lowerBannerHeight;
        if (lowerBannerContentHeight+150 <= pageTotalHeight){
            $('footer').addClass("show");
        }else{
            $('footer').removeClass("show");
        }

        // intro section show and hide
        var bannerTop = document.getElementById('bannerArea').offsetTop;
        var bannerHeight = document.getElementById('bannerArea').offsetHeight;
        var bannerContentHeight = bannerTop + bannerHeight;
        if (bannerContentHeight+150 <= pageTotalHeight) {
            $('.intro').addClass("show");
            $('.rightSection').addClass("show");
        } else {
            $('.intro').removeClass("show");
            $('.rightSection').removeClass("show");
        }

        // news show and hide
        var introTop = document.getElementById('intro').offsetTop;
        var introHeight = document.getElementById('intro').offsetHeight;
        var introContentHeight = introTop + introHeight;
        if (introContentHeight+150 <= pageTotalHeight) {
            $('.news').addClass("show");
        } else {
            $('.news').removeClass("show");
        }

        // lower banner show and hide
        var newsTop = document.getElementById('news').offsetTop;
        var newsHeight = document.getElementById('news').offsetHeight;
        var newsContentHeight = newsTop + newsHeight;
        if (newsContentHeight+150 <= pageTotalHeight) {
            $('.lowerBanner').addClass("show");
        } else {
            $('.lowerBanner').removeClass("show");
        }

    },false);
});

/*mobile menu animation toggle*/
$(window).on('load', function() {
    $('.hamburger').click(function() {
        $('.hamburger').toggleClass("active");
        $('.mobileMenu').toggleClass("show");
    });
});

/* shopping button change color on scroll */
$(window).scroll(function() {
    if ($(this).scrollTop() > 576) {
        $('.shoppingButton').addClass("dark");
    } else {
        $('.shoppingButton').removeClass("dark");
    }
});

/* shopping button hide when reaching bottom */
$(window).scroll(function() {
    if ($(this).scrollTop() > 1300) {
        $('.shoppingButton').addClass("hide");
    } else {
        $('.shoppingButton').removeClass("hide");
    }
});