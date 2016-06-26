'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('calendarApp'));

  var MainCtrl,
    scope,
    mockCalendarService;

  module(function($provide) {
    $provide.service('CalendarService', function() {
      this.generateDays = jasmine.createSpy('generateDays').andCallFake(function() {}); 
      this.nextWeek = jasmine.createSpy('nextWeek').andCallFake(function() {}); 
      this.prevWeek = jasmine.createSpy('prevWeek').andCallFake(function() {}); 
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, CalendarService) {
    scope = $rootScope.$new();
    mockCalendarService = CalendarService;
    MainCtrl = $controller('MainCtrl', { $scope: scope }, mockCalendarService);
    scope.$apply(); 
  }));

  describe('openCalendar', function() {
    it('should call generateDays', function () {
      spyOn(mockCalendarService,'generateDays');
      MainCtrl.openCalendar();
      expect(mockCalendarService.generateDays).toHaveBeenCalled();
    });
  });

  describe('nextWeek', function() {
    it('should call nextWeek', function () {
      spyOn(mockCalendarService,'nextWeek');
      MainCtrl.nextWeek();
      expect(mockCalendarService.nextWeek).toHaveBeenCalled();
    });
  });

  describe('prevWeek', function() {
    it('should call prevWeek', function () {
      spyOn(mockCalendarService,'prevWeek');
      MainCtrl.prevWeek();
      expect(mockCalendarService.prevWeek).toHaveBeenCalled();
    });
  });
});
