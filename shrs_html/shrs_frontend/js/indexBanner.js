$(document).ready(function(){
	$('#slides').superslides({
        play: 8000,
		slide_speed: 800,
        animation_easing: 'linear',
		animation: 'slide',
		inherit_width_from: '#topBox',
		inherit_height_from: '#topBox',
		elements: {
			preserve: '.preserve',
			nav: 'div.banner_menu',
			container: '.slides-container',
			pagination: '.dot'
		}
	});
	
	//滑動切換
	/*$('#slides').hammer().on('swipeleft', function() {
		$(this).superslides('animate', 'next');
		checkPointsBox();
	});
	
	//滑動切換
	$('#slides').hammer().on('swiperight', function() {
		$(this).superslides('animate', 'prev');
		checkPointsBox();
	});*/
	
	$('.btnleft').on( 'click', function(){
		$('#slides').superslides('animate', 'prev');
		checkPointsBox();
	});
	$('.btnright').on( 'click', function(){
		$('#slides').superslides('animate', 'next');
		checkPointsBox();
	});
	
	// $('.dot').css('display', 'none');
    $('.pointsbox').css('display', 'none');
	for(var i=0;i<$('.dot').children().length;i++){
		$('.pointsbox').append( '<a href="#" class="btns"></a>' );
	}
	checkPointsBox();
});

function checkPointsBox(){
	$( '.pointsbox .btns.hover' ).removeClass('hover');
	$( '.pointsbox .btns:eq('+$('.dot .current').index()+')' ).addClass('hover');
}

document.ontouchmove = function(e) {
    // e.preventDefault();
};
$('#slides').hammer().on('swipeleft', function() {
    $(this).superslides('animate', 'next');
});

$('#slides').hammer().on('swiperight', function() {
    $(this).superslides('animate', 'prev');
});
