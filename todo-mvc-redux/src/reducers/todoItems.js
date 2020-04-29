import moment from 'moment';
import storage from '../utils/storage';
import { ADD_ITEM, DELETE_ITEM, TOGGLE_IS_COMPLETED } from '../actions/index';

const testState = {
  todoItems: [
    {
      id: 0,
      content: '待办事项1',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 1,
      content: '待办事项2',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 3,
      content: '待办事项3',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 4,
      content: '待办事项4',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 5,
      content: '待办事项5',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 6,
      content: '待办事项6',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 7,
      content: '待办事项7',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 8,
      content: '待办事项8',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 9,
      content: '待办事项9',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 10,
      content: '待办事项10',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 11,
      content: '待办事项11',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 12,
      content: '待办事项12',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 13,
      content: '待办事项13',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 14,
      content: '待办事项14',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
    {
      id: 15,
      content: '待办事项15',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: false,
    },
    {
      id: 16,
      content: '待办事项16',
      createdAt: '2020/4/20 13:41:12',
      deadLine: '2020/4/20 13:41:13',
      isCompleted: true,
    },
  ],
  nextId: 17,
};

const initialState = {
  todoItems: [],
  nextId: 0,
};

const todoItemsFromStorage = storage.getItem('todoItems');
const nextIdFromStorage = storage.getItem('nextId');
if (!todoItemsFromStorage || !nextIdFromStorage) {
  storage.clear();
  initialState.todoItems = testState.todoItems;
  initialState.nextId = testState.nextId;
} else {
  // 设置从 localStorage 中读取的数据
  initialState.todoItems = todoItemsFromStorage;
  initialState.nextId = nextIdFromStorage;
}

const todoItemsReducer = (state = initialState, action) => {
  const { todoItems, nextId } = state;
  let item;
  let id;
  let newTodoItems;
  switch (action.type) {
    case ADD_ITEM:
      item = action.payload.item;
      newTodoItems = [
        ...todoItems,
        {
          content: item.content,
          deadLine: moment(item.deadLine).format('YYYY/M/D HH:mm:ss'),
          id: nextId,
          createdAt: moment().format('YYYY/M/D HH:mm:ss'),
          isCompleted: false,
        },
      ];

      // TODO: 中间件？
      storage.setItem('todoItems', newTodoItems);
      storage.setItem('nextId', nextId + 1);

      return {
        ...state,
        todoItems: newTodoItems,
        nextId: nextId + 1,
      };
    case DELETE_ITEM:
      id = action.payload.id;
      newTodoItems = todoItems.filter((it) => it.id !== id);

      // TODO: 中间件？
      storage.setItem('todoItems', newTodoItems);
      storage.setItem('nextId', nextId);

      return {
        ...state,
        todoItems: newTodoItems,
      };
    case TOGGLE_IS_COMPLETED:
      id = action.payload.id;
      newTodoItems = todoItems.map((it) => {
        if (it.id === id) return { ...it, isCompleted: !it.isCompleted };
        return it;
      });

      // TODO: 中间件？
      storage.setItem('todoItems', newTodoItems);
      storage.setItem('nextId', nextId);

      return {
        ...state,
        todoItems: newTodoItems,
      };
    default:
      return state;
  }
};

export default todoItemsReducer;
