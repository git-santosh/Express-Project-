var express = require('express');
var app=express();

// set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
//app.set('view engine', 'hbs');


app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
	res.render('home');
})
app.get('/about',function(req,res){
	res.render('about');
})

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