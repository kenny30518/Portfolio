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

var categoryId;
function setData(id){
    categoryId = id;
}

App.controller("programSelectController", function($scope, $routeParams, $http, $filter){
    function programSelectAPI(){
        $http.get(config.api_host + "programCategory")
            .then(function(response) {
                var programSelects = response.data;

                $scope.programSelects = programSelects;
            });
    }
    programSelectAPI();

    function programAPI(){
        $http.post(config.api_host + "programs", {'start':0, 'end':20, 'filterNoJournal':1})
            .then(function(response) {
                var programs = response.data;

                $scope.programs = programs;
                $scope.loadcheck = 0;
                $scope.loadshow = true;
                $scope.searchword = '';
            });
    }
    
    if (categoryId == "" | categoryId == null) {
        programAPI();
    }else{
        $http.post(config.api_host + "programCategory/" + categoryId , {'start':0, 'end':20, 'filterNoJournal':1})
                .then(function (response) {
                    var programs = response.data;

                    $scope.programs = programs;
                    $scope.loadcheck = categoryId;
                    $scope.loadshow = true;
                    $scope.searchword = '';
                    $scope.categoryId = categoryId;
                    if(programs.length==0){$scope.loadshow = false;}
                    $('#search').val('');
                    changeHold();
                    categoryId = "";   
                });
    }

    function changeHold() {
        console.log(categoryId);
        $('.sortbox .grids a').removeClass('hold');
        $('.sortbox .grids:nth-child('+(categoryId+1)+') a').addClass('hold');
    }

    // 節目表
    function programIndexAPI(){
        $http.post(config.api_host + "programs", {'start':0, 'end':20, 'filterNoJournal':1})
            .then(function(response) {
                var programs = response.data;
                for(var i=0;i<programs.length;i++) {
                    programs[i].programIntroduction = $filter('limitTo')(programs[i].programIntroduction, 100, 0);
                }
                $scope.loadcheck = 0;
                $scope.loadshow = true;
                $scope.searchword = '';
                $scope.programlistIndex = programs;
            });
    }
    programIndexAPI();

    function programHistoryAPI(){
        $http.post(config.api_host + "programsHistory", {'start':0, 'end':20, 'filterNoJournal':1})
            .then(function(response) {
                var programs = response.data;

                $scope.programs = programs;
                $scope.loadcheck = 'programHistory';
                $scope.loadshow = true;
                $scope.searchword = '';
            });
    }

    $scope.changeProgramCategoryList= function(id) {
        if(id == 0){
            programAPI();
            $('#search').val('');
        }else if(id == "programHistory"){
            programHistoryAPI();
            $('#search').val('');
        }else{
            $http.post(config.api_host + "programCategory/" + id , {'start':0, 'end':20, 'filterNoJournal':1})
                .then(function (response) {
                    var programs = response.data;

                    $scope.programs = programs;
                    $scope.loadcheck = id;
                    $scope.loadshow = true;
                    $scope.searchword = '';
                    if(programs.length==0){$scope.loadshow = false;}
                    $('#search').val('');
                });
        }
    }

    $scope.loadMore = function(){
        var id = $scope.loadcheck;
        var startCount = $scope.programs.length;
        var search = $scope.searchword;

        if(id == 0){
            $http.post(config.api_host + "programs", {'start':startCount, 'end':20, 'filterNoJournal':1, 'search': search})
                .then(function(response) {
                    var programs = response.data;

                    $scope.programs = $scope.programs.concat(programs);
                    loadshow($scope.programs.length);
                });
        }else if(id == "programHistory"){
            $http.post(config.api_host + "programsHistory", {'start':startCount, 'end':20, 'filterNoJournal':1, 'search': search})
                .then(function(response) {
                    var programs = response.data;

                    $scope.programs = $scope.programs.concat(programs);
                    loadshow($scope.programs.length);
                });
        }else{
            $http.post(config.api_host + "programCategory/" + id , {'start':startCount, 'end':20, 'filterNoJournal':1, 'search': search})
                .then(function (response) {
                    var programs = response.data;

                    $scope.programs = $scope.programs.concat(programs);
                    loadshow($scope.programs.length);
                });
        }
    };
    function loadshow(count){
        if(count%20 != 0){
            $scope.loadshow = false;
        }
    }

    $scope.search = function(){
        var id = $scope.loadcheck;
        $scope.loadshow = true;
        $scope.searchword = $('#search').val();

        if(id == 0){
            $http.post(config.api_host + "programs", {'start':0, 'end':20, 'filterNoJournal':1, 'search':$('#search').val()})
                .then(function(response) {
                    var programs = response.data;

                    $scope.programs = programs;
                    if(programs.length==0){$scope.loadshow = false;}
                });
        }else if(id == "programHistory"){
            $http.post(config.api_host + "programsHistory", {'start':0, 'end':20, 'filterNoJournal':1, 'search':$('#search').val()})
                .then(function(response) {
                    var programs = response.data;

                    $scope.programs = programs;
                    if(programs.length==0){$scope.loadshow = false;}
                });
        }else{
            $http.post(config.api_host + "programCategory/" + id , {'start':0, 'end':20, 'filterNoJournal':1, 'search':$('#search').val()})
                .then(function (response) {
                    var programs = response.data;

                    $scope.programs = programs;
                    if(programs.length==0){$scope.loadshow = false;}
                });
        }
    }

    $('#search').keypress( function(event){
        event = event || window.event //For IE
        if (event.keyCode == 13) {
            $('#searchbutton').click();
        }
    });
});