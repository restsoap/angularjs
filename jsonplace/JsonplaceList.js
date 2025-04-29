var app = angular.module("Jsonplace", []);

app.controller('PlaceController', function ($scope, $http) {

  // Definir el módulo de la aplicación
  $scope.posts = [];

  // Objeto para el formulario (nuevo post o edición)
  $scope.formPost = {
    id: null,
    title: '',
    body: '',
    userId: 1
  };

  // Cargar posts
  $scope.loadPosts = function() {
    $http.get('https://jsonplaceholder.typicode.com/posts')
      .then(function(response) {
        $scope.posts = response.data;
      })
      .catch(function(error) {
        console.error('Error al obtener los posts:', error);
      });
  };

  // Cargar posts al iniciar
  $scope.loadPosts();


  // Crear un nuevo post
  $scope.createPost = function() {
    $http.post('https://jsonplaceholder.typicode.com/posts', $scope.formPost)
      .then(function(response) {
        // JSONPlaceholder simula la creación pero no la guarda realmente
        // Para propósitos de demostración, añadimos manualmente el post a nuestra lista
        var newPost = response.data;
        newPost.id = $scope.posts.length + 1; // Simular ID
        $scope.posts.unshift(newPost);
        
        // Limpiar formulario
        $scope.resetForm();
        alert('Post creado con éxito (simulado)');
      })
      .catch(function(error) {
        console.error('Error al crear el post:', error);
      });
  };

  // Estado de edición
  $scope.editing = false;

   // Editar un post existente
   $scope.editPost = function(post) {
    // Copiar los datos del post al formulario
    $scope.formPost = {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId || 1
    };
    $scope.editing = true;
  };


  // Actualizar un post existente
  $scope.updatePost = function() {
    $http.put('https://jsonplaceholder.typicode.com/posts/' + $scope.formPost.id, $scope.formPost)
      .then(function(response) {
        // JSONPlaceholder simula la actualización
        // Actualizamos la versión local para demostración
        for (var i = 0; i < $scope.posts.length; i++) {
          if ($scope.posts[i].id === $scope.formPost.id) {
            $scope.posts[i] = angular.copy($scope.formPost);
            break;
          }
        }
        
        // Limpiar formulario
        $scope.resetForm();
        alert('Post actualizado con éxito (simulado)');
      })
      .catch(function(error) {
        console.error('Error al actualizar el post:', error);
      });
  };


  // Eliminar un post
  $scope.deletePost = function(post) {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      $http.delete('https://jsonplaceholder.typicode.com/posts/' + post.id)
        .then(function() {
          // Eliminar de la lista local
          $scope.posts = $scope.posts.filter(function(p) {
            return p.id !== post.id;
          });
          alert('Post eliminado con éxito (simulado)');
        })
        .catch(function(error) {
          console.error('Error al eliminar el post:', error);
        });
    }
  };

  $scope.resetForm = function() {
    $scope.formPost = {
      id: null,
      title: '',
      body: '',
      userId: 1
    };
    $scope.editing = false;
  };
  

})