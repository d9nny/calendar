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

    self.createWeek = function() {
      var day = self.today.getDay(),
          futureDays = 6 - day,
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
      self.organiseEvents();
      return self.week;
    }

    self.organiseEvents = function() {
      for (var i = 0; i < self.week.length; i++) {
        self.week[i]['events'].sort(function(x,y) {
          var start = new Date(x['start']),
              finish = new Date(y['start']);
          return start.getTime() - finish.getTime();
        })
      } 
    }

    self.getDayObj = function(factor) {
      return new Date(self.today.getTime() + factor*86400000);
    }

    self.addDayToWeek = function(day) {
      var i = day.getDay();
      self.week[i] = { 'date': day, 'events': [], 'dayWord': self.days[i], 'dayOfMonth': day.getDate()};
    }

    self.addOtherDays = function(days, factor) {
      for (var i = 1; i <= days; i++) {
        self.addDayToWeek(self.getDayObj(factor*i))
      };
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
