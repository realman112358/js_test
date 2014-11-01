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
    $.post("http://localhost/test/cors.php", function(data){
        alert(data);
    });
}
