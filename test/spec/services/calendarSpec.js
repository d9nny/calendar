'use strict';

describe('Service: CalendarService', function() {

  beforeEach(module('calendarApp'));

  var	calendarService,
      mockEventsEndpoint,
      httpBackend,
      date = new Date(2016,5,26),
      threeDaysDate = new Date(2016,5,29),
      nextWeekDate = new Date(2016,6,3),
      prevWeekDate = new Date(2016,5,19),
      events = [{ 'category': 'grey', 'end': nextWeekDate, id: 1, 'label': 'Lunch uqlzoe', 'start': nextWeekDate }],
      eventNextWeek = { 'category': 'grey', 'end': nextWeekDate, id: 1, 'label': 'Lunch uqlzoe', 'start': nextWeekDate},
      dateObj = {'date':  date, 'events': [], 'dayWord': 'Sunday', 'dayOfMonth': 26},
      nextWeekDateObj = {'date':  nextWeekDate, 'dayWord': 'Sunday', 'day': 3, 'month': 'July', 'year': 2016},
      prevWeekDateObj = {'date':  prevWeekDate, 'dayWord': 'Sunday', 'day': 19, 'month': 'June', 'year': 2016};

  module(function($provide) {
    $provide.factory('EventsEndpoint', function() {
      return [{ 'category': 'grey', 'end': nextWeekDate, id: 1, 'label': 'Lunch uqlzoe', 'start': nextWeekDate }]
    });
  });

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend
    httpBackend
      .expectGET("https://assessments.bzzhr.net/calendar/")
      .respond(
        { events: events }
      );
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(inject(function (CalendarService, EventsEndpoint) {  
    calendarService = CalendarService;
    mockEventsEndpoint = EventsEndpoint;
    calendarService.today = date;
    calendarService.events = events;
  }));

  describe('createWeek', function() {
    it('fills a week array with days', function() {
      calendarService.createWeek();
      httpBackend.flush();
      expect(calendarService.week.length).toEqual(7);
    });
  });

  describe('getDayObj', function() {
    it('gets another day', function() {
      httpBackend.flush();
      expect(calendarService.getDayObj(3)).toEqual(threeDaysDate);
    });
  });

  describe('addDayToWeek', function() {
    it('adds a day to the week array', function() {
      calendarService.addDayToWeek(date);
      httpBackend.flush();
      expect(calendarService.week[0]).toEqual(dateObj);
    });
  });

  describe('addOtherDays', function() {
    it('adds days before or after the current date', function() {
      calendarService.addOtherDays(3, 1);
      httpBackend.flush();
      expect(calendarService.week.length).toEqual(4);
    });
    it('adds days before or after the current date', function() {
      calendarService.addOtherDays(7, 1);
      httpBackend.flush();
      expect(calendarService.week[0]['date']).toEqual(nextWeekDate);
    });
  });

  describe('nextWeek', function() {
    it('goes forward a week', function() {
      calendarService.nextWeek();
      httpBackend.flush();
      expect(calendarService.today).toEqual(nextWeekDate);
    });
  });

  describe('prevWeek', function() {
    it('goes back a week', function() {
      calendarService.prevWeek();
      httpBackend.flush();
      expect(calendarService.today).toEqual(prevWeekDate);
    });
  });

});
