import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { PORT } from './config';
import { userLogin, userRegister } from './services/service.user';
import { todoGet, todoAdd, todoRemove, todoEdit } from './services/service.todo';

const app = new Koa();
const router = Router();

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  console.log(`Receive request: ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());

router.post('/api/user/login', userLogin);
router.post('/api/user/register', userRegister);

router.post('/api/todo/get', todoGet);
router.post('/api/todo/add', todoAdd);
router.post('/api/todo/remove', todoRemove);
router.post('/api/todo/edit', todoEdit);

app.use(router.routes());

app.listen(PORT);
console.log(`Listening at ${PORT}`);
