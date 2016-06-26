'use strict';

angular.module('calendarApp')
  .controller('MainCtrl', ['EventsEndpoint', 'CalendarService', function (EventsEndpoint, CalendarService) {
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

  }]);
