/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
     if (s.length < 2) {
        return s.length;
    }
    let length = 0;
    var l = 0;
    for(var r = 1; r < s.length; r++){
        var i = s.lastIndexOf(s[r], r-1)//可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置(后一个数值)从后向前搜索。
        if (i >= 0) {
              length = Math.max(length, r-l)
              l = Math.max(l, i + 1)
        }
    }
    return Math.max(length, r - l)
}