const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('images'));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/login', function(req, res){
	res.render('login');
});

app.get('/register', function(req, res){
	res.render('register');
});

app.get('/marketplace', function(req, res){
	let rawdata = fs.readFileSync('items.json');
	let items = JSON.parse(rawdata);
	res.render('marketplace', {items: items});
})

app.get('/item/:id', function(req, res){
	let rawdata = fs.readFileSync('items.json');
	let items = JSON.parse(rawdata);
	for(var i = 0; i < items.length; i++){
		if(i+1 == req.params.id){
			break;
		}
	}
	var item = items[i]
	if(item == undefined){
		item = {
			'name': '',
			'qnty': '',
			'image': '',
			'cost': ''
		}
	}
	res.render('item', {item: item})
})

app.listen(3000, function(){
	console.log('Server started on port 3000');
});
