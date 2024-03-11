/**
 * Created by CCDN on 2017/7/3.
 */

App.directive("albumDetailJs",function() {
    return function (scope, element, attrs) {
            console.log("injectScript");
            injectScript(element, attrs.albumDetailJs);
    };
});

App.controller('albumController',['$scope','$http','filterFilter',function($scope, $http, filterFilter){
    function albumSelectAPI(){
        $http.get(config.api_host + "albumCategory")
            .then(function(response) {
                var albumSelects = response.data;

                $scope.albumSelects = albumSelects;
            });
    }
    albumSelectAPI();
    
    function getAlbumAPI(){
        $http.get(config.api_host + "album")
            .then(function(response) {
                var albums = response.data;
                for(var i=0;i<albums.length;i++){
                    albums[i].filename = config.storage_host +"photos/"+albums[i].album_id+"/"+ albums[i].filename;
                }
                $scope.data = albums;

                getPageAPI(albums);
                // $scope.albums = albums;
            });
    }
    getAlbumAPI();

    // 分類選取
    $scope.changeAlbumCategoryList= function(id) {
        $scope.search = {};
        if(id == 0){
            getAlbumAPI();
        }else{
            $http.get(config.api_host + "album/" + id)
                .then(function (response) {
                    var albums = response.data;
                    for(var i=0;i<albums.length;i++){
                        albums[i].filename = config.storage_host +"photos/"+albums[i].album_id+"/"+ albums[i].filename;
                    }

                    getPageAPI(albums);
                });
        }
    }

    // 查詢
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.data, newVal);
        if($scope.filtered != null) {
            $scope.pages = Math.ceil($scope.filtered.length / $scope.pageSize); //分頁數
            $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
            $scope.pageList = [];
            $scope.selPage = 1;
            $scope.setData = function () {
                $scope.albums = $scope.filtered.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通過當前頁數，篩顯出當前資料
            }
            $scope.albums = $scope.filtered.slice(0, $scope.pageSize);

            // 分頁要repeat的數據
            for (var i = 0; i < $scope.newPages; i++) {
                $scope.pageList.push(i + 1);
            }
        }
    }, true);

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
            $scope.albums = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通過當前頁數，篩顯出當前資料
        }
        $scope.albums = $scope.data.slice(0, $scope.pageSize);

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

    // 測試資料
    // $scope.albumList = [
    //     {
    //         id:"1",
    //         name:"93年兒童廣播營",
    //         total:"1",
    //         picture:"../images/album/album01.png"
    //     },
    //     {
    //         id:"2",
    //         name:"錄音室集錦",
    //         total:"3",
    //         picture:"../images/album/album02.jpg"
    //     },
    //     {
    //         id:"3",
    //         name:"世新電台與大家分享５０週年校慶的喜悅",
    //         total:"3",
    //         picture:"../images/album/album03-1.jpg"
    //     },
    //     {
    //         id:"4",
    //         name:"2006教職員工子女兒童廣播電視夏令營",
    //         total:"2",
    //         picture:"../images/album/album04.jpg"
    //     },
    //     {
    //         id:"5",
    //         name:"第十屆全國高中廣播研習營",
    //         total:"1",
    //         picture:"../images/album/album05.jpg"
    //     },
    //     {
    //         id:"6",
    //         name:"第九屆全國高中廣播研習營",
    //         total:"1",
    //         picture:"../images/album/album06.jpg"
    //     }
    // ];
}]);