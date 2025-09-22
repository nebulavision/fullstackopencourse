import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

mongoose.set('strictQuery', false);

const url = MONGODB_URI;

console.log('Connecting to', url);

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('eError connecting to MongoDB:', error.message)
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Note = mongoose.model('Note', noteSchema);