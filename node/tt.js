var images = require("images");

images("1.png")                     //加载图像文件
    .size(400)                          //等比缩放图像到400像素宽
    .save("output.jpg", {               //保存图片到文件,图片质量为50
        quality : 50
    });