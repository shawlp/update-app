import React, { Component, Fragment } from 'react';

// 进度条strokeDasharray和strokeDashoffset若相等且都为line的长度，circlr的周长，则进度为0%，当strokeDashoffset=0时，则进度为100%
export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Fragment>
            <svg width="200" height="200" viewBox="0 0 200 200">
                <line x1="10" y1="10" x2="110" y2="10" fill="none" strokeWidth="12" stroke="#666"></line>
                <line x1="10" y1="10" x2="110" y2="10" fill="none" strokeWidth="12" stroke="#FC4D04" strokeDasharray="100" strokeDashoffset="50"></line>
                <circle cx="60" cy="80" r="54" fill="none" stroke="#666" strokeWidth="12"></circle>
                <circle cx="60" cy="80" r="54" fill="none" stroke="#FC4D04" strokeWidth="12" strokeDasharray="339" strokeDashoffset="100"></circle>
            </svg> 
            <svg width="200" height="200" viewBox="0 0 200 200">
                <line x1="10" y1="10" x2="110" y2="10" fill="none" strokeWidth="12" stroke="#666" strokeLinecap="round"></line>
                <line x1="10" y1="10" x2="110" y2="10" fill="none" strokeWidth="12" stroke="#FC4D04" strokeDasharray="100" strokeDashoffset="50" strokeLinecap="round"></line>
                <circle cx="10" cy="10" r="3" fill="none" stroke="green" strokeWidth="6" style={{transform: 'translateX(50px)'}}/> 

                <circle cx="60" cy="80" r="54" fill="none" stroke="#666" strokeWidth="12" strokeLinecap="round"></circle>
                <circle cx="60" cy="80" r="54" fill="none" stroke="#FC4D04" strokeWidth="12" strokeDasharray="339" strokeDashoffset="100" strokeLinecap="round"></circle>
                <circle cx="60" cy="80" r="54" fill="none" stroke="green" strokeWidth="12" strokeDasharray="339" strokeDashoffset="338.5" strokeLinecap="round" style={{transform: 'rotate(.8783783783783784rad)',transformOrigin: '60px 80px'}}/>  
            </svg>    
        </Fragment>  
    }
}