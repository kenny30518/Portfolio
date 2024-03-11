/**
 * Created by CCDN on 2017/8/3.
 */
App.controller('linkController',['$scope', '$http', function($scope, $http){
    // function getLinkAPI(){
    //     $http.get(config.api_host + "linkCategory")
    //         .then(function(response) {
    //             var links = response.data;
    //             for(var i=0;i<links.length;i++){
    //                 getLinkContentAPI(links[i].category_ID);
    //             }
    //
    //             $scope.links = links;
    //         });
    // }
    // getLinkAPI();

    function getLinkContentAPI(){
        $http.get(config.api_host + "link")
            .then(function(response) {
                var links = response.data;

                $scope.links = links;
            });
    }
    getLinkContentAPI();

    $scope.linkList = [
        {
            Name: "本台姐妹台(衛星直播節目)網站",
            content:[
                {
                    Name: "法國之聲",
                    URL: "http://www.rfi.fr/"
                },
                {
                    Name: "澳洲廣播電台",
                    URL: "http://www.radioaustralia.net.au/international/"
                },
                {
                    Name: "DW德國之聲",
                    URL: "http://www.dw.com/en/top-stories/s-9097"
                },
                {
                    Name: "BBC World Service",
                    URL: "http://www.bbc.co.uk/worldserviceradio"
                }
            ]
        },{
            Name: "線上電台",
            content:[
                {
                    Name: "佳音廣播電台",
                    URL: "http://www.goodnews.org.tw/index.php"
                },
                {
                    Name: "台北電台",
                    URL: "http://www.radio.gov.taipei/"
                },
                {
                    Name: "News 98",
                    URL: "http://www.news98.com.tw/"
                },
                {
                    Name: "Hit Fm",
                    URL: "http://www.hitoradio.com/newweb/"
                }
            ]
        }
    ]

}]);