const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('one start ');
  ctx.body += 'one';
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
// 输出
//   one start
//   two start
//   three start
//   three end
//   two end
//   one end

app.use((ctx) => {
  ctx.body = 'koa start';
});

app.listen(3000, () => {
  console.log('server starting at port 3000');
});
