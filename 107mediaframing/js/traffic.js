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

//burger animation//
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
    y: -10,
    rotation: -225,
    ease: Expo.easeInOut,
    delay: -0.8
});

tl.to(".menu", 0.5, {
    left:"0%",
    ease: Expo.easeInOut,
    delay: -1
});

tl.staggerFrom(".menu ul li", 1,{
    x: -200,
    rotation: -10,
    opacity: 0,
    ease: Expo.easeInOut,
    delay: -1
},0.3);

tl.reverse();
$(document).on("click", ".rwdBurger", function() {
        tl.reversed(!tl.reversed());
});

//website tabs
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    tab.classList.add('active')
    target.classList.add('active')
  })
})
