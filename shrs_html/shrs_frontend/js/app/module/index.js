// {{ value | toTrusted}} 調用使html語法顯示
App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.controller('indexController',  function($scope, $routeParams, $http, $sce, $filter) {
    // 橫幅廣告
    function adAPI(){
        $http.get(config.api_host + "adAPI")
            .then(function(response) {
                var ads = response.data;
                for(var i=0;i<ads.length;i++) {
                    //無圖片時使用預設圖
                    if (ads[i].picture == "" || ads[i].picture == null) {
                        ads[i].picture = '../images/index/banner.jpg';
                    } else {
                        ads[i].picture = config.storage_host + "ad/" + ads[i].news_id + "/" + ads[i].picture;
                    }
                }

                $scope.adsIndex = ads;
            });
    }
    adAPI();

	// 節目表
    function programIndexAPI(){
        $http.get(config.api_host + "programsIndex/" + 7)
            .then(function(response) {
                var programs = response.data;
                for(var i=0;i<programs.length;i++) {
                    programs[i].programIntroduction = $filter('limitTo')(programs[i].programIntroduction, 100, 0);
                }

                $scope.programlistIndex = programs;
            });
    }
    programIndexAPI();

	// 最新消息
    function getNewsIndexAPI(){
        $http.get(config.api_host + "newsIndex/" + 2)
            .then(function(response) {
                var news = response.data;
                for(var i=0;i<news.length;i++){
                    news[i].content = RemoveHTML(news[i].content);
                    news[i].content = $filter('limitTo')(news[i].content, 70, 0);
                    news[i].content = $sce.trustAsHtml(news[i].content);
                }

                $scope.newslistIndex = news;
            });
    }
    getNewsIndexAPI();

    function RemoveHTML( strText ) {
        var regEx = /<[^>]*>/g;
        return strText.replace(regEx, "");
    }

    // 主持人
    function hostsIndex(){
        $http.get(config.api_host + "hostsIndex/" + 6)
            .then(function(response) {
                var hosts = response.data;

                $scope.hostlistIndex = hosts;
            });
    }
    hostsIndex();

	// 投票內容
    function showVote(){
        $http.get(config.api_host + "voteAPI")
            .then(function(response) {
                var votes = response.data;

                if(sessionStorage.getItem('showVoteList') == "show"){
                    $("#voteItem").hide();
                    $("#voteResult").show();
                }

                $scope.voteShow = votes.length;
                $scope.votes = votes[0];
            });
    }
    showVote();

    //投票
    function addVote(optionSelect, votes){
        $http.post(config.api_host + "voteAddAPI/"+ optionSelect, votes)
            .then(function(response) {
                sessionStorage.setItem('showVoteList', "show");
                showVote();
        });
    }

    //vote result area
    $scope.showVoteResult = function(votes){
        var optionSelect = $('.selected').attr('name');

        if(optionSelect){
            addVote(optionSelect, votes);
            $( "#voteItem" ).hide();
            $( "#voteResult" ).show();
        }else{
            alert("請選擇投票項目");
        }
    }
});

// function showVoteResult(){
// 	var val = $('.selected').attr('name');
//
// 	if(val){
// 		$( "#voteItem" ).hide();
// 		$( "#voteResult" ).show();
// 	}else{
// 		alert("請選擇投票項目");
// 	}
// }