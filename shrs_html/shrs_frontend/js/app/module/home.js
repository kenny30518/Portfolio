App.directive("baseJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.baseJs);
        }
    };
});
App.directive("playerJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.playerJs);
        }
    };
});

App.directive("indexBannerJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.indexBannerJs);
        }
    };
});

// 節目類別選擇(首頁專用)
App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.directive("programSelectdgeJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.programSelectdgeJs);
        }
    };
});

App.controller("homeProgramSelectController", function($scope, $routeParams, $http){
    function programSelectAPI(){
        $http.get(config.api_host + "programCategory")
            .then(function(response) {
                var programSelects = response.data;

                $scope.programSelects = programSelects;
            });
    }
    programSelectAPI();

    function programAPI(){
        $http.post(config.api_host + "programCategoryIndex", {'start':0, 'end':6, 'filterNoJournal':1})
            .then(function(response) {
                var programs = response.data;

                $scope.allPrograms = programs;
            });
    }
    programAPI();
})