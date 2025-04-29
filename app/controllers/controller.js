// Definimos un controlador llamado controller
var app = angular.module("miApp", []);

app.controller("Firstcontroller", function($scope) {
  $scope.nombre = "Mundo";
  $scope.name = "Hola ";


  $scope.vector = [
    {
      comentario : "Prueba 1",
      username: "123"
    },
    {
      comentario : "Prueba 2",
      username: "1234"
    }
  ]
});


  