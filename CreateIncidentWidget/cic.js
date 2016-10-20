////CLIENT CONTROLLER
function ($scope, $rootScope, $timeout, spUtil, $location) {
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
	$scope.createIncident = function () {
	};
}