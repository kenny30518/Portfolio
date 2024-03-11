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

$(window).resize(function(){
    if($(window).width() <= 830) {
        location.reload();
    }
});

//change phone layout by screen width
if($( window ).width() <= 530){
    $('.upperGroup').html('<a href="#groupName"><p class="button-6 groupTitle" id="memory">紀實記憶</p></a><a href="#groupName"><p class="button-6 groupTitle" id="education">社會教育</p></a>');
    $('.lowerGroup').html('<a href="#groupName"><p class="button-6 groupTitle" id="culture">文化傳承</p></a><a href="#groupName"><p class="button-6 groupTitle" id="forum">創新論壇</p></a>');
}else {
    $('.upperGroup').html('<a href="#groupName"><p class="button-6 groupTitle" id="memory">紀實記憶</p></a><a href="#groupName"><p class="button-6 groupTitle" id="culture">文化傳承</p></a>');
    $('.lowerGroup').html('<a href="#groupName"><p class="button-6 groupTitle" id="education">社會教育</p></a><a href="#groupName"><p class="button-6 groupTitle" id="forum">創新論壇</p></a>');
}

//map color control
var states = [
      '.memoryArea', '.cultureArea', '.educationArea', '.forumArea', '.memoryArea', '.cultureArea', '.educationArea', '.forumArea'
    ],
    
    colors = [
      '#dc6c50', '#eb9d5f', '#E2BF6A', '#244552', 'transparent', 'transparent', 'transparent', 'transparent'
    ];

function fillMap(state, color, time) {
  setTimeout(
    function() { 
      $(state).css('fill', color);
    }, time
  );
};

$(function() {
    setTimeout(function(){
        for(var i = 0; i < 9; i++) {
            fillMap(states[i], colors[i], (i+1)*500);
        };
    }, 1500);
});

var status = 0;
$('.groupTitle').on('click', function() {
    var target = $(this).attr('id');
    if (target == 'memory'){
        if (status == 1) {
            to1F();
            setTimeout(() => { 
                $('.memoryArea').css('fill', '#dc6c50');
                setTimeout(() => { 
                    $('.memoryArea').css('fill', 'transparent');
                }, 2000);
            }, 4000);
            status = 0
        }else{
            $('.memoryArea').css('fill', '#dc6c50');
            setTimeout(() => { 
                $('.memoryArea').css('fill', 'transparent');
            }, 2000);
        }
    }else if (target == 'culture'){
        if (status == 1) {
            to1F();
            setTimeout(() => { 
                $('.cultureArea').css('fill', '#eb9d5f');
                setTimeout(() => { 
                    $('.cultureArea').css('fill', 'transparent');
                }, 2000);
            }, 4000);
            status = 0;
        }else{
            $('.cultureArea').css('fill', '#eb9d5f');
            setTimeout(() => { 
                $('.cultureArea').css('fill', 'transparent');
            }, 2000);
        }
    }else if (target == 'education'){
        if (status == 0) {
            toB1();
            setTimeout(() => { 
                $('.educationArea').css('fill', '#E2BF6A');
                setTimeout(() => { 
                    $('.educationArea').css('fill', 'transparent');
                }, 2000);
            }, 4000);
            status = 1;
        }else{
            $('.educationArea').css('fill', '#E2BF6A');
            setTimeout(() => { 
                $('.educationArea').css('fill', 'transparent');
            }, 2000);
        }
    }else if (target == 'forum'){
        if (status == 0) {
            toB1();
            setTimeout(() => { 
                $('.forumArea').css('fill', '#244552');
                setTimeout(() => { 
                    $('.forumArea').css('fill', 'transparent');
                }, 2000);
            }, 4000);
            status = 1;
        }else{
            $('.forumArea').css('fill', '#244552');
            setTimeout(() => { 
                $('.forumArea').css('fill', 'transparent');
            }, 2000);
        }
    }
})

$(".btn1").on("mouseover", function () {
    if ($(this).find('rect').hasClass('memoryArea')) {
        $(this).find('rect').css('fill', '#dc6c50');
    }else if ($(this).find('rect').hasClass('cultureArea')) {
        $(this).find('rect').css('fill', '#eb9d5f');
    }else if ($(this).find('rect').hasClass('educationArea')) {
        $(this).find('rect').css('fill', '#E2BF6A');
    }else if ($(this).find('rect').hasClass('forumArea')) {
        $(this).find('rect').css('fill', '#244552');
    }
});

$(".btn1").on("mouseleave", function () {
    $(this).find('rect').css('fill', 'transparent');
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

function to1F() {
    $('#firstFloor').css('color','#272828');
    $('#secondFloor').css('color','transparent');
    document.getElementById('firstFloor').style.pointerEvents = "none";
    var tl3 = new TimelineMax();

    tl3.to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0,},
        ]
    }).to(".map2",0.2,{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",{
        zIndex: 1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0},
        ]
    },"-=0.2");
    document.getElementById('secondFloor').style.pointerEvents = "all";
}

function toB1() {
    $('#secondFloor').css('color','#272828');
    $('#firstFloor').css('color','transparent');
    document.getElementById('secondFloor').style.pointerEvents = "none";
    var tl6 = new TimelineMax();

    tl6.to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",0.2,{
        zIndex: -1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 20},
        ]
    },"+=0.2").to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: -60},
        ]
    },"-=0.2");
    document.getElementById('firstFloor').style.pointerEvents = "all";
}

//Floor switch button
$('#secondFloor').on('click',function(){
    $('#secondFloor').css('color','#272828');
    $('#firstFloor').css('color','transparent');
    document.getElementById('secondFloor').style.pointerEvents = "none";
    var tl2 = new TimelineMax();

    tl2.to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",0.2,{
        zIndex: -1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 20},
        ]
    },"+=0.2").to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: -60},
        ]
    },"-=0.2");
    document.getElementById('firstFloor').style.pointerEvents = "all";
    status = 1;
});

$('#firstFloor').on('click',function(){
    $('#firstFloor').css('color','#272828');
    $('#secondFloor').css('color','transparent');
    document.getElementById('firstFloor').style.pointerEvents = "none";
    var tl3 = new TimelineMax();

    tl3.to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0,},
        ]
    }).to(".map2",0.2,{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",{
        zIndex: 1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0},
        ]
    },"-=0.2");
    document.getElementById('secondFloor').style.pointerEvents = "all";
    status = 0;
});

//phoneFloor switch button
$('#phoneSecondFloor').on('click',function(){
    $('#phoneSecondFloor').css('color','#272828');
    $('#phoneFirstFloor').css('color','transparent');
    document.getElementById('phoneSecondFloor').style.pointerEvents = "none";
    var tl4 = new TimelineMax();

    tl4.to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",0.2,{
        zIndex: -1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 20},
        ]
    },"+=0.2").to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: -60},
        ]
    },"-=0.2");
    document.getElementById('phoneFirstFloor').style.pointerEvents = "all";
    status = 1;
});

$('#phoneFirstFloor').on('click',function(){
    $('#phoneFirstFloor').css('color','#272828');
    $('#phoneSecondFloor').css('color','transparent');
    document.getElementById('phoneFirstFloor').style.pointerEvents = "none";
    var tl5 = new TimelineMax();

    tl5.to(".map",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0,},
        ]
    }).to(".map2",0.2,{
        keyframes: [
            {duration: 0.2, xPercent: 20,},
            {duration: 0.2, yPercent: -20},
        ]
    }).to(".map2",{
        zIndex: 1
    },"+=1").to(".map2",{
        keyframes: [
            {duration: 0.2, xPercent: 0,},
            {duration: 0.2, yPercent: 0},
        ]
    },"-=0.2");
    document.getElementById('phoneSecondFloor').style.pointerEvents = "all";
    status = 0;
});

//pupup menu
$(".btn1").click(function() {
    var href = $(this).attr("href")
    $(href).fadeIn(250);
    $("popup-box").removeClass("transform-out").addClass("transform-in");
    if ($(this).attr('id') == 'farm') {
        $('.chineseName').html("蔬情");
        $('.englishName').html("Farm In Love");
        $('.chineseText').html("「讓我們把最蔬情的故事，說給你聽。」<br/>希望藉由平台推廣小農產品，透過影音刻畫小農的自身故事，使情感成為一個成功的包裝。");
        $('.englishText').html("Let us tell you a story that makes you “Farm In Love”. “Farm In Love” is a platform that build up smallholders’ brand image through our film works and recipes.Besides product promotion, it is also a space where smallholders can learn valuable know-how from each other’s sharing.");
        $('.leftSide img').attr('src','image/farminlove.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/wave.mp3');
    }else if ($(this).attr('id') == 'time') {
        $('.chineseName').html("拾刻．時客");
        $('.englishName').html("Time Capture");
        $('.chineseText').html("以充滿愛與回憶卻不知如何表達的「時刻家族」帶入主題；以網站提供大家把話語、情感寄送到未來；以影音紀錄城市中不同故事的回憶；以社群經營與時客們交流。「拾刻 · 時客，為你紀錄每個時刻！」");
        $('.englishText').html("Welcome to Time Capture ! Our story is about \"Moment Family\" which is full of love and memories. You can express your emotion and pressure through our website , explore your life memories by watching our videos , and connect each other throughout our social media.Come and create your own time capsule with us !\"Time Capture, record every moment for you!\"");
        $('.leftSide img').attr('src','image/timecapture.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if($(this).attr('id') == 'ball') {
        $('.chineseName').html("球生");
        $('.englishName').html("Reverse by a ball");
        $('.chineseText').html("「球生，用籃球改變你的人生」我們想藉由拍影片的方法讓更多人了解，不只有頂尖運動員，基層運動員也很努力，並且他們藉由籃球，翻轉了自己的人生，即便他以後不是繼續成為職業球員，也是藉由籃球改變了人生。並且也希望能讓更多人發現有很多默默努力的基層運動員。");
        $('.englishText').html("「Qiu Sheng means ball is life, we want to make some videos to let people know ballers work really hard, they use their professional skills to change their lives and making it better.");
        $('.leftSide img').attr('src','image/ball.svg');
        $('#audioC').attr('src','audio/sample.mp3');
        $('#audioE').attr('src','audio/wave.mp3');
    }else if($(this).attr('id') == 'beki') {
        $('.chineseName').html("袂記");
        $('.englishName').html("bē kì");
        $('.chineseText').html("近年來因為環境及時代變遷，台語與我們的距離變得越來越遠、甚至可能消失。所以「袂記 bē-kì」藉由成立品牌的方式整合多媒體管道，推出各項產品及內容，讓社會大眾了解台語正逐漸式微的事實，「予台語重回咱ê生活」。");
        $('.englishText').html("In recent years, due to changes in the environment and the times, the distance between Taiwanese and its culture has become farther and farther from us, and it may even disappear in the near future. Therefore, \"袂记 bē-kì\" integrates multimedia channels by establishing the brand, and launches various products and contents, so that the public can understand the fact that Taiwanese is gradually declining, and aim for the goal to \"Bring Taiwanese Back to Our Life.\"");
        $('.leftSide img').attr('src','image/beki.png');
        $('#audioC').attr('src','audio/sample.mp3');
        $('#audioE').attr('src','audio/wave.mp3');
    }else if($(this).attr('id') == 'temple') {
        $('.chineseName').html("廟嶼");
        $('.englishName').html("Temples island");
        $('.chineseText').html("我們是廟嶼，宮廟的「廟」島嶼的「嶼」，專門介紹宮廟文化的科普和冷知識的推廣，以宮廟冷知識作為主軸製作網頁和相關文章推廣宮廟文化，使年輕一輩的社會大眾對其有更深入的認識，重新對宮廟文化引起興趣。");
        $('.englishText').html("Hello guys, we are temple island(Miao Yu).The Miao is from the word: Gong Miao(temple).The Yu is from the word: Dao Yu(island).We are specialized introduce the popularization of science and trivia within tradition culture. We use the trivia within tradition to make our website. In addition, we use the related particles to promote Taiwan’s tradition temple culture.Our goal is to let the Taiwan’s new generation have better knowing about the Taiwan’s tradition temple culture and drawing there interests to it again.");
        $('.leftSide img').attr('src','image/templesisland.png');
        $('#audioC').attr('src','audio/sample.mp3');
        $('#audioE').attr('src','audio/wave.mp3');
    }else if($(this).attr('id') == 'sound') {
        $('.chineseName').html("留聲跡");
        $('.englishName').html("Save And Sound");
        $('.chineseText').html("你是否也有能勾起你回憶的聲音呢？我們將提供一個平台讓你可以保存和分享聲音以及背後的故事。留聲跡希望與你一同留下屬於你聲音的足跡。");
        $('.englishText').html("Is there a sound that would make you recall a memory?  Our name is “Save and Sound.” We provide a platform to let you upload sounds and share the stories behind them.  Like every step would leave a footprint. We believe that every sound could have a story behind it.   Here is the place that you can keep your memories “Save and Sound.”");
        $('.leftSide img').attr('src','image/saveandsound.png');
        $('#audioC').attr('src','audio/sample.mp3');
        $('#audioE').attr('src','audio/wave.mp3');
    }else if ($(this).attr('id') == 'grow') {
        $('.chineseName').html("長大才不會懂");
        $('.englishName').html("something need to know");
        $('.chineseText').html("「你真的知道嗎？網路上說的是真的嗎？」 在台灣性教育屬於普遍被迴避的課題，許多人都是長大之後才從各種不同的管道獲取性知識，而我們所架設的平台會提供獲取正確性知識的管道，並試圖讓台灣在面臨「性」時的態度能逐漸開放且健康。#你真的懂了嗎？");
        $('.englishText').html("As we grew up, the young people in our age have to face the important decisions about relationship, sexuality, and sex behavior.But in Taiwan, the sex education has been ignored for a long time.So we want to try to change this social phenomenon in Taiwan by some new and unexpectable way.\"There's something we need to know.\"");
        $('.leftSide img').attr('src','image/something_need_to_know.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if ($(this).attr('id') == 'social') {
        $('.chineseName').html("涉群危基");
        $('.englishName').html("Social Crisis");
        $('.chineseText').html("這是一個被監控的社會，我們遊走在看似自由的網路世界，然而危機步步逼近.......沒有基礎怎麼可以，大家好我們是涉群危基，個人的資料和網路的足跡，如今已經比石油等等的資源還要重要了，你還在把個人資料無條件的送出去嗎？涉群危基帶你瞭解監控資本主義，和個資的重要");
        $('.englishText').html("This is a monitored society and We walk in the seemingly free online world. However, the crisis is approaching step by step... How can you have no foundation Hi everyone Personal data and internet footprint Now it is more important than oil and other resources Are you still sending out your personal data unconditionally? Social crisis Take you to understand surveillance capitalism And the importance of personal information");
        $('.leftSide img').attr('src','image/socialcrisis.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if ($(this).attr('id') == 'drive') {
        $('.chineseName').html("ㄏㄚˊ士騎");
        $('.englishName').html("Defensive driving");
        $('.chineseText').html("我們是ㄏㄚˊ士奇，常說馬路如虎口，但是道路上發生的車禍還是層出不窮，尤其事機車騎士，發生車禍造成的傷害都是我們無法預料的，為了降低事故甚至憾事的發生，我們將製作相關有趣風格的知識型短片，希望大家能對防衛性駕駛重新產生興趣，並且重視這件事情。");
        $('.englishText').html("Hi,we are HUSKY_MOTO. We always know that the road is dangerous. However, there are still an endless stream of traffic accidents on the road, especially motorcycle riders. The injuries caused by car accidents are unpredictable.We will produce relevant and interesting styles of knowledge-based short films to reduce the occurrence of accidents.We hope everyone will be interested in defensive driving and pay attention to this matter.");
        $('.leftSide img').attr('src','image/defensivedriving.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if ($(this).attr('id') == 'sink') {
        $('.chineseName').html("沉淪新機");
        $('.englishName').html("sink into phone");
        $('.chineseText').html("我們是世新大學的資傳系畢業製作，手機成癮在現代成為許多人的問題，我們針對這個問題去研究，並找出相關的解決方案。");
        $('.englishText').html("");
        $('.leftSide img').attr('src','image/sinkintophone.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if ($(this).attr('id') == 'cullet') {
        $('.chineseName').html("蜘網");
        $('.englishName').html("Cullet");
        $('.chineseText').html("訊息滴滴滴滴滴滴滴滴……當然是沒有那個耐心一條條看完，新聞Boomboomboomboom……，怎麽會有那個時間瞭解所有啊！沒關係，蜘網整合論壇和聊天，推出新功能！");
        $('.englishText').html("The information explosion makes contemporary young people anxious about timely information.Reading like a machine not only infringes people's ability to think, but also manufactures loneliness. In response to the above, CULLET are committed to integrate forums and chatroom. We launches new functions!");
        $('.leftSide img').attr('src','image/cullet.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }else if ($(this).attr('id') == 'tdot') {
        $('.chineseName').html("桌點子");
        $('.englishName').html("T.dot");
        $('.chineseText').html("我們致力創造一個線上桌遊整合平台，結合桌遊測驗及線上論壇，讓你在玩桌遊時不再有選擇困難!!「桌點子，激發你的新點子!」");
        $('.englishText').html("We've been committed to creating an online platform of tabletop game. By combining tabletop game tests and online forum, you'll never torn between choosing tabletop game and understanding tabletop game.");
        $('.leftSide img').attr('src','image/tdot.png');
        $('#audioC').attr('src','audio/wave.mp3');
        $('#audioE').attr('src','audio/sample.mp3');
    }
    event.preventDefault();
});

$(".popup-close").click(function() {
    closeWindow();
});

function closeWindow(){
    $(".popup-wrap").fadeOut(200);
    $(".popup-box").removeClass("transform-in").addClass("transform-out");
    event.preventDefault();
}

//Smooth scroll effect
$('#groupName a').on('click', function(e){
    if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
    }
});

$('.phoneFloor p').on('click', function(e){
    if($('.phoneFloor p').attr('data-navigate') !== ''){
        e.preventDefault();

        var hash = $('.phoneFloor p').attr('data-navigate');
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
    }
});

//audio control section
$('.close-btn').on('click', function(){
    $('audio').each(function(){
        $('audio').removeAttr('controls','controls');
        this.pause(); // Stop playing
        this.currentTime = 0; // Reset time
    });
});

function playTour(audioId){
    $('audio').each(function(){
        /*$('audio').removeAttr('controls','controls');*/
        this.pause(); // Stop playing
    });
    $(audioId).attr('controls','controls');
};

/*
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
*/

//burger animation
function show(){
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('.data').classList.toggle('active');
}

$(window).on('load', function(){
    document.querySelector('.map').classList.toggle('active');
    document.querySelector('.map2').classList.toggle('active');
});

/*
//position fixed stop point
function checkOffset() {
    if($('.floor').offset().top + $('.floor').height() >= $('.map').offset().top){
        $('.floor').css('position', 'absolute');
    }
    if($(document).scrollTop() < $('.map').offset().top){
        $('.floor').css('position', 'fixed');
    }
}

$(document).scroll(function() {
    checkOffset();
});
*/

















