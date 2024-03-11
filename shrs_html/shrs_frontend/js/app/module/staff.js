/**
 * Created by CCDN on 2017/8/1.
 */

App.directive("categorySelectJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.categorySelectJs);
        }
    };
});

App.filter('nl2br', function($sce){
    return function(msg,is_xhtml) {
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        return $sce.trustAsHtml(msg);
    }
});

App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.controller('memberController',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
    /* 取得成員分類 */
    function getMemberCategoryAPI(){
        $http.get(config.api_host + "memberCategory")
            .then(function(response) {
                var categorySelects = response.data;
                $scope.categorySelects = categorySelects;
            });
    }
    getMemberCategoryAPI();

    /* 取得成員列表 */
    function getMemberAPI(id){
        $http.get(config.api_host + "member/" + id)
            .then(function(response) {
                var members = response.data;

                $scope.members = members;
            });
    }
    getMemberAPI(1);

    /* 分類點擊事件 */
    $scope.changeCategoryList= function(id) {
        getMemberAPI(id);
    }
}]);

App.controller('archiveMemberController',['$scope', '$http', function($scope, $http){
    function getMemberCategoryAPI(){
        $http.get(config.api_host + "memberCategory")
            .then(function(response) {
                var categorySelects = response.data;
                $scope.categorySelects = categorySelects;
            });
    }
    getMemberCategoryAPI();

    /* 取得成員列表 */
    function getMemberAPI(id){
        $http.get(config.api_host + "member/" + id)
            .then(function(response) {
                var members = response.data;

                $scope.members = members;
            });
    }
    getMemberAPI(7);
}]);