import React, { Component, Fragment } from 'react';

export default class SvgComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Fragment>
            <svg width="400" height="200" viewBox="0 0 50 20">
                <rect x="20" y="10" width="10" height="5" style={{stroke: '#000000', fill: 'none'}}/>
            </svg>           
        </Fragment>
    }
}