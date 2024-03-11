/**
 * Created by CCDN on 2017/6/30.
 */
App.directive("programDetailJs", function () {
    return {
        link: function (scope, element, attrs) {
            injectScript(element, attrs.programDetailJs);
        }
    };
});

App.filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

App.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

App.config(function (ezfbProvider, $routeProvider) {
    ezfbProvider.setInitParams({
        appId: '386469651480295',
        version: 'v2.6'
    });
});

App.controller("programDetailController", ['$http', '$scope', '$sce', '$routeParams', function ($http, $scope, $sce, $routeParams) {
    $http.get(config.api_host + "programDetail/" + $routeParams.id)
        .then(function (response) {
            var programs = response.data;
            for (var i = 0; i < programs.length; i++) {
                programs[i].programIntroduction = (programs[i].programIntroduction)?programs[i].programIntroduction:'';
                programs[i].programIntroduction = $sce.trustAsHtml(nl2br(programs[i].programIntroduction));

                var tempMp3IssetChk = 0;
                if (programs[i].programJournals != '' && programs[i].programJournals != null) {
                    for (var j = 0; j < programs[i].programJournals.length; j++) {
                        programs[i].programJournals[j].programJournal = $sce.trustAsHtml(nl2br(programs[i].programJournals[j].programJournal));
                        var tempMp3 = (programs[i].programJournals[j].programMp3) ? config.storage_host + "journal/" + programs[i].programJournals[j].programMp3 : null;
                        tempMp3IssetChk = (tempMp3) ? 1:tempMp3IssetChk;
                        programs[i].programJournals[j].programMp3 =
                            {
                                id: j + 1,
                                title: programs[i].programJournals[j].programJournalTitle,
                                artist: '',
                                url: tempMp3
                            }
                    }
                }
            }

            $scope.data = programs[0];
            // $scope.programJournals = programs[0].programJournals;
            getPageAPI(programs[0].programJournals);
            $scope.data.soundsShow = tempMp3IssetChk;
            // $scope.data.facebookPost = '<iframe src="" width="340" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'
            $scope.data.facebookPost = "https://www.facebook.com/plugins/page.php?href=" + programs[0].facebookUrl + "&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId";
        });

    //取得分頁
    function getPageAPI(albums) {
        $scope.tempData = albums;

        //分頁總數
        $scope.pageSize = 5;
        $scope.pages = Math.ceil($scope.tempData.length / $scope.pageSize); //分頁數
        $scope.newPages = $scope.pages > 5 ? 5 : $scope.pages;
        $scope.pageList = [];
        $scope.selPage = 1;
        //設置表格數據(分頁)
        $scope.setData = function () {
            $scope.programJournals = $scope.tempData.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通過當前頁數，篩顯出當前資料
        }
        $scope.programJournals = $scope.tempData.slice(0, $scope.pageSize);

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

    $scope.getMyLastName = function () {
        facebookService.getMyLastName()
            .then(function (response) {
                    $scope.last_name = response.last_name;
                }
            );
    };

    function nl2br (str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }


    /* 音樂格式假資料*/
    // $scope.songs = [
    //     {
    //         id: 'one',
    //         title: 'Rain',
    //         artist: 'Drake',
    //         url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
    //     },
    //     {
    //         id: 'two',
    //         title: 'Walking',
    //         artist: 'Nicki Minaj',
    //         url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/walking.mp3'
    //     },
    //     {
    //         id: 'three',
    //         title: 'Barrlping with Carl (featureblend.com)',
    //         artist: 'Akon',
    //         url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
    //     },
    //     {
    //         id: 'four',
    //         title: 'Angry cow sound?',
    //         artist: 'A Cow',
    //         url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
    //     },
    //     {
    //         id: 'five',
    //         title: 'Things that open, close and roll',
    //         artist: 'Someone',
    //         url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
    //     }
    // ];

    /*假資料*/
    // $scope.programSelect =[
    //     {
    //         programPic:"../images/program/program01.jpg",
    //         programTitle:"傳播名校APP",
    //         programHost:"芳芳 歐罵馬",
    //         programPlayTime:"AM 週日12:00",
    //         programIntroduction:"",
    //         programJournals:[{programJournalDate:"2017/06/25",programTitle:"傳播名校APP第5集",programJournal:$sce.trustAsHtml("[傳播領頭羊]來賓：薪傳人<br/>身穿小紅衣的薪傳人，保有學生的本質，不是以西裝或旗袍等樣子示人，身為校園親善大使代表學校接觸校外，無論是學生家長，或是高中校園，都是他們第一次接觸的對象。高中生到人生地不熟的大學校園面試，有時會很惶恐，薪傳人的甄愛世新活動中，扮演親切的哥哥姊姊導覽，直接送他們到面試的場地，甚至得到家長的感謝，這樣就很開心了。")},
    //                         {programJournalDate:"2017/06/18",programTitle:"傳播名校APP第4集",programJournal:$sce.trustAsHtml("[傳播領頭羊]來賓：關尚仁主任<br/>科學傳播要培訓的是讓專業的理工醫農人才學習傳播技能，讓他們能說人能懂的科學。")},
    //                         {programJournalDate:"2017/06/11",programTitle:"傳播名校APP第3集",programJournal:$sce.trustAsHtml("[傳播領頭羊]來賓：電算中心邱主任、管理學院廖院長<br/>世新大學APP有許多功能，從起初的課表查詢、成績查詢，發展到後來有工讀資訊、公車預估到站與校園周邊美食等多功能。對老師而言，停車場的位置更是重要。而APP的資訊及功能與時俱進在新增，有專門在管理，是用上更加親近。")},
    //                         {programJournalDate:"2017/06/04",programTitle:"傳播名校APP第2集",programJournal:$sce.trustAsHtml("[傳播領頭羊]來賓：教務長、研發長、大數據中心<br/>世新大學的招生成績優良，也是業界最愛用傳播大學，企業、學生及家長評鑑優良。")},
    //                         {programJournalDate:"2017/05/28",programTitle:"傳播名校APP第1集",programJournal:$sce.trustAsHtml("[傳播領頭羊]來賓：傳院游院長、全媒體賴主任<br/>全媒體人才的培育：理論與實務並重和傳播貫穿各學門、體育主播轉播訓練，學生主動學習力強，甚至參與世大運青年記者。")}]
    //     },
    //     {
    //         programPic:"../images/program/program06.jpg",
    //         programTitle:"財稅123 ",
    //         programHost:"啊嵐 金魚",
    //         programPlayTime:"AM 週六10:00",
    //         programIntroduction:"",
    //         programJournals:[{programJournalDate:"2017/2/11",programTitle:"財稅123 第一集",programJournal:$sce.trustAsHtml("一、財政萬萬稅<br/><br/>1. 租稅是什麼<br/>2. 國稅與地方稅<br/>3. 生活中的租稅<br/><br/>二、財稅小學堂<br/>板橋分局張麗燕課長－不可不知的稅制新知<br/><br/>三、財稅獎不完<br/>Q：個人交易適用新制的房屋、土地，應如何辦理申報?<br/>(A) 次年度五月份之個人綜所申報<br/>(B) 係採分離申報納稅，應於所有權移轉登記日的次日<br/>起算30日內向國稅局辦理申報<br/>(C) 不必申報，由國稅局逕行核定<br/>(D) 應於所有權移轉登記日的次日起算兩個月內向國稅<br/>局辦理申報")}],
    //
    //     },
    //     {
    //         programPic:"../images/program/program02.jpg",
    //         programTitle:"A DJ  ",
    //         programHost:"",
    //         programPlayTime:"",
    //         programIntroduction:$sce.trustAsHtml("【流行充電站】<br/>熱門娛樂話題、歌曲發行情報、排行最新動態，通通都在流行充電站。<br/><br/>【創作夢工廠】<br/>在這個單元，你將聽到功不可沒的詞曲作者，和才華洋溢的創作新秀。<br/><br/>【音樂紓壓室】<br/>可以是一段爵士樂，或是一首抒情歌，周二的夜晚，我們一起放輕鬆。"),
    //         programJournals:[{programJournalDate:"2016/05/31",programTitle:"【A DJ】EP207",programJournal:$sce.trustAsHtml("這本書，唸了四年，在2016年的最後一個五月天，我讓自己畢業了。即便有再多的不捨，終究，還是來到了最後一頁。在這最後一夜，我整理了過去四年，總共1449個日子、205集的節目片段，好好地、仔細地，聽聽自己說說話。")},
    //                         {programJournalDate:"2016/05/24",programTitle:"【A DJ】EP206",programJournal:$sce.trustAsHtml("來自東臺灣的獎金獵人！Savulu & Laway獻聲世新電台A DJ！<br/><br/>畢業於臺東高中，卑南族南王部落的陳政陽(Savulu)、馬蘭阿美族的蔣偉華(Laway)，堪稱是各大專校院音樂比賽的「獎金獵人」。陸續征戰過舉凡南榮科大弦韻盃、 中山大學弦灣盃、中正大學飛聆盃後，兩人在2014年決定合體，以原住民本名Savulu & Laway闖蕩樂壇。團結力量大，Savulu & Laway不但在第22屆政大金旋獎上，一舉抱回最佳作曲，更在去年代表臺灣出賽「2015 Asian Beat 亞洲總決賽」，與來自中國、香港、韓國、泰國、印尼、新加坡、馬來西亞等地的音樂人分庭抗禮、一決高下。")}],
    //
    //     },
    //     {
    //         programPic:"../images/program/program03.jpg",
    //         programTitle:"異遊未盡",
    //         programHost:"",
    //         programPlayTime:"AM 週五16:00",
    //         programIntroduction:$sce.trustAsHtml("每週五下午四點鐘~<br/>於世新電台AM729與您空中相會，<br/>不僅分享許多新鮮國際新聞、趣事，<br/>一小時的節目，<br/>讓您在活潑、愉快的氣氛中度過~<br/>愛旅行、愛生活的你 <br/>走過、路過......千！萬！不！能！錯！過！"),
    //         programJournals:[{programJournalDate:"2016/04/15",programTitle:"不可思議美西圓夢之旅",programJournal:$sce.trustAsHtml("嘿！四月最痛心的兩件事......《太陽的後裔》完結篇之外，<br/>就是咱們的KOBE老大退休啦！身兼宋太太&KOBE迷的偲維，在三<br/>月底趕緊去看了偶像KOBE打球，更幸運碰上環球影城哈莉波特<br/>的試營運呢！她直呼今年的運氣都用光光了啦！想聽精采的美西<br/>行，趕緊收聽吧~")},
    //                         {programJournalDate:"2016/04/01",programTitle:"青年大使外交任務來啦",programJournal:$sce.trustAsHtml("本集請來兩位「104年國際青年大使」來分享組訓及出國訪演<br/>的故事呢！<br/>你聽過號稱「三聖」的加勒比海三島國嗎？想體會中美洲馬<br/>雅文名的浩瀚嗎？<br/>愛台灣就該聽這集！美加團的Milly與北美一團的黃金告訴你<br/>他們的故事！")}],
    //
    //     },
    //     {
    //         programPic:"../images/program/program04.jpg",
    //         programTitle:"少女妙妙屋",
    //         programHost:"可可、丹丹",
    //         programPlayTime:"",
    //         programIntroduction:$sce.trustAsHtml("主持人是可可和丹丹~<br/>我們以家庭為概念，邀請聽眾們與我們共享周六下午的優閒時光！"),
    //         programJournals:[{programJournalDate:"2016/03/12",programTitle:"第四十一集＿白色情人節SP ft.軒軒",programJournal:$sce.trustAsHtml("一、食譜－－生巧克力塔<br/>＊材料：<br/>（塔皮）無鹽奶油100g（隔水加熱融化備用）、消化餅12片（壓成細碎粉狀備用）、（餡）苦甜巧克力100g、鮮奶油100g、可可粉適量、七吋塔盤<br/>1.塔盤塗上薄薄一層油，灑點低筋麵粉防沾<br/>2.消化餅粉裡加入融化奶油拌勻成派皮，置入派盤中舖平壓實後，放入烤箱以180度烤約10分鐘，取出放涼。<br/>3.苦甜巧克力、鮮奶油一同隔水加熱到完全融化，待涼備用。<br/>4. 將巧克力餡倒入塔皮裡，放進冰箱冷藏3小時以上，巧克力變成固狀就完成了！可以在表面篩上可可粉裝飾")},
    //                         {programJournalDate:"2016/03/05",programTitle:"第四十集＿破解最專情星座前五名！",programJournal:$sce.trustAsHtml("％廚房Party Time：南瓜麵疙瘩<br/>％院子裡的霹哩啪啦碰：破解最專情星座前五名！<br/>％閣樓中的小寶箱：不要放進微波爐！<br/>％國家音樂客廳：人～聲～樂～團～")}],
    //
    //     },
    //     {
    //         programPic:"../images/program/program05.jpg",
    //         programTitle:"手帳迷雜貨鋪",
    //         programHost:"",
    //         programPlayTime:"",
    //         programIntroduction:$sce.trustAsHtml("提供手帳迷一個廣播的專屬空間，透過廣播，聆聽其他人的經驗、得知更多的文具知識，也成為一個陪伴手帳迷寫手帳的好夥伴。"),
    //         programJournals:[{programJournalDate:"2016/02/24",programTitle:"第三十九集─旅遊手帳書籍分享",programJournal:$sce.trustAsHtml("好久不見的現場直播～<br/><br/>在節目開場佳臻與小賀公器私用的宣傳了我們的畢業製作─廣播小說毛娼伎。據說會製作紙膠帶與明信片喔，還請大家多多支持！")},
    //                         {programJournalDate:"2016/02/17",programTitle:"第三十八集─一分之一工作室特集(下)",programJournal:$sce.trustAsHtml("上個禮拜老闆主要分享經營文具店的心得，這禮拜當然就是大家期待已久的文具部分囉！")}],
    //
    //     }
    // ]

    // $scope.data = $scope.programSelect[$routeParams.id-1];

}]);