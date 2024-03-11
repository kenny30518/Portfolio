App.controller('newsDetailController', ['$scope','$routeParams','$http','$sce',function($scope,$routeParams,$http,$sce){
    function getNewsDetailAPI(){
        $http.get(config.api_host + "newsDetail/" + $routeParams.id)
            .then(function(response) {
                var news = response.data;
                for(var i=0;i<news.length;i++){
                    //html標籤
                    news[i].content = $sce.trustAsHtml(news[i].content);
                }

                $scope.news = news[0];
            });
    }
    getNewsDetailAPI();
}]);
