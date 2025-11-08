import { Schema, model, Types } from "mongoose";

export interface ISheet {
  _id: string;
  title: string;             // e.g., "Arrays"
  description?: string;
  order: number;             // for sorting in UI
  isActive: boolean;
}

const sheetSchema = new Schema<ISheet>({
  title: { type: String, required: true, index: true },
  description: String,
  order: { type: Number, default: 0, index: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const SheetModel = model<ISheet>("Sheet", sheetSchema);
