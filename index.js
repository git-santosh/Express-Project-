var express = require('express');
var random_emp = require('./lib/random_emp.js');
var app=express();

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
//app.set('view engine', 'hbs');
 
//Array for to show random employee on about page 




app.set('port', process.env.PORT || 3000);
// testing code goes before routes  for checking page testing http://localhost:3000?test=1
app.use(function(req, res, next){
res.locals.showTests = app.get('env') !== 'production' &&
req.query.test === '1';
next();
});
// routes are start from hear
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
	res.render('home');
});
//Used to get Header information
// app.get('/headers', function(req,res){
//   res.set('Content-Type','text/plain');
//   var s = '';
//   for(var name in req.headers) 
//     s += name + ': ' + req.headers[name] + '\n';
//   res.send(s);
// });

//app.disable('x-powered-by');
app.get('/random-movie',function(req,res){

    res.render('random-movie',{emp : random_emp.getRandomEmp()});
});
app.get('/about',function(req,res){
    res.render('about');
});
app.get('/contact-me',function(req,res){
    res.render('contact-me');
});
app.use(function(req,res){
	res.type('text/plain');
	res.status(400);
	//res.send('404 - Not found');
	res.render('404');
});

app.get('/file/:name', function (req, res, next) {
  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	//res.send('500 - Server Error');
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});	