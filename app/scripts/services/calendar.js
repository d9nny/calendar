'use strict';

angular.module('calendarApp')
  .service('CalendarService', ['EventsEndpoint', function (EventsEndpoint) {
  	var self = this;
    self.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday'];
    self.months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    self.today = new Date();
    self.week = [];
    
    EventsEndpoint.retrieve()
      .then(function(response) {
        self.events = response.data;
        console.log(self.events);
      })

    self.getCurrentMonth = function() {
      return self.months[self.today.getMonth()];
    }

    self.getCurrentYear = function() {
      return self.today.getFullYear();
    }

    self.createWeek = function() {
      var day = self.today.getDay(),
          futureDays = 8 - day,
          prevDays = day;

      self.addDayToWeek(self.today);
      self.addOtherDays(futureDays, 1);
      self.addOtherDays(prevDays, -1);
    }

    self.addEvents = function() {
      var start = (self.week[0]['date']).getTime(),
          finish = self.week[6]['date'].getTime();

      for (var i = 0; i < self.events.length; i++) {
        var eventDate = (new Date(self.events[i]['start'])).getTime();
        if ( eventDate >= start && eventDate <= finish ) {
          var day = (new Date(self.events[i]['start'])).getDay();
          (self.week[day]['events']).push(self.events[i]);
        }
      }
      return self.week;
    }

    self.getDayObj = function(factor) {
      return new Date(self.today.getTime() + factor*86400000);
    }

    self.addDayToWeek = function(day) {
      var i = day.getDay(),
          dateString = day.toDateString();

      self.week[i] = { 'date': day, 'dateString': dateString, 'events': [], 
                       'dayWord': self.days[i], 'dayOfMonth': day.getDate()};
    }

    self.addOtherDays = function(days, factor) {
      for (var i = 1; i <= days; i++) {
        self.addDayToWeek(self.getDayObj(factor*i))
      };
    }

    self.retrieveDate = function(year, month, day) {
      return new Date(year, month, day);
    }

    self.nextWeek = function() {
      self.today = self.getDayObj(7);
      self.createWeek();
      return self.addEvents();
    }

    self.prevWeek = function() {
      self.today = self.getDayObj(-7);
      self.createWeek();
      return self.addEvents();
    }

  }]);
