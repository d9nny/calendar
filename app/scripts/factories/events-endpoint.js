'use strict';

angular.module('calendarApp')
.factory("EventsEndpoint", ['$http', function($http) {

	var path = 'http://assessments.bzzhr.net/calendar?since=2016-06-26';

	return {
    retrieve: function() {
      return $http({
        url: path,
        method: 'GET'
      });
    }
  }
}]);
