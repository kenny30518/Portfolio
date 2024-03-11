/*window.onload = function(){
	var tl = new TimelineMax();

	tl.fromTo(".logo",1,{
		autoAlpha: 0
	},{
		autoAlpha: 1
	},"+=0.5");

	tl.from(".logo",2,{
		opacity: 1,
		ease: Expo.easeInOut
	});

	tl.to(".menu-upper",2,{
		top: "-100%",
		ease: Expo.easeInOut
	});

	tl.to(".menu-lower",2,{
		bottom: "-100%",
		ease: Expo.easeInOut,
		delay: -2
	});

	tl.from(".btn",2,{
		opacity: 0,
		x: 30,
		ease: Expo.easeInOut,
		delay: -2
	});
}*/

//$( ".start" ).click

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

var isPressed = false;
$(document).keydown(function(event) {
    if (!isPressed & event.keyCode === 13) {
        $(".fake-link").click();
        isPressed = true;
    }
});

$(document).on("keydown", event => {
    if (isPressed & event.keyCode === 13) {	
        event.preventDefault();
    }
});

function go(){
	var tl = new TimelineMax();
	
    if($( window ).width() <= 768) { 
    	document.querySelector(".cover img").style.content = "url(https://i.imgur.com/XnkHJea.png)";
    }else {
    	$(".cover img").attr("src","https://i.imgur.com/N4RQLfa.png");
    }

	setTimeout(() => {
		document.querySelector('.cover').style.opacity = "0";
		document.querySelector('.cover img').style.opacity = "0";
		document.querySelector('.cover').style.zIndex = "-1";
		document.querySelector('.cover img').style.zIndex = "-1";
	},1000);

	tl.fromTo(".logo",1,{
		autoAlpha: 0
	},{
		autoAlpha: 1
	},"+=0.5");

	tl.from(".logo",2,{
		opacity: 1,
		ease: Expo.easeInOut
	});

	tl.to(".menu-upper",2,{
		top: "-100%",
		ease: Expo.easeInOut
	});

	tl.to(".menu-lower",2,{
		bottom: "-100%",
		ease: Expo.easeInOut,
		delay: -2
	});

	tl.from(".btn",2,{
		opacity: 0,
		x: 30,
		ease: Expo.easeInOut,
		delay: -2
	});
}

function play() {
	var audio = document.getElementById("audio");
	audio.play();
}

$( window ).resize(function() {
    if($( window ).width() <= 768) { 
        $(".cover img").attr("src","https://i.imgur.com/4LvRL0L.png");
    }else {
        $(".cover img").attr("src","https://i.imgur.com/z1Zj8F0.png");
    }
});

