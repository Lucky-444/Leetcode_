const mongoose = require("mongoose");
const Problem = require("./models/problem"); // Adjust path if needed
const User = require("./models/user");
const dotenv = require('dotenv');
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
    await Problem.deleteMany({});
    console.log("Existing problems cleared.");

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
            initialCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int a, b;\n    cin >> a >> b;\n    cout << add(a, b) << "\\n";\n    return 0;\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int a, b;\n    cin >> a >> b;\n    cout << (a + b) << "\\n";\n    return 0;\n}`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
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
          { input: "[3,2,4], 6", output: "[1,2]\n", explanation: "nums[1] + nums[2] = 6" },
          { input: "[3,3], 6", output: "[0,1]\n", explanation: "nums[0] + nums[1] = 6" },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `var twoSum = function(nums, target) {\n    // Write your code here\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `var twoSum = function(nums, target) {\n    const numMap = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (numMap.has(complement)) return [numMap.get(complement), i];\n        numMap.set(nums[i], i);\n    }\n    return [];\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        difficulty: "medium",
        tags: ["String", "Sliding Window"],
        visibleTestCases: [
          { input: "abcabcbb", output: "3\n", explanation: "The answer is 'abc', length 3." },
        ],
        hiddenTestCases: [
          { input: "bbbbb", output: "1\n", explanation: "'b', length 1" },
          { input: "pwwkew", output: "3\n", explanation: "'wke', length 3" },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in char_set:\n                char_set.remove(s[l])\n                l += 1\n            char_set.add(s[r])\n            res = max(res, r - l + 1)\n        return res`,
          },
        ],
        constraints: { timeLimit: "2s", memoryLimit: "256MB" },
      },
      {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n, return the median of the two sorted arrays.",
        difficulty: "hard",
        tags: ["Array", "Divide and Conquer"],
        visibleTestCases: [
          { input: "[1,3], [2]", output: "2.00000\n", explanation: "merged = [1,2,3], median 2" },
        ],
        hiddenTestCases: [
          { input: "[1,2], [3,4]", output: "2.50000\n", explanation: "merged = [1,2,3,4], median 2.5" },
          { input: "[0,0], [0,0]", output: "0.00000\n", explanation: "merged = [0,0,0,0], median 0" },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        int m = nums1.size(), n = nums2.size(), total = m+n;\n        if(total%2==1) return findKth(nums1, nums2, total/2+1);\n        return (findKth(nums1,nums2,total/2)+findKth(nums1,nums2,total/2+1))/2.0;\n    }\nprivate:\n    double findKth(const vector<int>& nums1,const vector<int>& nums2,int k){\n        int i=0,j=0;\n        while(true){\n            if(i==nums1.size()) return nums2[j+k-1];\n            if(j==nums2.size()) return nums1[i+k-1];\n            if(k==1) return min(nums1[i],nums2[j]);\n            int mid = k/2;\n            int newI = min(i+mid,(int)nums1.size())-1;\n            int newJ = min(j+mid,(int)nums2.size())-1;\n            if(nums1[newI]<=nums2[newJ]){ k-=(newI-i+1); i=newI+1; }\n            else { k-=(newJ-j+1); j=newJ+1; }\n        }\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "2s", memoryLimit: "512MB" },
      },
      {
        title: "Container With Most Water",
        description: "Find two lines that together with the x-axis form a container, such that it contains the most water.",
        difficulty: "medium",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[1,8,6,2,5,4,8,3,7]", output: "49\n", explanation: "Max area = 49" },
        ],
        hiddenTestCases: [
          { input: "[1,1]", output: "1\n", explanation: "Max area = 1" },
          { input: "[4,3,2,1,4]", output: "16\n", explanation: "Max area = 16" },
        ],
        starterCode: [
          {
            language: "java",
            initialCode: `class Solution {\n    public int maxArea(int[] height) {\n        return 0;\n    }\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "java",
            completeCode: `class Solution {\n    public int maxArea(int[] height) {\n        int maxArea = 0, left = 0, right = height.length-1;\n        while(left<right){\n            maxArea = Math.max(maxArea, Math.min(height[left],height[right])*(right-left));\n            if(height[left]<height[right]) left++; else right--;\n        }\n        return maxArea;\n    }\n}`,
          },
        ],
        constraints: { timeLimit: "2s", memoryLimit: "256MB" },
      },
      {
        title: "Valid Parentheses",
        description: "Determine if the input string containing '(', ')', '{', '}', '[' and ']' is valid.",
        difficulty: "easy",
        tags: ["String", "Stack"],
        visibleTestCases: [
          { input: "()", output: "true\n", explanation: "Correctly matched." },
        ],
        hiddenTestCases: [
          { input: "()[]{}", output: "true\n", explanation: "All brackets matched." },
          { input: "(]", output: "false\n", explanation: "Incorrect closure." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `var isValid = function(s) {\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `var isValid = function(s){\n const stack=[], map={"(":")","{":"}","[":"]"};\n for(const c of s){if(map[c]) stack.push(c); else if(stack.length===0||map[stack.pop()]!==c) return false;}\n return stack.length===0;\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists into one sorted list.",
        difficulty: "easy",
        tags: ["Linked List", "Recursion"],
        visibleTestCases: [
          { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]\n", explanation: "Merged list" },
        ],
        hiddenTestCases: [
          { input: "list1 = [], list2 = []", output: "[]\n", explanation: "Empty lists" },
          { input: "list1 = [], list2 = [0]", output: "[0]\n", explanation: "One empty list" },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* l1,ListNode* l2){\n        if(!l1) return l2; if(!l2) return l1;\n        if(l1->val<=l2->val){l1->next=mergeTwoLists(l1->next,l2);return l1;}\n        else{l2->next=mergeTwoLists(l1,l2->next);return l2;}\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Longest Palindromic Substring",
        description: "Return the longest palindromic substring in s.",
        difficulty: "medium",
        tags: ["String", "Dynamic Programming"],
        visibleTestCases: [
          { input: "babad", output: "bab\n", explanation: "Longest palindrome" },
        ],
        hiddenTestCases: [
          { input: "cbbd", output: "bb\n", explanation: "Longest palindrome" },
          { input: "a", output: "a\n", explanation: "Single character" },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def longestPalindrome(self, s: str) -> int:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def longestPalindrome(self, s:str)->str:\n        res='';resLen=0\n        for i in range(len(s)):\n            l=r=i\n            while l>=0 and r<len(s) and s[l]==s[r]:\n                if(r-l+1)>resLen:res=s[l:r+1];resLen=r-l+1\n                l-=1;r+=1\n            l,r=i,i+1\n            while l>=0 and r<len(s) and s[l]==s[r]:\n                if(r-l+1)>resLen:res=s[l:r+1];resLen=r-l+1\n                l-=1;r+=1\n        return res`,
          },
        ],
        constraints: { timeLimit: "2s", memoryLimit: "256MB" },
      },
      {
        title: "Two Sum II - Input Array Is Sorted",
        description: "Find two numbers in a sorted array that sum up to target.",
        difficulty: "easy",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[2,7,11,15], 9", output: "[1,2]\n", explanation: "Sum = 9" },
        ],
        hiddenTestCases: [
          { input: "[2,3,4], 6", output: "[1,3]\n", explanation: "Sum = 6" },
          { input: "[-1,0], -1", output: "[1,2]\n", explanation: "Sum = -1" },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers,int target){\n        int l=0,r=numbers.size()-1;\n        while(l<r){\n            int sum=numbers[l]+numbers[r];\n            if(sum==target) return {l+1,r+1};\n            else if(sum<target) l++; else r--;\n        }\n        return {};\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
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
