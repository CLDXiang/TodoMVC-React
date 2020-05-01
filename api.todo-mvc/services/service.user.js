import { userModel } from '../storage';
import err from './responseErrors';

export const userRegister = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username && password) {
    const user = await userModel.findOne({ username }).exec();
    if (user) {
      ctx.response.body = err[2];
    } else {
      ctx.response.body = await new userModel({ username, password }).save();
    }
  } else {
    ctx.response.body = err[1];
  }
};

export const userLogin = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username && password) {
    const user = await userModel.findOne({ username }).exec();
    if (!user) {
      ctx.response.body = err[3];
    } else if (user.password !== password) {
      ctx.response.body = err[4];
    } else {
      ctx.response.body = { success: true, id: user._id };
    }
  } else {
    ctx.response.body = err[1];
  }
}
