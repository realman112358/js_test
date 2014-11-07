/**
 *
 * Created by jw_hu on 2014/11/4.
 */
var fs = require('fs');
/*var datas = [];
for(var i=0; i<10; i++){
    var fileData = {};
    fileData.name = i+'.dat';
    fileData.data = i;
    datas.push(fileData);
}
datas.forEach(function(element){
    fs.writeFileSync(element.name, element.data);
});
*/
var string = "";
for(var i=0; i< 100*100*100;i++){
    for(var j=1; j<10; j++) {
        string = string + j;
    }
}
fs.writeFileSync('data.dat', string);
