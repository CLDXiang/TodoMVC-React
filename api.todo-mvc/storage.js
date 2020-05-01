import mongoose from 'mongoose';
import config from './config';

const { DB_URL } = config;

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

const User = mongoose.model('User', userSchema);

export default User;