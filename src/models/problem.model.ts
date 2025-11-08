import { Schema, model, Types } from "mongoose";

export type Difficulty = "Easy" | "Medium" | "Tough";

export interface IProblem {
  _id: string;
  topicId: Types.ObjectId;
  title: string;                 // e.g., "Two Sum"
  slug: string;                  // unique
  order: number;
  difficulty: Difficulty;
  youtubeUrl?: string;
  leetCodeUrl?: string;
  codeforcesUrl?: string;
  articleUrl?: string;
  isActive: boolean;
}

const problemSchema = new Schema<IProblem>({
  topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  order: { type: Number, default: 0, index: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Tough"], required: true, index: true },
  youtubeUrl: String,
  leetCodeUrl: String,
  codeforcesUrl: String,
  articleUrl: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

problemSchema.index({ topicId: 1, order: 1 });

export const ProblemModel = model<IProblem>("Problem", problemSchema);
