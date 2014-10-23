/**
 *
 * Created by wg on 14/10/23.
 */
var main = require("../test");
var should = require("should");
describe('test/main.test.js', function(){
    it('should be', function(){
        main.fib(10).should.equal(55);
    });
});
