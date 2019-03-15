import React, { Component, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';

import Fragment from './react16/Fragment';
import Fragment1 from './react16/Fragment1';
import LifeCycle from './react16/LifeCycle';
import Ref from './react16/Ref';
import Ref1 from './react16/Ref1';
import ReactMemo from './react16/ReactMemo';
import ReactLazy from './react16/ReactLazy';

const DragBox = lazy(() => import('./react16/DragBox'));
const SVGComponent = lazy(() => import('./svg/SVGComponent'));
const SwiperComponent = lazy(() => import('./swiper/SwiperComponent'));
const ProgressBar = lazy(() => import('./svg/ProgressBar'));
const Canvas = lazy(() => import('./canvas/canvas'));
const Example = lazy(() => import('./hooks/example'));
let MemoEx = lazy(() => import('./hooks/UseMemo'));
let TrafficSignal = lazy(() => import('./stack/promise/trafficSignal')); 
let Ball = lazy(() => import('./stack/promise/ball.jsx')); 


class Routes extends Component {
  render() {
    return (
      <div>
          <Link to='/' style={{marginRight: '25px',display: 'inline-block'}} className="index-title">index</Link>
          <Link to='/swiper' style={{marginRight: '25px', display: 'inline-block'}}>swiper</Link>
          <Link to='/svg' style={{marginRight: '25px', display: 'inline-block'}}>svg</Link>   
          <Link to='/progress' style={{display: 'inline-block'}}>ProgressBar</Link> 
      </div>
    )
  }  
}

class App extends Component {
  render() {
    const root = <div className="App"></div>;
    // return ReactDOM.createPortal(
    //   Fragment, 
    //   root,  
    // ); 
    // return <div className="App">
    //   <Fragment />
    //   <Fragment1 />
    //   <LifeCycle age={24}/> 
    //   <Ref /> 
    //   <Ref1 />
    //   <ReactMemo />
    //   <ReactLazy />
    //   <DragBox />
    // </div>;  
    return <>
      <div>
          <a href='/' style={{marginRight: '25px',display: 'inline-block'}} className="index-title">index</a>
          <a href='/swiper' style={{marginRight: '25px', display: 'inline-block'}}>swiper</a>
          <a href='/svg' style={{marginRight: '25px', display: 'inline-block'}}>svg</a>   
          <a href='/progress' style={{marginRight: '25px', display: 'inline-block'}}>ProgressBar</a> 
          <a href='/canvas' style={{marginRight: '25px', display: 'inline-block'}}>Canvas</a> 
      </div>
      <div>
        <Router>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/" component={Ball}></Route> 
              {/* <Route path="/" component={MemoEx}></Route>  */}
              {/* <Route exact path="/dragBox" component={DragBox} />
              <Route exact path="/swiper" component={SwiperComponent} />
              <Route exact path="/svg" component={SVGComponent} />
              <Route exact path="/progress" component={ProgressBar} /> 
              <Route exact path="/canvas" component={Canvas} />  */}
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>     
  }   
}   

export default App;
