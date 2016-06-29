'use strict';

angular.module('calendarApp')
.factory("EventsEndpoint", ['$http', function($http) {

	var path = 'https://assessments.bzzhr.net/calendar/';

	return {
    retrieve: function() {
      return $http({
        url: path,
        method: 'GET'
      });
    }
  }
}]);
