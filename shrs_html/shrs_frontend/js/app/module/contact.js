/**
 * Created by CCDN on 2017/8/16.
 */
App.controller('contactController', function($scope, $log, $http) {
    $scope.contact = {subject: 'Contact us from SHRS web'};
    $scope.save = function() {
        $http.post(config.api_host + "contactAPI", $scope.contact)
            .then(function(response) {
                var contact = response.data;

                alert(contact["msg"]);
                location.reload();
            });
        // console.log($scope.contact);
    };
});
