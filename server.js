var express = require("express");
var session = require('express-session');
var app = express();

// Set the Server Port
var PORT = process.env.PORT || 8080
var server = app.listen(PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', 'localhost', port);
});



// app.use(
//   session({
//     store: new RedisStore({ client: redis, disableTouch: true }),
//     secret: 'jakfsjdhkahsdsajhjfkhsh',
//     name: COOKI_NAME,
//     proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
//       httpOnly: true, //not access in browser
//       sameSite: 'lax', //'lax', //csrf
//       secure: false //__prod__, //https
//     },
//     saveUninitialized: false,
//     resave: false,
//   }),
// );



var FileStore = require('session-file-store')(session);

//file session
var sess_options = {
    path: "./sess/", //directory where session files will be stored
    useAsync: true,
    reapInterval: 5000,
    maxAge: 10000
};
app.use(session({
    //   store: new FileStore(sess_options),
    // secret: 'my_secret_key',
    // resave: true,
    // saveUninitialized: false

    secret: 'jakfsjdhkahsdsajhjfkhsh',
    name: 'COOKI_NAME',
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
        httpOnly: true, //not access in browser
        sameSite: 'lax', //'lax', //csrf
        secure: false //__prod__, //https
    },
    saveUninitialized: false,
    resave: false,
}));


app.set('trust proxy', 1)
app.enable('trust proxy')






//GET STATUS ENDPOINT
app.get('/', function(req, res) {
    console.log({ sess: req.session });
    res.send('Our Server is Up and Running!')
})

//GET Date ENDPOINT
app.get('/date', function(req, res) {

    var utcDate = new Date()
    req.session.id = utcDate + '  hh'
    console.log({ sess: req.session });
    var day = utcDate.getDate()
    var month = utcDate.getMonth() + 1
    var year = utcDate.getFullYear()

    //Date in month-day-year format
    var todaysDate = `${month}-${day}-${year}`

    res.send(todaysDate)
})