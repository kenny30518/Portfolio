//preloader//
$(window).on('load', function(){
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector(".loading").style.visibility = "visible";
    } else {
        document.querySelector(".loading").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
    }
});

//burger animation
var tl = new TimelineMax({paused: true});

tl.to(".item1",0.8,{
    y: 6,
    rotation: 45,
    ease: Expo.easeInOut
});

tl.to(".item2",0.8,{
    opacity: 0,
    ease: Expo.easeInOut,
    delay: -0.8
});

tl.to(".item3",0.8,{
    y: -8,
    rotation: -225,
    ease: Expo.easeInOut,
    delay: -0.8
});

tl.reverse();
$(document).on("click", ".burgerwrapper", function() {
        tl.reversed(!tl.reversed());
});

//scroll to top animation
$('.scrollToTop a').on('click', function(e){
    if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
    }
});

//show and hide scroll to top icon
window.addEventListener('scroll', function(){
    var scroll = document.querySelector('.scrollToTop');
    scroll.classList.toggle("active", window.scrollY > 500)
})

//burger animation
function show(){
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.data').classList.toggle('active');
}

//expend
const moreButton = document.querySelector('.more-button');
moreButton.addEventListener('click', function(){
    document.querySelector('.more-text').classList.toggle('show');
    document.querySelector('.more-button').classList.toggle('show');
    document.querySelector('.dots').classList.toggle('show');
    document.querySelector('.close').classList.toggle('show');
})

//close
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', function(){
    document.querySelector('.more-text').classList.toggle('show');
    document.querySelector('.more-button').classList.toggle('show');
    document.querySelector('.dots').classList.toggle('show');
    document.querySelector('.close').classList.toggle('show');
})

//expend2
const moreButton2 = document.querySelector('.more-button2');
moreButton2.addEventListener('click', function(){
    document.querySelector('.more-text2').classList.toggle('show');
    document.querySelector('.more-button2').classList.toggle('show');
    document.querySelector('.dots2').classList.toggle('show');
    document.querySelector('.close2').classList.toggle('show');
})

//close2
const closeButton2 = document.querySelector('.close2');
closeButton2.addEventListener('click', function(){
    document.querySelector('.more-text2').classList.toggle('show');
    document.querySelector('.more-button2').classList.toggle('show');
    document.querySelector('.dots2').classList.toggle('show');
    document.querySelector('.close2').classList.toggle('show');
})

//expend3
const moreButton3 = document.querySelector('.more-button3');
moreButton3.addEventListener('click', function(){
    document.querySelector('.more-text3').classList.toggle('show');
    document.querySelector('.more-button3').classList.toggle('show');
    document.querySelector('.dots3').classList.toggle('show');
    document.querySelector('.close3').classList.toggle('show');
})

//close3
const closeButton3 = document.querySelector('.close3');
closeButton3.addEventListener('click', function(){
    document.querySelector('.more-text3').classList.toggle('show');
    document.querySelector('.more-button3').classList.toggle('show');
    document.querySelector('.dots3').classList.toggle('show');
    document.querySelector('.close3').classList.toggle('show');
})

//expend4
const moreButton4 = document.querySelector('.more-button4');
moreButton4.addEventListener('click', function(){
    document.querySelector('.more-text4').classList.toggle('show');
    document.querySelector('.more-button4').classList.toggle('show');
    document.querySelector('.dots4').classList.toggle('show');
    document.querySelector('.close4').classList.toggle('show');
})

//close4
const closeButton4 = document.querySelector('.close4');
closeButton4.addEventListener('click', function(){
    document.querySelector('.more-text4').classList.toggle('show');
    document.querySelector('.more-button4').classList.toggle('show');
    document.querySelector('.dots4').classList.toggle('show');
    document.querySelector('.close4').classList.toggle('show');
})

//expend5
const moreButton5 = document.querySelector('.more-button5');
moreButton5.addEventListener('click', function(){
    document.querySelector('.more-text5').classList.toggle('show');
    document.querySelector('.more-button5').classList.toggle('show');
    document.querySelector('.dots5').classList.toggle('show');
    document.querySelector('.close5').classList.toggle('show');
})

//close5
const closeButton5 = document.querySelector('.close5');
closeButton5.addEventListener('click', function(){
    document.querySelector('.more-text5').classList.toggle('show');
    document.querySelector('.more-button5').classList.toggle('show');
    document.querySelector('.dots5').classList.toggle('show');
    document.querySelector('.close5').classList.toggle('show');
})

//expend6
const moreButton6 = document.querySelector('.more-button6');
moreButton6.addEventListener('click', function(){
    document.querySelector('.more-text6').classList.toggle('show');
    document.querySelector('.more-button6').classList.toggle('show');
    document.querySelector('.dots6').classList.toggle('show');
    document.querySelector('.close6').classList.toggle('show');
})

//close6
const closeButton6 = document.querySelector('.close6');
closeButton6.addEventListener('click', function(){
    document.querySelector('.more-text6').classList.toggle('show');
    document.querySelector('.more-button6').classList.toggle('show');
    document.querySelector('.dots6').classList.toggle('show');
    document.querySelector('.close6').classList.toggle('show');
})

//expend7
const moreButton7 = document.querySelector('.more-button7');
moreButton7.addEventListener('click', function(){
    document.querySelector('.more-text7').classList.toggle('show');
    document.querySelector('.more-button7').classList.toggle('show');
    document.querySelector('.dots7').classList.toggle('show');
    document.querySelector('.close7').classList.toggle('show');
})

//close7
const closeButton7 = document.querySelector('.close7');
closeButton7.addEventListener('click', function(){
    document.querySelector('.more-text7').classList.toggle('show');
    document.querySelector('.more-button7').classList.toggle('show');
    document.querySelector('.dots7').classList.toggle('show');
    document.querySelector('.close7').classList.toggle('show');
})

//expend8
const moreButton8 = document.querySelector('.more-button8');
moreButton8.addEventListener('click', function(){
    document.querySelector('.more-text8').classList.toggle('show');
    document.querySelector('.more-button8').classList.toggle('show');
    document.querySelector('.dots8').classList.toggle('show');
    document.querySelector('.close8').classList.toggle('show');
})

//close8
const closeButton8 = document.querySelector('.close8');
closeButton8.addEventListener('click', function(){
    document.querySelector('.more-text8').classList.toggle('show');
    document.querySelector('.more-button8').classList.toggle('show');
    document.querySelector('.dots8').classList.toggle('show');
    document.querySelector('.close8').classList.toggle('show');
})

//expend9
const moreButton9 = document.querySelector('.more-button9');
moreButton9.addEventListener('click', function(){
    document.querySelector('.more-text9').classList.toggle('show');
    document.querySelector('.more-button9').classList.toggle('show');
    document.querySelector('.dots9').classList.toggle('show');
    document.querySelector('.close9').classList.toggle('show');
})

//close9
const closeButton9 = document.querySelector('.close9');
closeButton9.addEventListener('click', function(){
    document.querySelector('.more-text9').classList.toggle('show');
    document.querySelector('.more-button9').classList.toggle('show');
    document.querySelector('.dots9').classList.toggle('show');
    document.querySelector('.close9').classList.toggle('show');
})

//expend10
const moreButton10 = document.querySelector('.more-button10');
moreButton10.addEventListener('click', function(){
    document.querySelector('.more-text10').classList.toggle('show');
    document.querySelector('.more-button10').classList.toggle('show');
    document.querySelector('.dots10').classList.toggle('show');
    document.querySelector('.close10').classList.toggle('show');
})

//close10
const closeButton10 = document.querySelector('.close10');
closeButton10.addEventListener('click', function(){
    document.querySelector('.more-text10').classList.toggle('show');
    document.querySelector('.more-button10').classList.toggle('show');
    document.querySelector('.dots10').classList.toggle('show');
    document.querySelector('.close10').classList.toggle('show');
})

//expend11
const moreButton11 = document.querySelector('.more-button11');
moreButton11.addEventListener('click', function(){
    document.querySelector('.more-text11').classList.toggle('show');
    document.querySelector('.more-button11').classList.toggle('show');
    document.querySelector('.dots11').classList.toggle('show');
    document.querySelector('.close11').classList.toggle('show');
})

//close11
const closeButton11 = document.querySelector('.close11');
closeButton11.addEventListener('click', function(){
    document.querySelector('.more-text11').classList.toggle('show');
    document.querySelector('.more-button11').classList.toggle('show');
    document.querySelector('.dots11').classList.toggle('show');
    document.querySelector('.close11').classList.toggle('show');
})

//expend12
const moreButton12 = document.querySelector('.more-button12');
moreButton12.addEventListener('click', function(){
    document.querySelector('.more-text12').classList.toggle('show');
    document.querySelector('.more-button12').classList.toggle('show');
    document.querySelector('.dots12').classList.toggle('show');
    document.querySelector('.close12').classList.toggle('show');
})

//close12
const closeButton12 = document.querySelector('.close12');
closeButton12.addEventListener('click', function(){
    document.querySelector('.more-text12').classList.toggle('show');
    document.querySelector('.more-button12').classList.toggle('show');
    document.querySelector('.dots12').classList.toggle('show');
    document.querySelector('.close12').classList.toggle('show');
})






