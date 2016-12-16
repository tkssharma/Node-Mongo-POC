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

    // changees will be done 
    // route to handle creating Data layer HTTP POST
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
        project.businesUnit = req.body.businesUnit;
        project.application = req.body.application;

        project.save(function(err, project) {
            if (err)
                res.send(err);

            console.log(res);
            res.json(project);

        });
    });
    // route to handle creating Data layer HTTP POST
    app.post('/api/createDataLayer', function(req, res) {
        var dataObject = new DataLayer();
        dataObject.dataLayer = req.body.dataLayer;
        dataObject.reParamKeyVal = req.body.reParamKeyVal;
        dataObject.dataLayerName = req.body.dataLayerName;
        dataObject.projectId = req.body.projectId;

        dataObject.save(function(err, dataLayer) {
            if (err)
                res.send(err);

            console.log(res);
            res.json(dataLayer);

        });
    });

    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};

