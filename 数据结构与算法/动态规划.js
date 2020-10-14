// 不问具体，只问最值可以考虑动态规划，精髓就是倒推，但是写的时候不是递归，而是从头开始迭代，是一个自底向上的过程
// 递归：自上而下 + 未知到已知 + 关系式一样
// 动态：自底向上 + 已知到未知 + 关系式一样
// 遇到最值问题，一定要在可能的解题方案中给动态优化留下一席之地
// 从结果倒推关系式，递归转迭代，自下而上
// 动态规划和分治的思想不同，分治的子问题是独立的，动态规划的子问题是依赖的



// 爬楼梯
function calcFloor(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return calcFloor(n - 1) + calcFloor(n - 2);
}
let rs = calcFloor(10);
console.log(rs);
// 但是这个解法问题比较大，丢进 OJ 会直接超时
// 随着我们递归层级的加深，重复计算的问题会越来越明显
function calcFloor2(n) {
  let cache = { 1: 1, 2: 2 };
  function help(n) {
    if (cache[n]) return cache[n];
    cache[n] = calcFloor(n - 1) + calcFloor(n - 2);
    return cache[n];
  }
  return help(n);
}
rs = calcFloor2(10);
console.log(rs);
// 但是上面这个只是优化后端递归，并不是动态规划
function calcFloor3(n) {
  let cache = { 1: 1, 2: 2 }; // 重叠子问题
  for(let i = 3; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2]; // 最优子结构：这玩意儿叫状态转移方程
  }
  return cache[n];
}
rs = calcFloor3(10);
console.log(rs);





// 硬币组合
function coinChange(coins, money) {
  let cache = { 0: 0 };
  for(let i = 1; i <= money; i++) { // 一块钱一块钱的迭代
    let min = Infinity; // 假设当前的 curMoney 初始值为无穷大
    coins.forEach(coin => {
      // 基于上面的每一块钱都要遍历一次 coins，并从中取出最小值
      // 因为每一块钱都可以基于每个硬币来组合
      if (i - coin >= 0) min = Math.min(cache[i - coin] + 1, min);
    })
    if (min !== Infinity) cache[i] = min;
  }
  return cache[money] || -1;
}

let coins = [1, 2, 5];
let amount = 11;
let rs1 = coinChange(coins, amount);
console.log(rs1);

coins = [2];
amount = 3;
rs1 = coinChange(coins, amount);
console.log(rs1);






// 01背包问题
// 有 m 个物品
// 物品体积 volumes = []
// 物品价值 values = []
// 现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？(注：每种物品都只有1件)
function getBag(m, c, volumes, values) {
  const dp = [new Array(c + 1).fill(0)]
  for(let n = 1; n <= m; n++) {
    dp[n] = new Array(c + 1).fill(0)
    for(let volume = volumes[n]; volume <= c; volume++) {
      dp[n][volume] = Math.max(dp[n - 1][volume], (dp[n - 1][volume - volumes[n]] + values[n]))
    }
  }
  console.log(dp)
  return dp[m][c]
}
let rs2 = getBag(5, 10, [0,2,2,6,5,4], [0,6,3,5,4,6]) // 加上 0 是为了防止越界
console.log(rs2) // 15
// 如果要想知道具体是哪些物品，我们可以站在表格的右下角来进行倒推，比如当前右下角的格子为 15，如果上一格的值和 15 相同，说明不需要最后一个物品，以此类推
// 上面01背包问题的时间复杂度和空间复杂度都是O(n*V），我们可以对空间复杂度进行优化
function getBag2(m, c, volumes, values) {
  const dp = new Array(c + 1).fill(0)
  for(let n = 1; n <= m; n++) {
    let volume = c;
    while(volume >= volumes[n]) { // 因为我们计算当前最值只需要依据上一排的数据，所以我们可以把二维数组降为成一位数组，也叫滚动数组，但是要从后往前遍历，否则新值会覆盖旧值
      dp[volume] = Math.max(dp[volume], dp[volume - volumes[n]] + values[n])
      volume--
    }
  }
  console.log(dp)
  return dp[c]
}
rs2 = getBag2(5, 10, [0,2,2,6,5,4], [0,6,3,5,4,6])
console.log(rs2) // 15






// 最长上升子序列：https://alchemist-al.com/algorithms/longest-increasing-subsequence
// 基本思路：以每个元素为子序列末位元素，向前看，和之前的元素一一比较
function longUpStr(arr) {
  let lens = new Array(arr.length).fill(1)
  for(let i = 1; i < arr.length; i++) {
    for(let j = 0; j < i; j++) { // 以每个元素为子序列末位元素，向前看
      if(arr[i] > arr[j]) {) { // 若遇到了一个比当前元素小的值，则意味着遇到了一个可以延长的上升子序列，故更新当前元素索引位对应的状态
        lens[i] = Math.max(lens[i], lens[j] + 1)
      }
    }
  }
  console.log(lens)
  return Math.max(...lens) // 当然也可以直接声明一个变量时刻保存最大值
}
let rs3 = longUpStr([6,7,0,1,9,3,5,8,4])
console.log(rs3) // 5
rs3 = longUpStr([10,9,2,5,3,7,101,18])
console.log(rs3) // 4








// 最长回文子串
