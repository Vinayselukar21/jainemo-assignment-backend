import { ProgressModel } from "../models/progress.model";
import { ProblemModel } from "../models/problem.model";
import { Types } from "mongoose";

export class ProgressService {
  static upsert({ userId, problemId, state }:
    { userId: string; problemId: string; state: "NotStarted"|"InProgress"|"Completed"; }) {
    return ProgressModel.findOneAndUpdate(
      { userId, problemId },
      { state, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
  }
}
