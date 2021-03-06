'use strict';

/**
 * @ngdoc service
 * @name xmlvsApiValidationApp.service:resultsService
 * @description
 * # resultsService
 * Service of the xmlvsApiValidationApp. Gives any controller of the app
 * the validation results object, provided it has already been generated by the system.
 * Otherwise, returns an empty object.
 */
angular.module('xmlvsApiValidationApp')
  .service('resultsService', function() {
	// Private results object structure
	var resultsObj = {};

	// Public results object to offer
	var results = {};
	// Provides the specification object as a Javascript object. 
	results.getResults = function() {
	  return resultsObj;
	};
	// Sets a results object to the object passed as argument
	results.setResults = function(newResultsObject) {
	  resultsObj = newResultsObject;
	};

	results.unsetResults = function(newResultsObject) {
	  resultsObj = {};
	  resultsObj.type = "";
	};
	// Sets the type of the result (INGEST or API)
	results.setResultType = function(resultType) {
	  resultsObj.type = resultType;
	};
	// Gets the type of the result (INGEST or API)
	results.getResultType = function() {
		var resultType = resultsObj.type || "";
		return resultType;
	};

	return results;
});