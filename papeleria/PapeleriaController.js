// Crear módulo de Angular
var app = angular.module('categoriesApp', []);
        
// Crear controlador
app.controller('CategoriesController', function($scope, $http) {
    // URL base de la API
    var apiUrl = 'http://127.0.0.1:8000/api/categories';
    
    // Inicializar variables
    $scope.categories = [];
    $scope.selectedCategory = null;
    $scope.formData = { name: '' };
    $scope.isEditing = false;
    
    // Función para cargar todas las categorías
    $scope.loadCategories = function() {
        $http.get(apiUrl)
            .then(function(response) {
                $scope.categories = response.data;
            })
            .catch(function(error) {
                console.error('Error al cargar categorías:', error);
                alert('Error al cargar las categorías');
            });
    };
    
    // Función para ver detalles de una categoría
    $scope.viewDetails = function(id) {
        $http.get(apiUrl + '/' + id)
            .then(function(response) {
                $scope.selectedCategory = response.data;
            })
            .catch(function(error) {
                console.error('Error al cargar detalles:', error);
                alert('Error al cargar los detalles');
            });
    };
    
    // Función para guardar una categoría (crear o actualizar)
    $scope.saveCategory = function() {
        if ($scope.isEditing) {
            // Actualizar (PUT)
            $http.put(apiUrl + '/' + $scope.formData.id, $scope.formData)
                .then(function(response) {
                    alert('Categoría actualizada correctamente');
                    $scope.cancelEdit();
                    $scope.loadCategories();
                })
                .catch(function(error) {
                    console.error('Error al actualizar categoría:', error);
                    alert('Error al actualizar la categoría');
                });
        } else {
            // Crear (POST)
            $http.post(apiUrl, $scope.formData)
                .then(function(response) {
                    alert('Categoría creada correctamente');
                    $scope.formData = { name: '' };
                    $scope.loadCategories();
                })
                .catch(function(error) {
                    console.error('Error al crear categoría:', error);
                    alert('Error al crear la categoría');
                });
        }
    };
    
    // Función para editar una categoría
    $scope.editCategory = function(category) {
        $scope.isEditing = true;
        $scope.formData = {
            id: category.id,
            name: category.name
        };
    };
    
    // Función para cancelar la edición
    $scope.cancelEdit = function() {
        $scope.isEditing = false;
        $scope.formData = { name: '' };
    };
    
    // Función para eliminar una categoría
    $scope.deleteCategory = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
            $http.delete(apiUrl + '/' + id)
                .then(function(response) {
                    alert('Categoría eliminada correctamente');
                    $scope.loadCategories();
                    // Si estamos viendo la categoría eliminada, limpiar la selección
                    if ($scope.selectedCategory && $scope.selectedCategory.id === id) {
                        $scope.selectedCategory = null;
                    }
                })
                .catch(function(error) {
                    console.error('Error al eliminar categoría:', error);
                    alert('Error al eliminar la categoría');
                });
        }
    };
    
    // Cargar categorías al iniciar
    $scope.loadCategories();
});