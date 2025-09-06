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
    // You might want to remove this line if you want to add new problems without clearing existing ones
    // await Problem.deleteMany({});
    // console.log("Existing problems cleared.");

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
        title: "Reverse Integer",
        description: "Given a 32-bit signed integer, reverse digits of an integer. If reversing x causes the value to go outside the 32-bit signed integer range, return 0.",
        difficulty: "easy",
        tags: ["Math"],
        visibleTestCases: [
          { input: "123", output: "321\n", explanation: "Reverse of 123 is 321." },
        ],
        hiddenTestCases: [
          { input: "-123", output: "-321\n", explanation: "Reverse of -123 is -321." },
          { input: "120", output: "21\n", explanation: "Reverse of 120 is 21." },
          { input: "0", output: "0\n", explanation: "Reverse of 0 is 0." },
          { input: "2147483647", output: "0\n", explanation: "Overflow, return 0." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    int reverse(int x) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    int reverse(int x) {\n        long long rev = 0;\n        while(x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;\n            if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Palindrome Number",
        description: "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
        difficulty: "easy",
        tags: ["Math"],
        visibleTestCases: [
          { input: "121", output: "true\n", explanation: "121 reads as 121 from left to right and from right to left." },
        ],
        hiddenTestCases: [
          { input: "-121", output: "false\n", explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome." },
          { input: "10", output: "false\n", explanation: "Reads 01 from right to left. Therefore it is not a palindrome." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        if x < 0 or (x % 10 == 0 and x != 0): return False\n        reverted_number = 0\n        while x > reverted_number:\n            reverted_number = reverted_number * 10 + x % 10\n            x //= 10\n        return x == reverted_number or x == reverted_number // 10`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Roman to Integer",
        description: "Given a Roman numeral, convert it to an integer. Input is guaranteed to be within the range [1, 3999].",
        difficulty: "easy",
        tags: ["Hash Table", "String"],
        visibleTestCases: [
          { input: "III", output: "3\n", explanation: "III = 3." },
        ],
        hiddenTestCases: [
          { input: "IV", output: "4\n", explanation: "IV = 4." },
          { input: "IX", output: "9\n", explanation: "IX = 9." },
          { input: "LVIII", output: "58\n", explanation: "L = 50, V=5, III=3." },
          { input: "MCMXCIV", output: "1994\n", explanation: "M = 1000, CM = 900, XC = 90 and IV = 4." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `var romanToInt = function(s) {\n    \n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `var romanToInt = function(s) {\n    const romanMap = new Map([\n        ['I', 1],\n        ['V', 5],\n        ['X', 10],\n        ['L', 50],\n        ['C', 100],\n        ['D', 500],\n        ['M', 1000],\n    ]);\n    let result = 0;\n    for (let i = 0; i < s.length; i++) {\n        const current = romanMap.get(s[i]);\n        const next = romanMap.get(s[i + 1]);\n        if (next && current < next) {\n            result += (next - current);\n            i++;\n        } else {\n            result += current;\n        }\n    }\n    return result;\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Longest Common Prefix",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string ''.",
        difficulty: "easy",
        tags: ["String"],
        visibleTestCases: [
          { input: `["flower","flow","flight"]`, output: "fl\n", explanation: "The longest common prefix is 'fl'." },
        ],
        hiddenTestCases: [
          { input: `["dog","racecar","car"]`, output: "\n", explanation: "There is no common prefix among the input strings." },
          { input: `["a"]`, output: "a\n", explanation: "Single string, prefix is itself." },
          { input: `[""]`, output: "\n", explanation: "Empty string in array." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        if (strs.empty()) return "";\n        string prefix = strs[0];\n        for (int i = 1; i < strs.size(); ++i) {\n            while (strs[i].find(prefix) != 0) {\n                prefix = prefix.substr(0, prefix.length() - 1);\n                if (prefix.empty()) return "";\n            }\n        }\n        return prefix;\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Remove Duplicates from Sorted Array",
        description: "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length. Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.",
        difficulty: "easy",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[1,1,2]", output: "2, nums = [1,2,_]\n", explanation: "Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the returned length." },
        ],
        hiddenTestCases: [
          { input: "[0,0,1,1,1,2,2,3,3,4]", output: "5, nums = [0,1,2,3,4,_,_,_,_,_]\n", explanation: "Length should be 5." },
          { input: "[]", output: "0, nums = []\n", explanation: "Empty array." },
          { input: "[1,2,3]", output: "3, nums = [1,2,3]\n", explanation: "No duplicates." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        if not nums: return 0\n        i = 0\n        for j in range(1, len(nums)):\n            if nums[j] != nums[i]:\n                i += 1\n                nums[i] = nums[j]\n        return i + 1`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Remove Element",
        description: "Given an array nums and a value val, remove all instances of that value in-place and return the new length. Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.",
        difficulty: "easy",
        tags: ["Array", "Two Pointers"],
        visibleTestCases: [
          { input: "[3,2,2,3], 3", output: "2, nums = [2,2,_,_]\n", explanation: "Your function should return length = 2, with the first two elements of nums being 2. It doesn't matter what you leave beyond the returned length." },
        ],
        hiddenTestCases: [
          { input: "[0,1,2,2,3,0,4,2], 2", output: "5, nums = [0,1,4,0,3,_,_,_]\n", explanation: "Length should be 5." },
          { input: "[], 1", output: "0, nums = []\n", explanation: "Empty array." },
          { input: "[1], 1", output: "0, nums = []\n", explanation: "All elements removed." },
        ],
        starterCode: [
          {
            language: "java",
            initialCode: `class Solution {\n    public int removeElement(int[] nums, int val) {\n        return 0;\n    }\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "java",
            completeCode: `class Solution {\n    public int removeElement(int[] nums, int val) {\n        int i = 0;\n        for (int j = 0; j < nums.length; j++) {\n            if (nums[j] != val) {\n                nums[i] = nums[j];\n                i++;\n            }\n        }\n        return i;\n    }\n}`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Implement strStr()",
        description: "Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack. For the purpose of this problem, when needle is an empty string, return 0.",
        difficulty: "easy",
        tags: ["String", "Two Pointers"],
        visibleTestCases: [
          { input: `"hello", "ll"`, output: "2\n", explanation: "The first occurrence of 'll' is at index 2." },
        ],
        hiddenTestCases: [
          { input: `"aaaaa", "bba"`, output: "-1\n", explanation: "No occurrence." },
          { input: `"", ""`, output: "0\n", explanation: "Empty needle, return 0." },
          { input: `"abc", "c"`, output: "2\n", explanation: "Occurrence at end." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    int strStr(string haystack, string needle) {\n        if (needle.empty()) return 0;\n        if (haystack.length() < needle.length()) return -1;\n        for (int i = 0; i <= (int)haystack.length() - (int)needle.length(); ++i) {\n            if (haystack.substr(i, needle.length()) == needle) {\n                return i;\n            }\n        }\n        return -1;\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Search Insert Position",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        difficulty: "easy",
        tags: ["Array", "Binary Search"],
        visibleTestCases: [
          { input: "[1,3,5,6], 5", output: "2\n", explanation: "Target 5 is found at index 2." },
        ],
        hiddenTestCases: [
          { input: "[1,3,5,6], 2", output: "1\n", explanation: "Target 2 would be inserted at index 1." },
          { input: "[1,3,5,6], 7", output: "4\n", explanation: "Target 7 would be inserted at index 4." },
          { input: "[1,3,5,6], 0", output: "0\n", explanation: "Target 0 would be inserted at index 0." },
        ],
        starterCode: [
          {
            language: "java",
            initialCode: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        return 0;\n    }\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "java",
            completeCode: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return left;\n    }\n}`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Maximum Subarray",
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        difficulty: "easy",
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        visibleTestCases: [
          { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6\n", explanation: "[4,-1,2,1] has the largest sum = 6." },
        ],
        hiddenTestCases: [
          { input: "[1]", output: "1\n", explanation: "Single element." },
          { input: "[5,4,-1,7,8]", output: "23\n", explanation: "All elements." },
          { input: "[-2,-1]", output: "-1\n", explanation: "Only negative numbers." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_so_far = nums[0]\n        current_max = nums[0]\n        for i in range(1, len(nums)):\n            current_max = max(nums[i], current_max + nums[i])\n            max_so_far = max(max_so_far, current_max)\n        return max_so_far`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Length of Last Word",
        description: "Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.",
        difficulty: "easy",
        tags: ["String"],
        visibleTestCases: [
          { input: `"Hello World"`, output: "5\n", explanation: "The last word is 'World' with length 5." },
        ],
        hiddenTestCases: [
          { input: `"   fly me   to   the moon  "`, output: "4\n", explanation: "The last word is 'moon' with length 4." },
          { input: `"luffy is still joyboy"`, output: "6\n", explanation: "The last word is 'joyboy' with length 6." },
          { input: `""`, output: "0\n", explanation: "Empty string." },
          { input: `"a"`, output: "1\n", explanation: "Single word." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `var lengthOfLastWord = function(s) {\n    \n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `var lengthOfLastWord = function(s) {\n    s = s.trim();\n    if (s.length === 0) return 0;\n    let lastSpaceIndex = s.lastIndexOf(' ');\n    return s.length - 1 - lastSpaceIndex;\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Plus One",
        description: "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zeros, except for the number 0 itself. Increment the large integer by one and return the resulting array of digits.",
        difficulty: "easy",
        tags: ["Array", "Math"],
        visibleTestCases: [
          { input: "[1,2,3]", output: "[1,2,4]\n", explanation: "The array represents the integer 123. Incrementing by one gives 123 + 1 = 124. Thus, the result should be [1,2,4]." },
        ],
        hiddenTestCases: [
          { input: "[4,3,2,1]", output: "[4,3,2,2]\n", explanation: "The array represents the integer 4321. Incrementing by one gives 4321 + 1 = 4322. Thus, the result should be [4,3,2,2]." },
          { input: "[9]", output: "[1,0]\n", explanation: "The array represents the integer 9. Incrementing by one gives 9 + 1 = 10. Thus, the result should be [1,0]." },
          { input: "[9,9]", output: "[1,0,0]\n", explanation: "The array represents the integer 99. Incrementing by one gives 99 + 1 = 100. Thus, the result should be [1,0,0]." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        int n = digits.size();\n        for (int i = n - 1; i >= 0; --i) {\n            if (digits[i] < 9) {\n                digits[i]++;\n                return digits;\n            }\n            digits[i] = 0;\n        }\n        digits.insert(digits.begin(), 1);\n        return digits;\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Add Binary",
        description: "Given two binary strings a and b, return their sum as a binary string.",
        difficulty: "easy",
        tags: ["Math", "String"],
        visibleTestCases: [
          { input: `"11", "1"`, output: "100\n", explanation: "11 (3) + 1 (1) = 100 (4)." },
        ],
        hiddenTestCases: [
          { input: `"1010", "1011"`, output: "10101\n", explanation: "1010 (10) + 1011 (11) = 10101 (21)." },
          { input: `"0", "0"`, output: "0\n", explanation: "0 + 0 = 0." },
          { input: `"1", "0"`, output: "1\n", explanation: "1 + 0 = 1." },
        ],
        starterCode: [
          {
            language: "java",
            initialCode: `class Solution {\n    public String addBinary(String a, String b) {\n        return "";\n    }\n}`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "java",
            completeCode: `class Solution {\n    public String addBinary(String a, String b) {\n        StringBuilder sb = new StringBuilder();\n        int i = a.length() - 1, j = b.length() - 1, carry = 0;\n        while (i >= 0 || j >= 0 || carry == 1) {\n            int sum = carry;\n            if (i >= 0) sum += a.charAt(i--) - '0';\n            if (j >= 0) sum += b.charAt(j--) - '0';\n            sb.append(sum % 2);\n            carry = sum / 2;\n        }\n        return sb.reverse().toString();\n    }\n}`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Sqrt(x)",
        description: "Given a non-negative integer x, compute and return the square root of x. Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.",
        difficulty: "easy",
        tags: ["Math", "Binary Search"],
        visibleTestCases: [
          { input: "4", output: "2\n", explanation: "sqrt(4) = 2." },
        ],
        hiddenTestCases: [
          { input: "8", output: "2\n", explanation: "sqrt(8) = 2.82842..., truncated to 2." },
          { input: "0", output: "0\n", explanation: "sqrt(0) = 0." },
          { input: "1", output: "1\n", explanation: "sqrt(1) = 1." },
          { input: "2147395599", output: "46340\n", explanation: "Largest possible int." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    int mySqrt(int x) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    int mySqrt(int x) {\n        if (x == 0) return 0;\n        int left = 1, right = x;\n        while (left <= right) {\n            long long mid = left + (right - left) / 2;\n            if (mid * mid == x) return mid;\n            else if (mid * mid < x) left = mid + 1;\n            else right = mid - 1;\n        }\n        return right;\n    }\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Climbing Stairs",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "easy",
        tags: ["Dynamic Programming", "Math"],
        visibleTestCases: [
          { input: "2", output: "2\n", explanation: "There are two ways to climb to the top. 1. 1 step + 1 step 2. 2 steps" },
        ],
        hiddenTestCases: [
          { input: "3", output: "3\n", explanation: "1. 1 + 1 + 1 2. 1 + 2 3. 2 + 1" },
          { input: "1", output: "1\n", explanation: "1. 1 step" },
          { input: "4", output: "5\n", explanation: "Expected 5." },
        ],
        starterCode: [
          {
            language: "javascript",
            initialCode: `var climbStairs = function(n) {\n    \n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "javascript",
            completeCode: `var climbStairs = function(n) {\n    if (n === 1) return 1;\n    let dp = new Array(n + 1);\n    dp[1] = 1;\n    dp[2] = 2;\n    for (let i = 3; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    return dp[n];\n};`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Single Number",
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
        difficulty: "easy",
        tags: ["Array", "Bit Manipulation"],
        visibleTestCases: [
          { input: "[2,2,1]", output: "1\n", explanation: "1 is the single number." },
        ],
        hiddenTestCases: [
          { input: "[4,1,2,1,2]", output: "4\n", explanation: "4 is the single number." },
          { input: "[1]", output: "1\n", explanation: "Single element array." },
        ],
        starterCode: [
          {
            language: "python",
            initialCode: `class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        pass`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "python",
            completeCode: `class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        a = 0\n        for num in nums:\n            a ^= num\n        return a`,
          },
        ],
        constraints: { timeLimit: "1s", memoryLimit: "256MB" },
      },
      {
        title: "Linked List Cycle",
        description: "Given a linked list, determine if it has a cycle in it. To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where tail connects to. If pos is -1, there is no cycle.",
        difficulty: "easy",
        tags: ["Linked List", "Two Pointers"],
        visibleTestCases: [
          { input: "[3,2,0,-4], pos = 1", output: "true\n", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)." },
        ],
        hiddenTestCases: [
          { input: "[1,2], pos = 0", output: "true\n", explanation: "Tail connects to node index 0." },
          { input: "[1], pos = -1", output: "false\n", explanation: "No cycle." },
          { input: "[], pos = -1", output: "false\n", explanation: "Empty list." },
        ],
        starterCode: [
          {
            language: "cpp",
            initialCode: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n    }\n};`,
          },
        ],
        problemCreator: dummyUser._id,
        referenceSolution: [
          {
            language: "cpp",
            completeCode: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        if (!head || !head->next) return false;\n        ListNode *slow = head, *fast = head->next;\n        while (slow != fast) {\n            if (!fast || !fast->next) return false;\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        return true;\n    }\n};`,
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
