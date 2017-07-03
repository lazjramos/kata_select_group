'use strict';

angular.module('Group')
    .controller('group', function($scope) {

        $scope.controller_loaded = 'Group loaded!';

        $scope.suma = function(num1, num2) {
            return num1 + num2;
        };

        // Calcula la cantidad de proyectos de cada programador
        $scope.calcularCantidadProyectos = function(arrayProgramadores, arrayProyectos) {
            arrayProgramadores.forEach(function(programador) {
                programador.cantidad = 0;
                arrayProyectos.forEach(function(proyecto) {
                    if (programador.numero === proyecto) {
                        programador.cantidad++;
                    }
                });
            });

            return arrayProgramadores;
        };

        // Elegir el candidato de cada equipo por proyecto
        $scope.elegirCandidato = function(equipo, proyecto) {
            var candidato;

            equipo.forEach(function(programador) {
                if (proyecto === programador.numero) {
                    candidato = programador;
                }
            });

            return candidato;
        };

        // Formar equipo de programadores con los datos proporcionados
        $scope.formarEquipo = function(equipo, numeroProgramador) {
            if (equipo.length === 0) {
                equipo.push({ numero: numeroProgramador });
            } else {
                var flag = 0;
                equipo.forEach(function(individuo) {
                    if (individuo.numero === numeroProgramador) {
                        flag++;
                    }

                    if (flag === 0) {
                        equipo.push({ numero: numeroProgramador });
                    }
                });
            }

            return equipo;
        };

        // Selecciona a los participantes en todos los equipos
        $scope.todosEquipos = function(roughInputs) {
            var estocolmo = [];
            var londres = [];
            var proyectosEstocolmo = [];
            var proyectosLondres = [];
            var precandidatos = [];
            var candidatos = [];
            var inputs = JSON.parse(roughInputs);

            // Formar los equipos y los proyectos de cada equipo
            inputs.forEach(function(element) {
                var numeroProgramadorEstocolmo = element[0];
                var numeroProgramadorLondres = element[1];

                estocolmo = $scope.formarEquipo(estocolmo, numeroProgramadorEstocolmo);
                londres = $scope.formarEquipo(londres, numeroProgramadorLondres);

                proyectosEstocolmo.push(element[0]);
                proyectosLondres.push(element[1]);
            });

            // Se agrega al array de los programadores la cantidad de proyectos de cada uno
            estocolmo = this.calcularCantidadProyectos(estocolmo, proyectosEstocolmo);
            londres = this.calcularCantidadProyectos(londres, proyectosLondres);

            // Elegir que precandidato que ira por proyecto
            inputs.forEach(function(proyecto) {
                var candidatoEstocolmo;
                var candidatoLondres;
                var proyectoEstocolmo = proyecto[0];
                var proyectoLondres = proyecto[1];

                candidatoEstocolmo = $scope.elegirCandidato(estocolmo, proyectoEstocolmo);
                candidatoLondres = $scope.elegirCandidato(londres, proyectoLondres);

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