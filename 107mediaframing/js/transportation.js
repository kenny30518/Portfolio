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

//change content by screen width
$(window).on('load', function(){
    if($( window ).width() <= 1066){
        document.getElementById("railContent").innerHTML = "<p>觀眾自捷運淡水信義線（紅線）至中山站下車，於 2 號出口出站後，步行至，往前行走約 200 公尺，右手邊出現世新資傳畢展看板，即抵達PPP時尚藝文空間。</p>";
    }else {
        document.getElementById("railContent").innerHTML = "<p>觀眾自捷運淡水信義線（紅線）至中山站下車，於 2 號出口出站後，<br/>步行至，往前行走約 200 公尺，右手邊出現世新資傳畢展看板，<br/>即抵達PPP時尚藝文空間。</p>";
    }
});

$( window ).resize(function() { 
    if($( window ).width() <= 1066){
        document.getElementById("railContent").innerHTML = "<p>觀眾自捷運淡水信義線（紅線）至中山站下車，於 2 號出口出站後，步行至，往前行走約 200 公尺，右手邊出現世新資傳畢展看板，即抵達PPP時尚藝文空間。</p>";
    }else {
        document.getElementById("railContent").innerHTML = "<p>觀眾自捷運淡水信義線（紅線）至中山站下車，於 2 號出口出站後，<br/>步行至，往前行走約 200 公尺，右手邊出現世新資傳畢展看板，<br/>即抵達PPP時尚藝文空間。</p>";
    }
});

/*//change svg by screen width
$(window).on('load', function(){
    if($( window ).width() <= 530){
        document.querySelector(".svgWrapper").innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1489.92 1237.94\"><defs><style>.cls-1{isolation:isolate;}.cls-2{opacity:0.5;mix-blend-mode:multiply;}.cls-3{fill:#231815;}.cls-4{fill:#607474;}.cls-5{fill:#739c94;}.cls-10,.cls-6,.cls-8,.cls-9{fill:#fff;}.cls-7{fill:#f9cd8c;}.cls-10,.cls-8,.cls-9{font-size:35.4px;font-family:NotoSansTC-Bold-83pv-RKSJ-H, Noto Sans TC;}.cls-8{letter-spacing:0.2em;}.cls-9{letter-spacing:0.1em;}.cls-10{letter-spacing:0.1em;}</style></defs><title>map</title><g class=\"cls-1\"><g id=\"圖層_7\" data-name=\"圖層 7\"><g class=\"cls-2\"><path class=\"cls-3\" d=\"M482.65,981.46,449.9,1567.39l881.55,227.47,54.87-813.4L882.71,962s2.65,34.52-58.42,33.63S482.65,981.46,482.65,981.46Z\" transform=\"translate(-220.22 -727)\"/></g><path class=\"cls-4\" d=\"M482.65,968.19,449.9,1554.11l881.55,227.47,54.87-813.39L882.71,948.71s2.65,34.52-58.42,33.64S482.65,968.19,482.65,968.19Z\" transform=\"translate(-220.22 -727)\"/><g class=\"cls-2\"><polygon class=\"cls-3\" points=\"208.88 13.28 164.63 825.79 0.89 787.73 0.89 13.28 208.88 13.28\"/></g><polygon class=\"cls-4\" points=\"208.88 0 164.63 812.51 0.89 774.45 0.89 0 208.88 0\"/><g class=\"cls-2\"><polygon class=\"cls-3\" points=\"0 841.72 161.97 886.86 146.04 1237.94 0 1237.94 0 841.72\"/></g><polygon class=\"cls-4\" points=\"0 828.44 161.97 873.58 146.04 1224.66 0 1224.66 0 828.44\"/><g class=\"cls-2\"><polygon class=\"cls-3\" points=\"229.24 904.56 208.88 1237.94 1099.28 1237.94 1104.87 1120.39 229.24 904.56\"/></g><polygon class=\"cls-4\" points=\"229.24 891.28 208.88 1224.66 1099.28 1224.66 1104.87 1107.11 229.24 891.28\"/><g class=\"cls-2\"><path class=\"cls-3\" d=\"M494.15,740.28H944.84l-7,192.44-87.51-6.28s16.56,38.25-84.13,35.55-282.5-16.69-282.5-16.69Z\" transform=\"translate(-220.22 -727)\"/></g><path class=\"cls-4\" d=\"M494.15,727H944.84l-7,192.44-87.51-6.28s16.56,38.26-84.13,35.55S483.74,932,483.74,932Z\" transform=\"translate(-220.22 -727)\"/><g class=\"cls-2\"><polygon class=\"cls-3\" points=\"763.55 13.72 753.93 206.54 1166.1 224.18 1180.52 13.72 763.55 13.72\"/></g><polygon class=\"cls-4\" points=\"763.55 0.44 753.93 193.26 1166.1 210.91 1180.52 0.44 763.55 0.44\"/><circle class=\"cls-5\" cx=\"988.2\" cy=\"290.75\" r=\"44.25\"/><path class=\"cls-6\" d=\"M1250,1017.75c-.07,17.21-11,33.19-27.25,39.07a41.8,41.8,0,1,1,27.25-39.07c0,3.42,5.32,3.42,5.31,0a47,47,0,0,0-8.67-27.16,47.76,47.76,0,0,0-22.16-16.91,46.92,46.92,0,1,0,30.22,51.52,50.24,50.24,0,0,0,.61-7.45C1255.34,1014.33,1250,1014.33,1250,1017.75Z\" transform=\"translate(-220.22 -727)\"/><circle class=\"cls-7\" cx=\"185.87\" cy=\"857.65\" r=\"77.45\"/><path class=\"cls-6\" d=\"M480.88,1584.65a74.26,74.26,0,1,1-.85-11.42,75.34,75.34,0,0,1,.85,11.42c0,3.42,5.32,3.42,5.31,0a80.28,80.28,0,0,0-14.69-46.23,80.08,80.08,0,0,0-87.35-30.83,80.12,80.12,0,1,0,101.05,89.55,84.24,84.24,0,0,0,1-12.49C486.2,1581.23,480.89,1581.23,480.88,1584.65Z\" transform=\"translate(-220.22 -727)\"/><circle class=\"cls-7\" cx=\"344.48\" cy=\"169.78\" r=\"31.23\"/><path class=\"cls-6\" d=\"M593.28,896.78a28.38,28.38,0,1,1-.3-4.3,27.39,27.39,0,0,1,.3,4.3c0,3.41,5.33,3.42,5.31,0a33.93,33.93,0,1,0-.46,5.53,38,38,0,0,0,.46-5.53C598.61,893.36,593.3,893.35,593.28,896.78Z\" transform=\"translate(-220.22 -727)\"/><rect class=\"cls-7\" x=\"372.01\" y=\"900.03\" width=\"161.09\" height=\"92.93\" transform=\"translate(-740.64 611.91) rotate(-86.41)\"/><path class=\"cls-6\" d=\"M493.89,1027.14l-9.24-.58-22.17-1.39-26.7-1.67-23.2-1.46-7.65-.48c-1.19-.07-2.43-.25-3.63-.23h-.16l2.65,2.66,1-16,2.41-38.47,2.91-46.38,2.52-40.1.83-13.25c.13-2.07.39-4.19.39-6.27a2.45,2.45,0,0,1,0-.27l-2.66,2.65,9.24.58,22.17,1.39,26.7,1.68,23.2,1.45,7.65.48c1.19.08,2.43.25,3.63.23H504L501.32,869l-1,16-2.41,38.47L495,969.91,492.47,1010l-.83,13.25c-.13,2.09-.35,4.19-.39,6.28a2.45,2.45,0,0,1,0,.27,2.66,2.66,0,0,0,5.31,0l1-16L500,975.3l2.91-46.38,2.52-40.1.83-13.25c.13-2.08.35-4.19.39-6.28a2.46,2.46,0,0,1,0-.26,2.71,2.71,0,0,0-2.66-2.66l-9.23-.58-22.18-1.39-26.69-1.67-23.2-1.46c-3.74-.23-7.54-.69-11.29-.71h-.16a2.7,2.7,0,0,0-2.65,2.66l-1,16-2.41,38.47-2.91,46.39-2.52,40.09-.83,13.25c-.13,2.09-.35,4.19-.39,6.28a2.45,2.45,0,0,1,0,.27,2.7,2.7,0,0,0,2.66,2.65l9.23.58,22.18,1.39,26.69,1.68,23.2,1.45c3.74.24,7.54.69,11.29.71h.16a2.66,2.66,0,0,0,0-5.31Z\" transform=\"translate(-220.22 -727)\"/><text class=\"cls-8\" transform=\"translate(34.77 984.53)\">出口1</text><text class=\"cls-8\" transform=\"translate(456.07 1026.13)\">出口2</text><text class=\"cls-8\" transform=\"translate(494.13 842.03)\">出口3</text><text class=\"cls-8\" transform=\"translate(35.13 715.03)\">出口4</text><text class=\"cls-8\" transform=\"translate(263.12 723.43)\">捷運中山站</text><text class=\"cls-8\" transform=\"translate(313.57 343.72)\">中山R7地下街出入口</text><text class=\"cls-9\" transform=\"translate(319.76 89.7)\">Qeeen shop</text><text class=\"cls-10\" transform=\"translate(797.71 457.9)\">PPP時尚藝文空間</text><line class=\"cls-6\" x1=\"247.82\" y1=\"811.63\" x2=\"312.88\" y2=\"752.77\"/><path class=\"cls-6\" d=\"M469.1,1539.68l6.48-5.86,15.48-14,18.82-17,16.27-14.72c2.61-2.37,5.42-4.62,7.89-7.14a1.31,1.31,0,0,1,.12-.11c1.43-1.29-.69-3.4-2.12-2.11l-6.48,5.87-15.48,14-18.82,17L475,1530.33c-2.61,2.36-5.42,4.61-7.89,7.13l-.11.11c-1.43,1.29.69,3.4,2.11,2.11Z\" transform=\"translate(-220.22 -727)\"/><line class=\"cls-6\" x1=\"988.64\" y1=\"397.85\" x2=\"988.64\" y2=\"335.89\"/><path class=\"cls-6\" d=\"M1210.36,1124.85v-62a1.5,1.5,0,0,0-3,0v62a1.5,1.5,0,0,0,3,0Z\" transform=\"translate(-220.22 -727)\"/><line class=\"cls-6\" x1=\"277.03\" y1=\"246.94\" x2=\"364.66\" y2=\"291.19\"/><path class=\"cls-6\" d=\"M496.5,975.23l8.71,4.4,20.94,10.57L551.47,1003l21.88,11.06c3.54,1.78,7,3.65,10.61,5.36l.16.07c1.71.87,3.23-1.71,1.51-2.58l-8.72-4.4L556,1001.93l-25.32-12.79-21.89-11c-3.53-1.79-7-3.66-10.61-5.36l-.15-.08c-1.72-.87-3.23,1.71-1.51,2.58Z\" transform=\"translate(-220.22 -727)\"/></g></g></svg>";
    }else {
        document.querySelector(".svgWrapper").innerHTML = "";
    }
});

$( window ).resize(function() { 
    if($( window ).width() <= 530){
        document.querySelector(".svgWrapper").innerHTML = "";
    }else {
        document.querySelector(".svgWrapper").innerHTML = "";
    }
});*/

//Smooth scroll effect
$('.trafficNav ul li a').on('click', function(e){
    if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
    }
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

var url = [
  ['https://goo.gl/maps/1sAegCmFEWmFEG9Y7'],
  ['https://goo.gl/maps/8udqGagCySYQqzmd7'],
  ['https://goo.gl/maps/jEcZxGQSbTxi9JEj8'],
  ['https://goo.gl/maps/QFgnGBpCryQSWBFF6'],
  ['https://goo.gl/maps/bpuw1QA41HdqJjbF8'],
  ['https://goo.gl/maps/tomKNPRVKGymk7EU6'],
  ['https://goo.gl/maps/ZXnwrGiPZuFaUXzDA'],
  ['https://goo.gl/maps/X41REEWFcyMnHbE78']
];

var locations = [
      ['中山北路二段42巷臨時公有收費停車場', 25.054624239322195, 121.52134100746444],
      ['台壽金融總部大樓停車場', 25.054791742098374, 121.5222702120999],
      ['台灣聯通停車場-國賓場', 25.056986367188102, 121.52245651321016],
      ['NPD中山新光大樓停車場', 25.05542214477433, 121.52178865681292],
      ['全方位停車場 南西站', 25.052592700758446, 121.52171417335363],
      ['應安168停車聯盟', 25.051477799551048, 121.5208597400119],
      ['Times 南京西路64巷機車停車場', 25.052418479287187, 121.5182208986927],
      ['ViVi PARK中山美學停車場', 25.05192355833682, 121.51999458283728]
    ];

var stylers = [
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.business",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi.sports_complex",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
]

//Google map API
function initMap(){
    var centerLat, centerLng;

    if ($( window ).width() <= 830) {
      centerLat = "25.053902494573";
      centerLnt = "121.52212832828542";
    }else{
      centerLat = "25.05359167676702";
      centerLnt = "121.52091296179978";
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: new google.maps.LatLng(centerLat, centerLnt),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: stylers,
    });

    const PPPmarker = new google.maps.Marker({
      position: new google.maps.LatLng(25.053902494573, 121.52212832828542),
      map: map,
      icon: {url:"image/ppp.svg", scaledSize: new google.maps.Size(50, 50)},
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: {url:"image/parking.svg", scaledSize: new google.maps.Size(30, 30)},
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]+"<br/><a href="+url[i]+" target=\"_blank\"\">在Google地圖上查看</a>");
          infowindow.open(map, marker);
        }
      })(marker, i));

      google.maps.event.addListener(PPPmarker, 'click', (function() {
        return function() {
          infowindow.setContent("PPP時尚藝文空間<br/><a href=\"https://goo.gl/maps/mmWasdwEmP58s9Su6\" target=\"_blank\"\">在Google地圖上查看</a>");
          infowindow.open(map, PPPmarker);
        }
      })(marker, i));
    }
}













