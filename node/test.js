/**
 *
 * Created by wg on 14/10/20.
 */
var fib = function(n){
    if( n === 0){
        return 0;
    }
    if(n === 1){
        return 1;
    }
    return fib(n-1)+fib(n-2);
};
if(require.main === module){
    var n = Number(process.argv[2]);
    console.log('fib('+n+') is:'+fib(n));
}

exports.fib = fib;
