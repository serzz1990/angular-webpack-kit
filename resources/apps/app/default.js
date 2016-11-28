'use strict';

module.exports = function (APP) {


	/*
	 |--------------------------------------------------------------------------
	 | Set counstants
	 |--------------------------------------------------------------------------
	 */
	//APP.constant('CSRFTOKEN', document.querySelector('meta[name="csrf-token"]').content);
	APP.constant('CSRFTOKEN', 'TEST-CSRFTOKEN');



	/*
	 |--------------------------------------------------------------------------
	 | Set default configs
	 |--------------------------------------------------------------------------
	 */
	APP.run(['$http', 'CSRFTOKEN', function ($http, CSRFTOKEN) {

		//$http.defaults.headers.put['Content-Type']  = 'application/x-www-form-urlencoded;charset=utf-8';
		//$http.defaults.headers.put['X-CSRF-TOKEN']  = CSRFTOKEN;

		//$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		//$http.defaults.headers.post['X-CSRF-TOKEN'] = CSRFTOKEN;


		$http.defaults.transformRequest = data => (angular.isObject( data ) && String( data ) !== '[object File]' ? angular.toParam( data ) : data);

	}]);


};