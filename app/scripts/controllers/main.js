'use strict';

angular.module('calendarApp')
  .controller('MainCtrl', ['EventsEndpoint', 'CalendarService', '$http', '$resource', function (EventsEndpoint, CalendarService, $http, $resource) {
  	var self = this;
   	// self.events = EventsEndpoint.retrieve,
  	self.calendar = CalendarService;

    console.log(self.events);

    self.openCalendar = function() {
      self.days = self.calendar.generateDays();
    }

    self.nextWeek = function() {
      self.days = self.calendar.nextWeek();
    }

    self.prevWeek = function() {
      self.days = self.calendar.prevWeek();
    }

      self.getBittylicious = function() {
        return  $resource('http://assessments.bzzhr.net/calendar?format=json').get();
      };

      self.get =function() {
        var bittyliciousObject = self.getBittylicious();
        bittyliciousObject.$promise.then(function(data) {
          console.log(data);
          console.log(1);
        });
      };


  }]);
