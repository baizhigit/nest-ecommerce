import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, maxlength: 32, unique: true },
    password: { type: String, required: true, select: false },
    seller: {
      type: Boolean,
      default: false,
    },
    address: {
      addr1: String,
      addr2: String,
      city: String,
      state: String,
      country: String,
      zip: Number,
    },
  },
  { timestamps: { createdAt: 'created_at' } },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
