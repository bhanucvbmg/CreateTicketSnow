////CLIENT CONTROLLER
function ($scope, $http, $rootScope, $timeout, spUtil, $location) {
	var c = this;
	
	c.showSubmit = function(){
		return !(c.category && c.impact && c.urgency && c.short_description);
	};
	  
	  c.action = function() {
		c.data.action = 'register';
		c.data.category = c.category;
		c.data.impact = c.impact;
		c.data.urgency = c.urgency;
		c.data.contact_type = c.contact_type;
		c.data.short_description = c.short_description;
		c.server.update().then(function(response) {
			var data = response.result;
			if (response.status == 'success') {
				c.success = response.message;
			} else if (response.status == 'error') {
				c.message = 'There was an error processing your request';
			}
		});
	};
	
	// CODE FOR fileupload  
  $scope.files = [];  
  $scope.setFiles = function(element) {
    $scope.$apply(function() {
      console.log('files:', element.files);
      // Turn the FileList object into an Array
      for (var i = 0; i < element.files.length; i++) {
        $scope.files.push(element.files[i]);
      }
    });
  };
  
  $scope.removeFiles = function(fname) {
    var index = $scope.files.indexOf(fname);
    if(index>-1)
      $scope.files.splice(index,1);
  };  

  $scope.uploadFiles = function() { 
    $scope.fd = new FormData();
    $scope.files.forEach(function(file){
      $scope.fd.set('files', file);
      var request = {
        method: 'POST',
        url: 'https://dev17312.service-now.com/api/now/attachment/file?table_name='+c.data.table+'&table_sys_id='+c.data.rec_sysid+'&file_name='+file.name,
        data: $scope.fd.get('files'),
        headers: {
          'Content-Type': file.type,
          'Accept':'application/json'         
        }
      };
      console.log('HTTP request:',request);

      // SEND THE FILES.
      $http(request)
        .success(function (d) {
        // On success code here
      })
        .error(function (err) {
        // On error code here
      });

    });
  }
	
	$scope.createIncident = function () {
	};
}
