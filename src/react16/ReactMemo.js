import React, { Component, Fragment } from 'react';

// React.memo作用与PureComponent, shouldComponentUpdate一致，避免不必要的渲染，props发生改变时才会重新render
const MyComponent = React.memo(function MyComponent(props) {
    return <Fragment>{props.text}-hello</Fragment>;
});

export default class ReactMemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        e.preventDefault();
        this.setState({
            text: e.target.value
        });
    }
    render() {
        let text = this.state.text;

        return (
            <>
                <input type="text" onChange={this.handleInput}/>
                <MyComponent text={text}/>
            </> 
        ) 
    }
} 