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


});
