/**
 *
 * Created by WG on 2014/8/28.
 * to test make a special func adder class to add func to normal class
 */
//user is a normal class
function User(){
    this.a = 2;
}
//Func is a FuncHelper class,to make a normal class add method
function Func(){
}
//Func's prototype class, not defined in Func, so every Func only share one FuncStatic object
function FuncStatic(){
    this.init = function(obj){
        obj.b = 1;
        obj.add = function(){
            obj.b ++;
        };
        obj.del = function(){
            obj.b --;
        };
        obj.show = function(){
            console.log(obj.b);
        };
    };
}
Func.prototype = new FuncStatic();
Func.prototype.constructor = Func;
var test = new User();
//"var func = new Func();func.init()" is same with Func.prototype.init()
//var func = new Func();
Func.prototype.init(test);
test.add();
test.add();
test.show();
test.del();
test.show();



