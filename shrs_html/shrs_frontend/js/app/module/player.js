App.controller('headerPlayerController', function ($scope, $routeParams, $http, $sce, $filter) { 
    //now
    var currentdate = new Date();
    var w = currentdate.getDay();
    var checkTimer;

    checkSchedule();

    //$(document).ready(function(){
    var video = document.getElementById('video');
    var audio = document.getElementById('audio');
    var playtag = 0;
    var isPlaying = 1;
    var nowPlayTag = '';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || safari.pushNotification);
    var hls = new Hls();
    if (Hls.isSupported() && !isSafari) {
        //console.log("hello hls.js!");

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
            isPlaying = 1;
            /*switchDatasvisible(true);*/
            showPlayButton();
        });
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
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
        /*switchDatasvisible('none');*/
        //playVideo('FM');
        //$('#FM-tab').addClass('bgs')

    } else {
        console.log('not supported');
        audio.onloadstart = function () {
            audio.play();
            isPlaying = 1;
            /*switchDatasvisible(true);*/
            showPlayButton();
        };
        /*switchDatasvisible('none');*/
        //audio.play();//ios無法自動播放...
    }

    loadSource();

    function loadSource() {
        video.pause();
        audio.pause();
        showPlayButton();

        var url;
        var pgtype='FM';
        url = "https://stream.ginnet.cloud/live0115lo-89xv/_definst_/fm881/playlist.m3u8";
        pgtype = 'FM';

        //change channel
        if (pgtype != nowPlayTag) {
            if (Hls.isSupported() && !isSafari) {
                hls.attachMedia(video);
                hls.loadSource(url);
            } else {
                var source = document.getElementById('audioSource');
                source.src = url;
                audio.load();
            }
        } else {
            //same channel
            if (isPlaying == 0) {
                if (Hls.isSupported() && !isSafari) {
                    video.play();
                } else {
                    audio.play();
                }
                showPauseButton();
            }
            isPlaying = (isPlaying + 1) % 2;
        }
        nowPlayTag = pgtype;
        //get program
        stopTimer();
        //console.log(nowPlayTag);
    }

    /*$scope.playVideo = function (type) {
        video.pause();
        audio.pause();
        showPlayButton();

        var url;
        var pgtype='FM';
        if (type == 'FM') {
            //url = "https://flv.ccdntech.com/live/_definst_/vod148_Live/fm881/playlist.m3u8";
            url = "https://stream.ginnet.cloud/live0115lo-89xv/_definst_/fm881/playlist.m3u8";
            pgtype = 'FM';
        } else {
            //url = "https://flv.ccdntech.com/live/_definst_/vod148_Live/am729/playlist.m3u8";
            url = "https://stream.ginnet.cloud/live0115lo-89xv/_definst_/am729/playlist.m3u8";
            pgtype = 'AM';
        }
        //change channel
        if (pgtype != nowPlayTag) {
            if (Hls.isSupported() && !isSafari) {
                hls.attachMedia(video);
                hls.loadSource(url);
                video.play();
            } else {
                var source = document.getElementById('audioSource');
                source.src = url;
                audio.load();
            }
        } else {
            //same channel
            if (isPlaying == 0) {
                if (Hls.isSupported() && !isSafari) {
                    video.play();
                } else {
                    audio.play();
                }
                showPauseButton();
            }
            isPlaying = (isPlaying + 1) % 2;
        }
        nowPlayTag = pgtype;
        //get program
        checkSchedule();
        stopTimer();
        //console.log(nowPlayTag);
    }*/

    function stopVideo() {
        playtag = (playtag + 1) % 2;
        if (playtag == 0) {
            video.pause();
        } else {
            video.play();
        }
    }

    //});
    $scope.playPause = function () {
        if (nowPlayTag == '') {
            alert("請選擇頻道");
        } else {
            //same channel
            if (isPlaying == 1) {
                if (Hls.isSupported() && !isSafari) {
                    video.play();
                } else {
                    audio.play();
                }
                showPauseButton();
            } else {
                if (Hls.isSupported() && !isSafari) {
                    video.pause();
                } else {
                    audio.pause();
                }
                showPlayButton();
            }
            isPlaying = (isPlaying + 1) % 2;
        }
    }

    // hidden datas
    /*
    function switchDatasvisible(status) {
        if (status == true) {
            $('.datas').show();
        } else {
            $('.datas').hide();
        }
    }
    */

    // playbuttonchange
    function showPlayButton() {
        $('.whiles').html("<i class=\"fa-solid fa-circle-play fa-2x\"></i>");
    }

    function showPauseButton() {
        $('.whiles').html("<i class=\"fa-solid fa-circle-pause fa-2x\"></i>");
    }

    //
    function getNow() {
        var currentdate = new Date();
        var h = currentdate.getHours();
        h = ("0" + h).slice(-2);
        var m = currentdate.getMinutes();
        m = ("0" + m).slice(-2);
        var now = h + ":" + m;
        return now;
    }

    //
    function checkSchedule() {
        var channel = nowPlayTag;
        // var schedule=pglist[channel][w];

        $http.get(config.api_host + "programList/FM/"+ w)
            .then(function (response) {
                var schedule = response.data;

                var now = getNow();
                for (var i = 0; i < schedule.length; i++) {
                    // if(now>=schedule[i]['playTime'] && now<schedule[i]['endTime']){
                    if (now >= schedule[i]['playTime']) {
                        var host = '',
                            programName = '';

                        //console.log(schedule[i]['programName']);
                        //console.log(schedule[i]['host']);
                        //console.log(schedule[i]['info']);
                        if (schedule[i].programHosts != null) {
                            for (var j = 0; j < schedule[i].programHosts.length; j++) {
                                host = (j > 0) ? host + "," + schedule[i].programHosts[j].emceeName : schedule[i].programHosts[j].emceeName;
                            }
                        }

                        //欄位塞值
                        $('#pgname').html(schedule[i]['programName']);
                        $('#home-pgname').html(schedule[i]['programName']);
                        $('#pghost').html(host);
                        $('#home-pghost').html(host);
                        $('#pgtime').html(schedule[i]['playTime'] + " - " + schedule[i]['endTime']);
                        $('#phimg').attr('src', schedule[i]['programPicture']);
                        if (schedule[i]['info']) {
                            $('#pgname').html();
                        }
                        $('#home-phimg').attr('src', schedule[i]['programPicture']);
                        if (schedule[i]['info']) {
                            $('#pgname').html();
                        }
                        $('#recommand-more').attr('href', "program/detail/"+schedule[i]['program_id']);
                    }

                    if (programName = '') {
                        $('#pgname').html('');
                        $('#pghost').html('');
                        $('#pgtime').html('');
                        $('#pgtime').attr('src', "./images/program/default.jpg");
                    }
                }
            });
    }

    function stopTimer() {
        if (checkTimer) {
            clearInterval(checkTimer);
            checkTimer = null;
        }
        if (checkTimer == null) {
            checkTimer = setInterval(checkSchedule, 60000);
        }
    }
}); 

//調節聲音音量
window.SetVolume = function(val)
{
    var player = document.getElementById('video');
    player.volume = val / 100;
}