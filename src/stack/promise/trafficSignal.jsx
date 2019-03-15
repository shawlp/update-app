import React, { Component } from 'react';

export default class TrafficSignal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ['green', 'yellow', 'red'],
            activeIndex: 0
        };
        this.timer = null;
    }
    ligthen(duration, index) {
        let that = this;
        return new Promise(function(resolve, reject){
            setTimeout(() => {
                that.setState({
                    activeIndex: index
                });
                resolve();
            }, duration);
        })
    } 
    async changeIndex() {
        await this.ligthen(3000, 0);
        await this.ligthen(2000, 1);
        await this.ligthen(1000, 2);
        this.changeIndex();    
    }   
    // changeIndex() {
    //     console.time("sort");
    //     let r = this.ligthen(3000, 0);
    //     r.then(() => {
    //         this.setState({
    //             activeIndex: 0
    //         }, () => {
    //             this.ligthen(2000, 1).then((index) => {
    //                 this.setState({
    //                     activeIndex: 1
    //                 }, () => {
    //                     this.ligthen(1000, 2).then((index) => {
    //                         this.setState({
    //                             activeIndex: 2
    //                         }, () => {
    //                             console.timeEnd("sort");
    //                             this.changeIndex();
    //                         })
    //                     });
    //                 })
    //             });
    //         })

    //     })
    // }
    componentDidMount() {
        this.changeIndex();
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        let {colors, activeIndex} = this.state;
        let color = colors[activeIndex];
        return <>
            <div style={{width: '50px', height: '50px', borderRadius: '50%', backgroundColor: `${color}`}}></div>
        </>
    }
}