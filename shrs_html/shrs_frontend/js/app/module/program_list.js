/**
 * Created by CCDN on 2017/6/29.
 */

App.directive("programSelectJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.programSelectJs);
        }
    };
});

// {{ value | toTrusted}} 調用使html語法顯示
App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.controller('ProgramListController',['$scope','$sce','$http',function($scope,$sce,$http){
    $scope.channel = "AM";//預設頻道AM
    var date = new Date();
    var day = date.getDay();

    //顯示當下時段的節目
    if(date.getHours() >= 0 & date.getHours() < 6){
        $(".table").not(".earlyMorning").addClass("hide");
    }else if(date.getHours() >= 6 & date.getHours() < 12) {
        $(".table").not(".morning").addClass("hide");
    }else if(date.getHours() >= 12 & date.getHours() < 18) {
        $(".table").not(".afternoon").addClass("hide");
    }else if(date.getHours() >= 18 & date.getHours() < 24) {
        $(".table").not(".night").addClass("hide");
    }

    //星期一節目
    $http.get(config.api_host + "programList/FM/1").then(function (response) {
        var responseProgram = response.data;

        $scope.monday = responseProgram;
    });

    //星期二節目
    $http.get(config.api_host + "programList/FM/2").then(function (response) {
        var responseProgram = response.data;

        $scope.tuesday = responseProgram;
    });

    //星期三節目
    $http.get(config.api_host + "programList/FM/3").then(function (response) {
        var responseProgram = response.data;

        $scope.wensday = responseProgram;
    });

    //星期四節目
    $http.get(config.api_host + "programList/FM/4").then(function (response) {
        var responseProgram = response.data;

        $scope.thrusday = responseProgram;
    });

    //星期五節目
    $http.get(config.api_host + "programList/FM/5").then(function (response) {
        var responseProgram = response.data;

        $scope.friday = responseProgram;
    });

    //星期六節目
    $http.get(config.api_host + "programList/FM/6").then(function (response) {
        var responseProgram = response.data;

        $scope.saturday = responseProgram;
    });

    //星期日節目
    $http.get(config.api_host + "programList/FM/0").then(function (response) {
        var responseProgram = response.data;

        $scope.sunday = responseProgram;
        markCurrentProgram();
    });


    //抓取節目列表
    //顯示節目表當前播放的節目
    function markCurrentProgram(){
        var matchProgram = [];
        var currentProgram;

        $http.get(config.api_host + "programList/FM/" + date.getDay()).then(function () {
            let day = date.getDay();
            var currentDayProgram;

            if(day === 1) {
                currentDayProgram =  $scope.monday;
            }else if(day === 2) {
                currentDayProgram =  $scope.tuesday;
            }else if(day === 3) {
                currentDayProgram =  $scope.wensday;
            }else if(day === 4) {
                currentDayProgram =  $scope.thrusday;
            }else if(day === 5) {
                currentDayProgram =  $scope.friday;
            }else if(day === 6) {
                currentDayProgram =  $scope.saturday;
            }else if(day === 0) {
                currentDayProgram =  $scope.sunday;
            }

            currentDayProgram.forEach(function(entry){
                //先將符合目前小時的節目存到陣列裡面

                var entryValue = entry.playTime.split(":");
                if(entryValue[0] == date.getHours()){
                    matchProgram.push(entry);
                }
                // if(entry.playTime.match("\\b^"+date.getHours()+"\\b")){
                //     matchProgram.push(entry);
                // }
            });

            // 一個節目可能會播到兩個小時以上，所以某幾個時段可能會抓不到節目，在這裡另外做判斷
            if(matchProgram.length==0){
                currentDayProgram.forEach(function(entry){
                    var parts = entry.playTime.split(":");
                    var entryHours =  parseInt(parts[0]);
                    var currentHours = parseInt(date.getHours());
                    if(currentHours > entryHours){
                        currentProgram = entry;
                    }
                });
                matchProgram.push(currentProgram);
            }

            //同一個小時裡面可能會有一個以上的節目，超過一個節目就用目前的分鐘比較，將目前正在播放的節目存到currentProgram
            if(matchProgram.length > 0){
                matchProgram.forEach(function(entry){
                    var parts = entry.playTime.split(":");
                    var entryMinutes =  parseInt(parts[1]);
                    var currentMinutes = parseInt(date.getMinutes());
                    if(currentMinutes >= entryMinutes){
                        currentProgram = entry;
                    }
                });
                //將目前正在播放的節目用小圖示標記
                currentProgram.programName = '<div class="onAir">ON AIR</div><span class="programTitle">'+currentProgram.programName+'</span>';
            }
        });
    }

        // 假資料
        // day = weekday;
        // switch(weekday){
        //     case 1:
        //         if(channel=="AM"){
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //                 {playTime:'07:30',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("黑膠時代"),host:""},
        //                 {playTime:'10:05',programName:$sce.trustAsHtml("可不可以不看書"),host:"Mike 張嘉恩"},
        //                 {playTime:'11:00',programName:$sce.trustAsHtml("雙語資訊時間/生活英語"),host:""},
        //                 {playTime:'11:05',programName:$sce.trustAsHtml("飯兒追追追"),host:"王靖雯 以笙"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("世新午間新聞"),host:""},
        //                 {playTime:'12:10',programName:$sce.trustAsHtml("電台推薦好聲音"),host:""},
        //                 {playTime:'12:30',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //                 {playTime:'13:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //                 {playTime:'13:30',programName:$sce.trustAsHtml("美食研究所"),host:"鄭超兒"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("台灣俗諺每日一句"),host:""},
        //                 {playTime:'14:05',programName:$sce.trustAsHtml("聽見字裡行間"),host:"林敏筠 陳怡琇"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("世新整點新聞"),host:""},
        //                 {playTime:'15:05',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("彩虹心事"),host:"阿育 Freemy"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("耳朵1+1 Ear de plus"),host:"陳姵祺"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //                 {playTime:'20:30',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //                 {playTime:'21:30',programName:$sce.trustAsHtml("音樂tree of life"),host:"金姵君"},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("那些年 那些歌"),host:"施怡均"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("私房樂"),host:"Yozi 謝皓宇"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("音樂芯樂園"),host:"黃于芯"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("親愛的K先生K小姐"),host:"油子"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("音樂新航線"),host:"ㄚ寶 濰鈴"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("獨立日常"),host:"朱培妤 楊文翔"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //
        //         break;
        //     case 2:
        //         if(channel=="AM") {
        //             $scope.programlist = [{playTime: '06:55', programName:$sce.trustAsHtml( "開播節目預告"), host: ""},
        //                 {playTime: '07:00', programName:$sce.trustAsHtml( "大家說英語"), host: "救世傳播協會"},
        //                 {playTime: '07:30', programName:$sce.trustAsHtml( "實用級空中英語"), host: "救世傳播協會"},
        //                 {playTime: '08:00', programName:$sce.trustAsHtml( "衛星直播英國BBC World Service"), host: "BBC"},
        //                 {playTime: '10:00', programName:$sce.trustAsHtml( "黑膠時代"), host: ""},
        //                 {playTime: '10:05', programName:$sce.trustAsHtml( "關於我們的文藝復興"), host: "Cynthia 游雅雯"},
        //                 {playTime: '11:00', programName:$sce.trustAsHtml( "雙語資訊時間/生活英語"), host: ""},
        //                 {playTime: '11:05', programName:$sce.trustAsHtml( "歷史柑仔店"), host: "歡歡"},
        //                 {playTime: '12:00', programName:$sce.trustAsHtml( "世新午間新聞"), host: ""},
        //                 {playTime: '12:10', programName:$sce.trustAsHtml( "電台推薦好聲音"), host: ""},
        //                 {playTime: '12:30', programName:$sce.trustAsHtml( "進修級空中英語"), host: "救世傳播協會"},
        //                 {playTime: '13:00', programName:$sce.trustAsHtml( "大家說英語"), host: "救世傳播協會"},
        //                 {playTime: '13:30', programName:$sce.trustAsHtml( "遊戲戰國"), host: "陳士昌 蔡恆毅"},
        //                 {playTime: '14:00', programName:$sce.trustAsHtml( "台灣俗諺每日一句"), host: ""},
        //                 {playTime: '14:05', programName:$sce.trustAsHtml( "綺幻旅程"), host: "綺云"},
        //                 {playTime: '15:00', programName:$sce.trustAsHtml( "世新整點新聞"), host: ""},
        //                 {playTime: '15:05', programName:$sce.trustAsHtml( '2017KK歌單一起聽'), host: ""},
        //                 {playTime: '16:00', programName:$sce.trustAsHtml( "愛情怕怕怕"), host: "松本明美 謝孟晴"},
        //                 {playTime: '17:00', programName:$sce.trustAsHtml( "魚的異想世界"), host: "魚兒"},
        //                 {playTime: '18:00', programName:$sce.trustAsHtml( "衛星直播英國BBC World Service"), host: "BBC"},
        //                 {playTime: '20:00', programName:$sce.trustAsHtml( "實用級空中英語"), host: "救世傳播協會"},
        //                 {playTime: '20:30', programName:$sce.trustAsHtml( "大家說英語"), host: "救世傳播協會"},
        //                 {playTime: '21:00', programName:$sce.trustAsHtml( "進修級空中英語"), host: "救世傳播協會"},
        //                 {playTime: '21:30', programName:$sce.trustAsHtml( "腦戲胞"), host: "李品萱 張韶芸"},
        //                 {playTime: '22:00', programName:$sce.trustAsHtml( "衛星直播法國之聲RFI法語節目"), host: "RFI"},
        //                 {playTime: '24:00', programName:$sce.trustAsHtml( "收播節目預告"), host: ""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("音樂防空洞"),host:"YONO"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("彈起從前"),host:"李依倫 周欣樺"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("韓我一起go crazy"),host:"老蔡"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("MUSIC酸辣湯"),host:"康瑋（企鵝）"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("就愛聽電影"),host:"Ｍimi"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("夜魚音樂會"),host:"金魚"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //         break;
        //     case 3:
        //         if(channel=="AM") {
        //           $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //             {playTime:'07:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'07:30',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'10:00',programName:$sce.trustAsHtml("黑膠時代"),host:""},
        //             {playTime:'10:05',programName:$sce.trustAsHtml("萬象森羅餘波未蘋"),host:"李函潔"},
        //             {playTime:'11:00',programName:$sce.trustAsHtml("雙語資訊時間/生活英語"),host:""},
        //             {playTime:'11:05',programName:$sce.trustAsHtml("Movie Moving"),host:"方乃仙"},
        //             {playTime:'12:00',programName:$sce.trustAsHtml("世新午間新聞"),host:""},
        //             {playTime:'12:10',programName:$sce.trustAsHtml("電台推薦好聲音"),host:""},
        //             {playTime:'12:30',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'13:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'13:30',programName:$sce.trustAsHtml("知識夢想+"),host:"峮"},
        //             {playTime:'14:00',programName:$sce.trustAsHtml("台灣俗諺每日一句"),host:""},
        //             {playTime:'14:05',programName:$sce.trustAsHtml("Vita sunshine"),host:"洪佩宜"},
        //             {playTime:'15:00',programName:$sce.trustAsHtml("世新整點新聞"),host:""},
        //             {playTime:'15:05',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //             {playTime:'16:00',programName:$sce.trustAsHtml("側耳傾聽"),host:"蘇郁雯"},
        //             {playTime:'17:00',programName:$sce.trustAsHtml("行銷掀時代"),host:"RERE姐姐"},
        //             {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'20:00',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'20:30',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'21:00',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'21:30',programName:$sce.trustAsHtml("詩人說夢"),host:"周珈妃"},
        //             {playTime:'22:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //             {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("羅曼.AGM"),host:"魯夫"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("西洋瞇一下"),host:"張硯雯"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("對岸好聲音"),host:"英子 灰米"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("驚曲點唱機"),host:"㻑媃"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("音樂思朵莉"),host:"王元宏 陳祖浩"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("Jimmy’s動畫影城"),host:"何金銘"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //         break;
        //     case 4:
        //         if(channel=="AM") {
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //             {playTime:'07:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'07:30',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'10:00',programName:$sce.trustAsHtml("黑膠時代"),host:""},
        //             {playTime:'10:05',programName:$sce.trustAsHtml("小魚書屋"),host:"鍾佳瑜"},
        //             {playTime:'11:00',programName:$sce.trustAsHtml("雙語資訊時間/生活英語"),host:""},
        //             {playTime:'11:05',programName:$sce.trustAsHtml("影痴行動"),host:"陳繹方"},
        //             {playTime:'12:00',programName:$sce.trustAsHtml("音樂欣賞"),host:""},
        //             {playTime:'12:10',programName:$sce.trustAsHtml("電台推薦好聲音"),host:""},
        //             {playTime:'12:30',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'13:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'13:30',programName:$sce.trustAsHtml("這，有點兒藝思"),host:"Noah"},
        //             {playTime:'14:00',programName:$sce.trustAsHtml("台灣俗諺每日一句"),host:""},
        //             {playTime:'14:05',programName:$sce.trustAsHtml("戀戀詩意"),host:"ㄚˇ儒"},
        //             {playTime:'15:00',programName:$sce.trustAsHtml("世新整點新聞"),host:""},
        //             {playTime:'15:05',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //             {playTime:'16:00',programName:$sce.trustAsHtml("撒郎嘿有你真好"),host:"嚕嚕"},
        //             {playTime:'17:00',programName:$sce.trustAsHtml("翻轉世界"),host:"謝佳利"},
        //             {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'20:00',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'20:30',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'21:00',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'21:30',programName:$sce.trustAsHtml("好市報報"),host:"彭安"},
        //             {playTime:'22:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //             {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("夢想音樂世界"),host:"曉靜 方方？"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("Hip-Hop瘋韓樂"),host:"Lee"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("管你大眾小眾我play"),host:"安安 洪子涵"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("音樂點線面"),host:"宛儒 大頭"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("樂來樂串"),host:"小林 鄭紫萱"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("樂夜之下"),host:"陳珈賢 黃永華"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //         break;
        //     case 5:
        //         if(channel=="AM") {
        //          $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //             {playTime:'07:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'07:30',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'10:00',programName:$sce.trustAsHtml("黑膠時代"),host:""},
        //             {playTime:'10:05',programName:$sce.trustAsHtml("不孤讀時光"),host:"蟹粉 西瓜"},
        //             {playTime:'11:00',programName:$sce.trustAsHtml("雙語資訊時間/生活英語"),host:""},
        //             {playTime:'11:05',programName:$sce.trustAsHtml("電影聯合國"),host:"陳怡廷 隆閔涵"},
        //             {playTime:'12:00',programName:$sce.trustAsHtml("世新午間新聞"),host:""},
        //             {playTime:'12:10',programName:$sce.trustAsHtml("電台推薦好聲音"),host:""},
        //             {playTime:'12:30',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'13:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'13:30',programName:$sce.trustAsHtml("音樂生產線"),host:"楊茲淇"},
        //             {playTime:'14:00',programName:$sce.trustAsHtml("台灣俗諺每日一句"),host:""},
        //             {playTime:'14:05',programName:$sce.trustAsHtml("輕鬆限定"),host:"鄭如芸"},
        //             {playTime:'15:00',programName:$sce.trustAsHtml("世新整點新聞"),host:""},
        //             {playTime:'15:05',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //             {playTime:'16:00',programName:$sce.trustAsHtml("垃圾talk"),host:"非主流美少女"},
        //             {playTime:'17:00',programName:$sce.trustAsHtml("J書局14號店"),host:"Jenny"},
        //             {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'20:00',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'20:30',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'21:00',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'21:30',programName:$sce.trustAsHtml("談客Tender Class"),host:"凹錐 謝長霖"},
        //             {playTime:'22:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //             {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("影劇報你知"),host:"J.Lin 莊立言"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("Party rocking搖滾派對"),host:"高立勳"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("E-RADIO"),host:"英語系"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("今朝有歌今朝醉"),host:"謝扣"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("韓流來襲"),host:"啊嵐 瑄瑄"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("西音之夜"),host:"小白"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //         break;
        //     case 6:
        //         if(channel=="AM") {
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //             {playTime:'07:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'07:30',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'10:00',programName:$sce.trustAsHtml("財稅123"),host:"啊嵐 金魚"},
        //             {playTime:'10:30',programName:$sce.trustAsHtml("原民園"),host:"Masako"},
        //             {playTime:'11:00',programName:$sce.trustAsHtml("鳥瞰台灣"),host:"安順 倪可"},
        //             {playTime:'12:00',programName:$sce.trustAsHtml("歡笑一籮筐(相聲說唱藝術)"),host:""},
        //             {playTime:'12:30',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'13:00',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'13:30',programName:$sce.trustAsHtml("咖啡藝站"),host:"仇沛宸"},
        //             {playTime:'14:00',programName:$sce.trustAsHtml("高中國文"),host:"星雲"},
        //             {playTime:'15:00',programName:$sce.trustAsHtml("談校風生"),host:"朱晉緯 唐7"},
        //             {playTime:'16:00',programName:$sce.trustAsHtml("青春有夠(go)FUN"),host:"魏莉穎"},
        //             {playTime:'17:00',programName:$sce.trustAsHtml("童畫世界"),host:"淇淇 米米"},
        //             {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'20:00',programName:$sce.trustAsHtml("實用級空中英語"),host:"救世傳播協會"},
        //             {playTime:'20:30',programName:$sce.trustAsHtml("大家說英語"),host:"救世傳播協會"},
        //             {playTime:'21:00',programName:$sce.trustAsHtml("進修級空中英語"),host:"救世傳播協會"},
        //             {playTime:'21:30',programName:$sce.trustAsHtml("點亮心光"),host:"彭欣怡"},
        //             {playTime:'22:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //             {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("音樂FUN輕鬆"),host:"張乃文"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("漫.空間 Anime Cafe"),host:"小白 阿蝦"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("音樂即時通"),host:"張譯鎂"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("粵聽樂上癮"),host:"王莉"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("Hey!music show"),host:"冰蹦"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:""},
        //                 {playTime:'22:00',programName:$sce.trustAsHtml("週末夜狂熱"),host:"NT"},
        //                 {playTime:'23:00',programName:$sce.trustAsHtml("2017KK歌單一起聽"),host:""},
        //                 {playTime:'24:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }
        //         break;
        //     case 0:
        //         if(channel=="AM") {
        //           $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //             {playTime:'07:00',programName:$sce.trustAsHtml("早安音樂廳"),host:""},
        //             {playTime:'08:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'10:05',programName:$sce.trustAsHtml("古典逍遙遊"),host:"馮安"},
        //             {playTime:'11:00',programName:$sce.trustAsHtml("健康五四三"),host:"何宗安 蔡沛融"},
        //             {playTime:'12:00',programName:$sce.trustAsHtml("傳播名校APP"),host:"芳芳 歐罵馬"},
        //             {playTime:'13:00',programName:$sce.trustAsHtml("原聲博物館"),host:"高新堡"},
        //             {playTime:'14:00',programName:$sce.trustAsHtml("憨吉囝仔"),host:"劉芯瑀 謝亞庭"},
        //             {playTime:'15:00',programName:$sce.trustAsHtml("心饗事呈"),host:"張淨淳"},
        //             {playTime:'16:00',programName:$sce.trustAsHtml("College探險記"),host:"陳祐漩"},
        //             {playTime:'17:00',programName:$sce.trustAsHtml("愛的萬物論"),host:"曾文蕙"},
        //             {playTime:'18:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //             {playTime:'20:00',programName:$sce.trustAsHtml("文字輕旅行"),host:"映廷 皿皿"},
        //             {playTime:'21:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //         }else{
        //             //FM
        //             $scope.programlist = [{playTime:'06:55',programName:$sce.trustAsHtml("開播節目預告"),host:""},
        //                 {playTime:'07:00',programName:$sce.trustAsHtml("世新調頻音樂盒-音樂篇"),host:""},
        //                 {playTime:'08:00',programName:$sce.trustAsHtml("K-POP音樂Bar"),host:"熊兒"},
        //                 {playTime:'09:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:""},
        //                 {playTime:'10:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'12:00',programName:$sce.trustAsHtml("衛星直播法國之聲RFI法語節目"),host:"RFI"},
        //                 {playTime:'14:00',programName:$sce.trustAsHtml("Queenking times"),host:"林雨潔 張夢昕 鄧婷"},
        //                 {playTime:'15:00',programName:$sce.trustAsHtml("衛星直播英國BBC World Service"),host:"BBC"},
        //                 {playTime:'16:00',programName:$sce.trustAsHtml("衛星直播澳洲廣播電台abc英語節目"),host:"澳廣"},
        //                 {playTime:'17:00',programName:$sce.trustAsHtml("古典故事交響曲"),host:"橘娜"},
        //                 {playTime:'18:00',programName:$sce.trustAsHtml("古風不要停"),host:"緹兒"},
        //                 {playTime:'19:00',programName:$sce.trustAsHtml("海馬的聲光世界"),host:"鄭乃綺"},
        //                 {playTime:'20:00',programName:$sce.trustAsHtml("金曲Flash Back國語金曲"),host:""},
        //                 {playTime:'21:00',programName:$sce.trustAsHtml("收播節目預告"),host:""}]
        //
        //         }
        //         break;
        //     default:
        //
        //         break;
        //
        // }

        // //標記當天正在播放的節目
        // if(weekday == date.getDay()){
        //     markCurrentProgram();
        // }

    //根據今天星期幾來決定預設節目表
    //$scope.changeProgramList(date.getDay(),$scope.channel);//date.getDay():取得今天星期幾0~6//

    // //顯示節目表當前播放的節目
    // function markCurrentProgram(){
    //     var matchProgram = [];
    //     var currentProgram;
    //     $scope.programlist.forEach(function(entry){
    //         //先將符合目前小時的節目存到陣列裡面
    //         if(entry.playTime.match("\\b^"+date.getHours()+"\\b")){
    //             matchProgram.push(entry);
    //         }
    //     });
    //     // 一個節目可能會播到兩個小時以上，所以某幾個時段可能會抓不到節目，在這裡另外做判斷
    //     if(matchProgram.length==0){
    //         $scope.programlist.forEach(function(entry){
    //             var parts = entry.playTime.split(":");
    //             var entryHours =  parseInt(parts[0]);
    //             var currentHours = parseInt(date.getHours());
    //             if(currentHours > entryHours){
    //                 currentProgram = entry;
    //             }
    //         });
    //         matchProgram.push(currentProgram);
    //     }
    //
    //     //同一個小時裡面可能會有一個以上的節目，超過一個節目就用目前的分鐘比較，將目前正在播放的節目存到currentProgram
    //     if(matchProgram.length>1){
    //         matchProgram.forEach(function(entry){
    //             var parts = entry.playTime.split(":");
    //             var entryMinutes =  parseInt(parts[1]);
    //             var currentMinutes = parseInt(date.getMinutes());
    //             if(currentMinutes >= entryMinutes){
    //                 currentProgram = entry;
    //             }
    //         });
    //         //將目前正在播放的節目用小圖示標記
    //         currentProgram.programName = $sce.trustAsHtml(currentProgram.programName+'<div class="gplay"><img src="../images/program/playicon_a.png" /></div>');
    //     }else if(matchProgram.length==1){
    //         //將目前正在播放的節目用小圖示標記
    //         matchProgram[0].programName = $sce.trustAsHtml(matchProgram[0].programName+'<div class="gplay"><img src="../images/program/playicon_a.png" /></div>');
    //     }
    // }

}]);

App.controller('phoneProgramListController',['$scope','$sce','$http',function($scope,$sce,$http){ 
    var date = new Date();
    var day = date.getDay();
    //抓取節目列表
    $scope.changeProgramList= function(weekday){
        day = weekday;

        //切換節目列表
        $http.get(config.api_host + "programList/FM/" + weekday)
            .then(function (response) {
                var programs = response.data;

                $scope.programlist = programs;

                //標記當天正在播放的節目
                if(weekday == date.getDay()){
                    markCurrentProgram();
                }

                //顯示節目表當前播放的節目
                function markCurrentProgram(){
                    var matchProgram = [];
                    var currentProgram;

                    $scope.programlist.forEach(function(entry){
                        //先將符合目前小時的節目存到陣列裡面

                        var entryValue = entry.playTime.split(":");
                        if(entryValue[0] == date.getHours()){
                            matchProgram.push(entry);
                        }
                        // if(entry.playTime.match("\\b^"+date.getHours()+"\\b")){
                        //     matchProgram.push(entry);
                        // }
                    });

                    // 一個節目可能會播到兩個小時以上，所以某幾個時段可能會抓不到節目，在這裡另外做判斷
                    if(matchProgram.length==0){
                        $scope.programlist.forEach(function(entry){
                            var parts = entry.playTime.split(":");
                            var entryHours =  parseInt(parts[0]);
                            var currentHours = parseInt(date.getHours());
                            if(currentHours > entryHours){
                                currentProgram = entry;
                            }
                        });
                        matchProgram.push(currentProgram);
                    }

                    //同一個小時裡面可能會有一個以上的節目，超過一個節目就用目前的分鐘比較，將目前正在播放的節目存到currentProgram
                    if(matchProgram.length > 0){
                        matchProgram.forEach(function(entry){
                            var parts = entry.playTime.split(":");
                            var entryMinutes =  parseInt(parts[1]);
                            var currentMinutes = parseInt(date.getMinutes());
                            if(currentMinutes >= entryMinutes){
                                currentProgram = entry;
                            }
                        });
                        //將目前正在播放的節目用小圖示標記
                        currentProgram.programName = '<div class="onAir">ON AIR</div><span class="programTitle">'+currentProgram.programName+'</span>';
                    }
                }
            });
        }
        //根據今天星期幾來決定預設節目表
        $scope.changeProgramList(date.getDay(),$scope.channel);//date.getDay():取得今天星期幾0~6
}]);

//按下查看更多按鈕
function toggleMore() {
    $(".gramtable .hide").toggleClass("show");
    if ($(".loadmore_btn").text() === "查看全部"){
        $(".loadmore_btn").text("收起");
    }else{
        $(".loadmore_btn").text("查看全部");
    }
}