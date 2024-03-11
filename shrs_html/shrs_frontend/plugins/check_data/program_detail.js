$(document).ready(function(){
	$('.elog').on( 'click', '.loglist', function(e){
        e=e||event;
        var targ=e.target||e.srcElement;
        if(targ.name != "playerJournal" && targ.id != "urlJournal"){
            $(this).siblings('.open').toggleClass('open');
            $(this).toggleClass('open');
		}
	});
    // $('.elog').on( 'click', '.playicon', function(){
     //    $(this).parent(".loglist").siblings('.open').toggleClass('open');
     //    $(this).parent(".loglist").toggleClass('open');
    // });
    // $('.elog').on( 'click', '.ftitle', function(){
     //    $(this).parent(".ftxtable").parent(".loglist").siblings('.open').toggleClass('open');
     //    $(this).parent(".ftxtable").parent(".loglist").toggleClass('open');
    // });
});

