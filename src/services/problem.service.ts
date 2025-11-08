import { ProblemModel } from "../models/problem.model";

export class ProblemService {
  static listByTopic(topicId: string) {
    return ProblemModel.find({ topicId, isActive: true }).sort({ order: 1 });
  }
}
