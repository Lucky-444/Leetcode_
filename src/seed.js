const mongoose = require("mongoose");
const Problem = require("./models/problem"); // Assuming your problem model is in ./models/problemModel.js
const User = require("./models/user"); // Assuming you have a User model for problemCreator
const dotenv = require('dotenv')
dotenv.config();

const mongoURI = "mongodb+srv://swainlucky:Sas%402131@cluster.gqsulk6.mongodb.net/Leetcode?retryWrites=true&w=majority&appName=Cluster";

if (!mongoURI) {
  console.error("Error: MONGO_URL not defined in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const seedDatabase = async () => {
  try {
    // Clear existing problems (optional, good for fresh seeds)
    await Problem.deleteMany({});
    console.log("Existing problems cleared.");

    // Create a dummy user for problemCreator
    // In a real application, you would have actual user IDs
    let dummyUser = await User.findOne({ email: "Monty@gmail.com" });
    if (!dummyUser) {
      dummyUser = new User({
        firstName: "Monty143",
        email: "Monty@gmail.com",
        password: "12345",
        role: 'admin'
      });
      await dummyUser.save();
      console.log("Dummy user created.");
    }

    const problemsToSeed = [
      {
        title: "addition of Two Numbers",
        description: "Given two integers a and b, return their sum.",
        difficulty: "easy",
        tags: ["math"],
        visibleTestCases: [
          { input: "1 2", output: "3\n", explanation: "1 + 2 = 3" },
        ],
        hiddenTestCases: [
          { input: "-5 7", output: "2\n", explanation: "-5 + 7 = 2" },
          { input: "1000 2000", output: "3000\n", explanation: "1000 + 2000 = 3000" },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint add(int a, int b) {\n    // write your code here\n    return a + b;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int a, b;\n    cin >> a >> b;\n    cout << add(a, b) << "\\n";\n    return 0;\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int a, b;\n    cin >> a >> b;\n    cout << (a + b) << "\\n";\n    return 0;\n}`,
          },
        ],
      },
      {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        difficulty: "easy",
        tags: ["Array", "Hash Table"],
        visibleTestCases: [
          { input: "[2,7,11,15], 9", output: "[0,1]\n", explanation: "nums[0] + nums[1] == 9, so we return [0, 1]." },
        ],
        hiddenTestCases: [
          { input: "[3,2,4], 6", output: "[1,2]\n", explanation: "nums[1] (2) + nums[2] (4) = 6, so we return [1,2]." },
          { input: "[3,3], 6", output: "[0,1]\n", explanation: "nums[0] (3) + nums[1] (3) = 6, so we return [0,1]." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Write your code here\n};\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const numMap = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (numMap.has(complement)) {\n            return [numMap.get(complement), i];\n        }\n        numMap.set(nums[i], i);\n    }\n    return [];\n};\n`,
          },
        ],
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "medium",
        tags: ["String", "Sliding Window"],
        visibleTestCases: [
          { input: "abcabcbb", output: "3\n", explanation: "The answer is 'abc', with the length of 3." },
        ],
        hiddenTestCases: [
          { input: "bbbbb", output: "1\n", explanation: "The longest substring without repeating characters is 'b', with length 1." },
          { input: "pwwkew", output: "3\n", explanation: "The longest substring without repeating characters is 'wke', with length 3. Note that 'pwke' is a subsequence and not a substring." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your code here\n        pass\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in char_set:\n                char_set.remove(s[l])\n                l += 1\n            char_set.add(s[r])\n            res = max(res, r - l + 1)\n        return res\n`,
          },
        ],
      },
      {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        difficulty: "hard",
        tags: ["Array", "Divide and Conquer"],
        visibleTestCases: [
          { input: "[1,3], [2]", output: "2.00000\n", explanation: "merged array = [1,2,3] and median is 2." },
        ],
        hiddenTestCases: [
          { input: "[1,2], [3,4]", output: "2.50000\n", explanation: "merged array = [1,2,3,4] and median is (2+3)/2 = 2.5." },
          { input: "[0,0], [0,0]", output: "0.00000\n", explanation: "merged array = [0,0,0,0] and median is (0+0)/2 = 0." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Write your code here\n    }\n};\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int m = nums1.size();\n        int n = nums2.size();\n        int totalLength = m + n;\n\n        if (totalLength % 2 == 1) {\n            return findKthElement(nums1, nums2, totalLength / 2 + 1);\n        } else {\n            double mid1 = findKthElement(nums1, nums2, totalLength / 2);\n            double mid2 = findKthElement(nums1, nums2, totalLength / 2 + 1);\n            return (mid1 + mid2) / 2.0;\n        }\n    }\n\nprivate:\n    double findKthElement(const vector<int>& nums1, const vector<int>& nums2, int k) {\n        int m = nums1.size();\n        int n = nums2.size();\n        int i = 0, j = 0;\n\n        while (true) {\n            if (i == m) return nums2[j + k - 1];\n            if (j == n) return nums1[i + k - 1];\n            if (k == 1) return min(nums1[i], nums2[j]);\n\n            int mid = k / 2;\n            int newI = min(i + mid, m) - 1;\n            int newJ = min(j + mid, n) - 1;\n\n            if (nums1[newI] <= nums2[newJ]) {\n                k -= (newI - i + 1);\n                i = newI + 1;\n            } else {\n                k -= (newJ - j + 1);\n                j = newJ + 1;\n            }\n        }\n    }\n};\n`,
          },
        ],
      },
      {
        title: "Container With Most Water",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        difficulty: "medium",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[1,8,6,2,5,4,8,3,7]", output: "49\n", explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49. (Pair 8 and 7, min height 7, distance 7, 7*7=49)" },
        ],
        hiddenTestCases: [
          { input: "[1,1]", output: "1\n", explanation: "With heights [1,1], the max area is min(1,1) * (1-0) = 1." },
          { input: "[4,3,2,1,4]", output: "16\n", explanation: "With heights [4,3,2,1,4], the max area is min(4,4) * (4-0) = 16." },
        ],
        starterCode: [
          {
            language: "java",
            initialCode: `class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n        return 0;\n    }\n}\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "java",
            completeCode: `class Solution {\n    public int maxArea(int[] height) {\n        int maxArea = 0;\n        int left = 0;\n        int right = height.length - 1;\n\n        while (left < right) {\n            int currentArea = Math.min(height[left], height[right]) * (right - left);\n            maxArea = Math.max(maxArea, currentArea);\n\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxArea;\n    }\n}\n`,
          },
        ],
      },
      {
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        difficulty: "easy",
        tags: ["String", "Stack"],
        visibleTestCases: [
          { input: "()", output: "true\n", explanation: "The parentheses are correctly matched." },
        ],
        hiddenTestCases: [
          { input: "()[]{}", output: "true\n", explanation: "All opening brackets have corresponding closing brackets in the correct order." },
          { input: "(]", output: "false\n", explanation: "An opening parenthesis is closed by a square bracket, which is incorrect." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    // Write your code here\n};\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    const stack = [];\n    const map = {\n        "(": ")",\n        "{": "}",\n        "[": "]",\n    };\n\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (map[char]) {\n            stack.push(char);\n        } else {\n            if (stack.length === 0) {\n                return false;\n            }\n            const lastOpen = stack.pop();\n            if (map[lastOpen] !== char) {\n                return false;\n            }\n        }\n    }\n    return stack.length === 0;\n};\n`,
          },
        ],
      },
      {
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
        difficulty: "easy",
        tags: ["Linked List", "Recursion"],
        visibleTestCases: [
          { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]\n", explanation: "The nodes from both sorted lists are merged into a single sorted list." },
        ],
        hiddenTestCases: [
          { input: "list1 = [], list2 = []", output: "[]\n", explanation: "Merging two empty lists results in an empty list." },
          { input: "list1 = [], list2 = [0]", output: "[0]\n", explanation: "Merging an empty list with a list containing [0] results in [0]." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your code here\n    }\n};\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        if (!list1) return list2;\n        if (!list2) return list1;\n\n        if (list1->val <= list2->val) {\n            list1->next = mergeTwoLists(list1->next, list2);\n            return list1;\n        } else {\n            list2->next = mergeTwoLists(list1, list2->next);\n            return list2;\n        }\n    }\n};\n`,
          },
        ],
      },
      {
        title: "Longest Palindromic Substring",
        description: "Given a string s, return the longest palindromic substring in s.",
        difficulty: "medium",
        tags: ["String", "Dynamic Programming"],
        visibleTestCases: [
          { input: "babad", output: "bab\n", explanation: "'aba' is also a valid answer. Both 'bab' and 'aba' are palindromes and have the same maximal length." },
        ],
        hiddenTestCases: [
          { input: "cbbd", output: "bb\n", explanation: "The longest palindromic substring is 'bb'." },
          { input: "a", output: "a\n", explanation: "A single character string is a palindrome." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def longestPalindrome(self, s: str) -> int:\n        # Write your code here\n        pass\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        if not s: return ""\n        \n        res = ""\n        resLen = 0\n\n        for i in range(len(s)):\n            # odd length palindromes\n            l, r = i, i\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if (r - l + 1) > resLen:\n                    res = s[l : r + 1]\n                    resLen = r - l + 1\n                l -= 1\n                r += 1\n            \n            # even length palindromes\n            l, r = i, i + 1\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if (r - l + 1) > resLen:\n                    res = s[l : r + 1]\n                    resLen = r - l + 1\n                l -= 1\n                r += 1\n        return res\n`,
          },
        ],
      },
      {
        title: "Two Sum II - Input Array Is Sorted",
        description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.",
        difficulty: "easy",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[2,7,11,15], 9", output: "[1,2]\n", explanation: "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2]." },
        ],
        hiddenTestCases: [
          { input: "[2,3,4], 6", output: "[1,3]\n", explanation: "The sum of numbers[0] (2) and numbers[2] (4) is 6. Indices are 1-based." },
          { input: "[-1,0], -1", output: "[1,2]\n", explanation: "The sum of numbers[0] (-1) and numbers[1] (0) is -1. Indices are 1-based." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        // Write your code here\n    }\n};\n`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        int left = 0;\n        int right = numbers.size() - 1;\n\n        while (left < right) {\n            int sum = numbers[left] + numbers[right];\n            if (sum == target) {\n                return {left + 1, right + 1};\n            } else if (sum < target) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return {}; // Should not reach here if a solution always exists\n    }\n};\n`,
          },
        ],
      },
    ];

    for (const problemData of problemsToSeed) {
      const problem = new Problem(problemData);
      await problem.save();
      console.log(`Problem "${problem.title}" saved.`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};