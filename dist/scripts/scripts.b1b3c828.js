"use strict";angular.module("xmlvsApiValidationApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.sortable","LocalStorageModule","ngFileUpload"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/spec.html",controller:"SpecCtrl",controllerAs:"main"}).when("/ingest",{templateUrl:"views/ingest.html",controller:"IngestCtrl",controllerAs:"ingest"}).when("/apiresponse",{templateUrl:"views/apiresponse.html",controller:"ApiResponseCtrl",controllerAs:"apiresponse"}).when("/results",{templateUrl:"views/results.html",controller:"ResultsCtrl",controllerAs:"results",css:"styles/results.css"}).otherwise({redirectTo:"/"})}]),angular.module("xmlvsApiValidationApp").service("specService",function(){var a={},b=[],c={};return c.getSpec=function(){var b={};return b=a.VODspec?a.VODspec:a.EPGspec?a.EPGspec:a},c.setSpec=function(b){a=b},c.unsetSpec=function(){a={}},c.getSpecType=function(){var b;return a.VODspec?b="VOD":a.EPGspec&&(b="EPG"),b},c.validateFieldsVsSpec=function(){},c.getSpecFilesArray=function(){return b},c.setSpecFilesArray=function(a){b=[],b=a},c.addSpecFile=function(a){b.push(a)},c}),angular.module("xmlvsApiValidationApp").service("ingestService",function(){var a={},b=[],c={};return c.getIngestObj=function(){var b={};return b="VOD"===c.getIngestObjType()?a.ADI:"EPG"===c.getIngestObjType()?a.TV:a},c.setIngestObj=function(b){a=b},c.unsetIngestObj=function(){a={}},c.getIngestObjType=function(){var b;return a.ADI?b="VOD":a.TV&&(b="EPG"),b},c.getVodAssetType=function(){var b="Unknown";return a.assetType&&(b=a.assetType),b},c.setVodAssetType=function(b){a.assetType=b},c.getIngestFilesArray=function(){return b},c.setIngestFilesArray=function(a){b=[],b=a},c.addIngestFile=function(a){b.push(a)},c.unsetIngestFilesArray=function(){b=[]},c.getFileName=function(){var a="";return 1===b.length&&(a=b[0].name),a},c.isFileTypeOk=function(){var a=!1;return c.hasOwnProperty("fileTypeOk")&&(a=c.fileTypeOk),a},c.setFileTypeOk=function(a){c.fileTypeOk=a},c}),angular.module("xmlvsApiValidationApp").service("apiResponseService",function(){var a={},b=[],c={};return c.getApiResponse=function(){return a},c.setApiResponse=function(b){a=b},c.unsetApiResponse=function(){a={}},c.getApiFilesArray=function(){return b},c.setApiFilesArray=function(a){b=[],b=a},c.addApiFile=function(a){b.push(a)},c.unsetApiFilesArray=function(){b=[]},c}),angular.module("xmlvsApiValidationApp").service("resultsService",function(){var a={},b={};return b.getResults=function(){return a},b.setResults=function(b){a=b},b.unsetResults=function(b){a={},a.type=""},b.setResultType=function(b){a.type=b},b.getResultType=function(){var b=a.type||"";return b},b}),angular.module("xmlvsApiValidationApp").directive("cssInjector",["$rootScope","$compile",function(a,b){return{restrict:"E",link:function(c,d){var e='<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';d.append(b(e)(c)),c.routeStyles={},a.$on("$routeChangeStart",function(a,b,d){d&&d.$$route&&d.$$route.css&&(angular.isArray(d.$$route.css)||(d.$$route.css=[d.$$route.css]),angular.forEach(d.$$route.css,function(a){delete c.routeStyles[a]})),b&&b.$$route&&b.$$route.css&&(angular.isArray(b.$$route.css)||(b.$$route.css=[b.$$route.css]),angular.forEach(b.$$route.css,function(a){c.routeStyles[a]=a}))})}}}]),angular.module("xmlvsApiValidationApp").controller("SpecCtrl",["$scope","Upload","$timeout","$location","specService","apiResponseService","ingestService","resultsService",function(a,b,c,d,e,f,g,h){function i(){console.log("ENTRA-init()"),a.files=e.getSpecFilesArray(),console.log("$scope.files - AFTER"),console.log(a.files),a.specUploaded=$.isEmptyObject(e.getSpec())?!1:!0,a.enableErrorAlerts=!0;var b=".nav li";$("#spec-section").hasClass("active")||($(b).removeClass("active"),$("#spec-section").addClass("active"))}function j(){console.log("ENTRA-enableApiNavSection()"),$("#api-section").removeClass("disabled"),$("#api-section").removeProp("disabled")}function k(){console.log("ENTRA-enableIngestNavSection()"),$("#ingest-section").removeClass("disabled"),$("#ingest-section").removeProp("disabled")}function l(){f.unsetApiResponse(),f.unsetApiFilesArray(),$("#api-section").addClass("disabled")}function m(){g.unsetIngestObj(),g.unsetIngestFilesArray(),$("#ingest-section").addClass("disabled")}function n(){h.unsetResults(),$("#results-section").addClass("disabled")}function o(a){$(a).hasClass("ng-hide")&&$(a).removeClass("ng-hide")}function p(a){$(a).hasClass("ng-hide")||$(a).addClass("ng-hide")}function q(a){console.log("ENTRA-xmlToJson()");var b={};if(1===a.nodeType){if(a.attributes.length>0){b["@attributes"]={};for(var c=0;c<a.attributes.length;c++){var d=a.attributes.item(c);b["@attributes"][d.nodeName]=d.nodeValue}}}else 3===a.nodeType&&(b=a.nodeValue);if(a.hasChildNodes())for(var e=0;e<a.childNodes.length;e++){var f=a.childNodes.item(e),g=f.nodeName;if("undefined"==typeof b[g])b[g]=q(f);else{if("undefined"==typeof b[g].push){var h=b[g];b[g]=[],b[g].push(h)}b[g].push(q(f))}}return b}$(document).ready(function(){i()}),a.$watch("file",function(){console.log("$scope.$watch -> $scope.file"),a.enableErrorAlerts=!0,null!=a.file&&(a.files=[a.file]),$.isEmptyObject(e.getSpec())&&a.upload(a.files)}),a.removeErrorAlerts=function(){a.enableErrorAlerts=!1},a.deleteFile=function(b){console.log("ENTRA-deleteFile()"),a.files=$.grep(a.files,function(a){return a.name!==b}),0===a.files.length&&(e.unsetSpec(),a.specUploaded=!1,p("#spec-buttons-group"),console.log("$scope.specUploaded = "),console.log(a.specUploaded),l(),m(),n()),e.setSpecFilesArray(a.files)},a.upload=function(b){if(console.log("ENTRA-upload()"),b&&b.length)for(var c=0;c<b.length;c++){var d=b[c],f=new FileReader;f.readAsBinaryString(d),f.onloadend=function(){try{j(),k();var b=$.parseXML(f.result),c=q(b);c&&(console.log("Specification Object: "),console.log(c),a.specUploaded=!0,o("#spec-buttons-group"),console.log("$scope.specUploaded = "),console.log(a.specUploaded),e.setSpec(c),e.addSpecFile(d))}catch(g){console.log("err.message"),console.log(g.message)}}}},a.goToApiSection=function(){console.log("ENTRA-goToApiSection()"),d.url("/apiresponse")},a.goToIngestSection=function(){console.log("ENTRA-goToApiSection()"),d.url("/ingest")}}]),angular.module("xmlvsApiValidationApp").controller("IngestCtrl",["$scope","Upload","$timeout","$location","specService","apiResponseService","ingestService","resultsService",function(a,b,c,d,e,f,g,h){function i(){console.log("ENTRA-init()"),a.files=g.getIngestFilesArray(),a.ingestFileUploaded=$.isEmptyObject(g.getIngestObj())?!1:!0,a.enableErrorAlerts=!0,a.notEPG=!1,a.notVOD=!1,a.fileTypeOk=g.isFileTypeOk();var b=".nav li";$("#ingest-section").hasClass("active")||($(b).removeClass("active"),$("#ingest-section").addClass("active"))}function j(){console.log("ENTER-getEPGIngestFields()");var a,b,c=[],d=[],e=-1,f=-1,h=0,i=g.getIngestObj().programme;return console.log("epgIngestObj"),console.log(i),i&&($.each(i,function(g,i){d.fieldsArray=Object.keys(i),e=d.fieldsArray.indexOf("#text"),f=d.fieldsArray.indexOf("@attributes"),e>-1&&d.fieldsArray.splice(e,1),f>-1&&d.fieldsArray.splice(f,1),i["@attributes"]&&$.merge(d.fieldsArray,Object.keys(i["@attributes"])),i.title&&(a=i.title["#text"]),i.program_id&&(b=i.program_id["#text"]),a?d.name=b?a+"|"+b:a+"|NoId#"+h++:d.name=b?b:"|NoId#"+h++,c.push(d),d={},a=null,b=null,e=-1,f=-1}),console.log("epgAllEventsFieldsArray"),console.log(c)),c}function k(){console.log("ENTRA-getVODIngestFields()");var a,b,c=[],d="",e={},f=[],h={},i={};return g.getIngestObj()&&(c.push([g.getIngestObj()]),c.push([g.getIngestObj().Asset]),c.push(g.getIngestObj().Asset.Asset),$.each(c,function(c,g){g&&($.each(g,function(c,g){a=g.Metadata.AMS["@attributes"],d=a.Asset_Class,a&&(e[d]=Object.keys(a)),a=null,b=g.Metadata.App_Data,b&&(b.constructor===Array?$.each(b,function(a,b){b["@attributes"].Name&&f.push(b["@attributes"].Name)}):b.constructor!==Array&&"object"==typeof b&&f.push(b["@attributes"].Name),h[d]=f),b=null,f=[]}),i.assetAMSfieldsObj=e,i.assetAppDataFieldsObj=h)})),i}function l(){d.url("/results")}function m(){console.log("FUNCTION: enableResultsNavSection"),$("#results-section").removeClass("disabled"),$("#results-section").removeProp("disabled")}function n(){console.log("ENTRA-enableApiNavSection()"),$("#api-section").removeClass("disabled"),$("#api-section").removeProp("disabled")}function o(){f.unsetApiResponse(),f.unsetApiFilesArray(),$("#api-section").addClass("disabled")}function p(){h.unsetResults(),$("#results-section").addClass("disabled")}function q(){var a="",b=g.getIngestObj(),c=b.Asset.Metadata.App_Data;return c&&(c.constructor===Array&&c.length>0?$.each(c,function(b,c){c["@attributes"].Name&&"Media_type"===c["@attributes"].Name&&(a=c["@attributes"].Value)}):"object"!=typeof c||$.isEmptyObject(c)||c["@attributes"].Name&&"Media_type"===c["@attributes"].Name&&(a=c["@attributes"].Value)),a}function r(a,b,c,d){var e,f="Unknown";return c["@attributes"]&&(e=c["@attributes"].required?c["@attributes"].required:"","Y"===e?f=$.inArray(a,d)>=0?"OK":"NOK":"N"===e?f=$.inArray(a,d)>=0?"OK":"M&NR":"E"===e&&(f="Episode"===b?$.inArray(a,d)>=0?"OK":"NOK":$.inArray(a,d)>=0?"OK":"M&NR")),f}var s=0;$(document).ready(function(){i()});var t=function(a){console.log("ENTRA-xmlToJson()"),s++;var b={};if(1===a.nodeType){if(a.attributes.length>0){b["@attributes"]={};for(var c=0;c<a.attributes.length;c++){var d=a.attributes.item(c);b["@attributes"][d.nodeName]=d.nodeValue}}}else 3===a.nodeType&&(b=a.nodeValue);if(a.hasChildNodes())for(var e=0;e<a.childNodes.length;e++){var f=a.childNodes.item(e),g=f.nodeName;if("undefined"==typeof b[g])b[g]=t(f);else{if("undefined"==typeof b[g].push){var h=b[g];b[g]=[],b[g].push(h)}b[g].push(t(f))}}return s--,0===s&&u(b),b};a.goToResultsSection=function(){console.log("ENTRA-goToResultsSection()"),d.url("/results")},a.$watch("file",function(){console.log("$scope.$watch -> $scope.files"),a.enableErrorAlerts=!0,null!=a.file&&(a.files=[a.file]),$.isEmptyObject(g.getIngestObj())&&a.upload(a.files)}),a.removeErrorAlerts=function(){a.enableErrorAlerts=!1,a.notEPG===!0?a.notEPG=!1:a.notVOD===!0&&(a.notVOD=!1)},a.deleteFile=function(b){console.log("ENTRA-deleteFile()"),a.files=$.grep(a.files,function(a){return a.name!==b}),0===a.files.length&&(g.unsetIngestObj(),a.ingestFileUploaded=!1,a.fileTypeOk=!1,g.setFileTypeOk(!1),n(),p()),g.setIngestFilesArray(a.files)},a.upload=function(b){console.log("ENTRA-upload()");var c;if(b&&b.length)for(var d=0;d<b.length;d++){var e=b[d],f=new FileReader;f.readAsBinaryString(e),f.onloadend=function(){try{g.addIngestFile(e),c=$.parseXML(f.result),a.xmlParsed2Json=t(c)}catch(b){console.log("err.message"),console.log(b.message)}}}};var u=function(b){console.log("ENTRA processIngestJson");var c=g.getFileName();b&&(g.setIngestObj(b),"EPG"===e.getSpecType()?(console.log("Spec is EPG"),"EPG"!==g.getIngestObjType()?(console.log("@@@notEPG@@@"),a.notEPG=!0,a.$apply()):(a.fileTypeOk=!0,g.setFileTypeOk(!0),a.$apply())):"VOD"===e.getSpecType()&&(console.log("Spec is VOD"),console.log("ingestService.getIngestObjType()"),console.log(g.getIngestObjType()),"VOD"!==g.getIngestObjType()?(console.log("@@@notVOD@@@"),a.notVOD=!0,a.$apply()):(a.fileTypeOk=!0,g.setFileTypeOk(!0),console.log("VodAssetType"),console.log(q()),g.setVodAssetType(q()))),a.fileTypeOk?a.ingestFileUploaded=!0:""!==c&&a.deleteFile(c),a.$apply(),o())};a.validateIngestFile=function(){var a=e.getSpec(),b=e.getSpecType(),c={};if(console.log("specObject = "),console.log(a),console.log("specType"),console.log(b),"VOD"===b){console.log("VOD VALIDATION:");var d=k();console.log("assetAMSfieldsObj"),console.log(d.assetAMSfieldsObj),console.log("assetAppDataFieldsObj"),console.log(d.assetAppDataFieldsObj);var f=d.assetAMSfieldsObj,i=d.assetAppDataFieldsObj,n={},o=g.getVodAssetType();console.log("vodAssetType"),console.log(o),a&&($.each(a,function(a,b){"#text"!==a&&$.each(b,function(b,d){"#text"!==b&&("AMS"===a?$.each(f,function(a,e){c.field=b,c.status=r(b,o,d,e),c.type="AMS",n[a]&&n[a].constructor===Array?n[a].push(c):n[a]=[c],c={}}):"still-image"===a?(i.poster?(c.field=b,c.status=r(b,o,d,i.poster),c.type="App_Data",n.poster.constructor===Array?n.poster.push(c):n.poster=[c],c={}):n.hasOwnProperty("poster")||(n.poster=[]),i["box cover"]?(c.field=b,c.status=r(b,o,d,i["box cover"]),c.type="App_Data",n["box cover"].constructor===Array?n["box cover"].push(c):n["box cover"]=[c],c={}):n.hasOwnProperty("box cover")||(n["box cover"]=[]),i["background image"]?(c.field=b,c.status=r(b,o,d,i["background image"]),c.type="App_Data",n["background image"].constructor===Array?n["background image"].push(c):n["background image"]=[c],c={}):n.hasOwnProperty("background image")||(n["background image"]=[])):i[a]?(c.field=b,c.status=r(b,o,d,i[a]),c.type="App_Data",n[a]&&n[a].constructor===Array?n[a].push(c):n[a]=[c],c={}):n.hasOwnProperty(a)||(n[a]=[]))})}),console.log("fieldsValidationResultsObj"),console.log(n),h.setResults(n),h.setResultType("INGEST"),m(),l())}else if("EPG"===b){console.log("EPG VALIDATION:");var p=j(),q="Unknown",s={},t="";a&&$.each(a,function(a,b){"#text"!==a&&"#comment"!==a&&$.each(p,function(d,e){c.field=a,q=e.fieldsArray.indexOf("series-id")>=0?"Episode":"Event",c.status=r(a,q,b,e.fieldsArray),t=decodeURIComponent(escape(e.name)),s[t+"|"+q]&&s[t+"|"+q].constructor===Array?s[t+"|"+q].push(c):s[t+"|"+q]=[c],c={}})}),h.setResults(s),h.setResultType("INGEST"),m(),l()}}}]),angular.module("xmlvsApiValidationApp").controller("ApiResponseCtrl",["$scope","localStorageService","Upload","$timeout","resultsService","$location","specService","apiResponseService","ingestService",function(a,b,c,d,e,f,g,h,i){function j(){console.log("FUNCTION: init()"),a.apiFiles=h.getApiFilesArray(),a.apiResponseLoaded=!1,console.log("$scope.apiFiles"),console.log(a.apiFiles),a.apiResponseObject=h.getApiResponse(),a.apiFstLevelKeys=[],a.apiSndLevelKeys=[],a.validationResults=[],a.enableApiFileErrorAlerts=!0;var b=".nav li";$("#api-section").hasClass("active")||($(b).removeClass("active"),$("#api-section").addClass("active"))}function k(){f.url("/results")}function l(){console.log("FUNCTION: checkForMissingFieldsInSpec");var b,c,d,e=g.getSpec(),f=[],h=[],i=[];return $.each(e,function(a){b=e[a],b&&!$.isEmptyObject(b)&&"#text"!==a&&b["@attributes"].fieldApi&&(h.push(b["@attributes"].fieldApi),c=b.altField,c&&h.push(c["@attributes"].fieldApi))}),$.each(a.apiSndLevelKeys,function(a,b){i.push(b.field)}),d=a.apiFstLevelKeys.concat(i),$.each(d,function(a,b){$.inArray(b,h)<0&&f.push(b)}),f}function m(){console.log("FUNCTION: enableResultsNavSection"),$("#results-section").removeClass("disabled"),$("#results-section").removeProp("disabled"),a.specUploaded=!0}function n(){console.log("ENTRA-enableIngestNavSection()"),$("#ingest-section").removeClass("disabled"),$("#ingest-section").removeProp("disabled")}function o(){i.unsetIngestObj(),i.unsetIngestFilesArray(),$("#ingest-section").addClass("disabled")}function p(){e.unsetResults(),$("#results-section").addClass("disabled")}function q(){console.log("FUNCTION: getApiFields");var b,c,d,e=g.getSpecType();e&&(c="VOD"===e?"Metas":"metas",d="VOD"===e?"Tags":"tags",$.each(a.apiResponseObject,function(f,g){switch(f){case c:b=g,"VOD"===e?$.each(b,function(b,c){a.apiSndLevelKeys.push({field:c.Key,type:"meta"})}):$.each(b,function(b,c){a.apiSndLevelKeys.push({field:b,type:"meta"})});break;case d:b=g,"VOD"===e?$.each(b,function(b,c){a.apiSndLevelKeys.push({field:c.Key,type:"tag"})}):$.each(b,function(b,c){a.apiSndLevelKeys.push({field:b,type:"tag"})});break;case"extra_params":b=g,$.each(b,function(b,c){a.apiSndLevelKeys.push({field:b,type:"extra"})});break;default:a.apiFstLevelKeys.push(f)}b=[]}))}$(document).ready(function(){j()}),a.$watch("fileApi",function(){console.log("FUNCTION: $scope.$watch"),a.enableApiFileErrorAlerts=!0,null!=a.fileApi&&$.isEmptyObject(h.getApiResponse())&&0===h.getApiFilesArray.length&&(a.apiFiles=a.fileApi,a.uploadAPI(a.fileApi))}),a.removeApiErrorAlerts=function(){console.log("FUNCTION: removeApiErrorAlerts"),a.enableApiFileErrorAlerts=!1},a.uploadAPI=function(b){if(console.log("FUNCTION: uploadAPI"),b&&b.length)for(var c=0;c<b.length;c++){var d=b[c],e=new FileReader;e.readAsBinaryString(d),e.onloadend=function(){console.log("FUNCTION: onloadend");try{var c=$.parseJSON(e.result);c&&(a.apiResponseObject=c,a.apiResponseLoaded=!0,h.setApiResponse(a.apiResponseObject),h.setApiFilesArray(b),o())}catch(d){console.log("err.message"),console.log(d.message)}}}},a.deleteFile=function(b){console.log("FUNCTION: deleteFile"),a.apiFiles=$.grep(a.apiFiles,function(a){return a.name!==b}),0===a.apiFiles.length&&(h.unsetApiResponse(),a.apiResponseLoaded=!1,n(),p()),h.setApiFilesArray(a.apiFiles)},a.validateApiResponse=function(){console.log("FUNCTION: deleteFile"),q(),console.log("Keys 1st Level: "),console.log(a.apiFstLevelKeys),console.log("Keys 2nd Level: "),console.log(a.apiSndLevelKeys);var b,c=null,d="",f=[],h={},i=g.getSpec(),j=null;$.each(i,function(b,e){if("#text"!==b&&"object"==typeof e&&!$.isEmptyObject(e)&&(c=e["@attributes"],d=c.fieldApi,"Y"===c.required||"N"===c.required)){if(console.log("First level Processing..."),d)switch(h.field=d,c.type){case"Tag":case"Meta":case"Extra":j=$.grep(a.apiSndLevelKeys,function(a){return a.field===d}),h.status=j.length>=1?"OK":"NOK";break;default:h.status=$.inArray(d,a.apiFstLevelKeys)>=0?"OK":"NOK"}else h.field=b,h.status="AFNS";h.specField=b,h.type=c.type,f.push(h),h={},c=null,d="",j=null,e.altField&&(console.log("Second level Processing..."),c=e.altField["@attributes"],d=c.fieldApi,d?(h.field=d,j=$.grep(a.apiSndLevelKeys,function(a){return a.field===d}),h.status=j.length>=1?"OK":"NOK"):(h.field=b,h.status="AFNS"),h.specField=b,h.type=c.type,f.push(h),h={},c=null,d="",j=null)}}),b=l(),$.each(b,function(a,b){f.push({field:b,status:"NIS"})}),e.setResults(f),e.setResultType("API"),m(),k()}}]),angular.module("xmlvsApiValidationApp").controller("ResultsCtrl",["$scope","specService","apiResponseService","ingestService","resultsService",function(a,b,c,d,e){function f(){console.log("validationResults"),console.log(a.validationResults),a.specObj=b.getSpec(),a.apiResponseObj=c.getApiResponse(),a.ingestObj=d.getIngestObj(),a.searchField="",a.allowResults=!1,$.isEmptyObject(a.specObj)||$.isEmptyObject(a.apiResponseObj)&&$.isEmptyObject(a.ingestObj)||(a.allowResults=!0),a.allowResults&&(a.validationResults=e.getResults(),a.specType=b.getSpecType(),a.resultType=e.getResultType(),a.vodAssetType="","INGEST"===a.resultType?"VOD"===a.specType?a.vodAssetType=d.getVodAssetType():"EPG"===a.specType&&console.log("INGEST & EPG"):"API"===a.resultType);var f=".nav li";$("#results-section").hasClass("active")||($(f).removeClass("active"),$("#results-section").addClass("active"))}$(document).ready(function(){f()}),a.fieldStatusClass=function(a){var b="";switch(a){case"OK":b="label-success";break;case"NOK":b="label-danger";break;case"M&NR":b="label-warning";break;case"AFNS":b="label-warning";break;case"NIS":b="label-danger";break;default:b="label-secondary"}return b},a.focusOnSearchField=function(){$("#searchField").focus()},a.isResultsArrayEmpty=function(a){return 0===a.length}}]),angular.module("xmlvsApiValidationApp").run(["$templateCache",function(a){a.put("views/apiresponse.html",'<div class="container"> <div class="jumbotron"> <h2>Upload your API response file (.json):</h2> </div> <form name="myApiFileForm"> <div name="apiDropbox" ngf-drop ngf-select ng-model="fileApi" class="drop-box" ngf-drag-over-class="\'dragover\'" ngf-multiple="true" ngf-allow-dir="true" ngf-accept="application/json" ngf-pattern="\'.json\'"> Drop .json files here, or click to upload </div> <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div> <div class="alert alert-danger" ng-show="myApiFileForm.apiDropbox.$error.pattern && enableApiFileErrorAlerts"> <a class="close" aria-label="close" ng-click="removeApiErrorAlerts()">&times;</a> <strong>Error!</strong> The file you tried to upload does not have a .json extension. Please upload a JSON file. </div> <div id="uploaded-file-info" class="alert alert-success" ng-hide="apiFiles.length == 0"> <p>File uploaded:</p> <ul> <li ng-repeat="f in apiFiles track by $index" style="font:smaller; list-style-type: none"> <span class="glyphicon glyphicon-file" aria-hidden="true"></span> {{f.name}} {{f.$error}} {{f.$errorParam}} <span class="glyphicon glyphicon-remove remove-file-sym" ng-click="deleteFile(f.name)" aria-hidden="true"></span> </li> </ul> </div> <button type="button" class="btn btn-primary btn-lg" ng-hide="apiFiles.length == 0" ng-click="validateApiResponse()">Validate</button> </form> </div>'),a.put("views/ingest.html",'<div class="container"> <div class="jumbotron"> <h2>Upload your ingest file (XML):</h2> </div> <form name="myForm"> <div name="dropbox" ngf-drop ngf-select ng-model="file" class="drop-box" ngf-drag-over-class="\'dragover\'" ngf-multiple="false" ngf-accept="text/xml" ngf-pattern="\'.xml\'"> Drop XML metadata ingest files here, or click to upload </div> <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div> <div class="alert alert-danger" ng-show="myForm.dropbox.$error.pattern && enableErrorAlerts"> <a class="close" aria-label="close" ng-click="removeErrorAlerts()">&times;</a> <strong>Error!</strong> The file you tried to upload does not have a XML format. Please upload a XML file. </div> <div id="not-vod-error" ng-model="notVOD" class="alert alert-danger" ng-show="notVOD && enableErrorAlerts"> <a class="close" aria-label="close" ng-click="removeErrorAlerts()">&times;</a> <strong>Error!</strong> The ingest file you tried to upload is not VOD. Please upload an VOD ingest file. </div> <div id="not-epg-error" ng-model="notEPG" class="alert alert-danger" ng-show="notEPG && enableErrorAlerts"> <a class="close" aria-label="close" ng-click="removeErrorAlerts()">&times;</a> <strong>Error!</strong> The ingest file you tried to upload is not EPG. Please upload an EPG ingest file. </div> <div class="alert alert-success" ng-hide="!files || files.length == 0 || !fileTypeOk"> <p>File uploaded:</p> <ul> <li ng-repeat="f in files track by $index" style="font:smaller; list-style-type: none"> <span class="glyphicon glyphicon-file" aria-hidden="true"></span> {{f.name}} {{f.$error}} {{f.$errorParam}} <span class="glyphicon glyphicon-remove remove-file-sym" ng-click="deleteFile(f.name)" aria-hidden="true"></span> </li> </ul> </div> <div id="ingest-button-container" ng-model="ingestFileUploaded" ng-show="ingestFileUploaded"> <button id="ingest-validation-button" type="button" class="btn btn-primary btn-lg" ng-click="validateIngestFile()">Validate</button> </div> </form> </div>'),a.put("views/results.html",'<div class="jumbotron"> <h2>Validation Results</h2> <span>Below is the detailed info of the validation results of the <strong>Kaltura API response</strong> vs <strong>XML Specification</strong> provided to the system :</span> <!-- LEGEND --> <div class="panel panel-warning code-reference"> <!-- Default panel contents --> <div class="panel-heading"><strong>Codes Reference</strong></div> <table class="table table-hover"> <tr> <td><h5 class="status-container"><span class="status-indicator label label-success">OK</span></h5></td> <td>Field present either in Ingest or API Response</td> </tr> <tr> <td><h5 class="status-container"><span class="status-indicator label label-danger">NOK</span></h5></td> <td>Field <strong>NOT</strong> present in Ingest file or API Response</td> </tr> <tr> <td><h5 class="status-container"><span class="status-indicator label label-warning">M&NR</span></h5></td> <td>Field missing but not mandatory, according to Specification file and asset type</td> </tr> <tr> <td><h5 class="status-container"><span class="status-indicator label label-warning">AFNS</span></h5></td> <td>Field found in API Response, but <strong>NOT</strong> specified in Specification file</td> </tr> <tr> <td><h5 class="status-container"><span class="status-indicator label label-danger">NIS</span></h5></td> <td>Field present in API Response, but <strong>NOT</strong> in Specification file</td> </tr> </table> </div> </div> <!-- SPEC TYPE SECTION, AND SEARCH BOX --> <div ng-show="allowResults"> <div class="input-group pull-left" style="width: 100px"> <span class="input-group-addon"><strong>Spec Type: </strong> {{specType}}</span> <span class="input-group-addon" ng-if="resultType === \'INGEST\' && specType === \'VOD\'"><strong>Asset Type: </strong> {{vodAssetType}}</span> </div> <div id="search-group" class="input-group col-sm-4 pull-right"> <input id="searchField" type="text" class="form-control" placeholder="Search for..." ng-model="searchField"> <span class="input-group-btn"> <button class="btn btn-default" type="button" ng-click="focusOnSearchField()"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> </button> </span> </div> </div> <!-- RESULTS VIEW FOR API RESPONSE VALIDATION OF VOD & EPG ASSETS --> <div ng-if="resultType === \'API\'" class="asset-class-group"> <div class="panel panel-info"> <!-- Default panel contents --> <div class="panel-heading">Kaltura API response vs XML Specification</div> <table class="table table-hover"> <thead> <tr> <th>API Field</th> <th>Correspondent in Spec</th> <th>Type</th> <th>Status</th> </tr> </thead> <tbody> <tr ng-repeat="result in validationResults | orderBy:\'+type\' | filter:searchField"> <td>{{result.field}}</td> <td>{{result.specField}}</td> <td>{{result.type}}</td> <td class="col-sm-2"> <h4 class="status-container"><span class="status-indicator label" ng-class="fieldStatusClass(result.status)">{{result.status}}</span></h4> </td> </tr> </tbody> </table> </div> </div> <!-- RESULTS VIEW FOR INGEST FILE VALIDATION OF VOD ASSETS --> <div ng-if="resultType === \'INGEST\' && specType === \'VOD\'" class="asset-class-group"> <div ng-repeat="(assetClass, resultsArray) in validationResults"> <div class="table-container" ng-if="assetClass !== \'type\'"> <div class="panel panel-info"> <!-- Default panel contents --> <div class="panel-heading"> <h4>{{assetClass}}</h4> <pre id="missing-notification" ng-if="isResultsArrayEmpty(resultsArray)"> <strong> This Asset Class is not present in the ingest file.</strong></pre> </div> <table ng-if="!isResultsArrayEmpty(resultsArray)" class="table table-hover"> <thead> <tr> <th>Ingest Field</th> <th>Type</th> <th>Status</th> </tr> </thead> <tbody> <tr ng-repeat="result in resultsArray | orderBy:\'+type\' | filter:searchField"> <td>{{result.field}}</td> <td>{{result.type}}</td> <td class="col-sm-2"> <h4 class="status-container"><span class="status-indicator label" ng-class="fieldStatusClass(result.status)">{{result.status}}</span></h4> </td> </tr> </tbody> </table> </div> </div> </div> </div> <!-- RESULTS VIEW FOR INGEST FILE VALIDATION OF EPG ASSETS --> <div ng-if="resultType === \'INGEST\' && specType === \'EPG\'" class="asset-class-group"> <div ng-repeat="(eventTitle, resultsArray) in validationResults"> <div class="table-container" ng-if="eventTitle !== \'type\'"> <div class="panel panel-info"> <!-- Default panel contents --> <div class="panel-heading"> <h4>{{(eventTitle.split("|"))[0]}}</h4> </div> <div class="panel-body"> <ul class="desc-box list-group"> <li class="list-group-item"><span><strong>Id: </strong>{{(eventTitle.split("|"))[1]}}</span></li> <li class="list-group-item"><span><strong>Type: </strong>{{(eventTitle.split("|"))[2]}}</span></li> </ul> <pre id="missing-notification" ng-if="isResultsArrayEmpty(resultsArray)"> <strong> This Asset Class is not present in the ingest file.</strong></pre> </div> <table ng-if="!isResultsArrayEmpty(resultsArray)" class="table table-hover"> <thead> <tr> <th>Ingest Field</th> <th>Status</th> </tr> </thead> <tbody> <tr ng-repeat="result in resultsArray | orderBy:\'+field\' | filter:searchField"> <td><span style="vertical-align: middle">{{result.field}}</span></td> <td class="col-sm-2"> <h4 class="status-container"><span class="status-indicator label" ng-class="fieldStatusClass(result.status)">{{result.status}}</span></h4> </td> </tr> </tbody> </table> </div> </div> </div> </div>'),a.put("views/spec.html",'<div class="container"> <div class="jumbotron"> <h2>Upload your spec file (XML):</h2> </div> <form name="myForm"> <div name="dropbox" ngf-drop ngf-select ng-model="file" class="drop-box" ngf-drag-over-class="\'dragover\'" ngf-multiple="false" ngf-accept="text/xml" ngf-pattern="\'.xml\'"> Drop XML metadata specification files here, or click to upload </div> <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div> <div class="alert alert-danger" ng-show="myForm.dropbox.$error.pattern && enableErrorAlerts"> <a class="close" aria-label="close" ng-click="removeErrorAlerts()">&times;</a> <strong>Error!</strong> The file you tried to upload does not have a XML format. Please upload a XML file. </div> <div class="alert alert-success" ng-hide="!files || files.length == 0"> <p>File uploaded:</p> <ul> <li ng-repeat="f in files track by $index" style="font:smaller; list-style-type: none"> <span class="glyphicon glyphicon-file" aria-hidden="true"></span> {{f.name}} {{f.$error}} {{f.$errorParam}} <span class="glyphicon glyphicon-remove remove-file-sym" ng-click="deleteFile(f.name)" aria-hidden="true"></span> </li> </ul> </div> <div id="spec-buttons-group" class="btn-group" role="group" ng-show="specUploaded"> <button type="button" class="btn btn-primary btn-lg" ng-click="goToIngestSection()">Validate Ingest File</button> <button type="button" class="btn btn-primary btn-lg" ng-click="goToApiSection()">Validate API Response</button> </div> </form> </div>')}]);