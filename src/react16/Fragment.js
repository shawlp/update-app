import React, { Component } from 'react';

class Fragment extends Component {
    render(){
        // 不需要被空的div包裹,返回数组
        // return [
        //     <li key="A">1 item</li>,
        //     <li key="B">2 item</li>,
        //     <li key="C">3 item</li>,    
        // ];

        // return [1, 2, 3];

        // 返回字符串
        return 'string literals';
    }
} 
 
export default Fragment;