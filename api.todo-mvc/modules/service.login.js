import userModel from '../storage';

export default async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username && password) {
    const user = await userModel.findOne({ username }).exec();
    if (!user) {
      ctx.response.body = { errCode: 3, errMsg: 'wrong username!' };
    } else if (user.password !== password) {
      ctx.response.body = { errCode: 4, errMsg: 'wrong password!' };
    } else {
      ctx.response.body = { success: true, id: user._id };
    }
  } else {
    ctx.response.body = { errCode: 1, errMsg: 'invalid username or password!' };
  }
}