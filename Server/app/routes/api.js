var Intruder     = require('../models/intruder');
var Gas     = require('../models/gas');
var Temperature     = require('../models/temperature');

module.exports = function(app, express) {
	var router = express.Router();

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
	    res.json({ message: 'hooray! welcome to our api!' });   
	});

	// Gas Endpoint (accessed at http://localhost:8080/api/gas)
	router.route('/gas')
    // POST gas
    .post(function(req, res) {
        var gas = new Gas();
        gas.gasLevel = req.body.gasLevel;
        gas.danger = req.body.danger;
        // save it
        gas.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Gas created!' });
        })
    })
    // GET gas
    .get(function(req, res) {
        Gas.
        find({}).
        limit(5).
        sort({ time: -1 }).
        then(function(err,docs) {
            if (err)
                res.send(err);

            res.json(docs);
        });
   });

    // Temperature Endpoint (accessed at http://localhost:8080/api/temp)
	router.route('/temp')
    // POST temp
    .post(function(req, res) {
        var temp = new Temperature();
        temp.temperature = req.body.temperature;
        temp.danger = req.body.danger;
        // save it
        temp.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Temp created!' });
        })
    })
    // GET temp
    .get(function(req, res) {
        Temperature.
        find({}).
        limit(5).
        sort({ time: -1 }).
        then(function(err,docs) {
            if (err)
                res.send(err);

            res.json(docs);
        });
    });

    // Intruder Endpoint (accessed at http://localhost:8080/api/temp)
	router.route('/intruder')
    // POST intr
    .post(function(req, res) {
        var intruder = new Intruder();
        // save it
        intruder.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Intruder created!' });
        })
    })
    // GET intr
    .get(function(req, res) {
        Intruder.
        find({}).
        limit(5).
        sort({ time: -1 }).
        then(function(err,docs) {
            if (err)
                res.send(err);

            res.json(docs);
        });
    });

    //Moving car Endpoint
    router.route('/move/:dir')
    .post(function (req,res) {
    	console.log(req.params.dir);
    	res.send("ok")
    })
	return router;
};