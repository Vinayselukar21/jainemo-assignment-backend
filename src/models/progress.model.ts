import { Schema, model, Types } from "mongoose";

export type ProgressState = "NotStarted" | "InProgress" | "Completed";

export interface IProgress {
  _id: string;
  userId: Types.ObjectId;
  problemId: Types.ObjectId;
  state: ProgressState;         // checkbox -> Completed / else NotStarted; you can track InProgress too
  lastUpdated: Date;
}

const progressSchema = new Schema<IProgress>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true, index: true },
  state: { type: String, enum: ["NotStarted", "InProgress", "Completed"], default: "NotStarted", index: true },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

progressSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export const ProgressModel = model<IProgress>("Progress", progressSchema);
