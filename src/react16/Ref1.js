import React, { Component } from 'react';

const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
)); 

export default class Ref1 extends Component {
    constructor(props){
        super(props);
        this.ref = React.createRef(); 
    }
    componentDidMount() {
        console.log('componentDidMount', this.ref.current);
    }
    render() {
        return <FancyButton ref={this.ref}>
            click me!
        </FancyButton>;
    } 
}