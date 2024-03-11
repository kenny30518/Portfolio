App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.filter('nl2br', function($sce){
    return function(msg,is_xhtml) {
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        return $sce.trustAsHtml(msg);
    }
});

App.controller('hostDetailController',  function($scope, $routeParams, $http) {
    function hostsDetailAPI(){
        $http.get(config.api_host + "hostsDetail/" + $routeParams.id)
            .then(function(response) {
                var hosts = response.data;

                $scope.host = hosts[0];
            });
    }
    hostsDetailAPI();

});
