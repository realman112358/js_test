/**
 * Created by jw_hu on 2014/11/7.
 */
var numbers = [];
var score = 0;
$(init);
function init(){
    init_page();
}
function init_page(){
    console.log('init_page');
    for(var i=0; i< 4; i++) {
        var line = [];
        for (var j = 0; j < 4; j++) {
            line.push(0);
        }
        numbers.push(line);
    }
    var game_board = $("#game_board");
    for(var i=0; i< 4; i++){
        for(var j=0; j<4; j++){
            var grid = $("<div></div>").addClass('grid').attr('id','grid'+i+j);
            grid.css('top', get_top(i));
            grid.css('left', get_top(j));
            game_board.append(grid);
        }
    }
    $('#new_game_button').on('click',function(){
        init_game();
    });
    init_game();
}
function init_game(){
    score = 0;
    new_number();
    new_number();
}
function new_number(){
    if(game_over()){
        return false;
    }
    var x;
    var y;
    while(true) {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);
        if(numbers[x][y] == 0){
             break;
        }
    }
    var value = Math.random()<0.5?2:4;
    numbers[x][y] = value;
    show_number_animation(x, y, value);
    return true;
}
function get_top(i){
    return  20+120*i;
}
function get_number_back_color(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";
}
function get_number_color(number){

}
function update_board(){
    $('#socre').text(score);
    $('.number').remove();
    var game_board = $("#game_board");
    for(var i=0; i<4;i++){
        for(var j=0; j<4; j++){
            var number = $('<div></div>').addClass('number').attr('id','number'+i+j);
            game_board.append(number);
            number.css('top', get_top(i)+50);
            number.css('left',get_top(j)+50);
            if(numbers[i][j] == 0){
                number.css('width', '0px');
                number.css('height', '0px');
            }else{
                number.css('width', '100px');
                number.css('height', '100px');
                number.css('color',get_number_color(numbers[i][j]));
                number.css('color',get_number_back_color(numbers[i][j]));
                number.text(board[i][j]);
            }
        }
    }

}
function game_over(){
    for(var i =0; i< numbers.length; i++){
        for(var j =0; j< numbers.length; j++){
            if(numbers[i][j] !== 0){
               return false;
            }
        }
    }
    return true;
}
