import React, { Component, lazy, Suspense } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

export default class ReactLazy extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Suspense fallback={<div>loading...</div>}> 
            <OtherComponent />
        </Suspense>;
    }
}
