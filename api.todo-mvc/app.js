import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from './config';
import loginService from './modules/service.login';
import registerService from './modules/service.register';

const { PORT } = config;

const app = new Koa();
const router = Router();

app.use(async (ctx, next) => {
  console.log(`Receive request: ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(bodyParser());

router.post('/api/login', loginService);

router.post('/api/register', registerService);

app.use(router.routes());

app.listen(PORT);
console.log(`Listening at ${PORT}`);
