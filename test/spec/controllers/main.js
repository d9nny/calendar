'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('calendarApp'));

  var MainCtrl,
    scope;

  module(function($provide) {
    $provide.service('CalendarService', function() {
      this.generateDays = jasmine.createSpy('generateDays').andCallFake(function() {}); 
      this.nextWeek = jasmine.createSpy('nextWeek').andCallFake(function() {}); 
      this.prevWeek = jasmine.createSpy('prevWeek').andCallFake(function() {}); 
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mockCalendarService = CalendarService;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      mockCalendarService
      // place here mocked dependencies
    });
  }));

  describe('openCalendar')
  it('should call generateDays', function () {
    spyOn(mockCalendarService,'generateDays');
    scope.openCalendar();
    expect(mockCalendarService.addBouquet).toHaveBeenCalled();
  });
});
