import React, { Component, Fragment } from 'react';

export default class Fragment1 extends Component {
    constructor(props){
        super(props);
        this.items = [
            { index: 0, it: 1111 },
            { index: 1, it: 2222 },
        ]
    }
    render() {
        // 简写
        // return (
        //     <>
        //         <div>first</div>
        //         <div>second</div>
        //         <div>third</div>
        //     </>
        // ); 
        // 不需要添加额外的dom节点
        // return (
        //     <Fragment>
        //         <div>first</div>
        //         <div>second</div>
        //         <div>third</div>
        //     </Fragment>
        // ); 
        // return [
        //     "some text",
        //     <h2>hello</h2>,
        //     "more text",
        //     <h2>world</h2>,
        //     "even more text"
        // ];
        // return (
        //     <Fragment>
        //         some text
        //         <h2>hello</h2>
        //         more text
        //         <h2>world</h2>
        //         even more text1
        //     </Fragment>
        // ); 
        // return (
        //     <>
        //         some text
        //         <h2>hello</h2>
        //         more text
        //         <h2>world</h2>
        //         even more text
        //     </>
        // ); 
        // return (
        //     this.items.map((item, index) => {
        //         return <Fragment key={'data-'+index}>
        //             <div>{item.index}</div>
        //             <div>{item.it}</div>
        //         </Fragment>
        //     })
        // )
        // 加上key的时候，Fragment不可省略
        return (
            this.items.map((item, index) => {
                return <Fragment key={'data-'+index}>
                    <div>{item.index}</div>
                    <div>{item.it}</div>
                </Fragment>
            })
        )  
    }  
}