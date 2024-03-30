import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, require: true },
});

export default model('User', UserSchema);