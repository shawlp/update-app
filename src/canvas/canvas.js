import React, { Component, Fragment } from 'react';

let ctx;
export default class Canvas extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');

            //  绘制矩形
            // ctx.fillStyle = 'rgb(200,0,0)';
            // ctx.strokeStyle ='orange';
            // ctx.fillRect(10, 10, 55, 50);

            // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            // ctx.fillRect(30, 30, 55, 50);
            // ctx.fillRect(25, 25, 100, 100); // 绘制矩形
            // ctx.clearRect(45, 45, 60, 60); // 清除指定矩形区域，让这部分完全透明
            // ctx.strokeRect(50, 50, 50, 50); // 绘制矩形边框

            // 绘制三角形
            // ctx.beginPath(); // 新建一条路径
            // ctx.moveTo(50, 50); // 设置起点
            // ctx.lineTo(25, 75); // 绘制直线
            // ctx.lineTo(75, 75);
            // ctx.fill(); // 填充路径

            // 笑脸
            // ctx.beginPath();
            // ctx.arc(75,75,50,0,Math.PI*2,true); // 绘制
            // ctx.moveTo(110,75);
            // ctx.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
            // ctx.moveTo(65,65);
            // ctx.arc(60,65,5,0,Math.PI*2,true);  // 左眼
            // ctx.moveTo(95,65);
            // ctx.arc(90,65,5,0,Math.PI*2,true);  // 右眼
            // ctx.stroke();

            // 描边三角形
            // ctx.beginPath();
            // ctx.moveTo(125, 125);
            // ctx.lineTo(125, 45);
            // ctx.lineTo(45, 125);
            // ctx.closePath(); // 闭合路径
            // ctx.stroke(); // 绘制图形轮廓 

            // 画圆
            // ctx.beginPath();
            // ctx.strokeStyle = 'blue';
            // ctx.arc(75, 75, 50, 0, Math.PI*2, false);
            // ctx.stroke();

            // 在canvas画布上放置背景图片
            let image = new Image();
            image.onload = function() {
                // 图片装载完再调用drawImage
                ctx.drawImage(image,0,0);   
                ctx.beginPath();
                ctx.moveTo(30,96);
                ctx.lineTo(70,66);
                ctx.lineTo(180,15);
                ctx.stroke();
            } 
            image.src = 'https://mdn.mozillademos.org/files/206/Canvas_backdrop.png';
        }
    }
    render() {
        return <Fragment>
            <canvas id='tutorial' width='300' height='300' className='canvas-wrapper'></canvas>     
        </Fragment>
    }
}