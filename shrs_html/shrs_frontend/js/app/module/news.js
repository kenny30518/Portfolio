App.controller('newsController',  function($scope, $http, $sce, $filter) {
    function getNewsAPI(){
        $http.post(config.api_host + "news", {'start':0, 'end':40})
            .then(function(response) {
                var news = response.data;
                for(var i=0;i<news.length;i++){
                    news[i].start_date = new Date(news[i].start_date);
                    news[i].content = RemoveHTML(news[i].content);
                    news[i].content = $filter('limitTo')(news[i].content, 90, 0);
                    news[i].content = $sce.trustAsHtml(news[i].content);
                }

                $scope.newslist = news;
                $scope.loadshow = true;
            });
    }
    getNewsAPI();

    $scope.sixtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60));

    $scope.loadMore = function(){
        var startCount = $scope.newslist.length;
        var search = $scope.searchword;
        $http.post(config.api_host + "news", {'start':startCount, 'end':40, 'search': search})
            .then(function(response) {
                var news = response.data;
                for(var i=0;i<news.length;i++){
                    news[i].start_date = new Date(news[i].start_date);
                    news[i].content = RemoveHTML(news[i].content);
                    news[i].content = $filter('limitTo')(news[i].content, 90, 0);
                    news[i].content = $sce.trustAsHtml(news[i].content);
                }

                $scope.newslist = $scope.newslist.concat(news);
                loadshow($scope.newslist.length);
            });
    };
    function loadshow(count){
        if(count%40 != 0){
            $scope.loadshow = false;
        }
    }

    $scope.search = function(){
        $scope.searchword = $('#search').val();
        $scope.loadshow = true;

        $http.post(config.api_host + "news", {'start':0, 'end':40, 'search':$('#search').val()})
            .then(function(response) {
                var news = response.data;
                for(var i=0;i<news.length;i++){
                    news[i].start_date = new Date(news[i].start_date);
                    news[i].content = RemoveHTML(news[i].content);
                    news[i].content = $filter('limitTo')(news[i].content, 90, 0);
                    news[i].content = $sce.trustAsHtml(news[i].content);
                }

                $scope.newslist = news;
                $scope.loadshow = true;
                if(news.length==0){$scope.loadshow = false;}
            });
    }

    $('#search').keypress( function(event){
        event = event || window.event //For IE
        if (event.keyCode == 13) {
            $('#searchbutton').click();
        }
    });

    function RemoveHTML( strText ) {
        var regEx = /<[^>]*>/g;
        return strText.replace(regEx, "");
    }
});
