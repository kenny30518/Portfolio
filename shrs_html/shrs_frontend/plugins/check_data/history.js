var slickClass='.gridsbox';
$(document).ready(function(){
    function createSlick() {
        $(slickClass).not('.slick-initialized').slick({
            arrows: false,
            autoplay: false,
            dots: false,
            dotsClass: '',
            infinite: false,
            fade: false,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true
                    }
                }]
        });
    }
    createSlick();

    $('.btns-right').on('click', function() {
        $(slickClass).slick('slickNext');
    });
    $('.btns-left').on('click', function() {
        $(slickClass).slick('slickPrev');
    });
});

//Now it will not throw error, even if called multiple times.
// $(window).on( 'resize', createSlick );

function changeGridHold(thisObj){
    $('.grids.hold').removeClass('hold');
    $(thisObj).addClass('hold');
}