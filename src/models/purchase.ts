import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchase extends Document {
  userId: string;
  productId: string;
  date: Date;
}

const PurchaseSchema: Schema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IPurchase>('Purchase', PurchaseSchema);