/*
* <h1>Appservice File!</h1>
* 
* <p>for all the services
* <b>Note:</b> Giving proper comments in your program makes it more
* user friendly and it is assumed as a high quality code.
*
* @author :Ramesh,Siddartha,Bhagirath
* @version 1.0
* @since   2016-09-08
*/

mainApp.service('PageInfoService', function($http, $location, $timeout, $q) {

	var deferred = $q.defer();
	var deferredProjectId;
	var pageDetails = {};
	var userDetails = {};
	var eventDetails ={};
	var test ={};
	var finalJson = new Array();
	var projectName = {};
	var projectId = {};
	
	this.save = function(pageInfo) {
		pageDetails = pageInfo;
		console.log("pageDetails = " + JSON.stringify(pageDetails));
	},
	
	this.saveUser = function(userInfo) {
		userDetails = userInfo;
		console.log("userDetails = " + JSON.stringify(userDetails));
	},
	
	this.saveProjectName = function(userInfo) {
		userDetails = userInfo;
		console.log("userDetails = " + JSON.stringify(userDetails));
	},
	
	this.saveEventInfo = function(eventInfo) {
		// eventDetails = eventInfo;
		finalJson.push(pageDetails);
		finalJson.push(userDetails);
		finalJson.push(eventInfo);
		console.log("eventInfo = " + JSON.stringify(eventInfo));
	},
	
	this.getSelectedDetails = function(){
        console.log("finalJson  = " + JSON.stringify(finalJson));
		return finalJson;
	},
	
	this.saveProject = function(host, port,project){
		
		//$http.post("http://" + host + ":" + port + "/" +"ITAG_POC/saveITagProject", { 'projectTitle':projectTitle,'markets':markets,'businessUnit':businessUnit,'application':application})
       // $http.post('/api/projects', project).success(function(data, status, headers, response) {
        $http.post('/api/projects', project).then(function(data) {
	    	  projectId = data.projectId;
	    	  $timeout(function () {
	    		  alert("Project created");
	    		  $location.path('/listofdatalayer');
	    	  },100);
	        }).error(function(data, status){
	         $location.path('/createProject');
	         alert("There is an error while adding data with duplicate Project name");
	        
	        });
      //
       // var saveProject = function (user) {
           /* $http({
                url: "http://" + host + ":" + port + "/" + "api/projects/",
                method: "POST",
                data: project
            }).then(function(data){
                console.log(data);
            });*/
        //}
     /*  return {
            registerUser: saveProject
        };*/

      //
        /*return projectId;*/
	},
	
	this.getProjectTitle = function(){
		return projectName;
	},
	
	this.sendProjectName = function(projTitle){
		projectName = projTitle;
	},

	this.sendProjectId = function(projId){
		projectId = projId;
	},
	
	this.getProjectId = function(){
		return projectId;
	},
	  
	this.getDeferredProjectId = function(){
		return deferredProjectId;
	},

      this.retrieveProjectById = function(host, port, rProjectId){
          console.log("retrieveProjectById for id:" + rProjectId);
          //$http.get("http://" + $location.host() + ":" + $location.port() + "/" +"ITAG_POC/getProjectById/"+$scope.projectId)
          return $http.get("http://" + host + ":" + port + "/" +"ITAG_POC/getProjectById/"+ rProjectId)
          .then(function(response) {
              console.log("retrieveProjectById Promise fulfilled");
            // promise is fulfilled
            deferred.resolve(response.data);
            return deferred.promise;
      }, function(response) {
          console.log("retrieveProjectById Promise rejected");
        // the following line rejects the promise
            deferred.reject(response);
            return deferred.promise;
          });
      },

        this.copyProject = function(host, port, projectTitle, markets, businessUnit, application){
            console.log("copyProject as:" + projectTitle);
            return $http.post("http://" + host + ":" + port + "/" +"ITAG_POC/saveITagProject", { 'projectTitle':projectTitle,'markets':markets,'businessUnit':businessUnit,'application':application})
              .then(function(response) {
                  console.log("copyProject Promise fulfilled with response data: " + response.data.projectId);
                  deferredProjectId = response.data.projectId;
                // promise is fulfilled
                deferred.resolve(response.data);
                return deferred.promise;
              }, function(response) {
                  console.log("copyProject Promise rejected");
                // the following line rejects the promise
                deferred.reject(response);
                return deferred.promise;
              });
          },

        this.copyProjectDLs = function(host, port, origProjectId, copiedProjectId){
              console.log("retrieveProjectDLsById for id:" + origProjectId);

              return $http.get("http://" + host + ":" + port + "/" +"ITAG_POC/getProjectDLs/"+ origProjectId)
              .then(function(getDLsresponse) {
                  console.log("retrieveProjectDLsById Promise fulfilled with response data: " + getDLsresponse.data);
                  var dataLayerdata = getDLsresponse.data;
                  if(dataLayerdata){
                      console.log("copy DLs from projectId: " + origProjectId + " to projectId: " + copiedProjectId );
                        var copiedDL="";
                        var reqParamKeyVal="";
                        var dataLayerName="";
                         for(i=0;i<dataLayerdata.length;i++){
                               console.log("Get DLs :"+dataLayerdata[i].dataLayer);
                               copiedDL=dataLayerdata[i].dataLayer;
                               reqParamKeyVal="";
                               dataLayerName = dataLayerdata[i].dataLayerName;
                               console.log("copiedDL : "+copiedDL+" reqparamKV :"+reqParamKeyVal);

                               $http.post("http://" + host + ":" + port + "/" +"api/saveITagData", { 'dataLayer':copiedDL,'reqParamKeyVal':reqParamKeyVal,'projectId':copiedProjectId,'dataLayerName':dataLayerName})
                              .then(function(response) {
                                  console.log("copyDataLayer POST Promise fulfilled with response data: " + response.data);

                                // promise is fulfilled
                                deferred.resolve(response.data);
                               // return deferred.promise;
                              }, function(response) {
                                  console.log("copyDataLayer POST Promise rejected");
                                // the following line rejects the promise
                                deferred.reject(response);
                                return deferred.promise;
                              });
                         }

                    }
                // promise is fulfilled
                //deferred.resolve(response.data);
                    return deferred.promise;
                  }, function(getDLsresponse) {
                      console.log("getProjectDLs Promise rejected in copyProjectDLs");
                    // the following line rejects the promise
                        deferred.reject(response);
                        return deferred.promise;
                 });
          },
	
        this.updateDL = function(host, port, selectedData, reqParam, id, dataLayerName, projectId){
             $http.post("http://" + $location.host() + ":" + $location.port() + "/" +"ITAG_POC/updateDataLayer", {'dataLayer':selectedData,'reqParamKeyVal':reqParam,'id':id,'dataLayerName':dataLayerName,'projectId':projectId})
             .success(function(data, status, headers) {
                   // $sessionStorage.reqParams=$scope.reqParam;
                   // $localStorage.$reset();
                    $location.path('/thankyou');
             }).error(function(data, status) {
             alert("There is an error while adding data with duplicate parameters");
       });
	}
});
