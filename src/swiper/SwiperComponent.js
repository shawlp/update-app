import React, { Component, Fragment } from 'react';
import './swiper.min.css';
import './swiper.css';
import Swiper from 'swiper';

export default class SwiperComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let mySwiper = new Swiper('.swiper-container', {
            // direction: 'vertical', // 设置滑动是水平方向
            slidesPerView: 4, // 设置slider容器能够同时显示的slides数量
            spaceBetween: 15, // slider之间的间距为15，slide会等分距离
            slidesPerGroup: 1, // 定义slides的数量多少为一组    
            navigation: { // 定义左右导航按钮
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }  
        });              
    }  
    render() { 
        return <Fragment>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">slide1</div>
                    <div className="swiper-slide">slide2</div>
                    <div className="swiper-slide">slide3</div>
                    <div className="swiper-slide">slide4</div>
                    <div className="swiper-slide">slide5</div>
                    <div className="swiper-slide">slide6</div>
                    <div className="swiper-slide">slide7</div>
                    <div className="swiper-slide">slide8</div>
                    <div className="swiper-slide">slide9</div>
                    <div className="swiper-slide">slide10</div>                     
                </div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </Fragment>
    }   
}  