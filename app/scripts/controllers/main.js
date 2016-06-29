'use strict';

angular.module('calendarApp')
  .controller('MainCtrl', ['CalendarService', function (CalendarService) {
  	var self = this;
  	self.calendar = CalendarService;
    self.init = false;

    self.openCalendar = function() {
      self.calendar.createWeek();
      self.week = self.calendar.addEvents();
      self.month = self.calendar.getCurrentMonth();
      self.year = self.calendar.getCurrentYear();
      self.init = true;
    }

    self.nextWeek = function() {
      self.week = self.calendar.nextWeek();
    }

    self.prevWeek = function() {
      self.week = self.calendar.prevWeek();
    }

    self.getTime = function(date) {
      return (new Date(date)).toTimeString().substr(0,5);
    }

  }]);
