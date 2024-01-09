/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
	let ans = [nums[0]];
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		let temp = sum + nums[i];
		if (temp > sum) {
			ans = [...ans, nums[i]];
		}
	}
	return ans;
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
