'use strict';

describe('Service: CalendarService', function() {

  beforeEach(module('calendarApp'));

  var	calendarService,
      mockEventsEndpoint,
      date = new Date(2016,5,26),
      nextWeekDate = new Date(2016,6,3),
      prevWeekDate = new Date(2016,5,19),
      dateObj = {'date':  date, 'dayWord': 'Sunday', 'day': 26, 'month': 'June', 'year': 2016},
      nextWeekDateObj = {'date':  nextWeekDate, 'dayWord': 'Sunday', 'day': 3, 'month': 'July', 'year': 2016},
      prevWeekDateObj = {'date':  prevWeekDate, 'dayWord': 'Sunday', 'day': 19, 'month': 'June', 'year': 2016};

  module(function($provide) {
    $provide.factory('EventsEndpoint', function() {
      return {
        "hello": []
        }
    });
  });

  beforeEach(inject(function (CalendarService, EventsEndpoint) {  
    calendarService = CalendarService;
    mockEventsEndpoint = EventsEndpoint;
    calendarService.activeDates = [];
    calendarService.shortDate = {'year': 2016, 'month': 5, 'day': 26};
  }));

  describe('getCurrentMonth', function() {
    it('gets the current month', function() {
      self.today = new Date(2016,6,29);
      expect(calendarService.getCurrentMonth()).toEqual('Wednesday');
    });
  });

  describe('addDay', function() {
    it('adds a day object to activeDates', function() {
      calendarService.addDay(date);
      expect(calendarService.activeDates.length).toEqual(1);
    });
    it('creates a day object', function() {
      calendarService.addDay(date);
      expect(calendarService.activeDates[0]).toEqual(dateObj);
    });
  });

  describe('nextWeek', function() {
    it('replaces the day objects in activeDates', function() {
      calendarService.generateDays();
      calendarService.nextWeek();
      expect(calendarService.activeDates.length).toEqual(7);
    });
    it('creates 7 day objects', function() {
      calendarService.generateDays();
      calendarService.nextWeek();
      expect(calendarService.activeDates[0]).toEqual(nextWeekDateObj);
    });
  });

  describe('prevWeek', function() {
    it('replaces the day objects in activeDates', function() {
      calendarService.generateDays();
      calendarService.prevWeek();
      expect(calendarService.activeDates.length).toEqual(7);
    });
    it('creates 7 day objects', function() {
      calendarService.generateDays();
      calendarService.prevWeek();
      expect(calendarService.activeDates[0]).toEqual(prevWeekDateObj);
    });
  });

  describe('findDaysInMonth', function() {
    it('gets the number of days in current month', function() {
      calendarService.findDaysInMonth();
      expect(calendarService.daysInMonth).toEqual(30);
    });
  });

  describe('endOfMonth', function() {
    it('returns true if still in the month', function() {
      calendarService.findDaysInMonth();
      calendarService.shortDate.day = 25;
      expect(calendarService.endOfMonth()).toBe(true);
    });
    it('returns false if on last day of the month', function() {
      calendarService.findDaysInMonth();
      calendarService.shortDate.day = 30;
      expect(calendarService.endOfMonth()).toBe(false);
    });
  });


  describe('notBeforeStartOfMonth', function() {
    it('returns false if still in the month', function() {
      calendarService.findDaysInMonth();
      calendarService.shortDate.day = 25;
      expect(calendarService.notBeforeStartOfMonth()).toBe(false);
    });
    it('returns false if on last day of the month', function() {
      calendarService.findDaysInMonth();
      calendarService.shortDate.day = 3;
      expect(calendarService.notBeforeStartOfMonth()).toBe(true);
    });
  });

  describe('changeDay', function() {
    it('adds input value onto day', function() {
      calendarService.changeDay(3);
      expect(calendarService.shortDate.day).toEqual(29);
    });
  });

  describe('changeMonth', function() {
    it('adds input value onto month', function() {
      calendarService.changeMonth(1);
      expect(calendarService.shortDate.month).toEqual(6);
    });
  });

  describe('retrieveDate', function() {
    it('retrieves a date', function() {
      expect(calendarService.retrieveDate()).toEqual(date);
    });
  });

});
