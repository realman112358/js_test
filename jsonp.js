/**
 *
 * Created by wg on 14/10/25.
 */
$(init());
function init(){
    console.log("begin");
    /*$.getJSON("http://localhost/test/jsonp.php?q=fuck&callback=?",function(data){
        //alert(data.a);
    });
    */
    //$.post("http://localhost/php_test/test.php", back);
    setTimeout(change, 1000*3);
}
function back(data){
    alert(data);
}
function change(){
    $('#test').html(456);
}
