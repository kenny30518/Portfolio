/**
 * Created by CCDN on 2017/8/1.
 */
App.controller('constructController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    function getConstructAPI() {
        $http.get(config.api_host + "organizationalChart")
            .then(function (response) {
                var construct = response.data;

                $scope.construct = $sce.trustAsHtml(construct.content);
            });
    }

    getConstructAPI();

    // $scope.constructList = [
    //     {
    //         content: "TestAbout"
    //     }
    // ]
}]);
