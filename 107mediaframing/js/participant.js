//preloader//
$(window).on('load', function(){
    var image = new Image()
    image.onload = function () {
        if (document.readyState !== "complete") {
            document.querySelector("body").style.visibility = "hidden";
            document.querySelector(".loading").style.visibility = "visible";
        } else {
            document.querySelector(".loading").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }
    }
    image.src = 'image/reversebyaball.png'
});

//RWD extend
if($( window ).width() <= 720) { 
    $(".cover img").attr("src","https://i.imgur.com/XnkHJea.png");

    var tl2 = new TimelineMax();
    tl2.to(".thumb",1,{
        bottom: "5%",
        display: "flex",
        ease: Expo.easeInOut
    });

    tl2.reverse();
    $(document).on("click", ".extend", function() {
        tl2.reversed(!tl2.reversed());
    });

    $(document).on("click", ".thumb li", function() {
      tl2.reversed(!tl2.reversed());
    });
}

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

//selector
let el = document.querySelectorAll('.thumb li')
for (let i=0; i < el.length; i++){
	 el[i].onclick = function(){
	 	var c = 0;
	 	while(c < el.length){
	 		el[c++].className = 'check';
	 	}
	 	el[i].className = 'check active';
        /*if($( window ).width() > 991){
            if (el[1].className == 'check active') {
                document.querySelector('.bg').className = 'bg special';
            }else{
                document.querySelector('.bg').className = 'bg';
            }
        }else if($( window ).width() <= 991){
            if (el[1].className == 'check active') {
                document.querySelector('.bg').style.background = '#b3bda2';
            }
        }*/
    }
}

//content code
function imgSlider(anything){
	document.querySelector('.imgBx .logo').src = anything;
}

function changeBgColor(color){
	const bg = document.querySelector('.bg');
	bg.style.background = color;
}

function change_text1(){
    document.getElementById("title").innerHTML = "人造風向";
    document.getElementById("introduce").innerHTML = "在廣大的網路風場中，真假訊息難辨，本團隊扣連網路社群引起的議題風向與引導輿論的社會現象，利用不同社群/傳播管道引發群眾討論與反思，最終引領閱聽眾產生「新的觀點，新的風向」。";
    document.getElementById("fb").href = "https://www.facebook.com/ics.mediaframing";
    document.getElementById("ig").href = "https://www.instagram.com/107ics.media_framing/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "none";
}

function change_text2(){
    document.getElementById("title").innerHTML = "蔬情";
    document.getElementById("introduce").innerHTML = "「讓我們把最蔬情的故事，說給你聽。」希望藉由平台推廣小農產品，透過影音刻畫人物故事，使情感成為一個成功的包裝，更樂見小農們藉由願意分享自身故事獲取一些寶貴心得。";
    document.getElementById("fb").href = "https://www.facebook.com/farminlove2021";
    document.getElementById("ig").href = "https://www.instagram.com/farminlove2021/";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UCqzttcoP691_7RkIovTlAoA";
    document.getElementById("line").href = "https://lin.ee/0hl3pbx";
    document.getElementById("web").href = "https://farm-inlove.com/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("line").style.display = "block";
    document.getElementById("sp").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text3(){
    document.getElementById("title").innerHTML = "長大才不會懂";
    document.getElementById("introduce").innerHTML = "「你真的知道嗎？網路上說的是真的嗎？」在台灣性教育屬於普遍被迴避的課題，許多人都是長大之後才從各種不同的管道獲取性知識，而我們所架設的平台會提供獲取正確性知識的管道，並試圖讓台灣在面臨「性」時的態度能逐漸開放且健康。#你真的懂了嗎？";
    document.getElementById("fb").href = "https://www.facebook.com/%E9%95%B7%E5%A4%A7%E6%89%8D%E4%B8%8D%E6%9C%83%E6%87%82-105418818385188/";
    document.getElementById("ig").href = "https://www.instagram.com/idk_0120/?utm_medium=copy_link";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UC6D983LvFPvn19Iy4o0cAoQ";
    document.getElementById("pd").href = "https://podcasts.apple.com/tw/podcast/something-need-to-know/id1574641723";
    document.getElementById("sp").href = "https://open.spotify.com/show/0SDIBAan45HGL2bI463i5E?si=c422c002a8514fd9&nd=1";
    document.getElementById("web").href = "https://growupunderstand.com/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "block";
    document.getElementById("sp").style.display = "block";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text4(){
    document.getElementById("title").innerHTML = "涉群危基";
    document.getElementById("introduce").innerHTML = "這是一個被監控的社會我們遊走在看似自由的網路世界然而危機步步逼近.......沒有基礎怎麼可以大家好我們是涉群危基個人的資料和網路的足跡如今已經比石油等等的資源還要重要了你還在把個人資料無條件的送出去嗎？涉群危基帶你瞭解監控資本主義和個資的重要";
    document.getElementById("ig").href = "https://instagram.com/ics_social_crisis?utm_medium=copy_link";
    document.getElementById("web").href = "https://icssocialcrisis.wordpress.com/";
    document.getElementById("fb").style.display = "none";
    document.getElementById("yt").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text5(){
    document.getElementById("title").innerHTML = "拾刻．時客 ";
    document.getElementById("introduce").innerHTML = "以充滿愛與回憶卻不知如何表達的「時刻家族」帶入主題；以網站提供大家把話語、情感寄送到未來；以影音紀錄城市中不同故事的回憶；以社群經營與時客們交流。「拾刻 · 時客，為你紀錄每個時刻！」";
    document.getElementById("fb").href = "https://www.facebook.com/timecapture.ics";
    document.getElementById("ig").href = "https://www.instagram.com/timecapture.ics/";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UCfJxOKQd2DOC7X9ThLhCtHA";
    document.getElementById("web").href = "https://timecapture.com.tw/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text6(){
    document.getElementById("title").innerHTML = "留聲跡";
    document.getElementById("introduce").innerHTML = "你是否也有能勾起你回憶的聲音呢？我們將提供一個平台讓你可以保存和分享聲音以及背後的故事。留聲跡希望與你一同留下屬於你聲音的足跡。";
    document.getElementById("fb").href = "https://www.facebook.com/%E7%95%99%E8%81%B2%E8%B7%A1-100123572290088/";
    document.getElementById("ig").href = "https://instagram.com/save.andsound?utm_medium=copy_link";
    document.getElementById("web").href = "https://saveandsound.azurewebsites.net/home.jsp";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text7(){
    document.getElementById("title").innerHTML = "袂記";
    document.getElementById("introduce").innerHTML = "近年來因為環境及時代變遷，台語與我們的距離變得越來越遠、甚至可能消失。所以「袂記 bē-kì」藉由成立品牌的方式整合多媒體管道，推出各項產品及內容，讓社會大眾了解台語正逐漸式微的事實，「予台語重回咱ê生活」。";
    document.getElementById("fb").href = "https://www.facebook.com/%E8%A2%82%E8%A8%98-b%C4%93-k%C3%AC-100271082251156";
    document.getElementById("ig").href = "https://www.instagram.com/be.ki__/";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UCshAh0e5QoEE-DerayzR8XA";
    document.getElementById("pd").href = "https://podcasts.apple.com/tw/podcast/%E9%96%8B%E8%AC%9B/id1567786004?l=en";
    document.getElementById("sp").href = "https://open.spotify.com/show/4JwJOjXmdQ3IcjDiGa9VdK?si=vuyR-OhpQRSd_JYH8u1sZw&dl_branch=1";
    document.getElementById("web").href = "https://beki.website/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "block";
    document.getElementById("sp").style.display = "block";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text8(){
    document.getElementById("title").innerHTML = "桌點子";
    document.getElementById("introduce").innerHTML = "我們致力創造一個線上桌遊整合平台，結合桌遊測驗及線上論壇，讓你在玩桌遊時不再有選擇困難!!「桌點子，激發你的新點子!」";
    document.getElementById("fb").href = "https://www.facebook.com/Tdot-%E6%A1%8C%E9%BB%9E%E5%AD%90-108555258175268/?ref=page_internal";
    document.getElementById("ig").href = "https://www.instagram.com/t.dot_107/";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UCMs_CWhgBNHjc5rxblcdz2w/videos";
    document.getElementById("web").href = "https://tdot107.com/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text9(){
    document.getElementById("title").innerHTML = "蜘網";
    document.getElementById("introduce").innerHTML = "訊息滴滴滴滴滴滴滴滴……<br/>當然是沒有那個耐心一條條看完<br/>新聞Boomboomboomboom……<br/>怎麽會有那個時間瞭解所有啊！<br/>沒關係，蜘網整合論壇和聊天，推出新功能！";
    document.getElementById("ig").href = "https://www.instagram.com/z.cullet_/";
    document.getElementById("yt").href = "";
    document.getElementById("fb").style.display = "none";
    document.getElementById("yt").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "none";
}

function change_text10(){
    document.getElementById("title").innerHTML = "廟嶼";
    document.getElementById("introduce").innerHTML = "我們是廟嶼，宮廟的「廟」島嶼的「嶼」，專門介紹宮廟文化的科普和冷知識的推廣，以宮廟冷知識作為主軸製作網頁和相關文章推廣宮廟文化，使年輕一輩的社會大眾對其有更深入的認識，重新對宮廟文化引起興趣。";
    document.getElementById("fb").href = "https://www.facebook.com/%E5%BB%9F%E5%B6%BC-Temple-Islands-107538774931012";
    document.getElementById("ig").href = "https://www.instagram.com/templeislands/";
    document.getElementById("web").href = "https://templesisland.com/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "none";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "block";
}

function change_text11(){
    document.getElementById("title").innerHTML = "ㄏㄚˊ士騎";
    document.getElementById("introduce").innerHTML = "我們是ㄏㄚˊ士騎，常說馬路如虎口，但是道路上發生的車禍還是層出不窮，尤其是機車騎士，發生車禍造成的傷害都是我們無法預料的，為了降低事故甚至憾事的發生，我們將製作相關有趣風格的知識型短片，希望大家能對防衛性駕駛重新產生興趣，並且重視這件事情。";
    document.getElementById("fb").href = "https://www.facebook.com/profile.php?id=100070647199484";
    document.getElementById("ig").href = "https://www.instagram.com/husky_moto_rider/";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UC1F6HVaQR1AxGh3TVgGvPGw";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "none";
}

function change_text12(){
    document.getElementById("title").innerHTML = "沈淪新機";
    document.getElementById("introduce").innerHTML = "我們是世新大學的資傳系畢業製作，手機成癮在現代成為許多人的問題，我們針對這個問題去研究，並找出相關的解決方案。";
    document.getElementById("fb").href = "https://www.facebook.com/沈淪新機-104273178610507/";
    document.getElementById("ig").href = "https://www.instagram.com/iiiinnt__110/";
    document.getElementById("yt").href = "https://youtube.com/channel/UC6rYcWdWMRmTy30-uwYP_7g";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "none";
}

function change_text13(){
    document.getElementById("title").innerHTML = "球生";
    document.getElementById("introduce").innerHTML = "「球生，用籃球改變你的人生」我們想藉由拍影片的方法讓更多人了解，不只有頂尖運動員，基層運動員也很努力，並且他們藉由籃球，翻轉了自己的人生，即便他以後不是繼續成為職業球員，也是藉由籃球改變了人生。並且也希望能讓更多人發現有很多默默努力的基層運動員。";
    document.getElementById("fb").href = "https://www.facebook.com/%E7%90%83%E7%94%9F-101608288874782";
    document.getElementById("ig").href = "https://www.instagram.com/reverse_by_a_ball/";
    document.getElementById("yt").href = "https://www.youtube.com/channel/UC1mcJnbWW0dA2DrNW0DThDw";
    document.getElementById("fb").style.display = "block";
    document.getElementById("yt").style.display = "block";
    document.getElementById("pd").style.display = "none";
    document.getElementById("sp").style.display = "none";
    document.getElementById("line").style.display = "none";
    document.getElementById("web").style.display = "none";
}