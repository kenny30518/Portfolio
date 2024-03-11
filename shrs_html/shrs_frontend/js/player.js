//now
var currentdate = new Date();
var w = currentdate.getDay();
var checkTimer;

//$(document).ready(function(){
	var video = document.getElementById('video');
	var audio = document.getElementById('audio');
	var playtag = 0;
	var isPlaying = 0;
	var nowPlayTag = '';
	var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
	var hls = new Hls();
    if (Hls.isSupported() && !isSafari) {
 	    //console.log("hello hls.js!");
		
		hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
			console.log("manifest loaded, found " + data.levels.length + " quality level");
			video.play();
			isPlaying=1;
			switchDatasvisible(true);
			showPauseButton();
		}); 
		hls.on(Hls.Events.ERROR, function (event, data) {
			if (data.fatal) {
			  switch(data.type) {
			  case Hls.ErrorTypes.NETWORK_ERROR:
			  // try to recover network error
				console.log("fatal network error encountered, try to recover");
				hls.startLoad();
				break;
			  case Hls.ErrorTypes.MEDIA_ERROR:
				console.log("fatal media error encountered, try to recover");
				hls.recoverMediaError();
				break;
			  default:
			  // cannot recover
				hls.destroy();
				break;
			  }
			}
		});
		switchDatasvisible('none');
		//playVideo('FM');
		//$('#FM-tab').addClass('bgs')
		
    }else{
		console.log('not supported');
		audio.onloadstart = function(){
			audio.play();
			isPlaying=1;
			switchDatasvisible(true);
			showPauseButton();
		};
		switchDatasvisible('none');
		//audio.play();//ios無法自動播放...
	}
	function playVideo(type){
		video.pause();
		audio.pause();
		showPlayButton();
		
		var url,pgtype;
		if(type=='FM'){
			url="http://flv.ccdntech.com/live/_definst_/vod148_Live/fm881/playlist.m3u8";
			pgtype='FM';
		}else{
			url="http://flv.ccdntech.com/live/_definst_/vod148_Live/am729/playlist.m3u8";
			pgtype='AM';
		}
		//change channel
		if(pgtype!=nowPlayTag){
			if(Hls.isSupported() && !isSafari){
				hls.attachMedia(video);
				hls.loadSource(url);
                video.play();
			}else{
				var source = document.getElementById('audioSource');
				source.src = url;
				audio.load(); 
			}
		}else{
			//same channel
			if(isPlaying==0){
				if (Hls.isSupported() && !isSafari) {
					video.play();
				}else{
					audio.play();
				}
				showPauseButton();
			}
			isPlaying=(isPlaying+1)%2;
		}
		nowPlayTag=pgtype;
		//get program
		checkSchedule();
		stopTimer();
		//console.log(nowPlayTag);
	}
	function stopVideo(){
		playtag=(playtag+1)%2;
		if(playtag==0){
			video.pause();
		}else{
			video.play();
		}
	}
//});
function playPause(){
	if(nowPlayTag==''){
		alert("請選擇頻道");
	}else{
		//same channel
		if(isPlaying==0){
			if (Hls.isSupported() && !isSafari) {
				video.play();
			}else{
				audio.play();
			}
			showPauseButton();
		}else{
			if (Hls.isSupported() && !isSafari) {
				video.pause();
			}else{
				audio.pause();
			}
			showPlayButton();
		}
		isPlaying=(isPlaying+1)%2;
	}
}

// hidden datas
function switchDatasvisible(status){
	if(status==true){
		$('.datas').show();
	}else{
		$('.datas').hide();
	}
}

// playbuttonchange
function showPlayButton(){
	$('.whiles').removeClass('no-before');
	$('.whiles').html("<span>播放</span>");
	$('.whiles').css({"background-color":"#f62356"});
}
function showPauseButton(){
	$('.whiles').css({"background-color":"#FF9797"});
	$('.whiles').html("<span>暫停</span>");
	$('.whiles').addClass('no-before');
}

//
function getNow(){
	var currentdate = new Date();
	var h=currentdate.getHours();
	h=("0"+h).slice(-2);
	var m=currentdate.getMinutes();
	m=("0"+m).slice(-2);
	var now =h+":"+m;
	return now;
}

//
function checkSchedule(){
	var channel=nowPlayTag;
	var schedule=pglist[channel][w];
	var now=getNow();
	for(i=0;i<schedule.length;i++){
		if(now>=schedule[i]['playTime'] && now<schedule[i]['endTime']){
			console.log(schedule[i]['programName']);
			//console.log(schedule[i]['host']);
			//console.log(schedule[i]['info']);
			//欄位塞值
			$('#pgname').html(schedule[i]['programName']);
			$('#pghost').html(schedule[i]['host']);
			$('#pgtime').html(schedule[i]['playTime']+" - "+schedule[i]['endTime']);
			if(schedule[i]['info']){
				$('#pgname').html();
			}
		}
	}
}

function stopTimer(){
	if(checkTimer){
		clearInterval(checkTimer);
		checkTimer=null;
	}
	if(checkTimer==null){
		checkTimer=setInterval(checkSchedule, 60000);
	}
}
