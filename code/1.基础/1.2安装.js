const Koa = require('koa')
const app = new Koa()

app.use(( ctx ) => {
  ctx.body = 'koa start'
})

app.listen(3000, () => {
  console.log('server starting at port 3000')
})
