/**
 * Created by CCDN on 2017/8/3.
 */

App.directive("knowledgeJs",function(){
    return {
        link: function(scope, element, attrs) {
            injectScript(element,attrs.knowledgeJs);
        }
    };
});

App.controller('knowledgeController',['$scope','$http',function($scope, $http){
    function getKnowledgeAPI(){
        $http.get(config.api_host + "knowledge")
            .then(function(response) {
                var knowledges = response.data;

                $scope.knowledges = knowledges;
            });
    }
    getKnowledgeAPI();

    function getKnowledgeCategoryAPI(){
        $http.get(config.api_host + "knowledgeCategory")
            .then(function(response) {
                var knowledgesCategory = response.data;

                $scope.knowledgesCategory = knowledgesCategory;
            });
    }
    getKnowledgeCategoryAPI();

    $scope.changeKnowledgeList= function(choose) {
        if(choose == "all"){
            getKnowledgeAPI();
        }else {
            $http.get(config.api_host + "knowledgeChoose/" + choose)
                .then(function (response) {
                    var knowledges = response.data;

                    $scope.knowledges = knowledges;
                });
        }
    }

    $scope.knowledgeList = [
        {url:"knowledge/detail/1",title:"何謂AM？"},
        {url:"knowledge/detail/2",title:"何謂FM？"},
        {url:"knowledge/detail/3",title:"無線電報的發明"},
        {url:"knowledge/detail/4",title:"廣播的發明"}
    ];

/*
  $scope.changeKnowledgeList= function(choose){
	  switch(choose){
            case 1:
				$scope.knowledgeList = [
                    {url:"knowledge/detail/1",title:"何謂AM？"},
                    {url:"knowledge/detail/2",title:"何謂FM？"},
			  ];
			 break;
            case 2:
				$scope.knowledgeList = [
                    {url:"knowledge/detail/3",title:"無線電報的發明"},
                    {url:"knowledge/detail/4",title:"廣播的發明"}
			  ];
			 break;
			default:
			$scope.knowledgeList = [
                {url:"knowledge/detail/1",title:"何謂AM？"},
                {url:"knowledge/detail/2",title:"何謂FM？"},
                {url:"knowledge/detail/3",title:"無線電報的發明"},
                {url:"knowledge/detail/4",title:"廣播的發明"}
			  ];
            break;
	  }
  }
*/

}]);
