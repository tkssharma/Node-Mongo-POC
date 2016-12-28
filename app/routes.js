/**
 * Created by sidhu on 12/13/2016.
 */
var Project = require('./models/projects');
var DataLayer = require('./models/dataLayer');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls

    // sample api route
    app.get('/api/projects', function(req, res) {
        // use mongoose to get all nerds in the database
        Project.find(function(err, projects) {
            console.log('Inside projects.');
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(projects); // return all nerds in JSON format
        });
    });
    // $http.get("/api/projects/" + projectid)
    app.get('/api/projects/:projectId', function(req, res) {
        // use mongoose to get all nerds in the database
        Project.findById(req.params.projectId, function(err, project) {
            console.log('Inside projects.');
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(project); // return all nerds in JSON format
        });
    });
    // delete project by project Id

    app.delete('/api/deleteProjects/:projectId', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.remove({ 'projectId': req.params.projectId }, function(err, dataLayers) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.json(dataLayers); // return all nerds in JSON format
        });
    });

    // Delete All projects
    app.delete('/api/deleteAllProjects', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.remove({}, function(err, dataLayers) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            res.json(dataLayers); // return all nerds in JSON format
        });
    });
    // Get project based on ProjId
    app.get('/api/getDataLayer/:projectId', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.find({ 'projectId': req.params.projectId }, function(err, dataLayers) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(dataLayers); // return all nerds in JSON format
        });
    });



    // create Data Layer 

    // route to handle creating goes here (app.post)
    app.post('/api/projects', function(req, res) {
        var project = new Project();
        project.projectTitle = req.body.title;
        project.country = req.body.markets;
        project.businessUnit = req.body.businessUnit;
        project.application = req.body.application;

        // check if project already exist with title 

        if (!isprojectExist(req, res)) {
            project.save(function(err, project) {
                if (err)
                    res.send(err);
                res.json(project);

            });
        }
    });
    // route to handle creating Data layer HTTP POST
    app.post('/api/createDataLayer', function(req, res) {

        var keyValParam = sortKeyAndCheckDuplicates(req.body.reqParamKeyVal).toLowerCase();
        if (keyValParam !== null && keyValParam !== undefined) {
            createDataLayer(req, res);
        } else {
            var err = new Error('duplicate keyValParam exist')
            res.json(err)
        }
    });

    function createDataLayer(req, res) {
        var dataObject = new DataLayer();
        dataObject.dataLayer = req.body.dataLayer;
        dataObject.reqParamKeyVal = req.body.reqParamKeyVal;
        dataObject.dataLayerName = req.body.dataLayerName;
        dataObject.projectId = req.body.projectId;

        DataLayer.find({ 'reqParamKeyVal': req.body.reqParamKeyVal }, function(err, existingLayer) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            if (existingLayer.length === 0 || existingLayer === undefined) {

                dataObject.save(function(err, dataLayer) {
                    if (err)
                        res.send(err);
                    res.json(dataLayer);

                });
            } else {
                //var err = new Error('duplicate keyValParam exist')
                // res.json(err)
                //res.send(err).status(500);
                res.status(404).send("Oh uh, something went wrong");

            }
        });


    }

    // get Data layer by reqParamKeyVal
    app.get('/api/getDataLayerByKeyVal/:reqParamKeyVal', function(req, res) {
        // use mongoose to get all nerds in the database
        console.log(req.params.reqParamKeyVal);
        DataLayer.find({ 'reqParamKeyVal': req.params.reqParamKeyVal }, function(err, datalayer) {

            if (err)
                res.send(err);

            res.json(JSON.parse(datalayer[0].dataLayer));
        });
    });

    // get Data layer by id
    app.get('/api/getDataLayerByLayerId/:layerId', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.findById(req.params.layerId, function(err, dataLayer) {
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(dataLayer);
        });
    });
    // delete data layer By ID
    app.delete('/api/deleteDataLayer/:layerId', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.remove(req.params.layerId, function(err, dataLayer) {
            console.log('Inside projects.');
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(dataLayer);
        });
    });


    // get Data layer based on Project Title
    app.get('/api/getDataLayerByProjectTitle/:projectTitle', function(req, res) {
        // use mongoose to get all nerds in the database
        Project.findById({ 'projectTitle': req.params.projectTitle }, function(err, project) {
            console.log('Inside projects.');
            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);
            DataLayer.findById(project._id, function(err, dataLayers) {
                if (err)
                    res.send(err);
                res.json(dataLayers);
            });
        });
    });

    // get All data Layer
    app.get('/api/getAllDataLayer', function(req, res) {
        // use mongoose to get all nerds in the database
        DataLayer.find({}, function(err, DataLayers) {
            if (err)
                res.send(err);
            res.send(DataLayers)
        });
    });

    app.get("/api/getProjectSpecDataLayer/:ProjectId/:dataLayerId", function(req, res) {
            Project.findById(req.params.ProjectId, function(err, project) {
                // get project first
                if (err)
                    res.send(err);

                DataLayer.findById(req.params.dataLayerId, function(err, dataLayer) {
                    // if there is an error retrieving, send the error.
                    // nothing after res.send(err) will execute
                    if (err)
                        res.send(err);

                    res.json(dataLayer);
                });
            });
        })
        // { 'dataLayer': selectedData, 'reqParamKeyVal': reqParam, 'id': id, 'dataLayerName': dataLayerName, 'projectId': projectId }
    app.post("/api/updateDataLayer", function(req, res) {
        // update data layer 
        var keyValParam = sortKeyAndCheckDuplicates(req.body.reqParamKeyVal);
        if (keyValParam !== null && keyValParam !== undefined) {
            updateDataLayer(req, res);

        } else {
            var err = new Error('duplicate keyValParam exist')
            res.json(err)
        }
    })

    function updateDataLayer(req, res) {
        // if update is done than send json object back
        // find to  get object and update & save
        DataLayer.findById(req.body.dataLayerId, function(err, result) {

            result.dataLayer = req.body.dataLayer;
            result.reqParamKeyVal = req.body.reqParamKeyVal;
            result.dataLayerName = req.body.dataLayerName;
            result.projectId = req.body.projectId;

            result.save(function(err, dataLayer) {
                if (err)
                    res.send(err);
                res.json(dataLayer);

            });
        });
    }

    ////This API for Getting specific DataLayer with passing RequestParameters.

    function isprojectExist(req, res) {
        Project.find({ 'projectTitle': req.body.title }, function(err, projectData) {
            if (err)
                return false;
            else if (projectData.length === 0) {
                return false
            } else {
                return true;
            }
        });
    }

    function isDataExist(reqParamKeyVal) {
        DataLayer.find({ 'reqParamKeyVal': reqParamKeyVal }, function(err, data) {
            if (err) {
                return false;
            } else if (data.length === 0) {
                return false
            } else {
                return true;
            }
        });
    }

    function checkForDuplicateKeys(array) {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (value in valuesSoFar) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;

    }

    function sortKeyAndCheckDuplicates(ketValParam) {
        var parts = ketValParam.split("&");
        if (!checkForDuplicateKeys(parts)) {
            var sortKeyVal = "";
            for (var i = 0; i < parts.length; i++) {
                if (i == 0) {
                    sortKeyVal = sortKeyVal + parts[i];
                } else {
                    sortKeyVal = sortKeyVal + "&" + parts[i];
                }
            }
            return sortKeyVal;
        } else {
            return null
        }

    }



    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};