'use strict';

angular.module('Group')
    .controller('group', function($scope) {

        $scope.controller_loaded = 'Group loaded!';

        $scope.suma = function(num1, num2) {
            return num1 + num2;
        };

        $scope.todosEquipos = function(inputs) {
            var estocolmo = [];
            var londres = [];
            var proyectosEstocolmo = [];
            var proyectosLondres = [];

            inputs.forEach(function(element) {
                if (estocolmo.length === 0) {
                    estocolmo.push({ numero: element[0] });
                } else {
                    var flagEstocolmo = 0;
                    estocolmo.forEach(function(individuoEstocolmo) {
                        if (individuoEstocolmo.numero === element[0]) {
                            flagEstocolmo++;
                        }

                        if (flagEstocolmo === 0) {
                            estocolmo.push({ numero: element[0] });
                        }
                    });
                }

                if (londres.length === 0) {
                    londres.push({ numero: element[1] });
                } else {
                    var flagLondres = 0;
                    londres.forEach(function(individuoLondres) {
                        if (individuoLondres.numero === element[1]) {
                            flagLondres++;
                        }

                        if (flagLondres === 0) {
                            londres.push({ numero: element[1] });
                        }
                    });
                }

                proyectosEstocolmo.push(element[0]);
                proyectosLondres.push(element[1]);
            });

            estocolmo.forEach(function(progEstocolmo) {
                progEstocolmo.cantidad = 0;
                proyectosEstocolmo.forEach(function(proyectoEstocolmo) {
                    if (progEstocolmo.numero === proyectoEstocolmo) {
                        progEstocolmo.cantidad++;
                    }
                });
            });

            londres.forEach(function(progLondres) {
                progLondres.cantidad = 0;
                proyectosLondres.forEach(function(proyectoLondres) {
                    if (progLondres.numero === proyectoLondres) {
                        progLondres.cantidad++;
                    }
                });
            });


            inputs.forEach(function(proyecto) {
                var candidatoEstocolmo;
                // var candidatoLondres;

                console.log('proyecto' + proyecto);
                estocolmo.forEach(function(est) {
                    if (proyecto[0] === est.numero) {
                        candidatoEstocolmo = est;
                    }
                    console.log('candidato estocolmo  ' + candidatoEstocolmo.numero + ' ' + candidatoEstocolmo.cantidad);
                });
            });

            return 'ok';
        };

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/group', {
                templateUrl: 'scripts/group/views/group.html',
                controller: 'group'
            });
    });