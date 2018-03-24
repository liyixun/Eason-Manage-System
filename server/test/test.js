/**
 * Created by eason on 17/7/23.
 */
var assert = require('assert');

/**
 * describe 测试套件 test suite 表示一组相关的测试
 * it 测试用例 test case 表示一个单独的测试
 * assert 断言 表示对结果的预期
 */
describe('Array', () => {
  describe('#indexOf()', () =>{
    it('should return -1 when the value is not present', () => {
      assert.equals(-1, [1, 2, 3].indexOf(4));
    });
  });
});