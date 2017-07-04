'use strict';

angular.module('Group')
    .controller('group', function($scope) {

        $scope.controller_loaded = 'Group loaded!';

        $scope.suma = function(num1, num2) {
            return num1 + num2;
        };

        // Elegir el candidato por proyecto de ambos equipos
        $scope.elegirCandidato = function(equipo, proyecto) {
            var candidato;

            equipo.forEach(function(programador) {
                if (proyecto === programador.numero) {
                    candidato = programador;
                }
            });
            return candidato;
        };

        // Formar equipo de programadores y calcular la cantidad de proyectos en los que participa
        $scope.formarEquipo = function(equipo, numeroProgramador) {
            if (equipo.length === 0) {
                equipo.push({ numero: numeroProgramador, cantidad: 1 });
            } else {
                var control = false;
                equipo.forEach(function(individuo) {
                    if (individuo.numero === numeroProgramador) {
                        individuo.cantidad++;
                        control = true;
                    } else if (individuo.numero !== numeroProgramador && control === false) {
                        equipo.push({ numero: numeroProgramador, cantidad: 1 });
                    }
                });
            }
            return equipo;
        };

        // Selecciona a los participantes entre los dos equipos
        $scope.todosEquipos = function(roughInputs) {
            var estocolmo = [];
            var londres = [];
            var precandidatos = [];
            var candidatos = [];
            var inputs = JSON.parse(roughInputs);

            // Formar los grupos por ciudad y cantidad de proyectos de cada programador en cada equipo
            inputs.forEach(function(element) {
                estocolmo = $scope.formarEquipo(estocolmo, element[0]);
                londres = $scope.formarEquipo(londres, element[1]);
            });

            // Elegir que precandidato que ira por proyecto
            inputs.forEach(function(proyecto) {
                var candidatoEstocolmo, candidatoLondres;

                candidatoEstocolmo = $scope.elegirCandidato(estocolmo, proyecto[0]);
                candidatoLondres = $scope.elegirCandidato(londres, proyecto[1]);

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

            return candidatos;
        };

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/group', {
                templateUrl: 'scripts/group/views/group.html',
                controller: 'group'
            });
    });