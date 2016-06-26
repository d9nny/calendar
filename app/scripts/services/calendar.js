'use strict';

angular.module('calendarApp')
  .service('CalendarService', function () {
  	var self = this;
    self.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];
    self.months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  	self.date = new Date;
    self.shortDate = {'year': self.date.getFullYear(), 'month': self.date.getMonth(), 'day': self.date.getDate()};
    
    self.generateDays = function() {
      self.activeDates = [];
    
      for(var i =0; i<7; i++) {
        var newDate;
        self.findDaysInMonth();
        
        if (i === 0) {
          newDate = self.retrieveDate();
        }
        else if (self.endOfMonth()) { 
          self.changeDay(1);
          newDate = self.retrieveDate();
        } else {
          self.changeDay(- self.daysInMonth + 1);
          self.changeMonth(1);
          newDate = self.retrieveDate();
        }

        self.addDay(newDate);
      }
      return self.activeDates;
    }

    self.addDay = function(date) {
      var dateObj = {};

      dateObj['date'] = date;
      dateObj['dayWord'] = self.days[ date.getDay()];
      dateObj['day'] = date.getDate();
      dateObj['month'] = self.months[date.getMonth()];
      dateObj['year']  = date.getFullYear();
      
      self.activeDates.push(dateObj)
    }

    self.nextWeek = function() {
      if (self.endOfMonth()) { 
        self.changeDay(1);
      } else {
        self.changeDay(- self.daysInMonth + 1);
        self.changeMonth(1);
      }

      return self.generateDays();
    }

    self.prevWeek = function() {
      if (self.notBeforeStartOfMonth()) { 
        self.changeDay(-13);
      } else {
        self.changeMonth(-1);
        self.findDaysInMonth();
        self.changeDay(self.daysInMonth + (self.shortDate.day - 13))
      }

      return self.generateDays();
    }

    self.findDaysInMonth = function() {
      self.daysInMonth = new Date(self.shortDate.year, self.shortDate.month + 1, 0).getDate();
    }

    self.endOfMonth = function() {
      return (self.shortDate.day + 1 <= self.daysInMonth)
    }

    self.notBeforeStartOfMonth = function() {
      return (self.shortDate.day - 13 < 1)
    }

    self.changeDay = function(amount) {
      self.shortDate.day += amount;
    }

    self.changeMonth = function(amount) {
      self.shortDate.month += amount;
    }

    self.retrieveDate = function() {
      return new Date(self.shortDate.year, self.shortDate.month, self.shortDate.day);
    }

  });
