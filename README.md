<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guía para integrar AngularJS con nuestra API de Categorías</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #0366d6;
            border-bottom: 1px solid #eaecef;
            padding-bottom: 10px;
        }
        h2 {
            color: #24292e;
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
        }
        code {
            font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
            background-color: rgba(27, 31, 35, 0.05);
            border-radius: 3px;
            font-size: 85%;
            padding: 0.2em 0.4em;
        }
        pre {
            background-color: #f6f8fa;
            border-radius: 3px;
            font-size: 85%;
            line-height: 1.45;
            overflow: auto;
            padding: 16px;
        }
        pre code {
            background-color: transparent;
            padding: 0;
        }
        .step {
            margin-bottom: 30px;
            padding: 15px;
            border-left: 4px solid #0366d6;
            background-color: #f8f9fa;
        }
        .step h2 {
            margin-top: 0;
        }
        .notes {
            margin-top: 40px;
            padding: 15px;
            background-color: #fffbea;
            border-left: 4px solid #ffdf7e;
        }
        .directory-structure {
            font-family: monospace;
            white-space: pre;
            background-color: #f6f8fa;
            padding: 10px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <h1>Guía para integrar AngularJS con nuestra API de Categorías</h1>
    
    <p>Esta guía explica paso a paso cómo crear un frontend sencillo con AngularJS para consumir nuestra API RESTful de categorías.</p>
    
    <h2>Requisitos previos</h2>
    <ul>
        <li>Servidor API corriendo en <code>http://127.0.0.1:8000/api/categories</code></li>
        <li>Navegador web moderno</li>
        <li>Editor de código (como Visual Studio Code, Sublime Text, etc.)</li>
    </ul>
    
    <div class="step">
        <h2>Paso 1: Crear la estructura de archivos</h2>
        <p>Crea una carpeta para tu proyecto y dentro de ella crea un archivo HTML llamado <code>index.html</code>.</p>
        <div class="directory-structure">
mi-proyecto/
└── index.html
        </div>
    </div>
    
    <div class="step">
        <h2>Paso 2: Configurar el HTML base</h2>
        <p>Abre el archivo <code>index.html</code> y añade el siguiente código base:</p>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html ng-app="categoriesApp"&gt;
&lt;head&gt;
    &lt;title&gt;Categories API CRUD&lt;/title&gt;
    &lt;!-- Cargar AngularJS desde CDN --&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body ng-controller="CategoriesController"&gt;
    &lt;h1&gt;CRUD de Categorías&lt;/h1&gt;
    
    &lt;!-- Aquí irá nuestro contenido --&gt;
    
    &lt;script&gt;
        // Aquí irá nuestro código JavaScript
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 3: Configurar el módulo y controlador de AngularJS</h2>
        <p>Dentro de la etiqueta <code>&lt;script&gt;</code> en tu HTML, añade el siguiente código para inicializar AngularJS:</p>
        <pre><code>// Crear módulo de Angular
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
    
    // Aquí añadiremos las funciones CRUD
});</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 4: Implementar función READ (Leer)</h2>
        <p>Dentro del controlador, añade las funciones para leer datos:</p>
        <pre><code>// Función para cargar todas las categorías
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

// Cargar categorías al iniciar
$scope.loadCategories();</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 5: Implementar función CREATE (Crear)</h2>
        <p>Añade la función para crear nuevas categorías:</p>
        <pre><code>// Parte de la función para guardar una categoría (crear)
$scope.saveCategory = function() {
    if ($scope.isEditing) {
        // Código para actualizar (veremos en el paso 6)
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
};</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 6: Implementar función UPDATE (Actualizar)</h2>
        <p>Añade las funciones para editar categorías:</p>
        <pre><code>// Completando la función saveCategory para actualizar
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
        // Código para crear (ya implementado en el paso 5)
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
};</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 7: Implementar función DELETE (Eliminar)</h2>
        <p>Añade la función para eliminar categorías:</p>
        <pre><code>// Función para eliminar una categoría
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
};</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 8: Crear la interfaz HTML para el CRUD</h2>
        <p>Reemplaza el comentario <code>&lt;!-- Aquí irá nuestro contenido --&gt;</code> con:</p>
        <pre><code>&lt;!-- Formulario para crear/editar categoría --&gt;
&lt;div&gt;
    &lt;h2&gt;{{isEditing ? 'Editar' : 'Crear'}} Categoría&lt;/h2&gt;
    &lt;form ng-submit="saveCategory()"&gt;
        &lt;div&gt;
            &lt;label&gt;Nombre:&lt;/label&gt;
            &lt;input type="text" ng-model="formData.name" required&gt;
        &lt;/div&gt;
        &lt;button type="submit"&gt;{{isEditing ? 'Actualizar' : 'Crear'}}&lt;/button&gt;
        &lt;button type="button" ng-if="isEditing" ng-click="cancelEdit()"&gt;Cancelar&lt;/button&gt;
    &lt;/form&gt;
&lt;/div&gt;

&lt;hr&gt;

&lt;!-- Mostrar listado de categorías --&gt;
&lt;h2&gt;Lista de Categorías&lt;/h2&gt;
&lt;ul&gt;
    &lt;li ng-repeat="category in categories"&gt;
        ID: {{category.id}} - Nombre: {{category.name}} 
        &lt;button ng-click="viewDetails(category.id)"&gt;Ver&lt;/button&gt;
        &lt;button ng-click="editCategory(category)"&gt;Editar&lt;/button&gt;
        &lt;button ng-click="deleteCategory(category.id)"&gt;Eliminar&lt;/button&gt;
    &lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Mostrar detalles de categoría seleccionada --&gt;
&lt;div ng-if="selectedCategory"&gt;
    &lt;h2&gt;Detalles de la categoría&lt;/h2&gt;
    &lt;p&gt;ID: {{selectedCategory.id}}&lt;/p&gt;
    &lt;p&gt;Nombre: {{selectedCategory.name}}&lt;/p&gt;
    &lt;p&gt;Creado: {{selectedCategory.created_at}}&lt;/p&gt;
    &lt;p&gt;Actualizado: {{selectedCategory.updated_at}}&lt;/p&gt;
&lt;/div&gt;</code></pre>
    </div>
    
    <div class="step">
        <h2>Paso 9: Ejecutar la aplicación</h2>
        <ol>
            <li>Asegúrate de que tu API esté en funcionamiento en <code>http://127.0.0.1:8000/api/categories</code></li>
            <li>Abre el archivo <code>index.html</code> en tu navegador</li>
        </ol>
    </div>
    
    <h2>Código completo</h2>
    <p>Para tu referencia, aquí está el código completo de <code>index.html</code>:</p>
    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html ng-app="categoriesApp"&gt;
&lt;head&gt;
    &lt;title&gt;Categories API CRUD&lt;/title&gt;
    &lt;!-- Cargar AngularJS desde CDN --&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.2/angular.min.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body ng-controller="CategoriesController"&gt;
    &lt;h1&gt;CRUD de Categorías&lt;/h1&gt;
    
    &lt;!-- Formulario para crear/editar categoría --&gt;
    &lt;div&gt;
        &lt;h2&gt;{{isEditing ? 'Editar' : 'Crear'}} Categoría&lt;/h2&gt;
        &lt;form ng-submit="saveCategory()"&gt;
            &lt;div&gt;
                &lt;label&gt;Nombre:&lt;/label&gt;
                &lt;input type="text" ng-model="formData.name" required&gt;
            &lt;/div&gt;
            &lt;button type="submit"&gt;{{isEditing ? 'Actualizar' : 'Crear'}}&lt;/button&gt;
            &lt;button type="button" ng-if="isEditing" ng-click="cancelEdit()"&gt;Cancelar&lt;/button&gt;
        &lt;/form&gt;
    &lt;/div&gt;
    
    &lt;hr&gt;
    
    &lt;!-- Mostrar listado de categorías --&gt;
    &lt;h2&gt;Lista de Categorías&lt;/h2&gt;
    &lt;ul&gt;
        &lt;li ng-repeat="category in categories"&gt;
            ID: {{category.id}} - Nombre: {{category.name}} 
            &lt;button ng-click="viewDetails(category.id)"&gt;Ver&lt;/button&gt;
            &lt;button ng-click="editCategory(category)"&gt;Editar&lt;/button&gt;
            &lt;button ng-click="deleteCategory(category.id)"&gt;Eliminar&lt;/button&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    
    &lt;!-- Mostrar detalles de categoría seleccionada --&gt;
    &lt;div ng-if="selectedCategory"&gt;
        &lt;h2&gt;Detalles de la categoría&lt;/h2&gt;
        &lt;p&gt;ID: {{selectedCategory.id}}&lt;/p&gt;
        &lt;p&gt;Nombre: {{selectedCategory.name}}&lt;/p&gt;
        &lt;p&gt;Creado: {{selectedCategory.created_at}}&lt;/p&gt;
        &lt;p&gt;Actualizado: {{selectedCategory.updated_at}}&lt;/p&gt;
    &lt;/div&gt;
    
    &lt;script&gt;
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
                            alert('Error al criar la categoría');
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
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
    
    <div class="notes">
        <h2>Notas adicionales</h2>
        <ul>
            <li>Este código puede ser ejecutado directamente desde el navegador sin necesidad de un servidor web para el frontend</li>
            <li>La API debe admitir CORS para permitir peticiones desde un origen diferente</li>
            <li>Este ejemplo utiliza alertas nativas del navegador para mostrar mensajes, lo que puede mejorarse en una aplicación real</li>
            <li>No se han añadido estilos para mantener el ejemplo simple y enfocado en la funcionalidad</li>
        </ul>
    </div>
</body>
</html>
