import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { PORT } from './config';
import { userLogin, userRegister } from './modules/service.user';

const app = new Koa();
const router = Router();

app.use(async (ctx, next) => {
  console.log(`Receive request: ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());

router.post('/api/login', userLogin);
router.post('/api/register', userRegister);

app.use(router.routes());

app.listen(PORT);
console.log(`Listening at ${PORT}`);
