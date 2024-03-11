var programClass='',
	programBoxClass='',
	programClassShining='',
	date = new Date();

$(document).ready(function(){
	if( $('.sort_btn').length ){
		programClass='.sort_btn',
		programBoxClass='.sortbox';
		programClassShining='sort_shining';
	}else{
		programClass='.weeksbtn',
		programBoxClass='.weeksbox';
		programClassShining='hold';
	}
	
	programSetUp();
	if( $('.btn_channel').length ) amAndFmSwitch();
	//根據今天星期幾來決定預設星期
	var weekday = date.getDay();//取得今天星期幾0~6
	$("a[data-date="+weekday+"]").attr('class',function(i,val){return val+" hold"});
	//節目星期切換
	$('.weekgrids').on('click',function(){
		$('.weekgrids').attr('class','weekgrids');
		$(this).attr('class',$(this).attr("class")+" hold");
	})
	//顯示節目表當前播放的節目
	
});

//手機AM/FM切換
function amAndFmSwitch(){
	$('.btn_channel').on( 'click', function(){
		$('.btn_channel .hold').toggleClass('chanelFM');
		
		if( $('.btn_channel .hold').attr('class').match(/chanelFM/g) ){
			console.log('FM');
		}else{
			console.log('AM');
		}
	});
}

//手機節目動作
function programSetUp(){
	$(programClass).on( 'click', function(){
		'none'==$(programBoxClass).css('display') ? programSwitch(true) : programSwitch(false);
	});
	
	$(window).resize(function(){
		if( 'none'==$(programClass).css('display') )
			programSwitch();
	});
}

//節目開關
function programSwitch(switchType){
	if( null!=switchType ){
		if( switchType ){
			null != $(programClass).attr('class').match(/sort/g) ? $(programClass).addClass(programClassShining) : $(programClass).children().addClass(programClassShining);
			$(programBoxClass).css('display', 'block');
		}else{
			null != $(programClass).attr('class').match(/sort/g) ? $(programClass).removeClass(programClassShining) : $(programClass).children().removeClass(programClassShining);
			$(programBoxClass).css('display', '');
		}
	}else{
		null != $(programClass).attr('class').match(/sort/g) ? $(programClass).removeClass(programClassShining) : $(programClass).children().removeClass(programClassShining);
		$(programBoxClass).css('display', '');
	}
}

