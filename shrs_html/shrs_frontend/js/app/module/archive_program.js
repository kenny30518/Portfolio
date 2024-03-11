/**
 * Created by CCDN on 2017/6/30.
 */
// {{ value | toTrusted}} 調用使html語法顯示
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

App.controller("archiveProgramSelectController", function($scope, $routeParams, $http){

    // 節目表
    function programHistoryAPI(){
        $http.post(config.api_host + "programsHistory", {'start':0, 'end':40, 'filterNoJournal':1})
            .then(function(response) {
                var programs = response.data;

                $scope.programs = programs;
                $scope.loadcheck = 'programHistory';
                $scope.loadshow = true;
                $scope.searchword = '';
            });
    }
    programHistoryAPI();

    $scope.loadMore = function(){
        var id = $scope.loadcheck;
        var startCount = $scope.programs.length;
        var search = $scope.searchword;

        $http.post(config.api_host + "programsHistory", {'start':startCount, 'end':40, 'filterNoJournal':1, 'search': search})
            .then(function(response) {
                var programs = response.data;

                $scope.programs = $scope.programs.concat(programs);
                loadshow($scope.programs.length);
            });
    };

    function loadshow(count){
        if(count%40 != 0){
            $scope.loadshow = false;
        }
    }

    $scope.search = function(){
        var id = $scope.loadcheck;
        $scope.loadshow = true;
        $scope.searchword = $('#search').val();

        $http.post(config.api_host + "programsHistory", {'start':0, 'end':40, 'filterNoJournal':1, 'search':$('#search').val()})
            .then(function(response) {
                var programs = response.data;

                $scope.programs = programs;
                if(programs.length==0){$scope.loadshow = false;}
            });
    }

    $('#search').keypress( function(event){
        event = event || window.event //For IE
        if (event.keyCode == 13) {
            $('#searchbutton').click();
        }
    });
});