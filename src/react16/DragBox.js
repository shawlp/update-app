import React, { Component } from 'react';

const CIRCLE_SIZE = 85;

export default class DragBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasCapture: false,
            circleLeft: 80,
            circleTop: 80,
        };

        this.isDragging = false;
        this.previousLeft = 0;
        this.previousTop = 0;

        this.onDown = this.onDown.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onGotCapture = this.onGotCapture.bind(this);
        this.onUp = this.onUp.bind(this);
        this.onLostCapture = this.onLostCapture.bind(this);
    }

    onDown(e) {
        this.isDragging = true;
        // e.target.setPointerCapture(e.pointId);
        this.extractPositionDelta(e);
    }

    onMove(e) {
        if (!this.isDragging) {
            return;
        }
        const {left, top} = this.extractPositionDelta(e);
        this.setState(({circleLeft, circleTop}) => ({
            circleLeft: circleLeft + left,
            circleTop: circleTop + top
        }));
    }

    onUp(e) {
        this.isDragging = false;
    }

    onGotCapture(e) {
        console.log('onGotCapture')
        this.setState({
            hasCapture: true
        });
    }

    onLostCapture() {
        this.setState({
            hasCapture: false
        });
    } 

    extractPositionDelta(e) {
        const left = e.pageX;
        const top = e.pageY;
        const delta = {
            left: left - this.previousLeft,
            top: top - this.previousTop
        };
        this.previousLeft = left;
        this.previousTop = top;
        return delta; 
    }

    render() {
        const {hasCapture, circleLeft, circleTop} = this.state;
        console.log('render', hasCapture);

        const boxStyle = {
            border: '1px solid #d9d9d9',
            margin: '10px 0 20px',
            minHeight: 400,
            width: '100%',
            position: 'relative',
        };
      
        const circleStyle = {
            width: CIRCLE_SIZE,
            height: CIRCLE_SIZE,
            borderRadius: CIRCLE_SIZE / 2,
            position: 'absolute',
            left: circleLeft,
            top: circleTop,
            backgroundColor: hasCapture ? 'blue' : 'green',
            touchAction: 'none',
        }; 

        return (
            <div style={boxStyle}>
                <div
                    style={circleStyle}
                    onPointerDown={this.onDown}
                    onPointerMove={this.onMove}
                    onPointerUp={this.onUp}
                    onPointerCancel={this.onUp}
                    onGotPointerCapture={this.onGotCapture}
                    onLostPointerCapture={this.onLostCapture}
                >   
                </div>
            </div>
        )
    }
} 