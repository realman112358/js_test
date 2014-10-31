/**
 *
 * Created by jw_hu on 2014/10/24.
 */
var Animal = function(){
    this.a = 1;
};
Animal.prototype.b = 2;
var animal = new Animal();
console.log(animal);
function allProp(obj){
    var props = {};
    while(obj){
        Object.getOwnPropertyNames(obj).forEach(function(p){
            props[p] = true;
        });
        obj = Object.getPrototypeOf(obj);
    }
    return Object.getOwnPropertyNames(props);
}
console.log(allProp(animal));
