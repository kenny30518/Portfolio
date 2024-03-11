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

$("img .lazy").lazyload({
	effect : "fadeIn"
});

//setTimeOut refresh
/*let time = new Date().getTime();
const setActivityTime = (e) => {
   time = new Date().getTime();
}
document.body.addEventListener("mousemove", setActivityTime);
document.body.addEventListener("keypress", setActivityTime);

const refresh = () => {
   if (new Date().getTime() - time >= 60000) {
      window.location.reload(true);
   } else {
      setTimeout(refresh, 10000);
   }
}

setTimeout(refresh, 10000);*/

/*const swingRadius = gsap.getProperty("body", "--radius"); // gets the radius var from CSS... useful for this example's flexability. 
const transformOriginValue = '50% -' + swingRadius + 'vh';
tl.from('.sign', {
	duration: 10, rotation: '-10deg', 
	transformOrigin: transformOriginValue, 
	ease: 'elastic.out(3, 0.1)'
})*/

$(window).on('load', function(){
	$('html, body').animate({
        scrollTop: $('.s1').offset().top
 	},800);
});

$('.arrow').on('click', function(e){
	if(this.hash !== ''){
        e.preventDefault();

        const hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        },800);
    }
});

var isPressed = false;
$(document).keydown(function(event) {
    if (!isPressed & event.keyCode === 13) {
        $(".startButton").click();
        isPressed = true;
    }
});

$(document).on("keydown", event => {
    if (isPressed & event.keyCode === 13) {	
        event.preventDefault();
    }
});

var tabIsPressed = true;
$(document).on("keydown", event => {
    if (tabIsPressed & event.keyCode === 9) {	
        event.preventDefault();
    }
});

$('.startButton').on('click', function(){
	isPressed = true;
	$('.startButton').css('display','none');
	$('.sign').css('opacity','1');
	const swingRadius = gsap.getProperty("body", "--radius"); // gets the radius var from CSS... useful for this example's flexability. 
	const transformOriginValue = '50% -' + swingRadius + 'vh';
	gsap.from('.sign', 0.5,{
		y: -500
	})

	gsap.from('.sign', {
		duration: 10, rotation: '-10deg', 
		transformOrigin: transformOriginValue, 
		ease: 'elastic.out(3, 0.1)'
	})

	var tl = new TimelineMax(/*{onComplete:scrollDetect}*/)

	tl.fromTo(".introFirst",0.7,{
		autoAlpha: 0
	},{
		autoAlpha: 1
	},"+=1");

	tl.fromTo(".introSecond",0.7,{
		autoAlpha: 0
	},{
		autoAlpha: 1
	},"+=0.2");

	tl.fromTo(".s1 a",0.7,{
		autoAlpha: 0
	},{
		display: "block",
		autoAlpha: 1
	},"+=0.2");
});

$('.s1 a').on('click', function() {
	TweenMax.from('.coffeeImage', 2, {autoAlpha: 0});
	TweenMax.from('.coffeeImage', 2.5, { ease: Bounce.easeOut, y: -500});
	var tl2 = new TimelineMax();

	tl2.fromTo(".s2-1Second",1,{
		autoAlpha: 0
	},{
		autoAlpha: 1
	},"+=3");

	tl2.to('.s2-1Third, .s2-1 .arrow', 1, {
		display: "block",
		autoAlpha: 1
	});
})

$('.s2-1 a').on('click', function() {
	TweenMax.from('.thinkImage', 2, {autoAlpha: 0});
	var tl3 = new TimelineMax();

	tl3.fromTo(".s2 h3, .s2 .arrow",1,{
		autoAlpha: 0
	},{
		display: "block",
		autoAlpha: 1
	},"+=1");
})

$('input:radio[name="gender"], input:radio[name="sour"]').change(function(){
    if ($(this).is(':checked')) {
        var tl4 = new TimelineMax();

		tl4.to(".s3 .arrow", 1, {
			display: "block",
			autoAlpha: 1
		});
    }
});

$('input:radio[name="sour"]').change(function(){
    if ($(this).is(':checked')) {
        var tl5 = new TimelineMax();

		tl5.to(".s4 .arrow", 1, {
			display: "block",
			autoAlpha: 1
		});
    }
});

$('input:radio[name="bitter"]').change(function(){
    if ($(this).is(':checked')) {
        var tl6 = new TimelineMax();

		tl6.to(".s5 .arrow", 1, {
			display: "block",
			autoAlpha: 1
		});
    }
});

$('input:radio[name="caffeine"]').change(function(){
    if ($(this).is(':checked')) {
        var tl7 = new TimelineMax();

		tl7.to(".s6 .arrow", 1, {
			display: "block",
			autoAlpha: 1
		});
    }
});

$('input:radio[name="cup"]').change(function(){
    if ($(this).is(':checked')) {
        var tl8 = new TimelineMax();

		tl8.to(".s7 .arrow", 1, {
			display: "block",
			autoAlpha: 1
		});
    }
});

/*function scrollDetect(){
	$('html, body').on('scroll touchmove mousewheel', function(e) {
        $('html, body').animate({
            scrollTop: $('.s2-1').offset().top
        },800);
        
        TweenMax.from('.coffeeImage', 2, {autoAlpha: 0});
		TweenMax.from('.coffeeImage', 2.5, { ease: Bounce.easeOut, y: -500});
		var tl2 = new TimelineMax();

		tl2.fromTo(".s2-1Second",1,{
			autoAlpha: 0
		},{
			autoAlpha: 1
		},"+=3");

        $('html, body').off('scroll touchmove mousewheel');
	});
}*/

$('.s1 a').on('click', function() {
	$('html, body').off('scroll touchmove mousewheel');
})

//section 3 radio control
$(document).ready(function(){
	$('.s3Check input[type="radio"]').change(function(){
  
    	if(this.checked){
			$('.s3Check input[type="radio"]').not(this).prop('checked', false);
    	}
	});

	$('.s4Check input[type="radio"]').change(function(){
  
    	if(this.checked){
			$('.s4Check input[type="radio"]').not(this).prop('checked', false);
    	}
	});

	$('.s5Check input[type="radio"]').change(function(){
  
    	if(this.checked){
			$('.s5Check input[type="radio"]').not(this).prop('checked', false);
    	}
	});

	$('.s6Check input[type="radio"]').change(function(){
  
    	if(this.checked){
			$('.s6Check input[type="radio"]').not(this).prop('checked', false);
    	}
	});

	$('.s7Check input[type="radio"]').change(function(){
  
    	if(this.checked){
			$('.s7Check input[type="radio"]').not(this).prop('checked', false);
    	}
	});
});

/*
//section 7 radio control
$(document).ready(function(){
	$('.s7Check input[type="radio"]').change(function(){
		if(this.checked){
			$('.s7Check input[type="radio"]').not(this).prop('checked', false);
    	}

    	var cup = $('.s7Check input[type="radio"]:checked').val();
    	if (cup == "milk") {
    		$('.cup-mug').css('opacity', '1');
    		$('.cup-glass').css('opacity', '0');
    		$('.cup-beer').css('opacity', '0');
    	}else if (cup == "glass") {
    		$('.cup-mug').css('opacity', '0');
    		$('.cup-glass').css('opacity', '1');
    		$('.cup-beer').css('opacity', '0');
    	}else if (cup == "beer") {
    		$('.cup-mug').css('opacity', '0');
    		$('.cup-glass').css('opacity', '0');
    		$('.cup-beer').css('opacity', '1');
    	}
	});
});*/

function getGender() {
	var gender = $('.gender:checked').val();
	if (gender == "M") {
		return '你';
	}else if (gender == "F") {
		return '妳';
	}else if (gender == "O") {
		return '獨特的你';
	}
}

//slider background color control
$('.slider' ).on( 'input', function( ) {
	$( this ).css( 'background', 'linear-gradient(to right, #5aa6a5 0%, #5aa6a5 '+this.value +'%, #fff ' + this.value + '%, white 100%)' );
});

//get slider value and convert it to text
function getSour() {
	var sour = $('.sour:checked').val();
	if (sour == 'sourLight') {
		return '微酸/';
	}else if (sour == 'sourMedium') {
		return '酸/';
	}else if (sour == 'sourThick') {
		return '最酸那種/';
	}
}

//section 5 slider value
function getBitterValue() {
	var bitter = $('.bitter:checked').val();
	if (bitter == 'bitterLight') {
		return '不苦/';
	}else if (bitter == 'bitterMedium') {
		return '苦/';
	}else if (bitter == 'bitterThick') {
		return '跟人生一樣苦/';
	}
}

//section 6 slider value
function getCupValue() {
	var cup = $('.cup:checked').val();
	if (cup == "mug") {
		return ['創意馬克杯', '冒險與創意', 'image/mug.png'];
	}else if (cup == "glass") {
		return ['透明玻璃杯', '質感與浪漫', 'image/glass.png'];
	}else if (cup == "beer") {
		return ['豪邁啤酒杯', '熱血與故事', 'image/beer.png'];
	}
}

//section 7 radio value
function getCaffeineValue() {
	var caffeine = $('.caffeine:checked').val();
	if (caffeine == 'caffeineLight') {
		return ['低', '不受拘束且自由的靈魂，容易親近'];
	}else if (caffeine == 'caffeineMedium') {
		return ['中', '不過分張揚的努力型天才，是大家永遠依靠'];
	}else if (caffeine == 'caffeineThick') {
		return ['高', '做事有原則的邏輯鬼才，享受獨處時光'];
	}
}

function afterprint() {
	$('.toTopLeft').css('display', 'none');

	$('.thanks').css('display', 'block');
	gsap.to('.thanks', 1, {
		autoAlpha: 1
	});

	$('.backToHome').css('display', 'block');
	gsap.to('.backToHome', 1, {
		autoAlpha: 1
	});

	setTimeout(() => { 
        location.reload();
    }, 60000);
}

function printTicket() {
	$('.create').css('display', 'none');
	document.querySelector('.hide').classList.toggle('active');
	document.querySelector('.toTopLeft').classList.toggle('print');
	$('.stub').css('display','block');
	window.print();
}

//section 8 text value
function createTicket() {
	var currentVal = $('#coffeeName').val();
	if (currentVal == '') {
		$('.generate img').css('opacity','0');
		alert('請輸入名稱!');
	}else {
		var tl9 = new TimelineMax();
		tl9.to('.generate img', 0.5,{
			autoAlpha: 1,
			rotation: -45
		});

		tl9.to('.generate img', 0.5,{
			rotation: 0
		});

		tl9.to('.generate img', 0.5,{
			autoAlpha: 1,
			rotation: -45
		});

		tl9.to('.generate img', 0.5,{
			rotation: 0
		});

		$('.result').html(generateResult());

		$('.coffeeTitle').html(currentVal + ' 咖啡');

		var cup = getCupValue();
		var cupImage = cup[2];
		$('.cupImage').attr('src', cupImage);

		var cupType = cup[0];
		var cupResult = cup[1];
		$('.cupType').html(cupType);

		var caffeine = getCaffeineValue();
		var caffeineLevel = caffeine[0];
		var caffeineResult = caffeine[1];
		$('.flavor').html('酸度-' + getSour() + '風味-' + getBitterValue() + '咖啡因含量-' + caffeineLevel);

		$('.final').html(getGender() + '是' + caffeineResult + '，且生活充滿' + cupResult + '。');

		$('.printTime').html('票券印製時間：' + new Date());
		
		setTimeout(() => { 
			$('html, body').animate({
	            scrollTop: $('.s9').offset().top
	        },800);
	    }, 3000);
	}
}

let results = ['一個華麗的轉身就會捲起一陣輕風，預測不久之後遙遠的他方會有颶風。',
			   '走路帶風，凡是經過任何地方，風力都能把身邊的人吹起來逆時針轉三個圈。',
			   '臉朝下撲街的時候，會由下往上揚起一陣風，路過的人都會察覺，然後被塵土嗆到。',
			   '打排球準備殺球時，手向下揮動所產生的風，足以拍飛三個大學生。',
			   '在公司或學校放屁，風力所傳遞的氣味，可以貫穿整個101。',
			   '心情不好時嘆了一口氣所產生的風，會成為上升氣流；如果讓上帝聽見，祂會為你哭泣。'];

function generateResult() {
	var result = results[Math.floor(Math.random()*results.length)];
	return result;
}

$('.backToHome').on('click', function() {
	location.reload();
})





//ticket
let ticketresults = ['一個華麗的轉身就會捲起一陣輕風，\n預測不久之後遙遠的他方會有颶風。\n',
			   '走路帶風，凡是經過任何地方，\n風力都能把身邊的人吹起來逆時針轉三個圈。\n',
			   '臉朝下撲街的時候，會由下往上揚起一陣風，\n路過的人都會察覺，然後被塵土嗆到。\n',
			   '打排球準備殺球時，\n手向下揮動所產生的風，足以拍飛三個大學生。\n',
			   '在公司或學校放屁，\n風力所傳遞的氣味，可以貫穿整個101。\n',
			   '心情不好時嘆了一口氣所產生的風，會成為上升氣流；\n如果讓上帝聽見，祂會為你哭泣。\n'];

function generateTicketResult() {
	var ticketResult = ticketresults[Math.floor(Math.random()*ticketresults.length)];
	return ticketResult;
}

//section 7 getCaffeine for ticket
function getCaffeine() {
	var x = document.getElementById("s6Slider");
	var currentVal = parseInt(x.value);
	if (currentVal == 0) {
		return ['低', '不受拘束且自由的靈魂，\n容易親近'];
	}else if (currentVal == 50) {
		return ['中', '不過分張揚的努力型天才，\n是大家永遠依靠'];
	}else if (currentVal == 100) {
		return ['高', '做事有原則的邏輯鬼才，\n享受獨處時光'];
	}
}

/*
function send() {
	document.querySelector('.hide').classList.toggle('active');
	document.querySelector('.toTopLeft').classList.toggle('print');
	window.print();

	var currentVal = $('#coffeeName').val();
	var cup = getCupValue();
	var cupType = cup[0];
	var cupImage = cup[2];
	var caffeine = getCaffeineValue();
	var caffeineLevel = caffeine[0];
	var caffeineResult = caffeine[1];
	const conector = new ConectorPlugin();
	let sohai = "人造風向";
	conector.establecerTamanioFuente(1, 1);
    conector.establecerEnfatizado(0);
    conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
	conector.feed(1);
	conector.texto(sohai+"\n");
	conector.texto(generateTicketResult());
	conector.feed(1);
	conector.establecerTamanioFuente(1, 1);
	conector.establecerEnfatizado(0);
	conector.texto("--------------------------------\n");
	conector.feed(1);
	conector.establecerTamanioFuente(2, 2);
	conector.establecerEnfatizado(1);
	conector.texto(currentVal + "咖啡\n");
	conector.imagenLocal("C:\\Users\\KennyChen\\Desktop\\107mediaframing\\"+cupImage);
	conector.feed(3);
	conector.feed(1);
	conector.establecerTamanioFuente(1, 1);
	conector.establecerEnfatizado(0);
	conector.texto(cupType);
	conector.feed(1);
	conector.texto("酸度-" + getSour() + "風味-" + getBitterValue() + "咖啡因含量-" + caffeineLevel + "\n");
	conector.texto(caffeineResult);
	conector.feed(2);
	conector.texto("--------------------------------\n");
	conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
	conector.texto("|店家1名稱|\n");
	conector.texto("xxx飲料/大杯 折扣5元\n");
	conector.texto("|店家2名稱|\n");
	conector.texto("xxx飲料/大杯 折扣5元\n");
	conector.texto("|店家3名稱|\n");
	conector.texto("xxx飲料/大杯 折扣5元\n");
	conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionDerecha)
	conector.texto("世新大學資訊傳播學系畢展《人造風向》製");
	conector.cortar();
    conector.imprimirEn("CP-Q1T");
}*/






























