import { Schema, model, Types } from "mongoose";

export interface ITopic {
  _id: string;
  sheetId: Types.ObjectId;
  title: string;             // e.g., "Arrays"
  description?: string;
  order: number;             // for sorting in UI
  isActive: boolean;
}

const topicSchema = new Schema<ITopic>({
  sheetId: {type: Schema.Types.ObjectId, ref: "Sheet", required: true, index: true},
  title: { type: String, required: true, index: true },
  description: String,
    order: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

topicSchema.index({ sheetId: 1, order: 1 });

export const TopicModel = model<ITopic>("Topic", topicSchema);
