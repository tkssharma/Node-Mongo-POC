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

    // route to handle creating goes here (app.post)
    app.post('/api/projects', function(req, res) {
        var project = new Project();
        project.projectTitle = req.body.title;
        project.country = req.body.markets;
        project.businesUnit = req.body.businesUnit;
        project.application = req.body.application;
        project.save(function(err) {
            if (err)
                res.send(err);

            console.log(res);
            //res.json({ message: res._id });//

        });
    });

    // route to handle creating goes here (app.post)
    app.post('/api/saveITagData', function(req, res) {
        var dataLayer = new DataLayer();
        dataLayer.dataLayer = req.body.dataLayer;
        dataLayer.reParamKeyVal = req.body.reqParamKeyVal;
        dataLayer.dataLayerName = req.body.dataLayerName;
        dataLayer.projectId = req.body.projectId;
        console.log("DataLayer "+ dataLayer.projectId);
        dataLayer.save(function(err) {
            if (err)
                res.send(err);

            console.log(res);
            //res.json({ message: res._id });//

        });
    });
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
