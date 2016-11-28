'use strict';


module.exports = function (APP) {

	APP.directive('passwordVerify', require('./verify-password.js'));

};