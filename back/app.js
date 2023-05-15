var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , mongod = require('mongodb').MongoClient;

var index = require('./routes/index');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function* (next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// connect mongodb
let url = 'mongodb://dba:password@192.168.22.22:27017/?authMechanism=DEFAULT&authSource=xiyuntang'
app.use(function* (next) {
  this.dbc = yield mongod.connect(url)
  this.db = this.dbc.db('xiyuntang')
  this.date = new Date()
  yield next
})

// cors
app.use(function* (next) {
  this.response.set('Access-Control-Allow-Origin', '*')
  yield next
})

// routes definition
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
