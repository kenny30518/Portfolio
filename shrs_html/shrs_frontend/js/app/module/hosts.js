// ng-bind-html="value | toTrusted" 調用使html語法顯示
App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.directive("hostSelectdgeJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.hostSelectdgeJs);
        }
    };
});

App.controller('hostController',  function($scope, $routeParams, $http) {
	function hostsAPI(){
        $http.post(config.api_host + "hosts", {'start':0, 'end':40})
            .then(function(response) {
                var hosts = response.data;

                $scope.hosts = hosts;
                $scope.loadcheck = 'now';
                $scope.loadshow = true;
                $scope.searchword = '';
            });
	}
	hostsAPI();

    $scope.changeHostList= function(id) {
        if(id == "now"){
            hostsAPI();
            $('#search').val('');
        }else{
            $http.post(config.api_host + "hostsHistory", {'start':0, 'end':40})
                .then(function (response) {
                    var hosts = response.data;

                    $scope.hosts = hosts;
                    $scope.loadcheck = id;
                    $scope.loadshow = true;
                    $scope.searchword = '';
                    $('#search').val('');
                });
        }
    }

    $scope.loadMore = function(){
        var id = $scope.loadcheck;
        var startCount = $scope.hosts.length;
        var search = $scope.searchword;

        if(id == 'now'){
            $http.post(config.api_host + "hosts", {'start':startCount, 'end':40, 'search': search})
                .then(function(response) {
                    var hosts = response.data;

                    $scope.hosts = $scope.hosts.concat(hosts);
                    loadshow($scope.hosts.length);
                });
        }else{
            $http.post(config.api_host + "hostsHistory", {'start':startCount, 'end':40, 'search': search})
                .then(function(response) {
                    var hosts = response.data;

                    $scope.hosts = $scope.hosts.concat(hosts);
                    loadshow($scope.hosts.length);
                });
        }
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

        if(id == 'now'){
            $http.post(config.api_host + "hosts", {'start':0, 'end':40, 'search':$('#search').val()})
                .then(function(response) {
                    var hosts = response.data;

                    $scope.hosts = hosts;
                    $scope.loadshow = true;
                    if(hosts.length==0){$scope.loadshow = false;}
                });
        }else{
            $http.post(config.api_host + "hostsHistory", {'start':0, 'end':40, 'search':$('#search').val()})
                .then(function(response) {
                    var hosts = response.data;

                    $scope.hosts = hosts;
                    $scope.loadshow = true;
                    if(hosts.length==0){$scope.loadshow = false;}
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
