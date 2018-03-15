var express = require('express');
var router = express.Router();

//Mongo
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017";

/* ROUTES */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/:id', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.render('index', { title: 'Express', id: req.params.id});
});

//Crear
router.get('/juegos/crear', function(req, res, next) {
  res.render('juegos/crear', { title: 'Express', id: req.params.id});
});

router.post('/juegos/crear', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJuegos");
	  var myobj = {titulo: req.body.titulo, año: req.body.any, plataforma: req.body.plataforma};
	  db.collection("juegos").insertOne(myobj, function(err, result) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/juegos');
	  });
	});
});

//Editar
router.get('/juegos/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJuegos');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('juegos').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('juegos/editar', {juego: result});
	  });
	});
});

router.post('/juegos/editar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJuegos");

	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  var myquery = { _id: o_id };
	  var newvalues = { $set: {titulo: req.body.titulo, año: req.body.any, plataforma: req.body.plataforma} };
	  db.collection("juegos").updateOne(myquery, newvalues, function(findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
  		res.redirect('/juegos/ver/' + req.params.id);
	  });
	});
});

//Borrar
router.get('/juegos/borrar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;
	  var db = client.db("videoJuegos");

	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  var myquery = { _id: o_id };

	  db.collection("juegos").deleteOne(myquery, function(err, obj) {
	    if (err) throw err;
	    client.close();
  		res.redirect('/juegos');
	  });
	});
});


//Mostrar
router.get('/juegos', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJuegos');

	  db.collection('juegos').find({}).toArray(function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();

	    res.render('juegos/mostrarTodas', { juegos: result});
	    
	  });

	});
  
});

router.get('/juegos/ver/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
	  if (err) throw err;

	  var db = client.db('videoJuegos');
	  var ObjectId = require('mongodb').ObjectId; 
	  var o_id = new ObjectId(req.params.id);

	  db.collection('juegos').findOne({"_id" : o_id}, function (findErr, result) {
	    if (findErr) throw findErr;
	    client.close();
	    res.render('juegos/mostrar', {juego: result});
	  });
	});
  
});

module.exports = router;