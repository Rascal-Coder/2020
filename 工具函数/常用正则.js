// 以下是一些正则实操

// reg.test(str) // 返回布尔值
// str.match(reg) // 获取匹配结果，未匹配返回 null
// 如果我们的正则表达式尾部有 g 标志，match()会返回与完整正则表达式匹配的所有结果，但不会返回捕获组
// 如果我们没有使用g标志，match()就会返回第一个完整匹配（作为数组的第0项）及其相关的捕获组（作为数组的第1及第1+项）。

// 做正则题目的步骤：
// 1、是否用 test
// 2、是否是全局 g


// 字符串转数字
// 示例 1:
// 输入: "42"
// 输出: 42
// 示例 2:
// 输入: " -42"
// 输出: -42
// 示例 3: 输入: "4193 with words"
// 输出: 4193
// 示例 4: 输入: "words and 987"
// 输出: 0
let reg = /\s*([-\+]?[0-9]+).*/g
let str = ' -42'
let rs = str.match(reg)
console.log(rs)
