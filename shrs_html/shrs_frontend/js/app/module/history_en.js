/**
 * Created by CCDN on 2017/7/5.
 */
App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.controller('historyEnController', ['$scope','$http', function($scope, $http) {
    function getHistoryEnAPI(){
        $http.get(config.api_host + "historyEn")
            .then(function(response) {
                var historys = response.data;
                for(var i=0;i<historys.length;i++){
                    historys[i].year = historys[i].month_show + ". " + historys[i].day_show + ', ' + historys[i].year_show;
                }

                $scope.historys = historys;
            });
    }
    getHistoryEnAPI();

    function getHistoryYearAPI(){
        $http.get(config.api_host + "historyEnYear")
            .then(function(response) {
                var historyYears = response.data;

                $scope.historyYears = historyYears;
            });
    }
    getHistoryYearAPI();

    $scope.changeHistoryList= function(year) {
        if(year == "all"){
            getHistoryEnAPI();
        }else {
            $http.get(config.api_host + "historyEnChoose/" + year)
                .then(function (response) {
                    var historys = response.data;
                    for (var i = 0; i < historys.length; i++) {
                        historys[i].year = historys[i].month_show + ". " + historys[i].day_show + ', ' + historys[i].year_show;
                    }

                    $scope.historys = historys;
                });
        }
    }

    $scope.historylist = [
        {date:"May 4, 2002",title:"The Mother’s Day Children Broadcasting Camp continued."},
        {date:"May 1, 2002",title:"A special activity for eight university radio stations in northern Taiwan was planned. It included visits to those radio stations to set up open studio programs hosted by their DJs, and to be broadcast not only on AM729, and FM88.1, but also synchronously on their radio channels."},
        {date:"April 1, 2002",title:"A New DJs list for AM729 and FM88.1 was publicly announced."},
        {date:"March 2002",title:"The structure for construction of Digital Audio Broadcasting was completed."},
        {date:"March 2002",title:"More than seventy program proposals for DJs on AM729 and FM88.1 were approved."},
        {date:"Jan. to June, 2002",title:"The [Tax Affairs Easy Show], a co-produced tax\r\n   publicity program with the (TCB, NTAONTP, MOF.) continued."},
        {date:"Dec. 24, 2001",title:"Sign a co-operative memo with the Taipei Broadcasting Station. Broadcasting began Jan. 1, 2002. The Program was produced by fifteen junior students from the Dept. of Radio, TV and Film of Shih-hsin University. It was put on the air from 22:00 to 23:00 PM, Monday to Friday on FM93.1 at the Taipei \r\n Broadcasting Station under the instruction of the staff of Shih-hsin Radio Station."},
        {date:"Dec. 11, 2001",title:"A Video preview of AM729 and FM93.1 was completed."},
        {date:"OCT. 13, 2001",title:"Programs celebrating the 45th anniversary of Shih-hsin University were synchronously broadcast on AM729, FM88.1 and online. A live, open studio lunch party show was put together and was joined by a thousand alumni. The show was hosted by Mr. Wu Jian-hen who interviewed many outstanding alumni, including Mr. Chang Bin-huang, Ms.Kuei Wen-yia, Mr. Wan Jin-shi, Mr.Huang Shen-shiun and Mr.Yu kuang ."},
        {date:"Aug. 13, 2001",title:"BBC satellite rebroadcast programs were officially put on the air on FM88.1 from 10:00 to 12:00."},
        {date:"July 31,2001",title:"24-hour Japanese satellite hit music programs on FM88.1 were taken off the air at 00:00AM."},
        {date:"July 2001",title:"The National High School Student’s Broadcasting Study Camp continued for a sixth year, and part of the courses were held in the open studio. [DJ in my turn], a program produced by the students was broadcast both on AM729 and on FM88.1."},
        {date:"June 1, 2001",title:"[Music from Australia], a co-produced program with ABC was put on the air on FM88.1 from 18:00 to 19:00PM on every Sunday."},
        {date:"May 2, 2001",title:"Activities for alumni returning home started at 11:00AM, then a tea party was held at the open studio of FM88.1. Famous alumni such as Yu Kuang , Chin Meng-jung, Chou Ling, Yu Jian-hen, Hsiau Din-yu and Chen I-june who graduated from the four different stages of Shih-hsin University, e.i. starting from the vocational high school, the three-year college, the four-year college and the university attended. They were asked to play DJs for the open studio and interviewed the alumni, singers and students. The president of the Shi-hsin University, Dr. Chen Jia-ling, who hosted programs in the Shih-hsin Radio Station when she was a student of the National Taiwan University, was asked to be the first DJ in the day’s activities and to interview one of the famous alumni, Mr. Yu Kang. They then ex-changed roles. The activities can be listened to both on AM729 and FM88.1 ending at 14:00 PM."},
        {date:"May 2, 2001",title:"Programs on FM88.1 are now able to be listened to on the internet in real-time."},
        {date:"May 2001",title:"The Mother’s Day Children Broadcasting Camp continued."},
        {date:"April 26, 2001",title:"The Official license of FM88.1 was issued by the MOC."},
        {date:"March 26, 2001",title:"The Official opening date of FM88.1 was postponed from January 1 to the ROC’s Broadcasting Day (today) for various reasons."},
        {date:"March 13, 2001",title:"DW satellite programs were readjusted with their English programs on AM729 and the German programs on FM88.1. At the same time, [Music City in German], a cooperative program with the DW, was put on the air Sundays on FM88.1."},
        {date:"March 5, 2001",title:"Bloomberg’s programs were stopped on AM729, and went off the air at 00:00AM."},
        {date:"March to Aug. 2001",title:"[Breakthrough of Tax Affairs], a program designed for the tax affairs publicity project, in cooperation with the Tax Bureau of the Taipei City Government, was put on the air on AM729 from 13:30 to 14:00 PM on Saturdays."},
        {date:"Jan. to June 2001",title:"[ National Tax Radio], a program designed for the tax affairs publicity project was continued, co-produced with the ( TCB, NTAONTP, MOF )."},
    ];

    /*
    $scope.changeHistoryList= function(year){
        switch(year){
            case 2002:
                $scope.historylist = [
                    {date:"May 4, 2002",title:"The Mother’s Day Children Broadcasting Camp continued."},
                    {date:"May 1, 2002",title:"A special activity for eight university radio stations in northern Taiwan was planned. It included visits to those radio stations to set up open studio programs hosted by their DJs, and to be broadcast not only on AM729, and FM88.1, but also synchronously on their radio channels."},
                    {date:"April 1, 2002",title:"A New DJs list for AM729 and FM88.1 was publicly announced."},
                    {date:"March 2002",title:"The structure for construction of Digital Audio Broadcasting was completed."},
                    {date:"March 2002",title:"More than seventy program proposals for DJs on AM729 and FM88.1 were approved."}
                ];
                break;
            case 2001:
                $scope.historylist = [
                    {date:"Dec. 24, 2001",title:"Sign a co-operative memo with the Taipei Broadcasting Station. Broadcasting began Jan. 1, 2002. The Program was produced by fifteen junior students from the Dept. of Radio, TV and Film of Shih-hsin University. It was put on the air from 22:00 to 23:00 PM, Monday to Friday on FM93.1 at the Taipei \r\n Broadcasting Station under the instruction of the staff of Shih-hsin Radio Station."},
                    {date:"Dec. 11, 2001",title:"A Video preview of AM729 and FM93.1 was completed."},
                    {date:"OCT. 13, 2001",title:"Programs celebrating the 45th anniversary of Shih-hsin University were synchronously broadcast on AM729, FM88.1 and online. A live, open studio lunch party show was put together and was joined by a thousand alumni. The show was hosted by Mr. Wu Jian-hen who interviewed many outstanding alumni, including Mr. Chang Bin-huang, Ms.Kuei Wen-yia, Mr. Wan Jin-shi, Mr.Huang Shen-shiun and Mr.Yu kuang ."},
                    {date:"Aug. 13, 2001",title:"BBC satellite rebroadcast programs were officially put on the air on FM88.1 from 10:00 to 12:00."},
                    {date:"July 31,2001",title:"24-hour Japanese satellite hit music programs on FM88.1 were taken off the air at 00:00AM."},
                    {date:"July 2001",title:"The National High School Student’s Broadcasting Study Camp continued for a sixth year, and part of the courses were held in the open studio. [DJ in my turn], a program produced by the students was broadcast both on AM729 and on FM88.1."},
                    {date:"June 1, 2001",title:"[Music from Australia], a co-produced program with ABC was put on the air on FM88.1 from 18:00 to 19:00PM on every Sunday."},
                    {date:"May 2, 2001",title:"Activities for alumni returning home started at 11:00AM, then a tea party was held at the open studio of FM88.1. Famous alumni such as Yu Kuang , Chin Meng-jung, Chou Ling, Yu Jian-hen, Hsiau Din-yu and Chen I-june who graduated from the four different stages of Shih-hsin University, e.i. starting from the vocational high school, the three-year college, the four-year college and the university attended. They were asked to play DJs for the open studio and interviewed the alumni, singers and students. The president of the Shi-hsin University, Dr. Chen Jia-ling, who hosted programs in the Shih-hsin Radio Station when she was a student of the National Taiwan University, was asked to be the first DJ in the day’s activities and to interview one of the famous alumni, Mr. Yu Kang. They then ex-changed roles. The activities can be listened to both on AM729 and FM88.1 ending at 14:00 PM."},
                    {date:"May 2, 2001",title:"Programs on FM88.1 are now able to be listened to on the internet in real-time."},
                    {date:"May 2001",title:"The Mother’s Day Children Broadcasting Camp continued."},
                    {date:"April 26, 2001",title:"The Official license of FM88.1 was issued by the MOC."},
                    {date:"March 26, 2001",title:"The Official opening date of FM88.1 was postponed from January 1 to the ROC’s Broadcasting Day (today) for various reasons."},
                    {date:"March 13, 2001",title:"DW satellite programs were readjusted with their English programs on AM729 and the German programs on FM88.1. At the same time, [Music City in German], a cooperative program with the DW, was put on the air Sundays on FM88.1."},
                    {date:"March 5, 2001",title:"Bloomberg’s programs were stopped on AM729, and went off the air at 00:00AM."},
                    {date:"March to Aug. 2001",title:"[Breakthrough of Tax Affairs], a program designed for the tax affairs publicity project, in cooperation with the Tax Bureau of the Taipei City Government, was put on the air on AM729 from 13:30 to 14:00 PM on Saturdays."},
                    {date:"Jan. to June 2001",title:"[ National Tax Radio], a program designed for the tax affairs publicity project was continued, co-produced with the ( TCB, NTAONTP, MOF )."}
                ];
                break;
            default:
                $scope.historylist = [
                    {date:"May 4, 2002",title:"The Mother’s Day Children Broadcasting Camp continued."},
                    {date:"May 1, 2002",title:"A special activity for eight university radio stations in northern Taiwan was planned. It included visits to those radio stations to set up open studio programs hosted by their DJs, and to be broadcast not only on AM729, and FM88.1, but also synchronously on their radio channels."},
                    {date:"April 1, 2002",title:"A New DJs list for AM729 and FM88.1 was publicly announced."},
                    {date:"March 2002",title:"The structure for construction of Digital Audio Broadcasting was completed."},
                    {date:"March 2002",title:"More than seventy program proposals for DJs on AM729 and FM88.1 were approved."},
                    {date:"Jan. to June, 2002",title:"The [Tax Affairs Easy Show], a co-produced tax\r\n   publicity program with the (TCB, NTAONTP, MOF.) continued."},
                    {date:"Dec. 24, 2001",title:"Sign a co-operative memo with the Taipei Broadcasting Station. Broadcasting began Jan. 1, 2002. The Program was produced by fifteen junior students from the Dept. of Radio, TV and Film of Shih-hsin University. It was put on the air from 22:00 to 23:00 PM, Monday to Friday on FM93.1 at the Taipei \r\n Broadcasting Station under the instruction of the staff of Shih-hsin Radio Station."},
                    {date:"Dec. 11, 2001",title:"A Video preview of AM729 and FM93.1 was completed."},
                    {date:"OCT. 13, 2001",title:"Programs celebrating the 45th anniversary of Shih-hsin University were synchronously broadcast on AM729, FM88.1 and online. A live, open studio lunch party show was put together and was joined by a thousand alumni. The show was hosted by Mr. Wu Jian-hen who interviewed many outstanding alumni, including Mr. Chang Bin-huang, Ms.Kuei Wen-yia, Mr. Wan Jin-shi, Mr.Huang Shen-shiun and Mr.Yu kuang ."},
                    {date:"Aug. 13, 2001",title:"BBC satellite rebroadcast programs were officially put on the air on FM88.1 from 10:00 to 12:00."},
                    {date:"July 31,2001",title:"24-hour Japanese satellite hit music programs on FM88.1 were taken off the air at 00:00AM."},
                    {date:"July 2001",title:"The National High School Student’s Broadcasting Study Camp continued for a sixth year, and part of the courses were held in the open studio. [DJ in my turn], a program produced by the students was broadcast both on AM729 and on FM88.1."},
                    {date:"June 1, 2001",title:"[Music from Australia], a co-produced program with ABC was put on the air on FM88.1 from 18:00 to 19:00PM on every Sunday."},
                    {date:"May 2, 2001",title:"Activities for alumni returning home started at 11:00AM, then a tea party was held at the open studio of FM88.1. Famous alumni such as Yu Kuang , Chin Meng-jung, Chou Ling, Yu Jian-hen, Hsiau Din-yu and Chen I-june who graduated from the four different stages of Shih-hsin University, e.i. starting from the vocational high school, the three-year college, the four-year college and the university attended. They were asked to play DJs for the open studio and interviewed the alumni, singers and students. The president of the Shi-hsin University, Dr. Chen Jia-ling, who hosted programs in the Shih-hsin Radio Station when she was a student of the National Taiwan University, was asked to be the first DJ in the day’s activities and to interview one of the famous alumni, Mr. Yu Kang. They then ex-changed roles. The activities can be listened to both on AM729 and FM88.1 ending at 14:00 PM."},
                    {date:"May 2, 2001",title:"Programs on FM88.1 are now able to be listened to on the internet in real-time."},
                    {date:"May 2001",title:"The Mother’s Day Children Broadcasting Camp continued."},
                    {date:"April 26, 2001",title:"The Official license of FM88.1 was issued by the MOC."},
                    {date:"March 26, 2001",title:"The Official opening date of FM88.1 was postponed from January 1 to the ROC’s Broadcasting Day (today) for various reasons."},
                    {date:"March 13, 2001",title:"DW satellite programs were readjusted with their English programs on AM729 and the German programs on FM88.1. At the same time, [Music City in German], a cooperative program with the DW, was put on the air Sundays on FM88.1."},
                    {date:"March 5, 2001",title:"Bloomberg’s programs were stopped on AM729, and went off the air at 00:00AM."},
                    {date:"March to Aug. 2001",title:"[Breakthrough of Tax Affairs], a program designed for the tax affairs publicity project, in cooperation with the Tax Bureau of the Taipei City Government, was put on the air on AM729 from 13:30 to 14:00 PM on Saturdays."},
                    {date:"Jan. to June 2001",title:"[ National Tax Radio], a program designed for the tax affairs publicity project was continued, co-produced with the ( TCB, NTAONTP, MOF )."},
                ];

                break;
        }
    }
    */
}]);

