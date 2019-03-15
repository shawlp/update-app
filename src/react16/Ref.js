import React, { Component } from 'react';

export default class Ref extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        console.log('componentDidMount', this.inputRef);
        this.inputRef.current.focus();
    }
    render() {
        return <input type="text" ref={this.inputRef}/>;
    } 
}