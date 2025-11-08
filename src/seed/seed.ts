import { connectMongo } from "../database/mongoose";
import { TopicModel } from "../models/topic.model";
import { ProblemModel } from "../models/problem.model";
import { SheetModel } from "../models/sheet.modal";

(async () => {
  await connectMongo();
  await TopicModel.deleteMany({});
  await ProblemModel.deleteMany({});
  await SheetModel.deleteMany({});

  // 1️⃣ Create the DSA Sheet
  const dsaSheet = await SheetModel.create({
    title: "DSA Sheet",
    description: "A structured DSA sheet covering all key topics for interviews",
    order: 1,
  });

  // 2️⃣ Create Topics
  const arrays = await TopicModel.create({ sheetId: dsaSheet._id, title: "Arrays", order: 1 });
  const strings = await TopicModel.create({ sheetId: dsaSheet._id, title: "Strings", order: 2 });
  const linkedList = await TopicModel.create({ sheetId: dsaSheet._id, title: "Linked List", order: 3 });
  const stacks = await TopicModel.create({ sheetId: dsaSheet._id, title: "Stacks & Queues", order: 4 });
  const trees = await TopicModel.create({ sheetId: dsaSheet._id, title: "Binary Trees", order: 5 });
  const graphs = await TopicModel.create({ sheetId: dsaSheet._id, title: "Graphs", order: 6 });

  // 3️⃣ Create Problems
  await ProblemModel.create([
    // 🧩 Arrays
    {
      topicId: arrays._id,
      title: "Two Sum",
      slug: "two-sum",
      difficulty: "Easy",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/two-sum",
      youtubeUrl: "https://youtu.be/0Fxc_jKj2vo?si=VI7rHXsdEYUhTRVg",
      articleUrl: "https://dev.to/savviesammie/two-sum-leetcode-problem-1-solution-in-python-4al9",
    },
    {
      topicId: arrays._id,
      title: "Best Time to Buy and Sell Stock",
      slug: "best-time-stock",
      difficulty: "Easy",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock",
      youtubeUrl: "https://youtu.be/WBzZCm46mFo?si=CoCIRYgGEEN1f6yW",
      articleUrl: "https://dev.to/yazdun/best-time-to-buy-and-sell-stock-leetcode-121-typescript-1o2h",
    },
    {
      topicId: arrays._id,
      title: "Maximum Subarray (Kadane’s Algorithm)",
      slug: "maximum-subarray",
      difficulty: "Medium",
      order: 3,
      leetCodeUrl: "https://leetcode.com/problems/maximum-subarray",
      youtubeUrl: "https://youtu.be/86CQq3pKSUw?si=pv4G2x0-HQX0lQ5P",
      articleUrl: "https://dev.to/alisabir/maximum-subarray-solution-in-javascript-1b8f",
    },

    // 🔤 Strings
    {
      topicId: strings._id,
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/valid-anagram",
      youtubeUrl: "https://youtu.be/wKF6L9Zo8PQ?si=yP2hrOKentudNjwV",
      articleUrl: "https://dev.to/vishnu_prasath_a/valid-anagram-4gle",
    },
    {
      topicId: strings._id,
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      difficulty: "Medium",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters",
      youtubeUrl: "https://youtu.be/wiGpQwVHdE0?si=7pVtP3Etax5CL6Ct",
      articleUrl: "https://dev.to/alisabir/longest-substring-without-repeating-characters-1kdk",
    },
    {
      topicId: strings._id,
      title: "Group Anagrams",
      slug: "group-anagrams",
      difficulty: "Medium",
      order: 3,
      leetCodeUrl: "https://leetcode.com/problems/group-anagrams",
      youtubeUrl: "https://youtu.be/vzdNOK2oB2E?si=ryy1-3IQ8_fPRAqG",
      articleUrl: "https://dev.to/akshitadixit/group-anagrams-leetcode-49-javascript-2k8a",
    },

    // 🔗 Linked List
    {
      topicId: linkedList._id,
      title: "Reverse Linked List",
      slug: "reverse-linked-list",
      difficulty: "Easy",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/reverse-linked-list",
      youtubeUrl: "https://youtu.be/O0By4Zq0OFc?si=6WJoPaQzefQtPjvL",
      articleUrl: "https://dev.to/alisabir/reverse-linked-list-solution-in-javascript-15mj",
    },
    {
      topicId: linkedList._id,
      title: "Detect Cycle in Linked List",
      slug: "detect-cycle-linked-list",
      difficulty: "Medium",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/linked-list-cycle",
      youtubeUrl: "https://youtu.be/gBTe7lFR3vc?si=3q4efbRve8v2yqVY",
      articleUrl: "https://dev.to/spradeepmatha/detect-cycle-in-linked-list-4lpl",
    },

    // 🧱 Stacks & Queues
    {
      topicId: stacks._id,
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      difficulty: "Easy",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/valid-parentheses",
      youtubeUrl: "https://youtu.be/WTzjTskDFMg?si=1zyllDbsEpPZ4JzF",
      articleUrl: "https://dev.to/spradeepmatha/valid-parentheses-12m5",
    },
    {
      topicId: stacks._id,
      title: "Min Stack",
      slug: "min-stack",
      difficulty: "Medium",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/min-stack",
      youtubeUrl: "https://youtu.be/qkLl7nAwDPo?si=KOnLLAqL0iqYQljn",
      articleUrl: "https://dev.to/alisabir/min-stack-in-javascript-3d5f",
    },

    // 🌳 Binary Trees
    {
      topicId: trees._id,
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-binary-tree",
      difficulty: "Easy",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree",
      youtubeUrl: "https://youtu.be/ygDlimvs6xo?si=K7CqXg8DK3B8-UhQ",
      articleUrl: "https://dev.to/javinpaul/maximum-depth-of-binary-tree-in-js-5d3b",
    },
    {
      topicId: trees._id,
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      difficulty: "Easy",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/invert-binary-tree",
      youtubeUrl: "https://youtu.be/OnSn2XEQ4MY?si=JzZbS9a9djHsgCSt",
      articleUrl: "https://dev.to/alisabir/invert-binary-tree-in-javascript-2d9e",
    },

    // 🕸️ Graphs
    {
      topicId: graphs._id,
      title: "Number of Islands",
      slug: "number-of-islands",
      difficulty: "Medium",
      order: 1,
      leetCodeUrl: "https://leetcode.com/problems/number-of-islands",
      youtubeUrl: "https://youtu.be/pV2kpPD66nE?si=6WCN6Huw2pTVDKkL",
      articleUrl: "https://dev.to/sushant-raj07/number-of-islands-in-javascript-4jk2",
    },
    {
      topicId: graphs._id,
      title: "Clone Graph",
      slug: "clone-graph",
      difficulty: "Medium",
      order: 2,
      leetCodeUrl: "https://leetcode.com/problems/clone-graph",
      youtubeUrl: "https://youtu.be/mQeF6bN8hMk?si=K0Xg4El7_Q_dICXn",
      articleUrl: "https://dev.to/alisabir/clone-graph-in-javascript-24eg",
    },
  ]);

  console.log("✅ Seeded DSA Sheet successfully!");
  process.exit(0);
})();
