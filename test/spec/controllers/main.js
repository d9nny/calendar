'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('calendarApp'));

  var MainCtrl,
    scope,
    mockCalendarService,
    httpBackend,
    start = new Date('Thu Jun 30 2016 19:09:46 GMT+0100 (BST)'),
    end = new Date(2016,6,3),
    time = '19:09';

  module(function($provide) {
    $provide.service('CalendarService', function() {
      this.createWeek = jasmine.createSpy('createWeek').andCallFake(function() {}); 
      this.addEvents = jasmine.createSpy('addEvents').andCallFake(function() {}); 
      this.nextWeek = jasmine.createSpy('nextWeek').andCallFake(function() {}); 
      this.prevWeek = jasmine.createSpy('prevWeek').andCallFake(function() {}); 
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, CalendarService, $httpBackend) {
    scope = $rootScope.$new();
    mockCalendarService = CalendarService;
    MainCtrl = $controller('MainCtrl', { $scope: scope }, mockCalendarService);
    httpBackend = $httpBackend
    httpBackend
      .expectGET("https://assessments.bzzhr.net/calendar/")
      .respond(
        { events: [{ 'category': 'grey', 'end': end, id: 1, 'label': 'Lunch uqlzoe', 'start': start }] }
      );
    scope.$apply(); 
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('openCalendar', function() {
    it('should call createWeek', function () {
      spyOn(mockCalendarService,'createWeek');
      MainCtrl.openCalendar();
      httpBackend.flush();
      expect(mockCalendarService.createWeek).toHaveBeenCalled();
    });
    it('should set the year', function () {
      spyOn(mockCalendarService,'createWeek');
      MainCtrl.today = new Date(2016,6,29);
      MainCtrl.openCalendar();
      httpBackend.flush();
      expect(MainCtrl.year).toEqual(2016);
    });
    it('should set the Month', function () {
      spyOn(mockCalendarService,'createWeek');
      MainCtrl.today = new Date(2016,6,29);
      MainCtrl.openCalendar();
      httpBackend.flush();
      expect(MainCtrl.month).toEqual('June');
    });
  });

  describe('addEvents', function() { 
    it('should call addEvents', function () {
      spyOn(mockCalendarService,'addEvents');
      MainCtrl.addEvents();
      httpBackend.flush();
      expect(mockCalendarService.addEvents).toHaveBeenCalled();
    });
  });

  describe('nextWeek', function() {
    it('should call nextWeek', function () {
      spyOn(mockCalendarService,'nextWeek');
      MainCtrl.nextWeek();
      httpBackend.flush();
      expect(mockCalendarService.nextWeek).toHaveBeenCalled();
    });
  });

  describe('prevWeek', function() {
    it('should call prevWeek', function () {
      spyOn(mockCalendarService,'prevWeek');
      MainCtrl.prevWeek();
      httpBackend.flush();
      expect(mockCalendarService.prevWeek).toHaveBeenCalled();
    });
  });

  describe('getTime', function() {
    it('return the time', function () {
      spyOn(mockCalendarService,'prevWeek');
      MainCtrl.prevWeek();
      httpBackend.flush();
      expect(MainCtrl.getTime(start)).toEqual(time);
    });
  });

  describe('getCurrentMonth', function() {
    it('gets the current month', function() {
      MainCtrl.today = new Date(2016,6,29);
      httpBackend.flush();
      expect(MainCtrl.getCurrentMonth()).toEqual('June');
    });
  });

  describe('getCurrentYear', function() {
    it('gets the current month', function() {
      MainCtrl.today = new Date(2016,6,29);
      httpBackend.flush();
      expect(MainCtrl.getCurrentYear()).toEqual(2016);
    });
  });
});
