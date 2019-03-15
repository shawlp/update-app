import React, { Component } from 'react';
import './ball.css';

export default class Ball extends Component {
    constructor(props) {
        super(props);
        this.ref1 = React.createRef(); 
        this.ref2 = React.createRef(); 
        this.ref3 = React.createRef(); 
    }
    componentDidMount() { 
        this.doSport();
    }
    // doSport() {
    //     // 1.回调
    //     // this.move(this.ref1, 100, () => {
    //     //     this.move(this.ref2, 100, () => {
    //     //         this.move(this.ref3, 100, () => {
    //     //             console.log('stop sport');
    //     //         })
    //     //     })
    //     // })
    //     // 2.promise
    //     // this.move(this.ref1, 100).then(() => {
    //     //     this.move(this.ref2, 100).then(() => {
    //     //         this.move(this.ref3, 100).then(() => {
    //     //             console.log('stop sport');
    //     //         })
    //     //     })
    //     // });
    // } 
    // 3.generator
    // *doSport() {
    //     yield this.move(this.ref1, 100);
    //     yield this.move(this.ref2, 100);
    //     yield this.move(this.ref3, 100);
    // } 
    // co:自动执行完迭代器
    // co(it) {
    //     return new Promise(function(resolve, reject) {
    //         function next(d) {
    //             let { value, done } = it.next(d);
    //             if (!done) {
    //                 value.then(function(data) {
    //                     next(data)
    //                 }, reject);
    //             } else {
    //                 resolve(value)
    //             }
    //         } 
    //         next()   
    //     })
    // }
    // co(doSport()).then(function() {
    //     alert('ok');
    // })
    // 4.async/await
    async doSport() {
        await this.move(this.ref1, 100);
        await this.move(this.ref2, 100);
        await this.move(this.ref3, 100);
    }
    move(ele, target, callback) {
        let that = this;
        return new Promise(function(resolve, reject){
            let count = 0;
            let timer = setInterval(() => {
                if (count < target) {
                    ele.current.style.transform = `translateX(${++count}px)`;
                } else {
                    clearInterval(timer);
                    resolve();
                    callback && callback();
                }
            }, 4);
        })
    }
    render() {
        return <>
            <div className="ball" ref={this.ref1}></div>
            <div className="ball" ref={this.ref2}></div>
            <div className="ball" ref={this.ref3}></div>
        </>
    }
}