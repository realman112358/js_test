/**
 *
 * Created by jw_hu on 2014/11/3.
 */

/* 由于很多时候都会设计到浮点小数的算法，
 * 在JS 中只用普通的parseFlost之类的进信封数据类型转换会使数据失去精度
 * 因此采用先转整数再计算的方式
 * */
//浮点数相加

function dcmAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m)+accMul(arg2,m))/m;
}

//浮点数相减
/*
 * 说明同上面的加法
 * */
function dcmSub(arg1,arg2){
    return dcmAdd(arg1,-arg2);
}

//浮点数取余数
/*
 * 跟据实际中的案例很容易丧失精度，通常做法是同时扩大10000倍，但考虑
 * 跟前有关因此还是采用先转整数再计算
 * */
function  dcmYu(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (accMul(arg1,m)%accMul(arg2,m))/m;
}



/*  除法函数，用来得到精确的除法结果
 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回
 较为精确的除法结果。
 调用：accDiv(arg1,arg2)
 返回值：arg1除以arg2的精确结果
 */
function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length}catch(e){}
    try{t2=arg2.toString().split(".")[1].length}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""))
        r2=Number(arg2.toString().replace(".",""))
        return (r1/r2)*pow(10,t2-t1);
    }
}
/* 乘法函数，用来得到精确的乘法结果
 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 调用：accMul(arg1,arg2)
 返回值：arg1乘以arg2的精确结果
 */
function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}


// 转化成小数, 原函数toDecimal(datavalue)存在的精度问题，因涉及过多屏蔽。
function toDecimal(datevalue){
    if(datevalue.indexOf('%') != -1){
        datevalue = datevalue.replace(/%/g,'');
        if(datevalue.indexOf(',') != -1) {
            datevalue = datevalue.replace(/,/g,'');
        }
        // 除100精度在原有基础上增加2位。
        var decimal = (datevalue.indexOf('.') == -1) ? 0 : (datevalue.length - datevalue.indexOf('.') - 1);
        datevalue = accDiv(datevalue, 100).toFixed(decimal + 2);
//     alert("toDecimal: " + datevalue);
    } else {
        if(datevalue.indexOf(',') != -1){
            datevalue = datevalue.replace(/,/g,'');
        }
    }
    return datevalue;
}

// 将小数转换为百分数。
function toPercentFormat(datevalue) {
    var aa = accMul(datevalue, 100);
    return "" + aa + "%";
}
console.log(dcmSub(0.111111, 0.00000009));