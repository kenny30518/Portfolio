/**
 * Created by CCDN on 2017/8/1.
 */
App.controller('aboutController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    function getAboutAPI() {
        $http.get(config.api_host + "about")
            .then(function (response) {
                var about = response.data;

                $scope.about = $sce.trustAsHtml(about[0].content);
            });
    }

    getAboutAPI();

    // $scope.aboutList = [
    //     {
    //         content: "TestAbout"
    //     }
    // ];
}]);

App.controller('aboutEnController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    function getAboutAPI() {
        $http.get(config.api_host + "aboutEn")
            .then(function (response) {
                var about = response.data;

                $scope.about = $sce.trustAsHtml(about[0].content);
            });
    }

    getAboutAPI();

    // $scope.aboutList = [
    //     {
    //         content: "TestAbout"
    //     }
    // ];
}]);
