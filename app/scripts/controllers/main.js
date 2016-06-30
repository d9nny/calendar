'use strict';

angular.module('calendarApp')
  .controller('MainCtrl', ['CalendarService', function (CalendarService) {
  	var self = this;
  	self.calendar = CalendarService;
    self.init = false;
    self.months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    self.openCalendar = function() {
      self.calendar.createWeek();
      self.month = self.getCurrentMonth();
      self.year = self.getCurrentYear();
      self.init = true;
    }

    self.addEvents = function() {
      self.week = self.calendar.addEvents();
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

    self.getCurrentMonth = function() {
      return self.months[(new Date).getMonth()];
    }

    self.getCurrentYear = function() {
      return (new Date).getFullYear();
    }


  }]);
