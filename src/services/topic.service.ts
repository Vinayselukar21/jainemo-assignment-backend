import { Types } from "mongoose";
import { TopicModel } from "../models/topic.model";

export class TopicService {
  static listBySheet(sheetId: string) {
    return TopicModel.aggregate([
      {
        $match:{
          sheetId: new Types.ObjectId(sheetId),
          isActive: true
        }
      },
      {
        $lookup: {
          from: "problems",
          localField: "_id",
          foreignField: "topicId",
          as: "problems"
        },
      }, {
        $unwind: {
          path: "$progresses",
          preserveNullAndEmptyArrays: true
        }
      }, {
        $lookup: {
          from: "progresses",
          localField: "problems._id",
          foreignField: "problemId",
          as: "problem.progresses"
        }
      },{
        $group:{
          _id: "$_id",
          sheetId: { $first: "$sheetId" },
          title: { $first: "$title" },
          description: { $first: "$description" },
          order: { $first: "$order" },
          isActive: { $first: "$isActive" },
          problems: { $push: "$problems" },
          progress: { $first: "$problem.progresses" },
        }
      }
    ]);
  }
}
