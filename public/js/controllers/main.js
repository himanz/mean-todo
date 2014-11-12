angular.module('todoController', [])
  .controller('mainController', function($scope, $http, Todos) {
  	$scope.formData = {};
    
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
  	Todos.get()
  	  .success(function(data) {
        $scope.todos = data;
  	  });

    // when submitting the add form, send the text to the node API
  	$scope.createTodo = function() {
  		$http.post('/api/todos', $scope.formData)
  		  .success(function(data) {
  		  	$scope.formData = {};
  		  	$scope.todos = data;
  		  })
  		  .error(function(data) {
  		  	console.log('Error: ' + data);
  		  });
  	};

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
    	$http.delete('/api/todos' + id)
    	  .success(function(data) {
    	  	$scope.todos = data;
    	  })
    	  .error(function(data) {
    	  	console.log('Error: ' + data);
    	  });
    };
  })