/**
 * Created by CCDN on 2017/7/3.
 */

App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.controller("albumDetailController",['$scope','$routeParams','$http',function($scope,$routeParams,$http,$sce){
    function getAlbumDetailAPI(){
        $http.get(config.api_host + "albumDetail/"+$routeParams.id)
            .then(function(response) {
                var pictures = response.data;
                for(var i=0;i<pictures.length;i++){
                    pictures[i].filename = config.storage_host +"photos/"+pictures[i].album_id+"/"+ pictures[i].filename;
                    pictures[i].description = nl2br(pictures[i].description);
                }

                // $scope.pictures = pictures;
                getPageAPI(pictures);
                $scope.album = pictures[0];
            });
    }
    getAlbumDetailAPI();

    function nl2br (str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }

    //取得分頁
    function getPageAPI(albums) {
        $scope.data = albums;

        //分頁總數
        $scope.pageSize = 20;
        $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分頁數
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //設置表格數據(分頁)
        $scope.setData = function () {
            $scope.pictures = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通過當前頁數，篩顯出當前資料
        }
        $scope.pictures = $scope.data.slice(0, $scope.pageSize);

        // 分頁要repeat的數據
        for (var i = 0; i < $scope.newPages; i++) {
            $scope.pageList.push(i + 1);
        }

        // 當前選中分頁索引
        $scope.selectPage = function (page) {
            // 不能小於1、大於最大
            if (page < 1 || page > $scope.pages) return;
            // 最多顯示分頁數5
            if (page > 2) {
                // 因為只顯示5個頁數，大於2頁開始分頁轉換
                var newpageList = [];
                for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            if (page > $scope.pages-2 && $scope.pages>4) {
                // 因為只顯示5個頁數，大於倒數2頁起始資料重設
                var newpageList = [];
                for (var i = ($scope.pages - 5) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            // 頁數1
            if (page == 1 ) {
                // 因為只顯示5個頁數，從一開始顯示
                var newpageList = [];
                for (var i = 0 ; i < ((page + 4) > $scope.pages ? $scope.pages : (page + 4)) ; i++) {
                    newpageList.push(i + 1);
                }
                $scope.pageList = newpageList;
            }
            $scope.selPage = page;
            $scope.setData();
            $scope.isActivePage(page);
            console.log("選擇的頁數：" + page);
        };
        // 設置當前樣
        $scope.isActivePage = function (page) {
            return $scope.selPage == page;
        };
        //上一頁
        $scope.Previous = function () {
            $scope.selectPage($scope.selPage - 1);
        }
        //下一頁
        $scope.Next = function () {
            $scope.selectPage($scope.selPage + 1);
        };
        //第一頁
        $scope.First = function () {
            $scope.selectPage(1);
        }
        //最後一頁
        $scope.Last = function () {
            $scope.selectPage($scope.pages);
        };
    }

    // $scope.albumDetailList =[
    //     {
    //         albumName:"93年兒童廣播營",
    //         picture:[
    //              {name:"open show1",url:"../images/album/album01.png"}
    //         ]
    //
    //     },
    //     {
    //         albumName:"錄音室集錦",
    //         picture:[
    //             {name:"第二錄控室",url:"../images/album/album02-1.jpg"},
    //             {name:"第四錄控室",url:"../images/album/album02-2.jpg"},
    //             {name:"FM直播室",url:"../images/album/album02.jpg"}
    //         ]
    //
    //     },
    //     {
    //         albumName:"世新電台與大家分享５０週年校慶的喜悅",
    //         picture:[
    //             {name:"校慶戶外演唱會01",url:"../images/album/album03-1.jpg"},
    //             {name:"校慶戶外演唱會02",url:"../images/album/album03-2.jpg"},
    //             {name:"校慶戶外演唱會03",url:"../images/album/album03-3.jpg"}
    //         ]
    //
    //     },
    //     {
    //         albumName:"2006教職員工子女兒童廣播電視夏令營",
    //         picture:[
    //             {name:"8/14活動概況-活動準備中",url:"../images/album/album04-1.jpg"},
    //             {name:"參觀電台-歷史迴廊",url:"../images/album/album04-2.jpg"},
    //             {name:"參觀電台-星際總部",url:"../images/album/album04-3.jpg"}
    //         ]
    //
    //     },
    //     {
    //         albumName:"第十屆全國高中廣播研習營",
    //         picture:[
    //             {name:"你我在火車站相遇",url:"../images/album/album05-1.jpg"},
    //             {name:"TEN聲玩家報到了",url:"../images/album/album05-2.jpg"},
    //             {name:"Welcome party 現場節目大放送",url:"../images/album/album05-3.jpg"}
    //         ]
    //
    //     },
    //     {
    //         albumName:"第九屆全國高中廣播研習營",
    //         picture:[
    //             {name:"營前拜拜求平安",url:"../images/album/album06-1.jpg"},
    //             {name:"第八小隊錄音時間",url:"../images/album/album06-2.jpg"},
    //             {name:"第五小隊錄音時間",url:"../images/album/album06-3.jpg"}
    //         ]
    //
    //     }
    // ]
    // $scope.data = $scope.albumDetailList[$routeParams.id-1]
}]).directive("albumDetailCss",function(){
    return  function(scope, element, attrs) {
            if(scope.$last){
                injectCSS(element,attrs.albumDetailCss);
                console.log("injectCSS");
            }

    };
}).directive("albumDetailJs",function(){
    return  function(scope, element, attrs) {
            if(scope.$last) {
                console.log("injectScript");
                injectScript(element, attrs.albumDetailJs);
            }

    };
});