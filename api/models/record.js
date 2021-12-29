import recordSchema from '../schemas/record.js';
import mongoose from 'mongoose';

const Record = mongoose.model('Record', recordSchema);

export default Record;
