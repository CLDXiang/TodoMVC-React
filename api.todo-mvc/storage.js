import mongoose from 'mongoose';
import { DB_URL } from './config';

mongoose.connect(DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Succeed in connecting to MongoDB!');
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
}, {
  timestamps: true,
});

const todoSchema = new mongoose.Schema({
  content: String,
  deadline: String, // received from frontend
  isCompleted: Boolean,
  creatorId: String, // received from frontend 
}, {
  timestamps: true,
});

export const userModel = mongoose.model('User', userSchema);
export const todoModel = mongoose.model('Todo', todoSchema);