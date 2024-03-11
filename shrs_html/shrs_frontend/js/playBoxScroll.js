var lastScrollTop=0,
	hoverStatusA=false,
	hoverStatusB=false,
	switchBox='.playerbox',
	switchClass='marHide';

$(document).ready(function(){
	switchPlayBox();
	
	$(' .header, '+switchBox).hover(function(){
		if( 'none'==$('.menu_btn').css('display') ){
			var thisClass=$(this).attr('class');
			if( 'header'==thisClass ) hoverStatusA=true;
			if( 'playerbox marHide'==thisClass ) hoverStatusB=true;
			switchPlayBox();
		}
	}, function(){
		if( 'none'==$('.menu_btn').css('display') ){
			var thisClass=$(this).attr('class');
			if( 'header'==thisClass ) hoverStatusA=false;
			if( 'playerbox'==thisClass ) hoverStatusB=false;
			switchPlayBox();
		}
	});
});

$(window).load(function(){
	resizeBannerTop();
});

$(window).scroll(function(event){
	switchPlayBox();
});

$(window).resize(function(){
	resizeBannerTop();
});

//首頁Banner Padding-Top調整
function resizeBannerTop(){
	if( 'none'==$('.tds-a').css('float') ){
		if( $('.bannerbox:eq(0)').length ) {
			$('.bannerbox:eq(0)').css('padding-top', $('.playerbox').height()/*+10*/);
		}else{
			$('.contents').css('padding-top', $('.playerbox').height()/*+10*/);
		}
	}else{
		if( $('.bannerbox:eq(0)').length ) {
			$('.bannerbox:eq(0)').css('padding-top', '');
		}else{
			$('.contents').css('padding-top', '');
		}
	}
}

//上方廣播縮放
function switchPlayBox(){
	var st = $(this).scrollTop(),
		bannerPadding=parseInt( $('.bannerbox').css('padding-top') );
	if( isNaN(bannerPadding) ) bannerPadding=0;
	
	if( 0==bannerPadding ){
		if( hoverStatusA | hoverStatusB | (0==st) | ( st < lastScrollTop) ){
			$(switchBox).removeClass(switchClass);
		}else{
			$(switchBox).addClass(switchClass);
		}
	}else{
		if( bannerPadding<=st ){
			if( hoverStatusA | hoverStatusB | ( st < lastScrollTop) ){
				$(switchBox).removeClass(switchClass);
			}else{
				$(switchBox).addClass(switchClass);
			}
		}else{
			$(switchBox).removeClass(switchClass);
		}
	}
	
	lastScrollTop = st;
}
