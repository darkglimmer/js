/*Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var digit = -1, val, tmp = 0, list = new ListNode(digit);
    
    while(l1 || l2 || up !==0) {
        digit = (l1 !== null ? l1.val : 0) + (l2 !== null ? l2.val : 0) + tmp;
        
        if (digit >= 10) {
            val = digit % 10;
            tmp = 1;
        } else {
            val = digit;
            tmp = 0;
        }
        if (l1 !== null) {
            l1 = l1.next;
        }
        if (l2 !== null) {
            l2 = l2.next;
        }

        list.next = new ListNode(val);
        list = list.next;

    }
    return list;
};