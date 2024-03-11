/**
 * Created by CCDN on 2017/8/3.
 */
App.controller('knowledgeDetailController',['$scope','$http','$routeParams','$sce',function($scope, $http, $routeParams, $sce){
    function getKnowledgeDetailAPI(){
        $http.get(config.api_host + "knowledgeDetail/" +$routeParams.id)
            .then(function(response) {
                var knowledges = response.data;
                for(var i=0;i<knowledges.length;i++){
                    knowledges[i].answer = $sce.trustAsHtml(knowledges[i].answer);
                }

                $scope.knowledges = knowledges[0];
            });
    }
    getKnowledgeDetailAPI();

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
