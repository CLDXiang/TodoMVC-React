import { todoModel } from '../storage';
import err from './responseErrors';

export const todoGet = async (ctx) => {
  const { userId } = ctx.request.body;
  if (userId) {
    ctx.response.body = await todoModel
      .find()
      .where('creatorId')
      .equals(userId)
      .sort('createdAt')
      .exec();
  } else {
    ctx.response.body = err[1];
  }
};

export const todoAdd = async (ctx) => {
  const { userId, content, deadline } = ctx.request.body;
  if (userId && content && deadline) {
    ctx.response.body = await new todoModel({
      creatorId: userId,
      content,
      deadline,
      isCompleted: false,
    }).save();
  } else {
    ctx.response.body = err[1];
  }
};

export const todoRemove = async (ctx) => {
  const { userId, todoId } = ctx.request.body;
  if (userId && todoId) {
    ctx.response.body = await todoModel.deleteOne({
      _id: todoId,
      creatorId: userId,
    });
  } else {
    ctx.response.body = err[1];
  }
};

export const todoEdit = async (ctx) => {
  const { userId, todoId, content, deadline, isCompleted } = ctx.request.body;
  if (userId && todoId && content && deadline) {
    ctx.response.body = await todoModel.updateOne(
      { _id: todoId, creatorId: userId },
      { content, deadline, isCompleted }
    );
  } else {
    ctx.response.body = err[1];
  }
};
