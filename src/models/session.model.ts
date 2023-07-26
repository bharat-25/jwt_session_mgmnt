import mongoose, { Schema } from 'mongoose';


interface followFollowingDocument extends mongoose.Document {
    userId:mongoose.Types.ObjectId;
    isActive:boolean
    loginAt:Date;
  }

const sessionSchema = new mongoose.Schema<followFollowingDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    isActive:Boolean,
    loginAt:Date
  });


export const sessionModel = mongoose.model<followFollowingDocument>('session', sessionSchema);