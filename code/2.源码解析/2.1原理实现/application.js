const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class KKoa {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      let ctx = this.createContext(req, res);

      const fn = this.componse(this.middlewares);
      await fn(ctx);

      res.end(ctx.body);
    });

    server.listen(...args);
  }

  use(callback) {
    this.middlewares.push(callback);
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  componse(middlewares) {
    return function (ctx) {
      return dispatch(0);

      function dispatch(i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}

const app = new KKoa();
const url = require('url');
app.use(async (ctx, next) => {
  console.log('one start ');
  await next();
  console.log(' one end ');
});
app.use(async (ctx, next) => {
  console.log(' two start ');
  await next();
  console.log('two end ');
});
app.use(async (ctx, next) => {
  console.log(' three start');
  await next();
  console.log(' three end ');
});
app.use((ctx) => {
  console.log(url.parse(ctx.url));
  if (ctx.url === '/') {
    ctx.body = 'kkoa start';
  }
});

app.listen(3000, () => {
  console.log('server at localhost:3000');
});
