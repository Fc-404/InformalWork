const mongo = require('mongodb');
const { restart } = require('nodemon');

var router = require('koa-router')();

/**
 * Param
 * ! title
 * ! auther
 * ! body
 * Return
 * * {code: 0, id}
 * ! {code: 1}
 */
router.post('/pushblog', function* (next) {
  if (!this.request.body.title
    || !this.request.body.auther
    || !this.request.body.body) {
    this.body = { code: 1 }
    return
  }

  let body = {
    title: this.request.body.title,
    auther: this.request.body.auther,
    time:
      this.date.getFullYear() + '-' +
      this.date.getMonth() + '-' +
      this.date.getDate() + ' ' +
      this.date.getHours() + ':' +
      this.date.getMinutes() + ':' +
      this.date.getSeconds() + ' 星期' +
      ['日', '一', '二', '三', '四', '五', '六'][this.date.getDay()],
    body: this.request.body.body,
    like: 0,
    reply: []
  }

  result = yield this.db.collection('blogs').insertOne(body, (err) => {
    if (err) this.body = { code: 1 }
  })

  this.body = { code: 0, id: result.insertedId }
});

/**
 * Param
 * ! auther
 * ! id
 * Return
 * * {code: 0}
 */
router.get('/rmblog', function* (next) {
  if (!this.query.auther
    || !this.query.id) {
    this.body = { code: 1 }
    return
  }

  let whereStr = {
    'auther': this.query.auther,
    '_id': new mongo.ObjectId(this.query.id)
  }
  result = yield this.db.collection('blogs').deleteOne(whereStr, (err) => {
    if (err) this.body = { code: 1 }
  })
  this.body = { code: 0, result: result }
});

/**
 * Param
 * Return
 * * [{id, title, author, time, like, body} ...]
 */
router.get('/getblogs', function* (next) {
  let data = []
  result = this.db.collection('blogs').find({}).sort({ 'time': -1 })
  yield result.forEach(e => {
    data.push(e)
  });
  this.body = { code: 0, list: data }
});

/**
 * Param
 * ! id
 * Return
 */
router.get('/like', function* (next) {
  if (!this.query.id) {
    this.body = { code: 1 }
    return
  }

  result = yield this.db.collection('blogs').updateOne(
    { _id: new mongo.ObjectId(this.query.id) },
    {
      $inc: {
        like: 1
      }
    }
  )

  this.body = { code: 0, result: result }
});

/**
 * Param
 * ! id
 * ! author
 * ! body
 * Return
 */
router.get('/reply', function* (next) {
  if (!this.query.id
    || !this.query.auther
    || !this.query.body) {
    this.body = { code: 1 }
    return
  }

  let body = {
    auther: this.query.auther,
    time:
      this.date.getFullYear() + '-' +
      this.date.getMonth() + '-' +
      this.date.getDate() + ' ' +
      this.date.getHours() + ':' +
      this.date.getMinutes() + ':' +
      this.date.getSeconds() + ' 星期' +
      ['日', '一', '二', '三', '四', '五', '六'][this.date.getDay()],
    body: this.query.body
  }

  result = yield this.db.collection('blogs').updateOne(
    { _id: new mongo.ObjectId(this.query.id) },
    {
      $push: {
        reply: body
      }
    }
  )

  this.body = { code: 0, result: result }
});

module.exports = router;
