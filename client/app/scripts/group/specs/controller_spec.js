'use strict';

describe('Controller: select group', function() {

    beforeEach(module('Group'));

    var controller;
    var scope;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        controller = $controller('group', { $scope: scope });
    }));

    describe('On instance', function() {
        it('should set "controller_loaded" variable in scope', function() {
            expect(scope.controller_loaded).toContain('loaded');
        });

        it('test sum function', function() {
            expect(scope.suma(1, 2)).toEqual(3);
            expect(scope.suma(2, 2)).toEqual(4);
        });

        it('todos equipos', function() {
            expect(scope.todosEquipos([
                [1000, 2000],
                [1001, 2000],
                [1000, 2002]
            ])).toEqual([1000, 2000]);
        });

        iit('todos equipos 2', function() {
            expect(scope.todosEquipos([
                [1020, 2003],
                [1023, 2003],
                [1020, 2001]
            ])).toEqual([1020, 2003]);
        });
    });

    describe('when going to /group', function() {

        var route, location, rootScope, httpBackend;

        beforeEach(inject(function($route, $location, $rootScope, $httpBackend) {
            route = $route;
            location = $location;
            rootScope = $rootScope;
            httpBackend = $httpBackend;

            httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
        }));

        afterEach(function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should use minesweeper.html and controller', function() {
            expect(route.current).toBeUndefined();

            location.path('/group');

            httpBackend.flush();

            expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
            expect(route.current.controller).toBe('group');
        });
    });

});