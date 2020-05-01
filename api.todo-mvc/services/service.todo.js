import { todoModel } from '../storage';

export const todoGet = async (ctx) => {
  const { userId } = ctx.request.body;
};

export const todoAdd = async (ctx) => {
  const { userId, content, deadline } = ctx.request.body;
};

export const todoRemove = async (ctx) => {
  const { userId, todoId } = ctx.request.body;
};

export const todoEdit = async (ctx) => {
  const { userId, todoId, content, deadline } = ctx.request.body;
};