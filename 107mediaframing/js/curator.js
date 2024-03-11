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

function flip(event){
	var element = event.currentTarget;
	if (element.className === "thecard") {
	    if(element.style.transform == "rotateY(180deg)") {
	    	element.style.transform = "rotateY(0deg)";
	    }
	    else {
	    	element.style.transform = "rotateY(180deg)";
	    }
	}
};

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