var express = require("express");
var cors = require("cors");
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

// app.set('trust proxy', 1) // trust first proxy

// app.use(session({
//     store: new FileStore(sess_options),
//     // secret: 'my_secret_key',
//     // resave: true,
//     // saveUninitialized: false

//     secret: 'jakfsjdhkahsdsajhjfkhsh',
//     name: 'COOKI_NAME',
//     proxy: !true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
//         httpOnly: true, //not access in browser
//         sameSite: 'lax', //'lax', //csrf
//         secure: !true //__prod__, //https
//     },
//     saveUninitialized: false,
//     resave: false,
// }));







//GET STATUS ENDPOINT

/* 
app.get('/', function(req, res) {
    //console.log({ sess: req.session });
    console.log('get /');
    console.log({ user_id: req.session.user_id });
    res.send('Our Server is Up and Running! ' + req.session.user_id)
})

//GET Date ENDPOINT
app.get('/date', function(req, res) {

    var utcDate = new Date()
    req.session.user_id = 'hh  ' + String(utcDate) + '  hh'
    console.log({ user_id: req.session.user_id });
    console.log({ sess: req.session });
    var day = utcDate.getDate()
    var month = utcDate.getMonth() + 1
    var year = utcDate.getFullYear()

    //Date in month-day-year format
    var todaysDate = `${month}-${day}-${year}`

    res.send(todaysDate)
}) */

app.use(cors({ credentials: true, origin: ['http://localhost:6060', 'http://localhost:4223'] }))
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    name: 'COOKI_NAME',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000,
        maxAge: 1000 * 60 * 60 * 24 * 30 * 12 * 10,
        httpOnly: !true, //not access in browser
        sameSite: false, //'lax', //csrf
        secure: false //__prod__, //https
    }
}))

// Access the session as req.session
app.get('/', function(req, res, next) {
    console.log({ id: req.session.id });

    if (req.session.views) {
        req.session.views++
            //    res.setHeader('Content-Type', 'text/html')
            // res.write('<p>views: ' + req.session.views + '</p>')
            // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
            // res.end()
            res.json({ text: 'views : ' + req.session.views })
        console.log({ text: 'views : ' + req.session.views });

    } else {
        req.session.views = 1
            // res.end('welcome to the session demo. refresh!')
        res.json({ text: 'welcome to the session demo. refresh!' })
        console.log({ text: 'welcome to the session demo. refresh!' })

    }
})