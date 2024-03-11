$(document).ready(function(){
	menuMobileSetUp();
	
	if( $('.floatbox').length ){
		scrollToTop();
		rightBoxSet();
	}
});

//右側設定
function rightBoxSet(){
	$(window).scroll(function(){
		rightBoxSwitch();
		scrollToTop();
	});
	
	$(window).resize( function(){
		rightBoxSwitch();
		scrollToTop();
	});
}

//右側浮動計算
function rightBoxSwitch(){
	var rightBox=$('.floatbox'),
		scrollToTopBox = $('.scrollToTop'),
		rightHeight=rightBox.height(),
		windowTop=$(window).scrollTop(),
		windowBootom=windowTop+$(window).height(),
		footerTop=$('.footer').offset().top;
	
	if( windowBootom>=footerTop ){
		rightBox.css('bottom', (windowBootom-footerTop-1000)+'px');
		rightBox.css('opacity', '0');
		scrollToTopBox.css('bottom', (windowBootom-footerTop)+'px');
	}else{
		rightBox.css('bottom', '');
		rightBox.css('opacity', '1');
		scrollToTopBox.css('bottom', '');
	}
}

//scroll to top animation
window.addEventListener('scroll', function(){
	var scroll = document.querySelector('.scrollToTop');
	scroll.classList.toggle("active", window.scrollY > 500)
});

//上滑至頂
$('.scrollToTop').on('click', function(e){
	$('html, body').animate({
		scrollTop: $("html").offset().top
	},800);
});

function scrollToTop(){
	var clickClass = $('.floatbox .btns:eq(0)'),
		scrollToTopTime = 2000,
		scrollTimeRange = parseFloat( $(window).height()/$('body').height() ).toFixed(1);
	
	clickClass.on( 'click', function(e){
		e.preventDefault();
		$('body, html').animate({
			scrollTop: 0
		}, 0.5<=scrollTimeRange ? 1000*scrollTimeRange : 500);
	});
}

//手機選單動作
function menuMobileSetUp(){
	$('.menu_btn').on('click', function(){
		var mbMenuClass='.menubox';
		'none'==$(mbMenuClass).css('display') ? menuMobileSwitch(true) : menuMobileSwitch(false);
	});
	
	$('.linktitle.arrow').on('click', function(){
		if( 'none' != $('.menu_btn').css('display') ){
			var mbMenuItemClass='.linktitle.arrow';
			'none'==$(this).siblings('.dus').css('display') ? menuMobileItemSwitch(true, this) : menuMobileItemSwitch(false, this);
		}
	});

    $('.dus .lists').on('click', function(){
        var mbMenuClass='.menubox';
        'none'==$(mbMenuClass).css('display') ? menuMobileSwitch(true) : menuMobileSwitch(false);
    });

    $('.grids .linktitle:not(.arrow)').on('click', function(){
        var mbMenuClass='.menubox';
        'none'==$(mbMenuClass).css('display') ? menuMobileSwitch(true) : menuMobileSwitch(false);
    });
	
	$(window).resize(function(){
		var mbMenuBtn='.menu_btn';
		if( 'none'==$(mbMenuBtn).css('display') ){
			menuMobileSwitch();
			menuMobileItemSwitch();
		}
	});
}

//手機選單切換
function menuMobileSwitch(switchType){
	var mbMenuClass='.menubox';
	if( null != switchType ) {
		if( switchType ) {
			$('body').css('overflow', 'hidden');
			$(mbMenuClass).css('display', 'block')
						  .css('overflow', 'auto');
		}else{
			$('body').css('overflow', '');
			$(mbMenuClass).css('display', '')
						  .css('overflow', '');
		}
	}else{
		$('body').css('overflow', '');
		$(mbMenuClass).css('display', '')
					  .css('overflow', '');
	}
}

//選項收合
function menuMobileItemSwitch(switchType, thisObj){
	var mbMenuItemClass='.linktitle.arrow';
	if( null != switchType | null !=thisObj ) {
		if( switchType ) {
			$(mbMenuItemClass).siblings('.dus').slideUp();
			$(thisObj).siblings('.dus').slideDown();
		}else{
			if( 'none'==$(thisObj).siblings('.dus').css('display') ){
				$(mbMenuItemClass).siblings('.dus').slideUp();
				$(thisObj).siblings('.dus').slideDown();
			}else{
				$(mbMenuItemClass).siblings('.dus').slideUp();
			}
		}
	}else{
		$(mbMenuItemClass).siblings('.dus').css('display', '');
	}
}

