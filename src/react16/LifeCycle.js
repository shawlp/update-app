import React, { Component } from 'react';

export default class LifeCycle extends Component {
    static getDerivedStateFromProps(props, state){
        console.log('getDerivedStateFromProps', props, state);
        return null;
    }
    constructor(props){
        super(props);
        console.log('constructor');
        this.state = {
            name: 'shaw'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('getSnapshotBeforeUpdate', prevProps, prevState);
        return 'getSnapshotBeforeUpdate';
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate', snapshot);
    }
    handleClick(){
        this.setState({
            name: 'lulu'
        });
    }
    render(){
        let name = this.state.name;
        return (
            <>
                <div onClick={this.handleClick}>LifeCycle-{name}</div>
            </>
        )
    }    
}