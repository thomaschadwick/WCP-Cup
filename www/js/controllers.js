angular.module('wcp.controllers',[])

.controller('LatestCtrl',function($scope,wcp,$ionicLoading,$filter,orderByFilter){

    function processLatestResults() {
        wcp.getResults().success(function(data){
            for (i = 0; i < data.results.length; i++)
            {
                data.results[i].shortDate = $filter('date')(data.results[i].date.iso, "fullDate", 'UTC');
                data.results[i].time = $filter('date')(data.results[i].date.iso, "HH:mm", 'UTC');
            }
            $scope.matches = orderByFilter(data.results, '-date.iso');
        })
        .finally(function() {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });        
    }

    $ionicLoading.show({
      template: 'Loading...'
    });

    processLatestResults();

    $scope.fetchResults = function() {
        processLatestResults();
    };

})

.controller('UpcomingCtrl',function($scope,wcp,$ionicLoading,$filter,orderByFilter){

    function processUpcomingMatches() {
        wcp.getUpcoming().success(function(data){
            for (i = 0; i < data.results.length; i++)
            {
                data.results[i].shortDate = $filter('date')(data.results[i].date.iso, "fullDate", 'UTC');
                data.results[i].time = $filter('date')(data.results[i].date.iso, "HH:mm", 'UTC');

                var matchTimeBegin = new Date($filter('date')(data.results[i].date.iso, "yyyy-MM-ddTHH:mm:ss.sssZ", 'UTC'));
                var matchTimeEnd = new Date($filter('date')(data.results[i].date.iso, "yyyy-MM-ddTHH:mm:ss.sssZ", 'UTC'));
                var currentTime = new Date();
                
                matchTimeEnd.setHours(matchTimeEnd.getHours() + 1);

                if (matchTimeBegin < currentTime && matchTimeEnd > currentTime)
                {
                    data.results[i].isLive = true;
                }
                else
                {
                    data.results[i].isLive = false;
                }
                //data.results[i].isLive = new Date($filter('date')(data.results[i].date.iso, "yyyy-MM-ddTHH:mm:ss.sssZ", 'UTC')).getHours() == new Date().getHours();
            }
            $scope.matches = orderByFilter(data.results, 'date.iso');
        }).finally(function() {
            $ionicLoading.hide()
            $scope.$broadcast('scroll.refreshComplete');
        });
    }


    $ionicLoading.show({
      template: 'Loading...'
    });

    processUpcomingMatches();

    $scope.fetchMatches = function() {
        processUpcomingMatches();
    };

})

.controller('PoolsCtrl',function($scope,wcp,$ionicLoading,$ionicSlideBoxDelegate){

    $scope.poolNames = ['Mens Pool A', 
                    'Mens Pool B', 
                    'Mens Pool C', 
                    'Mens Pool D', 
                    'Womens Pool A', 
                    'Womens Pool B', 
                    'Mens Masters', 
                    'U16 Girls', 
                    'U12 Girls', 
                    'U21 Boys', 
                    'U16 Boys', 
                    'U14 Boys', 
                    'U12 Boys Pool A', 
                    'U12 Boys Pool B']

    $ionicLoading.show({
      template: 'Loading...'
    });

    wcp.getPool($scope.poolNames[0]).success(function(data){
        $scope.pool = data.results;
        //$ionicSlideBoxDelegate.$getByHandle('pool-viewer').update();
    })
    .finally(function() {
        $ionicLoading.hide();
    });

    $scope.slideHasChanged = function(id) {

        $ionicLoading.show({
          template: 'Loading...'
        });

        wcp.getPool($scope.poolNames[id]).success(function(data){
            $scope.pool = data.results;
            //$ionicSlideBoxDelegate.$getByHandle('pool-viewer').update();
        })
        .finally(function() {
            $ionicLoading.hide();
        });
    };
})

.controller('ScheduleCtrl',function($scope,wcp,$ionicLoading,$filter,orderByFilter){

    function processSchedule() {
        wcp.getMatches().success(function(data){
            for (i = 0; i < data.results.length; i++)
            {
                data.results[i].shortDate = $filter('date')(data.results[i].date.iso, "fullDate", 'UTC');
                data.results[i].time = $filter('date')(data.results[i].date.iso, "HH:mm", 'UTC');
            }
            $scope.matches = orderByFilter(data.results, 'date.iso');
        })
        .finally(function() {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });        
    }

    $ionicLoading.show({
      template: 'Loading...'
    });

    processSchedule();

    $scope.fetchSchedule = function() {
        processSchedule();
    };
});