var config = {
    api_host: "https://shrs.shu.edu.tw/shrs_cms/api/",
    web_host: "https://shrs.shu.edu.tw/shrs_cms/",
    storage_host: "https://shrs.shu.edu.tw/shrs_cms/storage/app/"
};

// Define the `shrsApp` module
var App = angular.module('shrsApp').config(['$locationProvider', '$routeProvider',
	function config($locationProvider, $routeProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');

		$routeProvider.
		when('/sitemap', {
			templateUrl: 'sitemap.html',
            controller: 'stopMusicProgram'
		}).
		when('/about', {
			templateUrl: 'about.html',
            controller: 'stopMusicProgram'
		}).
		when('/about/en', {
			templateUrl: 'about_en.html',
            controller: 'stopMusicProgram'
		}).
		when('/staff', {
			templateUrl: 'staff.html',
            controller: 'stopMusicProgram'
		}).
		when('/construct', {
			templateUrl: 'construct.html',
            controller: 'stopMusicProgram'
		}).
		when('/history', {
			templateUrl: 'history.html',
            controller: 'stopMusicProgram'
		}).
		when('/history/en', {
			templateUrl: 'history_en.html',
            controller: 'stopMusicProgram'
		}).
		when('/program/list', {
			templateUrl: 'program_list.html',
            controller: 'stopMusicProgram'
		}).
		when('/program/select', {
			templateUrl: 'program_select.html',
            controller: 'stopMusicProgram'
		}).
		when('/program/detail/:id', {

			templateUrl: 'program_detail.html',
            controller: 'stopMusicProgram'
		}).
		when('/host', {
			templateUrl: 'host.html',
            controller: 'stopMusicProgram'
		}).
		when('/host/detail/:id', {
			templateUrl: 'host_detail.html',
			controller : "hostDetailController",
            controller: 'stopMusicProgram'
		}).
		when('/news/detail/:id', {
			templateUrl: 'news_detail.html',
            controller: 'stopMusicProgram'

			//templateUrl: 'news:id.html',
			/*templateUrl: function(params) {
				return 'news'+ params.id +'.html';
			},*/
			//controller : "hostDetailController"
		}).
		when('/archive_news/detail/:id', {
			templateUrl: 'archive_news_detail.html',
            controller: 'stopMusicProgram'
		}).
		when('/news', {
			templateUrl: 'news.html',
            controller: 'stopMusicProgram'
		}).
		when('/album', {
			templateUrl: 'album.html',
            controller: 'stopMusicProgram'
		}).
		when('/album/detail/:id', {
			templateUrl: 'album_detail.html',
            controller: 'stopMusicProgram'
		}).
		when('/knowledge', {
			templateUrl: 'knowledge.html',
            controller: 'stopMusicProgram'
		}).
		when('/survey', {
			templateUrl: 'survey.html',
            controller: 'stopMusicProgram'
		}).
		when('/knowledge/detail/:id', {
			templateUrl: 'knowledge_detail.html',
            controller: 'stopMusicProgram'
			/*
			templateUrl: function(params) {
				return 'knowledge'+ params.id +'.html';
			},
			*/
			//controller : "hostDetailController"
		}).
		when('/link', {
			templateUrl: 'link.html',
            controller: 'stopMusicProgram'
		}).
		when('/contact', {
			templateUrl: 'contact.html',
            controller: 'stopMusicProgram'
		}).
		when('/archiveProgram', {
			templateUrl: 'archive_program.html',
            controller: 'stopMusicProgram'
		}).
		when('/archiveTeam', {
			templateUrl: 'archive_team.html',
            controller: 'stopMusicProgram'
		}).
		when('/archiveHosts', {
			templateUrl: 'archive_hosts.html',
            controller: 'stopMusicProgram'
		}).
		when('/archiveNews', {
			templateUrl: 'archive_news.html',
            controller: 'stopMusicProgram'
		}).
		when('/famous', {
			templateUrl: 'famous.html',
            controller: 'stopMusicProgram'
		}).
		when('/', {
			templateUrl: 'home.html',
            controller: 'stopMusicProgram'
		}).

		otherwise('/');

	}
]);

App.controller('stopMusicProgram', function() {
//soundManager.stopAll();
$('#clearProgramPlaylist').trigger('click');
});

// Define the `indexController` controller on the `phonecatApp` module
/*App.controller('indexController', function indexController($scope) {
 // $scope.index = [
 // {
 // name: 'Nexus S',
 // snippet: 'Fast just got faster with Nexus S.'
 // }, {
 // name: 'Motorola XOOM? with Wi-Fi',
 // snippet: 'The Next, Next Generation tablet.'
 // }, {
 // name: 'MOTOROLA XOOM?',
 // snippet: 'The Next, Next Generation tablet.'
 // }
 // ];

 //angular.element(document).ready(function () {
 //
 //});
 $scope.$back = function() {
 window.history.back();
 };
 });*/



App.directive('header', header).directive('footer',footer);

function header() {
	return {
		templateUrl: 'header.html'
	}
}

function footer() {
	return {
		templateUrl: 'footer.html'
	}
}
var injectCSS = function(element,url) {
	var injectElement = angular.element(document.createElement('link'));
	injectElement.attr('rel', 'stylesheet');
	injectElement.attr('href', url);
	element.append(injectElement);
};

var injectScript = function(element,url) {
	var injectElement = angular.element(document.createElement('script'));
	injectElement.attr('charset', 'utf-8');
	injectElement.attr('src', url);
	element.append(injectElement);
};

App.directive('backButton', ['$window', function($window) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				$window.history.back();
			});
		}
	};
}]);

App.directive('tabButton', ['$document', function($document) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				var $grids = $('.sortbox .grids');
				//console.log(elem.find('a').attr ('data-area'));
				//angular.element(elem.find('a').attr ('data-area')).show().siblings ('.hislistbox').hide();
				$(elem.find('a'). attr('data-area')).show().siblings ('.hislistbox').hide();
				$grids.find('a').removeClass('hold');
				elem.find('a').addClass('hold');
			});
		}
	};
}]);

App.directive('circleTabButton', ['$document', function($document) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				$('.gridsbox').find('a').removeClass('hold');
				elem.addClass('hold');
			});
		}
	};
}]);

App.directive('liveTabButton', ['$document', function($document) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				$('.tds-a').find('div').removeClass('bgs');
				elem.addClass('bgs');
			});
		}
	};
}]);

App.directive('voteItemButton', ['$document', function($document) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			elem.bind('click', function () {
				elem.parent().children().removeClass('selected');
				elem.addClass("options selected")
			});
		}
	};
}]);

