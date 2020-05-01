import { userModel } from '../storage';

export default async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username && password) {
    const user = await userModel.findOne({ username }).exec();
    if (user) {
      ctx.response.body = { errCode: 2, errMsg: 'existed username!' };
    } else {
      ctx.response.body = await new userModel({ username, password }).save();
    }
  } else {
    ctx.response.body = { errCode: 1, errMsg: 'invalid username or password!' };
  }
};
