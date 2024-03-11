/*

//slider//
$('.responsive').slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});*/

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


var tl = new TimelineMax();

tl.fromTo(".wavy",0.5,{
	autoAlpha: 1,
	ease: Expo.easeInOut
},{
	autoAlpha: 0,
	ease: Expo.easeInOut
});

tl.to(".loading",0.5,{
	autoAlpha: 0,
	top: "-100%",
	ease: Expo.easeInOut
});

//burger animation
function show(){
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.data').classList.toggle('active');
}

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

//change section 2 content by screen width
$(window).on('load', function(){
    if($( window ).width() <= 1366){
		document.querySelector(".s2 .text p").innerHTML = "《人造風向Media Framing》意即世新資傳系的學生創造資訊、網站及影像，以輕快、活潑、亮眼的形象進入大眾視野，帶來明確、新穎的資訊，也是引領著十二個風向的風場！最終引發觀眾們產生「新的觀點，新的風向」。";
	}else {
		document.querySelector(".s2 .text p").innerHTML = "《人造風向Media Framing》意即世新資傳系的學生創造資訊、<br>網站及影像，以輕快、活潑、亮眼的形象進入大眾視野，<br>帶來明確、新穎的資訊，也是引領著十二個風向的風場！<br>最終引發觀眾們產生「新的觀點，新的風向」。";
	}
});

$( window ).resize(function() { 
	if($( window ).width() <= 1366){
		document.querySelector(".s2 .text p").innerHTML = "《人造風向Media Framing》意即世新資傳系的學生創造資訊、網站及影像，以輕快、活潑、亮眼的形象進入大眾視野，帶來明確、新穎的資訊，也是引領著十二個風向的風場！最終引發觀眾們產生「新的觀點，新的風向」。";
	}else {
		document.querySelector(".s2 .text p").innerHTML = "《人造風向Media Framing》意即世新資傳系的學生創造資訊、<br>網站及影像，以輕快、活潑、亮眼的形象進入大眾視野，<br>帶來明確、新穎的資訊，也是引領著十二個風向的風場！<br>最終引發觀眾們產生「新的觀點，新的風向」。";
	}
});

//Smooth scroll effect
$('.lower a').on('click', function(e){
	if(this.hash !== ''){
		e.preventDefault();

		const hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		},800);
	}
});

$('.scrollToTop a').on('click', function(e){
	if(this.hash !== ''){
		e.preventDefault();

		const hash = this.hash;
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		},800);
	}
});

//scroll out animation
ScrollOut({
	targets: '.s2 .text h2,.s2 .text p,.client-in li'
});

//scroll to top animation
window.addEventListener('scroll', function(){
	var scroll = document.querySelector('.scrollToTop');
	scroll.classList.toggle("active", window.scrollY > 500)
})

//change section 4 image when screen resize
$(window).on('load', function(){
    if($( window ).width() <= 768) { 
    	$(".s2 .phone img").attr("src","image/windmill.svg");
	}else {
	    $(".s2 .phone img").attr("src","image/s2.png");
	}
});

$( window ).resize(function() {
    if($( window ).width() <= 768) { 
        $(".s2 .phone img").attr("src","image/windmill.svg");
    }else {
        $(".s2 .phone img").attr("src","image/s2.png");
    }
});


//slider//
$(document).ready(function(){

	$('.pictures').slick({
	  dots: false,
	  prevArrow:"<img class='a-left control-c prev slick-prev' src='image/leftArrow.svg'>",
      nextArrow:"<img class='a-right control-c next slick-next' src='image/rightArrow.svg'>",
	  centerMode: false,
	  autoplay: true,
	  autoplaySpeed: 1500,
	  centerPadding: '60px',
	  slidesToShow: 3,
	  responsive: [
	  	{
	      breakpoint: 1120,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});
});













