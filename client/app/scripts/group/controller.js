'use strict';

angular.module('Group')
    .controller('group', function($scope) {

        $scope.controller_loaded = 'Group loaded!';

        $scope.suma = function(num1, num2) {
            return num1 + num2;
        };

        // Selecciona a los participantes en todos los equipos\
        $scope.todosEquipos = function(inputs) {
            var estocolmo = [];
            var londres = [];
            var proyectosEstocolmo = [];
            var proyectosLondres = [];
            var precandidatos = [];
            var candidatos = [];
            var inputs = JSON.parse(inputs);

            // Formar los equipos y los proyectos de cada equipo
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

            //  Calcular la cantidad de proyectos de cada miembro de estocolmo
            estocolmo.forEach(function(progEstocolmo) {
                progEstocolmo.cantidad = 0;
                proyectosEstocolmo.forEach(function(proyectoEstocolmo) {
                    if (progEstocolmo.numero === proyectoEstocolmo) {
                        progEstocolmo.cantidad++;
                    }
                });
            });
            // calcular la candidad de proyectos de cada miembro de londres
            londres.forEach(function(progLondres) {
                progLondres.cantidad = 0;
                proyectosLondres.forEach(function(proyectoLondres) {
                    if (progLondres.numero === proyectoLondres) {
                        progLondres.cantidad++;
                    }
                });
            });

            // Elejir que precandidato que ira por proyecto
            inputs.forEach(function(proyecto) {
                var candidatoEstocolmo;
                var candidatoLondres;

                estocolmo.forEach(function(est) {
                    if (proyecto[0] === est.numero) {
                        candidatoEstocolmo = est;
                    }
                });

                londres.forEach(function(lon) {
                    if (proyecto[1] === lon.numero) {
                        candidatoLondres = lon;
                    }
                });

                if (candidatoEstocolmo.cantidad >= candidatoLondres.cantidad) {
                    precandidatos.push(candidatoEstocolmo.numero);
                } else {
                    precandidatos.push(candidatoLondres.numero);
                }

            });

            // Limpiar el array de valores repetidos
            precandidatos.forEach(function(valor) {
                if (candidatos.indexOf(valor) === -1) {
                    candidatos.push(valor);
                }
            });
            $scope.candidatos = candidatos;
        };

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/group', {
                templateUrl: 'scripts/group/views/group.html',
                controller: 'group'
            });
    });