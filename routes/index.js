var express = require('express');
var router = express.Router();

//Mongo
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017";

/* ROUTES */
//Mostrar
router.get('/', function(req, res, next) {
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

router.get('/ver/:id', function(req, res, next) {
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

//Crear
router.get('/crear', function(req, res, next) {
	res.render('juegos/crear', { title: 'Express', id: req.params.id});
});

router.post('/crear', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
		if (err) throw err;
		var db = client.db("videoJuegos");
		var myobj = {titulo: req.body.titulo, año: req.body.any, plataforma: req.body.plataforma};
		db.collection("juegos").insertOne(myobj, function(err, result) {
			if (err) throw err;
			client.close();
			res.redirect('/ver/'+myobj._id);
		});
	});
});

//Editar
router.get('/editar/:id', function(req, res, next) {
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

router.post('/editar/:id', function(req, res, next) {
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
			res.redirect('/ver/' + req.params.id);
		});
	});
});

//Borrar
router.get('/borrar/:id', function(req, res, next) {
	MongoClient.connect(mongoUrl, function(err, client) {
		if (err) throw err;
		var db = client.db("videoJuegos");

		var ObjectId = require('mongodb').ObjectId; 
		var o_id = new ObjectId(req.params.id);

		var myquery = { _id: o_id };

		db.collection("juegos").deleteOne(myquery, function(err, obj) {
			if (err) throw err;
			client.close();
			res.redirect('/');
		});
	});
});

module.exports = router;